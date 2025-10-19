import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router";
import Loader from "../Loaders/Loader";

const ManualCheckout = ({ amount, plan }) => {
  // const [amount, setAmount] = useState("₦150,000");
  const [receipt, setReceipt] = useState(null);
  const [preview, setPreview] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [loading, setLoading] = useState(false);
  const { api } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setReceipt(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!receipt || !amount || !plan) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("receipt", receipt);
    formData.append("amount", amount);
    formData.append("plan", plan);
    formData.append("paymentMethod", paymentMethod);

    try {
      setLoading(true);
      const response = await api.post("/escorts/receipt", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(
        "Payment details submitted successfully you'll be notified once payment is confirmed!"
      );
      navigate(`/escortdashboard/${user._id}`);
    } catch (err) {
      setLoading(false);
      console.error("Error submitting payment details:", err);
      alert(err.response?.data?.message || "Error submitting payment details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center py-8">
      <div className="w-full bg-white shadow-md rounded-2xl p-6 md:p-8 border border-pink-200">
        <h1 className="text-2xl  font-bold text-center text-customPink mb-3">
          Manual Checkout
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Complete your payment for{" "}
          <span className="font-semibold text-customPink">Oscro Villa</span>
        </p>

        {/* Bank Information */}
        <div className="bg-pink-50 rounded-xl p-6 mb-8 border border-pink-200 shadow-sm">
          <p className="text-gray-800 text-lg mb-2">
            <span className="font-semibold">Amount to Pay:</span>{" "}
            <span className="text-customPink">{amount}</span>
          </p>
          <div className="space-y-1 text-gray-700">
            <p>
              <span className="font-semibold">Bank Name:</span> UBA Bank
            </p>
            <p>
              <span className="font-semibold">Account Name:</span> SNELLISH LTD
            </p>
            <p>
              <span className="font-semibold">Account Number:</span> 1028560640
            </p>
          </div>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-customPink mb-3">
              Upload Payment Receipt
            </label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customPink focus:border-customPink transition"
              required
            />
          </div>

          {preview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-3">Receipt Preview:</p>
              <div className="rounded-lg overflow-hidden border border-pink-200 bg-pink-50 p-2">
                <img
                  src={preview}
                  alt="Receipt Preview"
                  className="rounded-md w-full max-h-80 object-contain bg-white"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-customPink hover:bg-pink-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 mx-auto flex justify-center items-center"
          >
            {loading ? <Loader /> : "Submit Payment Details"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManualCheckout;
