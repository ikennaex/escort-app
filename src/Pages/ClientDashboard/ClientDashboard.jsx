import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  UserCircleIcon,
  HeartIcon,
  PencilSquareIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import { UserContext } from "../../Contexts/UserContext";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { useClientAuth } from "../../Contexts/ClientAuthContext";
import { format } from "date-fns";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const ClientDashboard = () => {
  const { client, api, logoutClient } = useClientAuth();
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get(`${baseUrl}client/booking`);
        setBookings(res.data || []);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookings();
  }, []);

  const handleLogout = () => {
    logoutClient()
  }

  return (
    <div className="bg-pink-100 min-h-screen p-4 fade-in">
      <div className="bg-[#fff8f9] rounded-lg max-w-5xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 border-b pb-4">
          <UserCircleIcon className="w-16 h-16 text-customPink" />

          <div>
            <p className="text-2xl font-bold text-gray-800">
              Welcome, {client?.username || "Client"}
            </p>
            <div className="flex items-center gap-2 text-gray-600">
              <EnvelopeIcon className="h-5 w-5" />
              <p>{client?.email}</p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout} // or clientAuth.logout() if defined
          className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/client/favourites"
            className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3 text-pink-500">
              <HeartIcon className="h-7 w-7" />
              <p className="font-bold text-lg">My Favourites</p>
            </div>
            <p className="mt-2 text-gray-500 text-sm">
              View all escorts you liked and saved.
            </p>
          </Link>
          {/* 
          <Link
            to="/client/edit-profile"
            className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3 text-blue-500">
              <PencilSquareIcon className="h-7 w-7" />
              <p className="font-bold text-lg">Edit Profile</p>
            </div>
            <p className="mt-2 text-gray-500 text-sm">
              Update your account details.
            </p>
          </Link> */}

          {/* <div className="bg-white rounded-xl p-5 shadow">
            <div className="flex items-center gap-3 text-green-500">
              <EnvelopeIcon className="h-7 w-7" />
              <p className="font-bold text-lg">Email</p>
            </div>
            <p className="mt-2 text-gray-600 text-sm break-all">
              {user?.email}
            </p>
          </div> */}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Bookings</h2>

            <Link
              to="/client/bookings"
              className="text-customPink text-sm font-medium hover:underline"
            >
              View all
            </Link>
          </div>

          {loadingBookings ? (
            <p className="text-gray-500 text-sm">Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p className="text-gray-500 text-sm">
              You have not made any bookings yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b">
                    <th className="py-3 font-medium">Escort</th>
                    <th className="font-medium">Date</th>
                    <th className="font-medium">Time</th>
                    <th className="font-medium text-right">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.slice(0, 3).map((booking) => (
                    <tr
                      key={booking._id}
                      className="border-b last:border-none hover:bg-pink-50 transition"
                    >
                      {/* Escort */}
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              booking.escort?.gallery[0] ||
                              "https://via.placeholder.com/40"
                            }
                            alt={booking.escort?.displayName}
                            className="w-10 h-10 rounded-full object-cover border"
                          />

                          <div>
                            <p className="font-semibold text-gray-800 leading-tight">
                              {booking.escort?.displayName || "Escort"}
                            </p>
                            <p className="text-xs text-gray-500">
                              Booking ID #{booking._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="text-gray-700">
                        {format(new Date(booking.date), "EEEE, do MMMM yyyy")}
                      </td>

                      {/* Time */}
                      <td className="text-gray-700">{booking.time}</td>

                      {/* Status */}
                      <td className="text-right">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                            statusStyles[booking.status]
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
