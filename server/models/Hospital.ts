import mongoose, { Schema, Document } from 'mongoose';
import { Hospital as IHospital, HospitalStaff as IHospitalStaff } from '@shared/api';

export interface HospitalDocument extends IHospital, Document {}
export interface HospitalStaffDocument extends IHospitalStaff, Document {}

const HospitalSchema = new Schema<HospitalDocument>({
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
    ref: 'HospitalStaff'
  }]
}, {
  timestamps: true
});

const HospitalStaffSchema = new Schema<HospitalStaffDocument>({
  hospitalId: {
    type: String,
    required: true,
    ref: 'Hospital'
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
    enum: ['doctor', 'nurse', 'receptionist', 'admin']
  },
  licenseNumber: {
    type: String,
    trim: true,
    sparse: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
HospitalSchema.index({ registrationNumber: 1 });
HospitalSchema.index({ email: 1 });

HospitalStaffSchema.index({ hospitalId: 1 });
HospitalStaffSchema.index({ phone: 1 });
HospitalStaffSchema.index({ role: 1 });
HospitalStaffSchema.index({ isActive: 1 });

export const Hospital = mongoose.model<HospitalDocument>('Hospital', HospitalSchema);
export const HospitalStaff = mongoose.model<HospitalStaffDocument>('HospitalStaff', HospitalStaffSchema);
