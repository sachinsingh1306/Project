// src/components/Login.jsx
import React, { useState } from "react";
import axios from "axios"; // ✅ You need this import
import { backendUrl } from "../App"; // ✅ Make sure backendUrl is exported from App.jsx

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });
      console.log("Login Response:", response.data);

      // ✅ If the backend returns a token
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        alert(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials or try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Admin Panel
        </h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-1">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg w-full transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
