import React from "react";

const mockNotifications = [
  {
    id: 1,
    type: "message",
    text: "You have a new message from John.",
    time: "2 mins ago",
    read: false,
  },
  {
    id: 2,
    type: "booking",
    text: "Your booking for has been confirmed.",
    time: "1 hour ago",
    read: true,
  },
  {
    id: 3,
    type: "alert",
    text: "Your subscription will expire in 3 days.",
    time: "Yesterday",
    read: false,
  },
];

const EscortNotifications = () => {
  return (
    <div className="bg-pink-100 p-6 min-h-screen">
      <h2 className="text-2xl font-bold text-pink-500 mb-6">Notifications</h2>

      <div className="bg-white shadow-md p-4 space-y-4 max-w-2xl mx-auto">
        {mockNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border rounded ${
              notification.read ? "bg-gray-50" : "bg-pink-50"
            }`}
          >
            <p className="text-gray-700">{notification.text}</p>
            <span className="text-xs text-gray-500">{notification.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EscortNotifications;
