import React, { useState } from "react";

const EscortSetting = () => {
  const [settings, setSettings] = useState({
    profileVisibility: true,
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-pink-100 p-6 min-h-screen">
      <h2 className="text-2xl font-bold text-pink-500 mb-6">Settings</h2>

      <div className="bg-white shadow-md p-6 space-y-6 max-w-md mx-auto">
        {/* Profile Visibility */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Profile Visibility</span>
          <button
            onClick={() => handleToggle("profileVisibility")}
            className={`px-4 py-1 rounded-full text-sm ${
              settings.profileVisibility
                ? "bg-pink-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {settings.profileVisibility ? "Active" : "Inactive"}
          </button>
        </div>

        {/* Email Notifications */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Email Notifications</span>
          <button
            onClick={() => handleToggle("emailNotifications")}
            className={`px-4 py-1 rounded-full text-sm ${
              settings.emailNotifications
                ? "bg-pink-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {settings.emailNotifications ? "On" : "Off"}
          </button>
        </div>

        {/* SMS Notifications */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">SMS Notifications</span>
          <button
            onClick={() => handleToggle("smsNotifications")}
            className={`px-4 py-1 rounded-full text-sm ${
              settings.smsNotifications
                ? "bg-pink-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {settings.smsNotifications ? "On" : "Off"}
          </button>
        </div>

        {/* Dark Mode */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Dark Mode</span>
          <button
            onClick={() => handleToggle("darkMode")}
            className={`px-4 py-1 rounded-full text-sm ${
              settings.darkMode
                ? "bg-pink-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {settings.darkMode ? "Enabled" : "Disabled"}
          </button>
        </div>

        <button className="w-full mt-4 bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EscortSetting;
