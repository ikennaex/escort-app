import React, { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

const EscortBankDetailsPage = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Bank Details
        </h2>

        <form className="flex flex-col gap-4">
          {/* Account Number */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Account Number
            </label>
            <input
              type="number"
              placeholder="Enter account number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Bank Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Bank Name
            </label>
            <input
              type="text"
              placeholder="Enter bank name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-500 text-white font-semibold py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Save Bank Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default EscortBankDetailsPage;