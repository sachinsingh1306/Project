import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
  try {
    // ✅ FIXED: Correctly use req.body, not res.body
    const { items, amount, address, paymentMethod } = req.body;
    const userId = req.userId; // ✅ Comes from auth middleware

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    if (!items || !amount || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Missing order details" });
    }

    const orderData = {
      userId,
      items,
      amount,
      paymentMethod: paymentMethod || "COD",
      payment: false,
      address,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // ✅ Clear user's cart after order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Error in placeOrder:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const placeOrderStripe = async (req, res) => {};
const placeOrderRazorpay = async (req, res) => {};
const allOrders = async (req, res) => {};
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const order = await orderModel.find({ userId });
    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const updateStatus = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  updateStatus,
  userOrders,
};
