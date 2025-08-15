import mongoose, { Schema, Document } from 'mongoose';
import { Patient as IPatient } from '@shared/api';

export interface PatientDocument extends IPatient, Document {}

const PatientSchema = new Schema<PatientDocument>({
  blockchainId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
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
  phone: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  address: {
    type: String,
    required: true
  },
  emergencyContact: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Index for faster searches
PatientSchema.index({ blockchainId: 1 });
PatientSchema.index({ email: 1 });
PatientSchema.index({ googleId: 1 });

export const Patient = mongoose.model<PatientDocument>('Patient', PatientSchema);
