import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Database Connected");
  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
    process.exit(1); // optional: stop server if DB fails
  }
};

export default connectDb;
