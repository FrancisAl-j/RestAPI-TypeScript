import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGODB) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Connected to database");
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Failed to connect to database: ${error.message}`);
    }
  }
};

export default connectDB;
