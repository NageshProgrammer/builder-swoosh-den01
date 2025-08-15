import mongoose, { Schema, Document } from 'mongoose';
import { MedicalRecord as IMedicalRecord } from '@shared/api';

export interface MedicalRecordDocument extends IMedicalRecord, Document {}

const MedicalRecordSchema = new Schema<MedicalRecordDocument>({
  patientId: {
    type: String,
    required: true,
    ref: 'Patient'
  },
  hospitalId: {
    type: String,
    required: true,
    ref: 'Hospital'
  },
  doctorName: {
    type: String,
    required: true,
    trim: true
  },
  treatmentType: {
    type: String,
    required: true,
    trim: true
  },
  diagnosis: {
    type: String,
    required: true
  },
  medications: [{
    type: String,
    trim: true
  }],
  date: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  blockchainHash: {
    type: String,
    unique: true,
    sparse: true
  }
}, {
  timestamps: true
});

// Indexes for faster queries
MedicalRecordSchema.index({ patientId: 1, date: -1 });
MedicalRecordSchema.index({ hospitalId: 1 });
MedicalRecordSchema.index({ verified: 1 });

export const MedicalRecord = mongoose.model<MedicalRecordDocument>('MedicalRecord', MedicalRecordSchema);
