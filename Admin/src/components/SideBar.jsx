// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-60 bg-white shadow-md min-h-screen p-6">
      <ul className="space-y-4 text-gray-700">
        <li><Link to="/add" className="hover:text-blue-600">Add Product</Link></li>
        <li><Link to="/list" className="hover:text-blue-600">Product List</Link></li>
        <li><Link to="/orders" className="hover:text-blue-600">Orders</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
