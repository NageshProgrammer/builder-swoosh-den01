import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import { Patient } from '../models/Patient';
import { HospitalStaff } from '../models/Hospital';
import { InsuranceStaff } from '../models/Insurance';
import { OTPRequest, AuditLog } from '../models/Security';
import { 
  GoogleLoginRequest, 
  GoogleLoginResponse, 
  StaffLoginRequest, 
  StaffLoginResponse,
  OTPSendRequest,
  OTPSendResponse,
  OTPVerifyRequest,
  OTPVerifyResponse
} from '@shared/api';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Generate blockchain ID for new patients
const generateBlockchainId = (): string => {
  const prefix = 'BC-IN-2024';
  const random = Math.random().toString(36).substring(2, 15).toUpperCase();
  const timestamp = Date.now().toString().slice(-6);
  return `${prefix}-${random.slice(0, 3)}-${timestamp}${random.slice(3)}`;
};

// Generate OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Google OAuth login for patients
export const handleGoogleLogin: RequestHandler = async (req, res) => {
  try {
    const { googleToken } = req.body as GoogleLoginRequest;
    
    // In a real implementation, you would verify the Google token here
    // For demo purposes, we'll simulate with mock data
    const mockGoogleData = {
      googleId: 'google_123456789',
      email: 'rajesh.kumar@email.com',
      name: 'Rajesh Kumar'
    };

    let patient = await Patient.findOne({ googleId: mockGoogleData.googleId });
    
    if (!patient) {
      // Create new patient
      const blockchainId = generateBlockchainId();
      patient = new Patient({
        blockchainId,
        googleId: mockGoogleData.googleId,
        name: mockGoogleData.name,
        email: mockGoogleData.email,
        phone: '+91 98765 43210', // Would come from Google profile or be requested
        dateOfBirth: '15-03-1985',
        bloodGroup: 'O+',
        address: '123 MG Road, Bangalore, Karnataka 560001',
        emergencyContact: '+91 98765 43211'
      });
      await patient.save();

      // Log audit trail
      const auditLog = new AuditLog({
        action: 'Patient Registration',
        performedBy: patient._id!.toString(),
        performedByType: 'patient',
        patientId: patient._id!.toString(),
        details: { method: 'Google OAuth' },
        ipAddress: req.ip || 'unknown',
        timestamp: new Date().toISOString()
      });
      await auditLog.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: patient._id, 
        userType: 'patient',
        blockchainId: patient.blockchainId 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const response: GoogleLoginResponse = {
      success: true,
      message: 'Login successful',
      patient: patient.toObject(),
      token
    };

    res.json(response);
  } catch (error) {
    console.error('Google login error:', error);
    const response: GoogleLoginResponse = {
      success: false,
      message: 'Login failed'
    };
    res.status(500).json(response);
  }
};

// Staff login (Hospital/Insurance) - Step 1: Send OTP
export const handleStaffLogin: RequestHandler = async (req, res) => {
  try {
    const { phone, userType } = req.body as StaffLoginRequest;

    // Find staff member
    let staff;
    if (userType === 'hospital') {
      staff = await HospitalStaff.findOne({ phone, isActive: true });
    } else {
      staff = await InsuranceStaff.findOne({ phone, isActive: true });
    }

    if (!staff) {
      const response: StaffLoginResponse = {
        success: false,
        message: 'Staff member not found or inactive'
      };
      return res.status(404).json(response);
    }

    // Generate and save OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 minutes

    const otpRequest = new OTPRequest({
      contact: phone,
      otp,
      purpose: 'staff_login',
      expiresAt,
      requestedBy: staff._id!.toString()
    });
    await otpRequest.save();

    // In a real implementation, send SMS via Twilio/Firebase
    console.log(`OTP for ${phone}: ${otp}`);

    const response: StaffLoginResponse = {
      success: true,
      message: 'OTP sent successfully',
      otpId: otpRequest._id!.toString()
    };

    res.json(response);
  } catch (error) {
    console.error('Staff login error:', error);
    const response: StaffLoginResponse = {
      success: false,
      message: 'Login failed'
    };
    res.status(500).json(response);
  }
};

// Send OTP for patient consent
export const handleSendOTP: RequestHandler = async (req, res) => {
  try {
    const { contact, purpose, patientId, requestedBy } = req.body as OTPSendRequest;

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

    const otpRequest = new OTPRequest({
      contact,
      otp,
      purpose,
      expiresAt,
      patientId,
      requestedBy
    });
    await otpRequest.save();

    // In a real implementation, send SMS/Email
    console.log(`OTP for ${contact}: ${otp}`);

    // Log audit trail
    const auditLog = new AuditLog({
      action: `OTP Sent - ${purpose}`,
      performedBy: requestedBy,
      performedByType: purpose === 'patient_consent' ? 'hospital_staff' : 'patient',
      patientId,
      details: { contact, purpose },
      ipAddress: req.ip || 'unknown',
      timestamp: new Date().toISOString()
    });
    await auditLog.save();

    const response: OTPSendResponse = {
      success: true,
      message: 'OTP sent successfully',
      otpId: otpRequest._id!.toString()
    };

    res.json(response);
  } catch (error) {
    console.error('Send OTP error:', error);
    const response: OTPSendResponse = {
      success: false,
      message: 'Failed to send OTP'
    };
    res.status(500).json(response);
  }
};

// Verify OTP
export const handleVerifyOTP: RequestHandler = async (req, res) => {
  try {
    const { otpId, otp } = req.body as OTPVerifyRequest;

    const otpRequest = await OTPRequest.findById(otpId);
    
    if (!otpRequest) {
      const response: OTPVerifyResponse = {
        success: false,
        message: 'Invalid OTP request'
      };
      return res.status(404).json(response);
    }

    if (otpRequest.verified) {
      const response: OTPVerifyResponse = {
        success: false,
        message: 'OTP already used'
      };
      return res.status(400).json(response);
    }

    if (new Date() > new Date(otpRequest.expiresAt)) {
      const response: OTPVerifyResponse = {
        success: false,
        message: 'OTP expired'
      };
      return res.status(400).json(response);
    }

    if (otpRequest.otp !== otp) {
      const response: OTPVerifyResponse = {
        success: false,
        message: 'Invalid OTP'
      };
      return res.status(400).json(response);
    }

    // Mark OTP as verified
    otpRequest.verified = true;
    await otpRequest.save();

    let token;
    if (otpRequest.purpose === 'staff_login') {
      // Generate JWT for staff
      const staff = await HospitalStaff.findById(otpRequest.requestedBy) || 
                   await InsuranceStaff.findById(otpRequest.requestedBy);
      
      if (staff) {
        const userType = await HospitalStaff.findById(otpRequest.requestedBy) ? 'hospital' : 'insurance';
        token = jwt.sign(
          { 
            userId: staff._id, 
            userType: userType + '_staff',
            phone: staff.phone 
          },
          JWT_SECRET,
          { expiresIn: '8h' }
        );
      }
    }

    // Log audit trail
    const auditLog = new AuditLog({
      action: `OTP Verified - ${otpRequest.purpose}`,
      performedBy: otpRequest.requestedBy,
      performedByType: otpRequest.purpose === 'patient_consent' ? 'hospital_staff' : 'patient',
      patientId: otpRequest.patientId,
      details: { purpose: otpRequest.purpose },
      ipAddress: req.ip || 'unknown',
      timestamp: new Date().toISOString()
    });
    await auditLog.save();

    const response: OTPVerifyResponse = {
      success: true,
      message: 'OTP verified successfully',
      token
    };

    res.json(response);
  } catch (error) {
    console.error('Verify OTP error:', error);
    const response: OTPVerifyResponse = {
      success: false,
      message: 'Failed to verify OTP'
    };
    res.status(500).json(response);
  }
};
