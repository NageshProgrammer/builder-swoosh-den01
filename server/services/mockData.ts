// Mock data service for when database is not connected
import { Patient, MedicalRecord, InsuranceInfo } from '@shared/api';

export const mockPatients: Patient[] = [
  {
    _id: '1',
    blockchainId: 'BC-IN-2024-RAJ-001234567890',
    googleId: 'google_rajesh_123',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    dateOfBirth: '15-03-1985',
    bloodGroup: 'O+',
    address: '123 MG Road, Bangalore, Karnataka 560001',
    emergencyContact: '+91 98765 43211',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: '2',
    blockchainId: 'BC-IN-2024-PRI-001234567891',
    googleId: 'google_priya_456',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43215',
    dateOfBirth: '22-07-1992',
    bloodGroup: 'A+',
    address: '456 Brigade Road, Bangalore, Karnataka 560025',
    emergencyContact: '+91 98765 43216',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  }
];

export const mockMedicalRecords: MedicalRecord[] = [
  {
    _id: '1',
    patientId: '1',
    hospitalId: '1',
    doctorName: 'Dr. Priya Sharma',
    treatmentType: 'Regular Checkup',
    diagnosis: 'Routine health assessment - All vitals normal',
    medications: ['Vitamin D3 1000 IU daily', 'Omega-3 500mg twice daily'],
    date: '2024-01-15',
    verified: true,
    blockchainHash: 'abc123hash456',
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z'
  },
  {
    _id: '2',
    patientId: '1',
    hospitalId: '2',
    doctorName: 'Dr. Amit Patel',
    treatmentType: 'Blood Test',
    diagnosis: 'Complete blood count - Normal ranges',
    medications: [],
    date: '2023-11-22',
    verified: true,
    blockchainHash: 'def789hash012',
    createdAt: '2023-11-22T00:00:00.000Z',
    updatedAt: '2023-11-22T00:00:00.000Z'
  }
];

export const mockInsuranceInfo: InsuranceInfo[] = [
  {
    _id: '1',
    patientId: '1',
    provider: 'Max Health Insurance',
    policyNumber: 'MHI-2024-RAJ-789456',
    coverageAmount: 1000000,
    activeClaims: 1,
    lastClaimDate: '2024-01-10',
    status: 'active',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-10T00:00:00.000Z'
  },
  {
    _id: '2',
    patientId: '2',
    provider: 'Star Health Insurance',
    policyNumber: 'SHI-2024-PRI-789457',
    coverageAmount: 1500000,
    activeClaims: 0,
    lastClaimDate: '2023-11-15',
    status: 'active',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2023-11-15T00:00:00.000Z'
  }
];

export const mockHospitalStaff = [
  { _id: '1', phone: '+91 9876543210', name: 'Dr. Priya Sharma', role: 'doctor', isActive: true },
  { _id: '2', phone: '+91 9876543211', name: 'Dr. Amit Patel', role: 'doctor', isActive: true },
  { _id: '3', phone: '+91 9876543212', name: 'Receptionist Alice', role: 'receptionist', isActive: true }
];

export const mockInsuranceStaff = [
  { _id: '1', phone: '+91 9876543213', name: 'Insurance Agent John', role: 'agent', isActive: true },
  { _id: '2', phone: '+91 9876543214', name: 'Claims Officer Sarah', role: 'claim_officer', isActive: true }
];

export const findPatientByBlockchainId = (blockchainId: string): Patient | undefined => {
  return mockPatients.find(p => p.blockchainId === blockchainId);
};

export const findMedicalRecordsByPatientId = (patientId: string): MedicalRecord[] => {
  return mockMedicalRecords.filter(r => r.patientId === patientId);
};

export const findInsuranceByPatientId = (patientId: string): InsuranceInfo | undefined => {
  return mockInsuranceInfo.find(i => i.patientId === patientId);
};

export const findHospitalStaffByPhone = (phone: string) => {
  return mockHospitalStaff.find(s => s.phone === phone && s.isActive);
};

export const findInsuranceStaffByPhone = (phone: string) => {
  return mockInsuranceStaff.find(s => s.phone === phone && s.isActive);
};
