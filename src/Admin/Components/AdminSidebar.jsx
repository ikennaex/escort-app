import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Clock,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"; // icons

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Topbar with toggle button */}
      <div className="md:hidden flex items-center justify-between bg-gray-900 text-white px-4 py-3 shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="text-xl font-bold">Admin Panel</div>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-gray-900 text-white shadow-lg flex flex-col z-40
          transform transition-transform duration-300
          w-64
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Sidebar header (hidden on mobile since topbar already has it) */}
        <div className="hidden md:block p-6 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition mt-10 md:mt-0"
          >
            <LayoutDashboard size={20} />
            <span className=" md:inline">Dashboard</span>
          </Link>

          <Link
            to="/admin/pending"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Clock size={20} />
            <span className=" md:inline">Pending Approval</span>
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Users size={20} />
            <span className=" md:inline">Users</span>
          </Link>

          <Link
            to="/admin/settings"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Settings size={20} />
            <span className=" md:inline">Settings</span>
          </Link>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg transition">
            <LogOut size={20} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
