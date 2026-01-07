import React from "react";
import { useNavigate } from "react-router";

const LoginAs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-2">
          Login As
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Choose how you want to continue
        </p>

        <div className="flex flex-col gap-4">
          {/* Client */}
          <button
            onClick={() => navigate("/login/client")}
            className="group border rounded-xl p-5 flex items-center gap-4 hover:border-customPink hover:bg-pink-50 transition"
          >
            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-xl">
              👤
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800 group-hover:text-customPink">
                Client
              </p>
              <p className="text-sm text-gray-500">
                Book escorts and manage your bookings
              </p>
            </div>
          </button>

          {/* Escort */}
          <button
            onClick={() => navigate("/login/escort")}
            className="group border rounded-xl p-5 flex items-center gap-4 hover:border-customPink hover:bg-pink-50 transition"
          >
            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-xl">
              💎
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800 group-hover:text-customPink">
                Escort
              </p>
              <p className="text-sm text-gray-500">
                Manage your profile and bookings
              </p>
            </div>
          </button>
        </div>

        <p className="text-xs text-center text-gray-400 mt-8">
          Select the account type you registered with
        </p>
      </div>
    </div>
  );
};

export default LoginAs;
