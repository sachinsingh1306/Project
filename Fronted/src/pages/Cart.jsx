import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const id in cartItems) {
      for (const size in cartItems[id]) {
        if (cartItems[id][size] > 0) {
          tempData.push({ _id: id, size, quantity: cartItems[id][size] });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      {cartData.length === 0 ? (
        <p className="text-gray-500 mt-10 text-center">Your cart is empty 🛒</p>
      ) : (
        cartData.map((item, i) => {
          const product = products.find((p) => p._id === item._id);
          if (!product) return null;

          return (
            <div key={i} className="py-4 border-t border-b grid grid-cols-[4fr_1fr_1fr] items-center gap-4 text-gray-700">
              <div className="flex items-center gap-4">
                <img className="w-16 sm:w-20" src={product.image[0]} alt={product.name} />
                <div>
                  <p className="text-sm sm:text-lg font-medium">{product.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>{currency}{product.price}</p>
                    <p className="border px-2 py-1 text-sm rounded bg-gray-50">{item.size}</p>
                  </div>
                </div>
              </div>
              <input
                type="number"
                className="border w-12 sm:w-20 text-center"
                min={1}
                value={item.quantity}
                onChange={(e) => updateQuantity(item._id, item.size, Number(e.target.value))}
              />
              <img
                className="w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="Remove"
                onClick={() => updateQuantity(item._id, item.size, 0)}
              />
            </div>
          );
        })
      )}

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="text-right">
            <button
              className="bg-black text-white text-sm my-8 px-8 py-3 rounded hover:bg-gray-800"
              onClick={() => navigate("/place-order")}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
