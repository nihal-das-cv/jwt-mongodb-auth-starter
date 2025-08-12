import mongoose, { Mongoose, type ConnectOptions } from "mongoose";
import dotenv from "dotenv";

// Load Environment Variables
dotenv.config();

// Establishes A Connection To The MongoDB Database
const connectDB: () => Promise<void> = async () => {
  try {
    // Get Connection String From .env
    const uri: string | undefined = process.env.MONGO_URI;

    if (!uri) throw new Error("MONGO_URI is not defined");

    // Connect To MongoDB
    const connection: Mongoose = await mongoose.connect(
      uri,
      {} as ConnectOptions
    );

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    // Log Specific Error Message
    if (error instanceof Error) {
      console.error(`MONGO_URI Error: ${error.message}`);
    } else {
      console.error("Unknown error occurred while connecting to MongoDB");
    }

    // Exit Process If Connection Fails
    process.exit(1);
  }
};

export default connectDB;
