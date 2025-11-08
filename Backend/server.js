import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// --------------------- Middlewares ---------------------
app.use(express.json());
app.use(cors());

// --------------------- API Endpoints ---------------------
app.use('/api/user', userRouter);

// --------------------- Server Start ---------------------
app.listen(PORT, () => {
  console.log(`✅ Server started on PORT ${PORT}`);
});
