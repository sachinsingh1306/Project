import React, { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // You can handle form submission logic here
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-2xl"
    >
      {/* Heading */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border w-10 border-gray-400" />
      </div>

      {/* Input Fields */}
      {currentState === "Login" ? null : (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800 rounded"
          placeholder="Name"
          required
        />
      )}

      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800 rounded"
        placeholder="Email"
        required
      />

      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800 rounded"
        placeholder="Password"
        required
      />

      {/* Links */}
      <div className="w-full flex justify-between text-sm -mt-1">
        <p className="cursor-pointer text-gray-600 hover:text-black">
          Forgot Password?
        </p>

        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer text-gray-600 hover:text-black"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer text-gray-600 hover:text-black"
          >
            Login Here
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-black text-white text-lg mt-2 px-6 py-2 rounded hover:bg-gray-800 transition-all"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
