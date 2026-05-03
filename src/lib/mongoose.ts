import mongoose, { Mongoose } from 'mongoose';

interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Create a cached connection object
const cached: MongooseConn = {
  conn: null,
  promise: null,
};

async function connectDB(): Promise<Mongoose> {
  // If already connected, return cached connection
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  // If connection promise exists, wait for it
  if (cached.promise) {
    const conn = await cached.promise;
    cached.conn = conn;
    return conn;
  }

  // Create new connection
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  cached.promise = mongoose.connect(mongoUri, {
    bufferCommands: false,
    maxPoolSize: 10,
    minPoolSize: 5,
  });

  try {
    const conn = await cached.promise;
    cached.conn = conn;
    console.log('✅ Connected to MongoDB');
    return conn;
  } catch (error) {
    cached.promise = null;
    console.error('❌ Failed to connect to MongoDB:', error);
    throw error;
  }
}

export default connectDB;