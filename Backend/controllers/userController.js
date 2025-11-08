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

// ✅ User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // 2️⃣ Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // 3️⃣ Create token
    const token = createToken(user._id);

    // 4️⃣ Respond with token
    res.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ User Registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing user
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please Enter a Valid Email" });
    }

    // Validate password
    if (password.length < 8) {
      return res.json({ success: false, message: "Please Enter a Strong Password" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // Generate token
    const token = createToken(user._id);

    // Respond
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

// ✅ Admin Login (temporary)
const adminLogin = async (req, res) => {
  res.json({ success: true, message: "Admin route working" });
};

// ✅ Export properly
export { loginUser, registerUser, adminLogin };
