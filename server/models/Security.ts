import mongoose, { Schema, Document } from 'mongoose';
import { OTPRequest as IOTPRequest, AuditLog as IAuditLog, BlockchainRecord as IBlockchainRecord } from '@shared/api';

export interface OTPRequestDocument extends IOTPRequest, Document {}
export interface AuditLogDocument extends IAuditLog, Document {}
export interface BlockchainRecordDocument extends IBlockchainRecord, Document {}

const OTPRequestSchema = new Schema<OTPRequestDocument>({
  contact: {
    type: String,
    required: true,
    trim: true
  },
  otp: {
    type: String,
    required: true,
    length: 6
  },
  purpose: {
    type: String,
    required: true,
    enum: ['patient_consent', 'staff_login', 'record_update']
  },
  expiresAt: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  patientId: {
    type: String,
    ref: 'Patient'
  },
  requestedBy: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const AuditLogSchema = new Schema<AuditLogDocument>({
  action: {
    type: String,
    required: true,
    trim: true
  },
  performedBy: {
    type: String,
    required: true
  },
  performedByType: {
    type: String,
    required: true,
    enum: ['patient', 'hospital_staff', 'insurance_staff']
  },
  patientId: {
    type: String,
    ref: 'Patient'
  },
  recordId: {
    type: String
  },
  details: {
    type: Schema.Types.Mixed,
    default: {}
  },
  ipAddress: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const BlockchainRecordSchema = new Schema<BlockchainRecordDocument>({
  patientId: {
    type: String,
    required: true,
    ref: 'Patient'
  },
  recordHash: {
    type: String,
    required: true,
    unique: true
  },
  previousHash: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  },
  recordType: {
    type: String,
    required: true,
    enum: ['medical', 'insurance', 'personal_info']
  },
  recordId: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for performance
OTPRequestSchema.index({ contact: 1, purpose: 1 });
OTPRequestSchema.index({ expiresAt: 1 });
OTPRequestSchema.index({ verified: 1 });

AuditLogSchema.index({ performedBy: 1 });
AuditLogSchema.index({ patientId: 1 });
AuditLogSchema.index({ timestamp: -1 });
AuditLogSchema.index({ action: 1 });

BlockchainRecordSchema.index({ patientId: 1 });
BlockchainRecordSchema.index({ recordHash: 1 });
BlockchainRecordSchema.index({ timestamp: -1 });
BlockchainRecordSchema.index({ recordType: 1 });

// TTL index for OTP expiration (automatically delete expired OTPs)
OTPRequestSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OTPRequest = mongoose.model<OTPRequestDocument>('OTPRequest', OTPRequestSchema);
export const AuditLog = mongoose.model<AuditLogDocument>('AuditLog', AuditLogSchema);
export const BlockchainRecord = mongoose.model<BlockchainRecordDocument>('BlockchainRecord', BlockchainRecordSchema);
