import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        userType: string;
        blockchainId?: string;
        phone?: string;
      };
    }
  }
}

export interface JWTPayload {
  userId: string;
  userType: string;
  blockchainId?: string;
  phone?: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    req.user = decoded as JWTPayload;
    next();
  });
};

export const requirePatient = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.userType !== 'patient') {
    return res.status(403).json({
      success: false,
      message: 'Patient access required'
    });
  }
  next();
};

export const requireHospitalStaff = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.userType !== 'hospital_staff') {
    return res.status(403).json({
      success: false,
      message: 'Hospital staff access required'
    });
  }
  next();
};

export const requireInsuranceStaff = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.userType !== 'insurance_staff') {
    return res.status(403).json({
      success: false,
      message: 'Insurance staff access required'
    });
  }
  next();
};

export const requireStaff = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.userType.includes('staff')) {
    return res.status(403).json({
      success: false,
      message: 'Staff access required'
    });
  }
  next();
};
