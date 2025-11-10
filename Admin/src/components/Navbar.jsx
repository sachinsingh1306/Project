import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between bg-white shadow-sm">
      <img
        className="w-[max(10%,80px)]"
        src={assets.logo}
        alt="Logo"
      />

      <button
        onClick={() => setToken("")}
        className="bg-gray-700 hover:bg-gray-800 text-white font-medium px-4 py-2 rounded-lg transition-all"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
