import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected successfully");
  } catch (error: any) {
    console.error(`Error connecting to MongoDB Database: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
