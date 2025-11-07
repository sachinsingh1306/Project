import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import multer from "multer";
import Razorpay from "razorpay";
import Stripe from "stripe";
import validator from "validator";
import cloudinary from "cloudinary";
import bcrypt from "bcrypt";
import connectDB from "./config/mongodb.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

// --------------------- Middlewares ---------------------
app.use(express.json());
app.use(cors());

// --------------------- API Endpoints ---------------------
app.get("/", (req, res) => {
  res.send("API WORKING ");
});

// --------------------- Server Start ---------------------
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
