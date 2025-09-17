import React, { useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { baseUrl } from "../../baseUrl";
import { useNavigate } from "react-router";
import Loader from "../../Components/Loaders/Loader";
import { ToastContainer, toast } from 'react-toastify';

const EscortBankDetailsPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { api } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(bankDetails);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.patch(
        `${baseUrl}escorts/bankdetails`,
        bankDetails
      );
      console.log(response);
      toast.success(response.data.message, {
        autoClose: 3000,
        position: "top-right",
      });
      console.log(bankDetails);
      navigate(`/escortdashboard/${user._id}`);
    } catch (err) {
      console.log(err);
      toast.error(err, {
        autoClose: 3000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Bank Details
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Account Number
            </label>
            <input
              type="number"
              name="accountNumber"
              placeholder="Enter account number"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Bank Name
            </label>
            <input
              type="text"
              name='bankName'
              placeholder="Enter bank name"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name on Account
            </label>
            <input
              type="text"
              name='accountName'
              placeholder="Enter account name"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <button
          disabled ={loading}
            type="submit"
            className="w-full bg-pink-500 text-white font-semibold py-2 rounded-lg hover:bg-pink-600 transition disabled:bg-customPink/20 mx-auto flex justify-center items-center"
          >
            {loading? <Loader/> : "Save Bank Details" }
          </button>
        </form>
      </div>
    </div>
  );
};

export default EscortBankDetailsPage;
