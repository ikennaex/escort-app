import React, { useEffect, useState } from "react";
import { useClientAuth } from "../../Contexts/ClientAuthContext";
import { format } from "date-fns";

const ClientBookings = () => {
  const { api } = useClientAuth();
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("client/booking");
        setBookings(res.data || []);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookings();
  }, [api]);

  return (
    <div className="min-h-screen bg-pink-100 p-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
        <p className="text-sm text-gray-500">
          Track your recent bookings and status
        </p>
        <p className="text-sm text-customPink">Sorted in ascending order</p>
      </div>

      {/* Loading / Empty */}
      {loadingBookings ? (
        <div className="text-center py-10 text-gray-500 text-sm">
          Loading your bookings...
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-sm">
          You have not made any bookings yet.
        </div>
      ) : (
        <>
          {/* ✅ MOBILE VIEW */}
          <div className="space-y-4 md:hidden">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        booking.escort?.gallery?.[0] ||
                        "https://via.placeholder.com/50"
                      }
                      alt={booking.escort?.displayName}
                      className="w-12 h-12 rounded-full object-cover border"
                    />

                    <div>
                      <p className="font-semibold text-gray-800">
                        {booking.escort?.displayName || "Escort"}
                      </p>
                      <p className="text-xs text-gray-500">
                        #{booking._id.slice(-6)}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      statusStyles[booking.status]
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                {/* Details */}
                <div className="flex justify-between text-sm text-gray-600">
                  <div>
                    <p className="text-xs uppercase text-gray-400">Date</p>
                    <p>
                      {format(new Date(booking.date), "EEEE, do MMMM yyyy")}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-gray-400">Time</p>
                    <p>{booking.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ DESKTOP VIEW */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm p-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b">
                  <th className="pb-3">Escort</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Time</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>

              <tbody>
                {bookings.slice(0, 5).map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b last:border-none hover:bg-pink-50 transition"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            booking.escort?.gallery?.[0] ||
                            "https://via.placeholder.com/40"
                          }
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {booking.escort?.displayName}
                          </p>
                          <p className="text-xs text-gray-500">
                            #{booking._id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>
                    <td className="text-right">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
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
        </>
      )}
    </div>
  );
};

export default ClientBookings;
