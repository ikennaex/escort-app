import { CheckCircleIcon, StarIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router";

const escort = [
    {
        text: "Add a single profile"
    },
    {
        text: "Add profile pictures"
    },
    {
        text: "Add contact information"
    },
    {
        text: "Upgrade to Premium"
    },
    {
        text: "Featured positions"
    },
    {
        text: "Add tours"
    },
    {
        text: "Blacklist unwanted clients"
    },
    {
        text: "Post classified ads"
    },
]

const clients = [
    {
        text: "Mark favorite profiles"
    },
    {
        text: "See profile photos"
    },
    {
        text: "Contact escorts"
    },
    {
        text: "Rate escorts & leave reviews"
    },
    {
        text: "Post classifieds"
    },
]

const RegisterCard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-customLightGray p-6 py-20">
      {/* Title */}
      <h1 className="text-3xl font-bold text-white mb-8">
        Create an Account
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Escort Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Register as <span className="text-customPink">Independent Escort</span>
          </h2>
          <ul className="space-y-2 text-gray-600 list-disc list-inside">
            {escort.map((item, index) => (
              <li key={index} className="flex items-center">
                <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
                {item.text}
              </li>
            ))}
          </ul>
          <Link to="/register-escort">
            <button className="mt-6 w-full bg-customPink text-white py-2 px-4 rounded-lg hover:bg-pink-500 transition">
              Register as Escort
            </button>
          </Link>
        </div>

        {/* Client Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Register as <span className="text-purple-600">Client</span>
          </h2>
          <ul className="space-y-2 text-gray-600 list-disc list-inside">
            {clients.map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-purple-400 mr-2" />
                {item.text}
              </li>
            ))}
          </ul>
          <Link to="/register-client">
            <button className="mt-6 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition">
              Register as Client
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
