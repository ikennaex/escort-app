import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import { baseUrl } from "../../../baseUrl";
import { UserContext } from "../../../Contexts/UserContext";
import Loader from "../../../Components/Loaders/Loader";
import { FormContext } from "../../../Contexts/FormContext";

const OtpInput = ({ length = 4, onChangeOtp }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (/[^0-9]/.test(value)) return; // only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChangeOtp(newOtp.join(""));

    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="flex gap-3 justify-center mb-4">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputsRef.current[index] = el)}
          className="w-12 h-12 text-center text-lg font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customPink"
        />
      ))}
    </div>
  );
};

const VerifyEmail = ({ onClose, email }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const { api, setUser } = useContext(UserContext);
  const { markStepCompleted } = useContext(FormContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || otp.length < 4) {
      alert("Please enter your 4-digit code.");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post(`${baseUrl}auth/verifyotp`, {
        email,
        otp,
      });
      console.log(response.data);
      setUser(response.data.user);
      markStepCompleted(1);
      navigate("/escort-details");
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

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
          Please enter the 4-digit code sent to{" "}
          <span className="font-semibold">{email}</span>
        </p>

        <form onSubmit={handleSubmit}>
          {/* OTP Input */}
          <OtpInput length={4} onChangeOtp={setOtp} />

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-customPink text-white py-2 rounded-lg hover:bg-pink-700 transition mx-auto flex justify-center items-center"
          >
            {loading ? <Loader /> : "Submit"}
          </button>
        </form>

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
