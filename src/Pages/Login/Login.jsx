import React from "react";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className="mx-6 p-6 bg-pink-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">OS Villa</h1>
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Login with Email, Phone Number, or Username
      </h2>

      <form action="" className="space-y-4">
        <div>
          <label
            htmlFor="identifier"
            className="block text-sm font-medium text-gray-600"
          >
            Email, Phone Number, or Username
          </label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            placeholder="Enter your email, phone, or username"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            class="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-customPink text-white font-semibold rounded-lg hover:border-customPink transition-colors"
        >
          Login
        </button>

        <p>New to Oscroh Villa? <Link to="/register"><span className="text-customPink">Register</span></Link></p>
      </form>
    </div>
  );
};

export default Login;
