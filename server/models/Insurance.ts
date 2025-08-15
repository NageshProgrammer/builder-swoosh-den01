import mongoose, { Schema, Document } from 'mongoose';
import { 
  InsuranceCompany as IInsuranceCompany, 
  InsuranceStaff as IInsuranceStaff,
  InsuranceInfo as IInsuranceInfo,
  Claim as IClaim
} from '@shared/api';

export interface InsuranceCompanyDocument extends IInsuranceCompany, Document {}
export interface InsuranceStaffDocument extends IInsuranceStaff, Document {}
export interface InsuranceInfoDocument extends IInsuranceInfo, Document {}
export interface ClaimDocument extends IClaim, Document {}

const InsuranceCompanySchema = new Schema<InsuranceCompanyDocument>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  authorizedStaff: [{
    type: String,
    ref: 'InsuranceStaff'
  }]
}, {
  timestamps: true
});

const InsuranceStaffSchema = new Schema<InsuranceStaffDocument>({
  companyId: {
    type: String,
    required: true,
    ref: 'InsuranceCompany'
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    enum: ['agent', 'claim_officer', 'manager', 'admin']
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const InsuranceInfoSchema = new Schema<InsuranceInfoDocument>({
  patientId: {
    type: String,
    required: true,
    ref: 'Patient'
  },
  provider: {
    type: String,
    required: true,
    trim: true
  },
  policyNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  coverageAmount: {
    type: Number,
    required: true,
    min: 0
  },
  activeClaims: {
    type: Number,
    default: 0,
    min: 0
  },
  lastClaimDate: {
    type: String
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  }
}, {
  timestamps: true
});

const ClaimSchema = new Schema<ClaimDocument>({
  patientId: {
    type: String,
    required: true,
    ref: 'Patient'
  },
  policyNumber: {
    type: String,
    required: true,
    ref: 'InsuranceInfo'
  },
  hospitalId: {
    type: String,
    required: true,
    ref: 'Hospital'
  },
  treatmentType: {
    type: String,
    required: true,
    trim: true
  },
  claimAmount: {
    type: Number,
    required: true,
    min: 0
  },
  dateSubmitted: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'under_review', 'approved', 'rejected', 'paid'],
    default: 'pending'
  },
  documents: [{
    type: String
  }],
  reviewedBy: {
    type: String,
    ref: 'InsuranceStaff'
  },
  reviewDate: {
    type: String
  },
  comments: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Additional indexes (unique indexes are already created by schema definition)
InsuranceStaffSchema.index({ companyId: 1 });
InsuranceStaffSchema.index({ isActive: 1 });

InsuranceInfoSchema.index({ patientId: 1 });
InsuranceInfoSchema.index({ status: 1 });

ClaimSchema.index({ patientId: 1 });
ClaimSchema.index({ policyNumber: 1 });
ClaimSchema.index({ status: 1 });
ClaimSchema.index({ dateSubmitted: -1 });

export const InsuranceCompany = mongoose.model<InsuranceCompanyDocument>('InsuranceCompany', InsuranceCompanySchema);
export const InsuranceStaff = mongoose.model<InsuranceStaffDocument>('InsuranceStaff', InsuranceStaffSchema);
export const InsuranceInfo = mongoose.model<InsuranceInfoDocument>('InsuranceInfo', InsuranceInfoSchema);
export const Claim = mongoose.model<ClaimDocument>('Claim', ClaimSchema);
