import React from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";

const PlaceOrder = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left: Form */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input type="text" placeholder="First Name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input type="text" placeholder="Last Name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <input type="email" placeholder="Email Address" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        <input type="tel" placeholder="Phone Number" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        <input type="text" placeholder="Street Address" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        <input type="text" placeholder="Apartment, suite, etc. (optional)" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        <div className="flex gap-3">
          <input type="text" placeholder="City" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input type="text" placeholder="State" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <div className="flex gap-3">
          <input type="text" placeholder="Zip Code" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input type="text" placeholder="Country" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
      </div>

      {/* Right: Summary */}
      <div className="mt-8 sm:mt-0 w-full sm:max-w-[400px]">
        <CartTotal />
        <button className="bg-black text-white text-sm my-8 px-8 py-3 rounded hover:bg-gray-800">
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
