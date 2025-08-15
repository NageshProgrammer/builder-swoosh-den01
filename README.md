# MediChain - Blockchain-Based Patient Health Record System

A comprehensive MERN stack + Blockchain healthcare platform that provides secure, immutable, and accessible medical records for patients, hospitals, and insurance companies.

## 🏥 System Overview

MediChain revolutionizes healthcare data management by leveraging blockchain technology to ensure data integrity, security, and patient control over their medical information.

### Core Features

- **🔐 Blockchain Security**: Immutable patient records stored on secure blockchain infrastructure
- **👤 Patient Control**: Patients control who accesses their data via OTP verification
- **🏥 Hospital Integration**: Secure patient search and record management for healthcare providers
- **🛡️ Insurance Processing**: Streamlined claims and policy management for insurance companies
- **📱 Multi-factor Authentication**: Google OAuth for patients, mobile OTP for staff
- **📊 Complete Audit Trail**: Every action is logged for transparency and compliance

## 🏗️ Architecture

### Frontend (React + TypeScript + Tailwind CSS)
- **Patient Portal**: Google Sign-In, medical history, insurance details
- **Hospital Portal**: Patient search, record updates with OTP verification
- **Insurance Portal**: Claims processing, policy management
- **Modern UI**: Healthcare-themed design with responsive layouts

### Backend (Node.js + Express + MongoDB)
- **Authentication**: JWT tokens, OTP verification system
- **Database**: MongoDB with comprehensive schemas
- **Blockchain Simulation**: SHA-256 hashing for record immutability
- **Security**: Role-based access control, audit logging

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm
- MongoDB Atlas account

### Installation & Setup

1. **Clone and Install**
   ```bash
   git clone <repository>
   cd medichain
   pnpm install
   ```

2. **Environment Configuration**
   ```bash
   # Set your MongoDB connection string
   export MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/medichain"
   
   # Set JWT secret for authentication
   export JWT_SECRET="your-super-secure-secret-key"
   ```

3. **Start Development Server**
   ```bash
   pnpm dev
   ```

4. **Seed Test Data (Optional)**
   ```bash
   # Visit http://localhost:8080/api/seed-database to populate test data
   curl -X POST http://localhost:8080/api/seed-database
   ```

## 👥 User Roles & Access

### 🏥 Patients
- **Login**: Google OAuth authentication
- **Features**: 
  - View medical history and records
  - Manage personal information
  - Control data access via OTP verification
  - View insurance coverage details
  - Access unique blockchain Patient ID

### 🏥 Hospital Staff
- **Login**: Mobile OTP authentication
- **Roles**: Doctor, Nurse, Receptionist, Admin
- **Features**:
  - Search patients by blockchain ID
  - View/update medical records (with patient consent)
  - Add new treatments and diagnoses
  - Access requires patient OTP verification

### 🛡️ Insurance Staff
- **Login**: Mobile OTP authentication  
- **Roles**: Agent, Claims Officer, Manager, Admin
- **Features**:
  - Search patients by blockchain ID
  - Process insurance claims
  - Update policy information (with patient consent)
  - Claims management and approval workflow

## 🔐 Security Features

### Blockchain Integration
- **Unique Patient IDs**: Global blockchain-based identifiers
- **Record Hashing**: SHA-256 hashing for data integrity
- **Immutable History**: Complete audit trail of all changes
- **Verification System**: Cryptographic verification of records

### Authentication & Authorization
- **Multi-factor Authentication**: OTP verification for sensitive operations
- **Role-based Access Control**: Granular permissions by user type
- **JWT Tokens**: Secure session management
- **Audit Logging**: Complete activity tracking

### Privacy & Consent
- **Patient Consent**: OTP verification required before data access
- **Data Minimization**: Only necessary data exposed to each role
- **Secure Communication**: All API endpoints protected
- **GDPR Compliance**: Patient data control and privacy rights

## 📊 Test Data

After seeding the database, you can test with:

### Sample Patients
- **Rajesh Kumar**: `BC-IN-2024-RAJ-001234567890`
- **Priya Sharma**: `BC-IN-2024-PRI-001234567891`

### Hospital Staff (OTP Login)
- **Dr. Priya Sharma**: `+91 9876543210`
- **Dr. Amit Patel**: `+91 9876543211`
- **Receptionist Alice**: `+91 9876543212`

### Insurance Staff (OTP Login)
- **Insurance Agent John**: `+91 9876543213`
- **Claims Officer Sarah**: `+91 9876543214`

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/google-login` - Patient Google OAuth login
- `POST /api/auth/staff-login` - Hospital/Insurance staff OTP login
- `POST /api/auth/send-otp` - Send OTP for verification
- `POST /api/auth/verify-otp` - Verify OTP and get access token

### Patient Management
- `POST /api/patients/search` - Search patient by blockchain ID
- `GET /api/patients/:id/medical-records` - Get patient medical history
- `GET /api/patients/:id/insurance` - Get patient insurance information
- `GET /api/patients/:id/audit-logs` - Get patient activity logs

### Medical Records
- `POST /api/medical-records` - Add new medical record
- `PUT /api/medical-records/:id` - Update medical record
- `POST /api/medical-records/:id/verify` - Verify record with patient consent

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router 6** for navigation
- **Radix UI** components
- **Lucide React** icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Blockchain simulation** with SHA-256

### DevOps & Tools
- **Vite** for fast development
- **pnpm** for package management
- **TypeScript** for type safety
- **ESLint & Prettier** for code quality

## 🔮 Future Enhancements

- **Real Blockchain Integration**: Ethereum/Hyperledger implementation
- **IPFS Storage**: Decentralized document storage
- **Smart Contracts**: Automated consent and payments
- **Mobile Apps**: React Native implementation
- **AI Integration**: Medical insights and recommendations
- **International Standards**: HL7 FHIR compliance

## 📄 License

This project is part of a healthcare innovation initiative. Please ensure compliance with healthcare regulations (HIPAA, GDPR) when deploying in production.

## 👨‍💻 Development

Built with ❤️ using modern web technologies for secure healthcare data management.

---

**Note**: This system includes blockchain simulation for demonstration. For production use, integrate with actual blockchain networks and ensure compliance with healthcare regulations.
