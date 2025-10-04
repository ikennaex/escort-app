import React from "react";
import { logo } from "../../../imports";
import { baseUrl } from "../../baseUrl";
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useContext } from "react";
import { AdminContext } from "../../Contexts/AdminContext";
import Loader from "../../Components/Loaders/Loader";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { admin, setAdmin, setAdminAccessToken } = useContext(AdminContext);
  const { api } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post(`${baseUrl}admin/login`, formData);
      alert(response.data.message);
      setAdmin(response.data.admin);
      setAdminAccessToken(response.data.adminAccessToken);
      setFormData({ email: "", password: "" });
      navigate("/admin");
    } catch (err) {
      setLoading(false);
      alert(err.response.data.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (admin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md bg-pink-50 p-8 rounded-xl shadow-md">
        <img className="h-20 mx-auto" src={logo} alt="" />
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              onChange={handleChange}
              name="email"
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              name="password"
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
          disabled={loading}
            type="submit"
            className="w-full bg-customPink text-white py-2 px-4 rounded-lg focus:outline-none font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <div className="mx-auto flex justify-center"><Loader/></div> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
