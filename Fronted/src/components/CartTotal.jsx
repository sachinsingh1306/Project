import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const { getCartAmount, delivery_fee, currency } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal + delivery_fee;

  return (
    <div className="p-5 border rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>{currency}{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Delivery Fee:</span>
        <span>{currency}{delivery_fee.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-lg border-t pt-2">
        <span>Total:</span>
        <span>{currency}{total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartTotal;
