import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import { productRouter } from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";

dotenv.config(); // ✅ Load env first

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => {
  console.log(`✅ Server started on PORT ${PORT}`);
});
