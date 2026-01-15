import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../baseUrl";
import { UserContext } from "../../Contexts/UserContext";
import { formatDistanceToNow } from "date-fns"; 
import { Link } from "react-router";

const EscortNotifications = () => {
  const { api } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications
  const getNotifications = async () => {
    try {
      const res = await api.get(`${baseUrl}notifications`);
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      await api.patch(`${baseUrl}notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        )
      );
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="bg-pink-50 min-h-screen p-6">
      <h2 className="text-2xl font-bold text-pink-500 mb-6">Notifications</h2>

      <div className="bg-white shadow-md p-4 space-y-4 max-w-2xl mx-auto rounded-lg">
        {notifications.length === 0 && (
          <p className="text-gray-500 text-center">No notifications yet</p>
        )}

        {notifications.map((notification) => (
          <Link to={notification.link}>
          <div
            key={notification._id}
            onClick={() => markAsRead(notification._id)}
            className={`p-4 border-l-4 rounded-lg cursor-pointer transition-colors duration-200
              ${notification.isRead ? "bg-gray-50 border-gray-300" : "bg-pink-50 border-pink-400 hover:bg-pink-100"}`}
          >
            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-800">{notification.title}</p>
              {!notification.isRead && (
                <span className="inline-block w-2 h-2 bg-pink-500 rounded-full" />
              )}
            </div>
            <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
            <span className="text-xs text-gray-400 mt-2 block">
              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
            </span>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EscortNotifications;
