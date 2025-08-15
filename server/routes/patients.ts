import { RequestHandler } from "express";
import { Patient } from '../models/Patient';
import { MedicalRecord } from '../models/MedicalRecord';
import { InsuranceInfo } from '../models/Insurance';
import { BlockchainRecord, AuditLog } from '../models/Security';
import { 
  PatientSearchRequest, 
  PatientSearchResponse,
  RecordUpdateRequest,
  RecordUpdateResponse
} from '@shared/api';
import crypto from 'crypto';

// Search patient by blockchain ID
export const handlePatientSearch: RequestHandler = async (req, res) => {
  try {
    const { blockchainId } = req.body as PatientSearchRequest;

    const patient = await Patient.findOne({ blockchainId });
    
    if (!patient) {
      const response: PatientSearchResponse = {
        success: false,
        message: 'Patient not found'
      };
      return res.status(404).json(response);
    }

    // Log audit trail
    const auditLog = new AuditLog({
      action: 'Patient Search',
      performedBy: req.user?.userId || 'unknown',
      performedByType: req.user?.userType || 'unknown',
      patientId: patient._id!.toString(),
      details: { blockchainId },
      ipAddress: req.ip || 'unknown',
      timestamp: new Date().toISOString()
    });
    await auditLog.save();

    const response: PatientSearchResponse = {
      success: true,
      patient: patient.toObject()
    };

    res.json(response);
  } catch (error) {
    console.error('Patient search error:', error);
    const response: PatientSearchResponse = {
      success: false,
      message: 'Search failed'
    };
    res.status(500).json(response);
  }
};

// Get patient medical records
export const handleGetMedicalRecords: RequestHandler = async (req, res) => {
  try {
    const { patientId } = req.params;

    const records = await MedicalRecord.find({ patientId }).sort({ date: -1 });

    // Log audit trail
    const auditLog = new AuditLog({
      action: 'Medical Records Access',
      performedBy: req.user?.userId || 'unknown',
      performedByType: req.user?.userType || 'unknown',
      patientId,
      details: { recordCount: records.length },
      ipAddress: req.ip || 'unknown',
      timestamp: new Date().toISOString()
    });
    await auditLog.save();

    res.json({
      success: true,
      records
    });
  } catch (error) {
    console.error('Get medical records error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve medical records'
    });
  }
};

// Get patient insurance information
export const handleGetInsuranceInfo: RequestHandler = async (req, res) => {
  try {
    const { patientId } = req.params;

    const insurance = await InsuranceInfo.findOne({ patientId });

    // Log audit trail
    const auditLog = new AuditLog({
      action: 'Insurance Info Access',
      performedBy: req.user?.userId || 'unknown',
      performedByType: req.user?.userType || 'unknown',
      patientId,
      details: { hasInsurance: !!insurance },
      ipAddress: req.ip || 'unknown',
      timestamp: new Date().toISOString()
    });
    await auditLog.save();

    res.json({
      success: true,
      insurance
    });
  } catch (error) {
    console.error('Get insurance info error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve insurance information'
    });
  }
};

// Create hash for blockchain record
const createRecordHash = (data: any, previousHash: string): string => {
  const recordString = JSON.stringify(data) + previousHash + Date.now();
  return crypto.createHash('sha256').update(recordString).digest('hex');
};

// Add medical record (Hospital staff only)
export const handleAddMedicalRecord: RequestHandler = async (req, res) => {
  try {
    const { patientId, recordData, hospitalStaffId } = req.body as RecordUpdateRequest;

    // Verify authorization (simplified)
    if (req.user?.userType !== 'hospital_staff') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Hospital staff only'
      });
    }

    // Create medical record
    const medicalRecord = new MedicalRecord({
      ...recordData,
      patientId,
      verified: false // Will be verified after patient consent
    });
    await medicalRecord.save();

    // Get the last blockchain record for previous hash
    const lastRecord = await BlockchainRecord.findOne().sort({ timestamp: -1 });
    const previousHash = lastRecord?.recordHash || '0';

    // Create blockchain record
    const recordHash = createRecordHash(medicalRecord.toObject(), previousHash);
    const blockchainRecord = new BlockchainRecord({
      patientId,
      recordHash,
      previousHash,
      timestamp: new Date().toISOString(),
      recordType: 'medical',
      recordId: medicalRecord._id!.toString(),
      verified: false
    });
    await blockchainRecord.save();

    // Update medical record with blockchain hash
    medicalRecord.blockchainHash = recordHash;
    await medicalRecord.save();

    // Log audit trail
    const auditLog = new AuditLog({
      action: 'Medical Record Added',
      performedBy: hospitalStaffId,
      performedByType: 'hospital_staff',
      patientId,
      recordId: medicalRecord._id!.toString(),
      details: { 
        treatmentType: recordData.treatmentType,
        blockchainHash: recordHash 
      },
      ipAddress: req.ip || 'unknown',
      timestamp: new Date().toISOString()
    });
    await auditLog.save();

    const response: RecordUpdateResponse = {
      success: true,
      message: 'Medical record added successfully',
      record: medicalRecord.toObject()
    };

    res.json(response);
  } catch (error) {
    console.error('Add medical record error:', error);
    const response: RecordUpdateResponse = {
      success: false,
      message: 'Failed to add medical record'
    };
    res.status(500).json(response);
  }
};

// Update medical record (Hospital staff only)
export const handleUpdateMedicalRecord: RequestHandler = async (req, res) => {
  try {
    const { recordId } = req.params;
    const { recordData, hospitalStaffId } = req.body;

    // Verify authorization
    if (req.user?.userType !== 'hospital_staff') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Hospital staff only'
      });
    }

    const medicalRecord = await MedicalRecord.findById(recordId);
    if (!medicalRecord) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found'
      });
    }

    // Update record
    Object.assign(medicalRecord, recordData);
    medicalRecord.verified = false; // Reset verification status
    await medicalRecord.save();

    // Create new blockchain record for the update
    const lastRecord = await BlockchainRecord.findOne().sort({ timestamp: -1 });
    const previousHash = lastRecord?.recordHash || '0';
    const recordHash = createRecordHash(medicalRecord.toObject(), previousHash);

    const blockchainRecord = new BlockchainRecord({
      patientId: medicalRecord.patientId,
      recordHash,
      previousHash,
      timestamp: new Date().toISOString(),
      recordType: 'medical',
      recordId: medicalRecord._id!.toString(),
      verified: false
    });
    await blockchainRecord.save();

    // Update blockchain hash
    medicalRecord.blockchainHash = recordHash;
    await medicalRecord.save();

    // Log audit trail
    const auditLog = new AuditLog({
      action: 'Medical Record Updated',
      performedBy: hospitalStaffId,
      performedByType: 'hospital_staff',
      patientId: medicalRecord.patientId,
      recordId: medicalRecord._id!.toString(),
      details: { 
        changes: recordData,
        newBlockchainHash: recordHash 
      },
      ipAddress: req.ip || 'unknown',
      timestamp: new Date().toISOString()
    });
    await auditLog.save();

    const response: RecordUpdateResponse = {
      success: true,
      message: 'Medical record updated successfully',
      record: medicalRecord.toObject()
    };

    res.json(response);
  } catch (error) {
    console.error('Update medical record error:', error);
    const response: RecordUpdateResponse = {
      success: false,
      message: 'Failed to update medical record'
    };
    res.status(500).json(response);
  }
};

// Get audit logs for a patient
export const handleGetAuditLogs: RequestHandler = async (req, res) => {
  try {
    const { patientId } = req.params;

    const logs = await AuditLog.find({ patientId }).sort({ timestamp: -1 }).limit(50);

    res.json({
      success: true,
      logs
    });
  } catch (error) {
    console.error('Get audit logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve audit logs'
    });
  }
};

// Get blockchain records for a patient
export const handleGetBlockchainRecords: RequestHandler = async (req, res) => {
  try {
    const { patientId } = req.params;

    const records = await BlockchainRecord.find({ patientId }).sort({ timestamp: -1 });

    res.json({
      success: true,
      records
    });
  } catch (error) {
    console.error('Get blockchain records error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve blockchain records'
    });
  }
};

// Verify record on blockchain (Patient consent required)
export const handleVerifyRecord: RequestHandler = async (req, res) => {
  try {
    const { recordId } = req.params;
    const { patientId } = req.body;

    // This should only be called after OTP verification
    const medicalRecord = await MedicalRecord.findById(recordId);
    const blockchainRecord = await BlockchainRecord.findOne({ recordId });

    if (!medicalRecord || !blockchainRecord) {
      return res.status(404).json({
        success: false,
        message: 'Record not found'
      });
    }

    // Mark as verified
    medicalRecord.verified = true;
    blockchainRecord.verified = true;
    
    await medicalRecord.save();
    await blockchainRecord.save();

    // Log audit trail
    const auditLog = new AuditLog({
      action: 'Record Verified by Patient',
      performedBy: patientId,
      performedByType: 'patient',
      patientId,
      recordId,
      details: { 
        blockchainHash: blockchainRecord.recordHash 
      },
      ipAddress: req.ip || 'unknown',
      timestamp: new Date().toISOString()
    });
    await auditLog.save();

    res.json({
      success: true,
      message: 'Record verified successfully'
    });
  } catch (error) {
    console.error('Verify record error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify record'
    });
  }
};
