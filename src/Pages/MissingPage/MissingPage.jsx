import React from "react";
import { Link } from "react-router-dom";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

const MissingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">

        <FaceFrownIcon className="h-16 w-16 text-customPink mx-auto mb-4" />

        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-lg font-semibold text-gray-700 mb-2">
          Page Not Found
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block bg-customPink text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-600 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default MissingPage;
