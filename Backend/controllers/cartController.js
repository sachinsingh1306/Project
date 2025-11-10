import userModel from "../models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update item quantity in cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart updated", cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get the user's cart
const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;

    // ✅ Check if token/middleware actually added userId
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const user = await userModel.findById(userId);

    // ✅ Handle null user properly
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // ✅ Always respond safely
    res.json({
      success: true,
      cartData: user.cartData || {},
    });
  } catch (error) {
    console.error("Error in getUserCart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addToCart, updateCart, getUserCart };
