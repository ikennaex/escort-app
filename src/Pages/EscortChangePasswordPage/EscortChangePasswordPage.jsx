import React, { useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { baseUrl } from "../../baseUrl";
import { useNavigate } from "react-router";
import Loader from "../../Components/Loaders/Loader";
import EscortVerifyPasswordChange from "./EscortVerifyPasswordChange";

const EscortChangePasswordPage = () => {
  const { user, api } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showVerify, setShowVerify] = useState(false);

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      setShowVerify(true);
    //   navigate(`/escortdashboard/${user._id}`);
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50">
      {showVerify && (
        <EscortVerifyPasswordChange
          password={formData.confirmPassword}
          onClose={() => setShowVerify(!showVerify)}
        />
      )}
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Change Password
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Enter New Password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-pink-500 text-white font-semibold py-2 rounded-lg hover:bg-pink-600 transition disabled:bg-customPink/20 mx-auto flex justify-center items-center"
          >
            {loading ? <Loader /> : "Save Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EscortChangePasswordPage;
