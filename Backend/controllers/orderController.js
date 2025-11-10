import { now } from "mongoose";
import orderModel from "../models/orderMOdel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = res.body;
    const orderData = {
      userId,
      items,
      amount,
      PaymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cardData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({success:false,message : error.message});
  }
};

const placeOrderStripe = async (req, res) => {};

const placeOrderRazorpay = async (req, res) => {};

const allOrders = async (req, res) => {};

const userOrders = async (req, res) => {};

const updateStatus = async (req, res) => {};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  updateStatus,
  userOrders,
};
