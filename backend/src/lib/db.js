import mongoose from "mongoose";

// Cache the connection across serverless function invocations.
// Without this, every request can try to open a brand new connection,
// which on Vercel can hang or exhaust MongoDB Atlas connection limits.
let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  // Reuse existing connection if already established
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // fail fast instead of hanging forever
      socketTimeoutMS: 45000,
    };

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log(`MongoDB connected: ${mongooseInstance.connection.host}`);
        return mongooseInstance;
      })
      .catch((error) => {
        cached.promise = null; // reset so next request can retry
        console.log("MongoDB connection error:", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};