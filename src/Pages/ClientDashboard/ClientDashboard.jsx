import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  UserCircleIcon,
  HeartIcon,
  PencilSquareIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import { UserContext } from "../../Contexts/UserContext";

const ClientDashboard = () => {
    const {user} = useContext(UserContext)
  return (
    <div className="bg-pink-100 min-h-screen p-4 fade-in">
      <div className="bg-[#fff8f9] rounded-lg max-w-4xl mx-auto p-6">

        {/* Header Section */}
        <div className="flex items-center gap-4 border-b pb-4 mb-6">
          <UserCircleIcon className="w-16 h-16 text-customPink" />

          <div>
            <p className="text-2xl font-bold text-gray-800">
              Welcome, {user?.username || "Client"}
            </p>
            <div className="flex items-center gap-2 text-gray-600">
              <EnvelopeIcon className="h-5 w-5" />
              <p>{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Favorites Card */}
          <Link
            to="/client/favourites"
            className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex items-center gap-3 text-pink-500">
              <HeartIcon className="h-7 w-7" />
              <p className="font-bold text-lg">My Favourites</p>
            </div>
            <p className="mt-2 text-gray-500 text-sm">
              View all escorts you liked and saved.
            </p>
          </Link>

          {/* Edit Profile Card */}
          <Link
            to="/client/edit-profile"
            className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex items-center gap-3 text-blue-500">
              <PencilSquareIcon className="h-7 w-7" />
              <p className="font-bold text-lg">Edit Profile</p>
            </div>
            <p className="mt-2 text-gray-500 text-sm">
              Update your account details.
            </p>
          </Link>

          {/* Email Card (display only) */}
          <div className="bg-white rounded-xl p-5 shadow">
            <div className="flex items-center gap-3 text-green-500">
              <EnvelopeIcon className="h-7 w-7" />
              <p className="font-bold text-lg">Email</p>
            </div>
            <p className="mt-2 text-gray-600 text-sm break-all">
              {user?.email}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
