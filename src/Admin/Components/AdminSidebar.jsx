import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Clock,
  Users,
  Settings,
  LogOut,
} from "lucide-react"; // icons

const AdminSidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white shadow-lg flex flex-col">
      <div className="p-6 text-2xl font-bold">
        Admin Panel
      </div>

      <nav className="flex-1 px-4 py-6 space-y-4">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <span>Dashboard</span>
        </Link>

        <Link
          to="/admin/pending"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <span>Pending Approval</span>
        </Link>

        <Link
          to="/admin/settings"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <span>Settings</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-red-600 transition">
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
