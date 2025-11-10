import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided Login Again" });
    }

    const token_decode = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultsecret"
    );

    if (token_decode.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied: Not an admin" });
    }

    req.admin = token_decode;
    next();
  } catch (error) {
    console.log("Admin auth error:", error.message);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default adminAuth;
