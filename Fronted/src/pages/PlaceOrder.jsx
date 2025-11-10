import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();

  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === productId)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[productId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
            toast.success("Order placed successfully!");
          } else {
            toast.error(response.data.message);
          }
          break;

        default:
          toast.error("Invalid payment method selected.");
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to place order");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* LEFT: DELIVERY INFO */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First Name"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            placeholder="Last Name"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          placeholder="Email Address"
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="tel"
          placeholder="Phone Number"
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />

        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="Street Address"
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          type="text"
          placeholder="Apartment, suite, etc. (optional)"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="City"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="State"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="text"
            placeholder="Zip Code"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            placeholder="Country"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
      </div>

      {/* RIGHT: CART SUMMARY + PAYMENT METHOD */}
      <div className="mt-8 sm:mt-0 w-full sm:max-w-[420px] flex flex-col gap-10">
        <CartTotal />

        <div>
          <div className="mt-12">
            <Title text1="PAYMENT" text2="METHOD" />
          </div>

          <div className="flex flex-col lg:flex-row gap-3 mt-5">
            {/* Stripe */}
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 border p-2 px-3 rounded-lg cursor-pointer ${
                method === "stripe" ? "border-black" : "border-gray-300"
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-black" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
            </div>

            {/* Razorpay */}
            <div
              onClick={() => setMethod("razorpay")}
              className={`flex items-center gap-3 border p-2 px-3 rounded-lg cursor-pointer ${
                method === "razorpay" ? "border-black" : "border-gray-300"
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-black" : ""
                }`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.razorpay_logo}
                alt="Razorpay"
              />
            </div>

            {/* COD */}
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border p-2 px-3 rounded-lg cursor-pointer ${
                method === "cod" ? "border-black" : "border-gray-300"
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-black" : ""
                }`}
              ></p>
              <p className="text-gray-700 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-black text-white text-sm my-8 px-8 py-3 rounded hover:bg-gray-800"
        >
          PLACE ORDER
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
