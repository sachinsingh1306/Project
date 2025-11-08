import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);

// ✅ Correct way to define or reuse model
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

// ✅ Export the MODEL, not the SCHEMA
export default userModel;
