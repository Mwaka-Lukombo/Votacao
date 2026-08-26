import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function dbConnect() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB);

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        throw error;
    }
}

export default dbConnect;