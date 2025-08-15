import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://NageshYalparatte:YOUR_PASSWORD@cluster01.sgstde0.mongodb.net/medichain?retryWrites=true&w=majority&appName=Cluster01';

export const connectDB = async () => {
  try {
    // Check if MongoDB URI has a valid password
    if (MONGODB_URI.includes('YOUR_PASSWORD') || MONGODB_URI.includes('<db_password>')) {
      console.warn('⚠️  MongoDB URI contains placeholder password. Skipping database connection.');
      console.warn('   Please set MONGODB_URI environment variable with your actual password.');
      console.warn('   Frontend will still work with mock data.');
      return;
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.warn('⚠️  Continuing without database connection. Frontend will work with mock data.');
    // Don't exit process in development, allow frontend to work with mock data
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected successfully');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
  }
};
