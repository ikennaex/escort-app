import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { UserContext } from "../../Contexts/UserContext";
import Loader from "../../Components/Loaders/Loader";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { api, user, setUser, setAccessToken } = useContext(UserContext);
  const [formData, setFormData] = useState({
    identifier: "",
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
      const response = await api.post("auth/signin", formData);
      setUser(response.data.user)
      console.log(response)
      setAccessToken(response.data.accessToken);
      toast.success(response.data.message, {
        autoClose: 3000,
        position: "top-right",
      });
      setFormData({ identifier: "", password: "" });
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        autoClose: 3000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {!user && (
        <div className="flex items-center justify-center min-h-screen bg-customLightGray">
          <div className="mx-6 p-6 bg-pink-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Oscro Villa</h1>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Login with Email, Phone Number, or Username
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="identifier"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email, Phone Number, or Username
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="identifier"
                  name="identifier"
                  value={formData.identifier}
                  placeholder="Enter your email, phone, or username"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  class="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  placeholder="Enter your password"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full py-2 bg-customPink text-white font-semibold rounded-lg hover:border-customPink transition-colors disabled:bg-customPink/20 mx-auto flex items-center justify-center"
                htmlFor="password"
              >
                {loading ? <Loader /> : "Login"}
              </button>

              <p>
                New to OscroVilla?{" "}
                <Link to="/register-card">
                  <span className="text-customPink">Register</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
