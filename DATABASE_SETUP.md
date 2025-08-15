# Database Setup Instructions

## Current Status
✅ **MediChain is running in MOCK DATA mode**  
✅ **Frontend fully functional with sample data**  
✅ **All three portals (Patient, Hospital, Insurance) working**

## To Connect Real MongoDB Database

### Option 1: Set Environment Variable (Recommended)
```bash
# Replace YOUR_ACTUAL_PASSWORD with your MongoDB Atlas password
export MONGODB_URI="mongodb+srv://NageshYalparatte:YOUR_ACTUAL_PASSWORD@cluster01.sgstde0.mongodb.net/medichain?retryWrites=true&w=majority&appName=Cluster01"
```

### Option 2: Use DevServerControl Tool
In the chat, ask to set the MongoDB URI:
```
Please set the MONGODB_URI environment variable with my actual password: [your_password]
```

### Option 3: Update Database Config File
Edit `server/config/database.ts` and replace `YOUR_PASSWORD` with your actual MongoDB Atlas password.

## Test Data Available

### Mock Patients (no database required)
- **Rajesh Kumar**: `BC-IN-2024-RAJ-001234567890`
- **Priya Sharma**: `BC-IN-2024-PRI-001234567891`

### Mock Staff Login Numbers
**Hospital Staff:**
- Dr. Priya Sharma: `+91 9876543210`
- Dr. Amit Patel: `+91 9876543211`
- Receptionist Alice: `+91 9876543212`

**Insurance Staff:**
- Insurance Agent John: `+91 9876543213`
- Claims Officer Sarah: `+91 9876543214`

### OTP Testing
In mock mode, any 6-digit number works as OTP (e.g., `123456`)

## Database Seeding (After Connection)
Once connected to MongoDB, you can populate with test data:
```bash
curl -X POST http://localhost:8080/api/seed-database
```

## Features Working in Mock Mode
✅ Patient Google login simulation  
✅ Hospital staff OTP login  
✅ Insurance staff OTP login  
✅ Patient search by blockchain ID  
✅ Medical records viewing  
✅ Insurance information access  
✅ Complete UI/UX workflows  

## Security Note
The app gracefully handles database connection failures and provides full functionality with mock data for development and testing purposes.
