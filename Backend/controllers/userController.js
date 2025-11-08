import userModel from '../models/userModel.js';
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Function to create JWT token
const createToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || "defaultsecret",
    { expiresIn: "7d" }
  );
};

// ✅ User Login (placeholder for now)
const loginUser = async (req, res) => {
  res.json({ success: true, message: "Login route working" });
};

// ✅ User Registration
const registerUser = async (req, res) => {
  try {
    // 1️⃣ Get user details from request body
    const { name, email, password } = req.body;

    // 2️⃣ Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    // 3️⃣ Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please Enter a Valid Email" });
    }

    // 4️⃣ Validate password strength
    if (password.length < 8) {
      return res.json({ success: false, message: "Please Enter a Strong Password" });
    }

    // 5️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 6️⃣ Create and save user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // 7️⃣ Create JWT token
    const token = createToken(user._id);

    console.log("✅ Token generated:", token);

    // 8️⃣ Respond with success
    res.json({
      success: true,
      message: "User Registered Successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Admin Login (placeholder for now)
const adminLogin = async (req, res) => {
  res.json({ success: true, message: "Admin route working" });
};

// ✅ Export named functions
export { loginUser, registerUser, adminLogin };
