import React from "react";
import { Home, User, Image, Settings, LogOut } from "lucide-react";

const EscortDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-950 flex flex-col">
        <div className="p-6 text-center border-b border-gray-800">
          <h1 className="text-2xl font-bold text-customPink">OscroVilla</h1>
          <p className="text-gray-400 text-sm">Escort Dashboard</p>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Home size={18} />
            Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <User size={18} />
            Profile
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Image size={18} />
            Gallery
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Settings size={18} />
            Settings
          </a>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-gray-950 border-b border-gray-800">
          <h2 className="text-lg font-semibold">Welcome Back</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-customPink flex items-center justify-center font-bold">
              E
            </div>
          </div>
        </header>

        {/* Dashboard Widgets */}
        <section className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-yellow-400 font-semibold">Profile Status</h3>
            <p className="text-gray-300 mt-2">
              Your profile is <span className="text-green-400">Verified</span>
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-yellow-400 font-semibold">Gallery</h3>
            <p className="text-gray-300 mt-2">12 Images uploaded</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-yellow-400 font-semibold">Earnings</h3>
            <p className="text-gray-300 mt-2">₦250,000 this month</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EscortDashboard;
