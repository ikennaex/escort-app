import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";

const VerifyEmail = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="relative bg-pink-100 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
        {/* Close Icon */}
        <XMarkIcon
        onClick={onClose}
          className="absolute top-4 right-4 h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800"
        />

        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Verify Your Email
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Please enter the verification code sent to your email.
        </p>

        <input
          type="text"
          placeholder="Verification Code"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customPink mb-4"
        />

        <button className="w-full bg-customPink text-white py-2 rounded-lg hover:bg-pink-700 transition">
          Confirm
        </button>

        <p className="text-gray-600 text-sm text-center mt-4">
          Didn’t receive the code?{" "}
          <a href="#" className="text-customPink hover:underline">
            Resend
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
