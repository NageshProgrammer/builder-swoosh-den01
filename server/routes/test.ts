import { RequestHandler } from "express";
import mongoose from "mongoose";

export const handleDatabaseTest: RequestHandler = async (req, res) => {
  try {
    const connectionState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    const dbStatus = {
      state: states[connectionState as keyof typeof states] || 'unknown',
      stateCode: connectionState,
      connected: connectionState === 1,
      host: mongoose.connection.host || 'none',
      name: mongoose.connection.name || 'none',
      collections: connectionState === 1 ? Object.keys(mongoose.connection.collections) : []
    };

    res.json({
      success: true,
      message: 'Database connection test',
      database: dbStatus,
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
        mongoUri: process.env.MONGODB_URI ? 'SET' : 'NOT SET'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
