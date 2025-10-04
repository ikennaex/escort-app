import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Clock,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  CreditCard,
} from "lucide-react"; // icons
import { logo } from "../../../imports";
import { baseUrl } from "../../baseUrl";
import { AdminContext } from "../../Contexts/AdminContext";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {setAdmin, api} = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    try {
      await api.post(`${baseUrl}admin/logout`);
      setAdmin(null);
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Something went wrong during logout");
    }
  };

  return (
    <>
      {/* Mobile Topbar with toggle button */}
      <div className="md:hidden flex items-center justify-between bg-customGray text-white px-4 py-3 mb-10 shadow-lg fixed top-0 left-0 right-0 z-50">
        <Link to="/admin">
          <img className="h-10" src={logo} alt="Logo" />
        </Link>

        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-customGray text-white shadow-lg flex flex-col z-40
          transform transition-transform duration-300
          w-64
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Sidebar header (hidden on mobile since topbar already has it) */}
        <div className="hidden md:block p-6 ">
          <Link to="/admin">
            <img className="h-12" src={logo} alt="Logo" />
          </Link>
          <p className="text-xl font-bold">Admin Panel</p>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-4">
          <Link
            to="/admin"
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
            to="/admin/escorts"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Users size={20} />
            <span className=" md:inline">Escorts</span>
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Users size={20} />
            <span className=" md:inline">Client</span>
          </Link>

          <Link
            to="/admin/subscriptions"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <CreditCard size={20} />
            <span className=" md:inline">Subscriptions</span>
          </Link>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 rounded-lg transition">
            <LogOut size={20} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
