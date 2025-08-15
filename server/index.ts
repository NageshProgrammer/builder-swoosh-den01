import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/database";
import { seedDatabase } from "./utils/seedData";
import { handleDemo } from "./routes/demo";
import {
  handleGoogleLogin,
  handleStaffLogin,
  handleSendOTP,
  handleVerifyOTP
} from "./routes/auth";
import {
  handlePatientSearch,
  handleGetMedicalRecords,
  handleGetInsuranceInfo,
  handleAddMedicalRecord,
  handleUpdateMedicalRecord,
  handleGetAuditLogs,
  handleGetBlockchainRecords,
  handleVerifyRecord
} from "./routes/patients";
import { authenticateToken, requireStaff, requirePatient } from "./middleware/auth";

export function createServer() {
  const app = express();

  // Initialize database connection
  connectDB().then(() => {
    // Seed database with test data in development
    if (process.env.NODE_ENV !== 'production') {
      // Uncomment the line below to seed the database on startup
      // seedDatabase();
    }
  });

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Authentication routes
  app.post("/api/auth/google-login", handleGoogleLogin);
  app.post("/api/auth/staff-login", handleStaffLogin);
  app.post("/api/auth/send-otp", handleSendOTP);
  app.post("/api/auth/verify-otp", handleVerifyOTP);

  // Patient management routes
  app.post("/api/patients/search", authenticateToken, requireStaff, handlePatientSearch);
  app.get("/api/patients/:patientId/medical-records", authenticateToken, handleGetMedicalRecords);
  app.get("/api/patients/:patientId/insurance", authenticateToken, handleGetInsuranceInfo);
  app.get("/api/patients/:patientId/audit-logs", authenticateToken, handleGetAuditLogs);
  app.get("/api/patients/:patientId/blockchain-records", authenticateToken, handleGetBlockchainRecords);

  // Medical record management (Hospital staff only)
  app.post("/api/medical-records", authenticateToken, requireStaff, handleAddMedicalRecord);
  app.put("/api/medical-records/:recordId", authenticateToken, requireStaff, handleUpdateMedicalRecord);
  app.post("/api/medical-records/:recordId/verify", authenticateToken, handleVerifyRecord);

  // Seed database endpoint (development only)
  if (process.env.NODE_ENV !== 'production') {
    app.post("/api/seed-database", async (_req, res) => {
      try {
        await seedDatabase();
        res.json({ success: true, message: 'Database seeded successfully' });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Database seeding failed', error });
      }
    });
  }

  return app;
}
