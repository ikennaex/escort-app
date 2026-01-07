import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { format } from "date-fns";
import { toast } from "react-toastify";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const EscortViewBookings = () => {
  const { api } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const res = await api.get(`escorts/booking`);
      setBookings(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  const sortedBookings = [...bookings].sort((a, b) => {
    // Make "accepted" come first
    if (a.status === "accepted" && b.status !== "accepted") return -1;
    if (a.status !== "accepted" && b.status === "accepted") return 1;

    // Then "pending" next
    if (a.status === "pending" && b.status === "declined") return -1;
    if (a.status === "declined" && b.status === "pending") return 1;

    return 0; // keep relative order for others
  });

  const handleDecline = async (id) => {
    try {
      await api.patch(`escorts/booking/${id}/decline`, {});
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: "declined" } : b))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleAccept = async (id) => {
    try {
      const res = await api.patch(`escorts/booking/${id}/accept`, {});
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: "accepted" } : b))
      );
      toast.success(res.data.message, {
        autoClose: 3000,
        position: "top-right",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 lg:p-8 p-4">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Bookings</h1>
        <p className="text-sm text-gray-500">
          View and manage your booking requests
        </p>
      </div>

      {/* Bookings List */}
      <div className="grid gap-4">
        {sortedBookings.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
            No bookings yet
          </div>
        ) : (
          sortedBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              {/* Top Row */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="font-semibold text-gray-800">
                    {booking.client.email}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {format(new Date(booking.date), "EEEE, do MMMM yyyy")}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full capitalize ${
                    statusStyles[booking.status]
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              {/* Details */}
              <div className="text-sm text-gray-600 mb-3">
                <p>
                  <span className="font-medium">Time:</span> {booking.time}
                </p>
                {booking.message && (
                  <p>
                    <span className="font-medium">Message:</span>{" "}
                    {booking.message}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {booking.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleAccept(booking._id)}
                      className="px-4 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDecline(booking._id)}
                      className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
                    >
                      Decline
                    </button>
                  </>
                )}

                {booking.status === "accepted" && (
                  <button className="px-4 py-2 text-sm rounded-md bg-gray-800 text-white hover:bg-gray-900">
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EscortViewBookings;
