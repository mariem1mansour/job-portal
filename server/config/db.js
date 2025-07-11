import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`);
//  await mongoose.connect(process.env.MONGODB_URI + "/job-portal");
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("Error connecting to MongoDB ❌:", error.message);
  }
};

export default connectDB;