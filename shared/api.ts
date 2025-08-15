/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Patient-related types
export interface Patient {
  _id?: string;
  blockchainId: string;
  googleId: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  bloodGroup: string;
  address: string;
  emergencyContact: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MedicalRecord {
  _id?: string;
  patientId: string;
  hospitalId: string;
  doctorName: string;
  treatmentType: string;
  diagnosis: string;
  medications: string[];
  date: string;
  verified: boolean;
  blockchainHash?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InsuranceInfo {
  _id?: string;
  patientId: string;
  provider: string;
  policyNumber: string;
  coverageAmount: number;
  activeClaims: number;
  lastClaimDate?: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt?: string;
  updatedAt?: string;
}

// Hospital-related types
export interface Hospital {
  _id?: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  registrationNumber: string;
  authorizedStaff: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface HospitalStaff {
  _id?: string;
  hospitalId: string;
  name: string;
  phone: string;
  role: 'doctor' | 'nurse' | 'receptionist' | 'admin';
  licenseNumber?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Insurance-related types
export interface InsuranceCompany {
  _id?: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  registrationNumber: string;
  authorizedStaff: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface InsuranceStaff {
  _id?: string;
  companyId: string;
  name: string;
  phone: string;
  role: 'agent' | 'claim_officer' | 'manager' | 'admin';
  employeeId: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Claim {
  _id?: string;
  patientId: string;
  policyNumber: string;
  hospitalId: string;
  treatmentType: string;
  claimAmount: number;
  dateSubmitted: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'paid';
  documents: string[];
  reviewedBy?: string;
  reviewDate?: string;
  comments?: string;
  createdAt?: string;
  updatedAt?: string;
}

// OTP and Security
export interface OTPRequest {
  _id?: string;
  contact: string; // email or phone
  otp: string;
  purpose: 'patient_consent' | 'staff_login' | 'record_update';
  expiresAt: string;
  verified: boolean;
  patientId?: string;
  requestedBy: string;
  createdAt?: string;
}

export interface AuditLog {
  _id?: string;
  action: string;
  performedBy: string;
  performedByType: 'patient' | 'hospital_staff' | 'insurance_staff';
  patientId?: string;
  recordId?: string;
  details: Record<string, any>;
  ipAddress: string;
  timestamp: string;
}

// Blockchain simulation
export interface BlockchainRecord {
  _id?: string;
  patientId: string;
  recordHash: string;
  previousHash: string;
  timestamp: string;
  recordType: 'medical' | 'insurance' | 'personal_info';
  recordId: string;
  verified: boolean;
}

// API Request/Response types
export interface PatientSearchRequest {
  blockchainId: string;
}

export interface PatientSearchResponse {
  success: boolean;
  patient?: Patient;
  message?: string;
}

export interface OTPSendRequest {
  contact: string;
  purpose: 'patient_consent' | 'staff_login' | 'record_update';
  patientId?: string;
  requestedBy: string;
}

export interface OTPSendResponse {
  success: boolean;
  message: string;
  otpId?: string;
}

export interface OTPVerifyRequest {
  otpId: string;
  otp: string;
}

export interface OTPVerifyResponse {
  success: boolean;
  message: string;
  token?: string;
}

export interface StaffLoginRequest {
  phone: string;
  userType: 'hospital' | 'insurance';
}

export interface StaffLoginResponse {
  success: boolean;
  message: string;
  otpId?: string;
}

export interface GoogleLoginRequest {
  googleToken: string;
}

export interface GoogleLoginResponse {
  success: boolean;
  message: string;
  patient?: Patient;
  token?: string;
}

export interface RecordUpdateRequest {
  patientId: string;
  recordData: Partial<MedicalRecord>;
  hospitalStaffId: string;
}

export interface RecordUpdateResponse {
  success: boolean;
  message: string;
  record?: MedicalRecord;
}
