import "dotenv/config";
import mongoose from "mongoose";

const MONGODB = process.env.MONGO_URL || "mongodb://localhost:27017/recipe137";

const connectDB = async () => {
	console.log(MONGODB);
	try {
		const conn = await mongoose.connect(MONGODB);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

export default connectDB;
