// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";

// ✅ Get backend URL from environment variables (Vite)
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$';
const App = () => {
   
    const [token, setToken] = useState(localStorage.getItem("token") || "");
  
    useEffect(() => {
      localStorage.setItem("token", token);
    }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr className="border-gray-300" />
          <div className="flex w-full">
            <Sidebar />
            <div className="flex-1 mx-auto my-8 text-gray-600 text-base px-6">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
