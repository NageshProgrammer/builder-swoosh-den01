import { Hospital, HospitalStaff } from '../models/Hospital';
import { InsuranceCompany, InsuranceStaff, InsuranceInfo } from '../models/Insurance';
import { Patient } from '../models/Patient';
import { MedicalRecord } from '../models/MedicalRecord';

export const seedDatabase = async () => {
  try {
    console.log('Seeding database...');

    // Clear existing data (for development only)
    await Promise.all([
      Hospital.deleteMany({}),
      HospitalStaff.deleteMany({}),
      InsuranceCompany.deleteMany({}),
      InsuranceStaff.deleteMany({}),
      Patient.deleteMany({}),
      MedicalRecord.deleteMany({}),
      InsuranceInfo.deleteMany({})
    ]);

    // Create Hospitals
    const apolloHospital = new Hospital({
      name: 'Apollo Hospital',
      address: 'Bannerghatta Road, Bangalore, Karnataka 560076',
      phone: '+91 80 2692 2222',
      email: 'info@apollohospitals.com',
      registrationNumber: 'HOSP-APOLLO-BLR-001'
    });
    await apolloHospital.save();

    const fortisHospital = new Hospital({
      name: 'Fortis Hospital',
      address: 'Bannerghatta Road, Bangalore, Karnataka 560076',
      phone: '+91 80 6621 4444',
      email: 'info@fortishealthcare.com',
      registrationNumber: 'HOSP-FORTIS-BLR-001'
    });
    await fortisHospital.save();

    // Create Hospital Staff
    const doctorPriya = new HospitalStaff({
      hospitalId: apolloHospital._id!.toString(),
      name: 'Dr. Priya Sharma',
      phone: '+91 9876543210',
      role: 'doctor',
      licenseNumber: 'MED-LIC-2024-001'
    });
    await doctorPriya.save();

    const doctorAmit = new HospitalStaff({
      hospitalId: fortisHospital._id!.toString(),
      name: 'Dr. Amit Patel',
      phone: '+91 9876543211',
      role: 'doctor',
      licenseNumber: 'MED-LIC-2024-002'
    });
    await doctorAmit.save();

    const receptionist = new HospitalStaff({
      hospitalId: apolloHospital._id!.toString(),
      name: 'Receptionist Alice',
      phone: '+91 9876543212',
      role: 'receptionist'
    });
    await receptionist.save();

    // Create Insurance Companies
    const maxHealthInsurance = new InsuranceCompany({
      name: 'Max Health Insurance',
      address: 'MG Road, Bangalore, Karnataka 560001',
      phone: '+91 80 4567 8900',
      email: 'support@maxhealthinsurance.com',
      registrationNumber: 'INS-MAX-HEALTH-001'
    });
    await maxHealthInsurance.save();

    const starHealthInsurance = new InsuranceCompany({
      name: 'Star Health Insurance',
      address: 'Brigade Road, Bangalore, Karnataka 560025',
      phone: '+91 80 1234 5678',
      email: 'care@starhealth.in',
      registrationNumber: 'INS-STAR-HEALTH-001'
    });
    await starHealthInsurance.save();

    // Create Insurance Staff
    const insuranceAgent = new InsuranceStaff({
      companyId: maxHealthInsurance._id!.toString(),
      name: 'Insurance Agent John',
      phone: '+91 9876543213',
      role: 'agent',
      employeeId: 'MAX-EMP-001'
    });
    await insuranceAgent.save();

    const claimOfficer = new InsuranceStaff({
      companyId: maxHealthInsurance._id!.toString(),
      name: 'Claims Officer Sarah',
      phone: '+91 9876543214',
      role: 'claim_officer',
      employeeId: 'MAX-EMP-002'
    });
    await claimOfficer.save();

    // Create Sample Patients
    const rajeshKumar = new Patient({
      blockchainId: 'BC-IN-2024-RAJ-001234567890',
      googleId: 'google_rajesh_123',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      dateOfBirth: '15-03-1985',
      bloodGroup: 'O+',
      address: '123 MG Road, Bangalore, Karnataka 560001',
      emergencyContact: '+91 98765 43211'
    });
    await rajeshKumar.save();

    const priyaSharma = new Patient({
      blockchainId: 'BC-IN-2024-PRI-001234567891',
      googleId: 'google_priya_456',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43215',
      dateOfBirth: '22-07-1992',
      bloodGroup: 'A+',
      address: '456 Brigade Road, Bangalore, Karnataka 560025',
      emergencyContact: '+91 98765 43216'
    });
    await priyaSharma.save();

    // Create Insurance Info
    const rajeshInsurance = new InsuranceInfo({
      patientId: rajeshKumar._id!.toString(),
      provider: 'Max Health Insurance',
      policyNumber: 'MHI-2024-RAJ-789456',
      coverageAmount: 1000000, // 10 lakhs
      activeClaims: 1,
      lastClaimDate: '2024-01-10',
      status: 'active'
    });
    await rajeshInsurance.save();

    const priyaInsurance = new InsuranceInfo({
      patientId: priyaSharma._id!.toString(),
      provider: 'Star Health Insurance',
      policyNumber: 'SHI-2024-PRI-789457',
      coverageAmount: 1500000, // 15 lakhs
      activeClaims: 0,
      lastClaimDate: '2023-11-15',
      status: 'active'
    });
    await priyaInsurance.save();

    // Create Sample Medical Records
    const medicalRecord1 = new MedicalRecord({
      patientId: rajeshKumar._id!.toString(),
      hospitalId: apolloHospital._id!.toString(),
      doctorName: 'Dr. Priya Sharma',
      treatmentType: 'Regular Checkup',
      diagnosis: 'Routine health assessment - All vitals normal',
      medications: ['Vitamin D3 1000 IU daily', 'Omega-3 500mg twice daily'],
      date: '2024-01-15',
      verified: true
    });
    await medicalRecord1.save();

    const medicalRecord2 = new MedicalRecord({
      patientId: rajeshKumar._id!.toString(),
      hospitalId: fortisHospital._id!.toString(),
      doctorName: 'Dr. Amit Patel',
      treatmentType: 'Blood Test',
      diagnosis: 'Complete blood count - Normal ranges',
      medications: [],
      date: '2023-11-22',
      verified: true
    });
    await medicalRecord2.save();

    const medicalRecord3 = new MedicalRecord({
      patientId: priyaSharma._id!.toString(),
      hospitalId: apolloHospital._id!.toString(),
      doctorName: 'Dr. Priya Sharma',
      treatmentType: 'Vaccination',
      diagnosis: 'COVID-19 booster dose administered',
      medications: [],
      date: '2023-09-08',
      verified: true
    });
    await medicalRecord3.save();

    console.log('Database seeded successfully!');
    console.log('\nTest Data Created:');
    console.log('===================');
    console.log('\nPatients:');
    console.log('- Rajesh Kumar (BC-IN-2024-RAJ-001234567890)');
    console.log('- Priya Sharma (BC-IN-2024-PRI-001234567891)');
    console.log('\nHospital Staff (for OTP login):');
    console.log('- Dr. Priya Sharma: +91 9876543210');
    console.log('- Dr. Amit Patel: +91 9876543211');
    console.log('- Receptionist Alice: +91 9876543212');
    console.log('\nInsurance Staff (for OTP login):');
    console.log('- Insurance Agent John: +91 9876543213');
    console.log('- Claims Officer Sarah: +91 9876543214');
    console.log('\nHospitals:');
    console.log('- Apollo Hospital');
    console.log('- Fortis Hospital');
    console.log('\nInsurance Companies:');
    console.log('- Max Health Insurance');
    console.log('- Star Health Insurance');

  } catch (error) {
    console.error('Database seeding failed:', error);
  }
};
