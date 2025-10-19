import React, { useEffect, useState } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { AdminContext } from "../../Contexts/AdminContext";
import { useContext } from "react";

const AdminDashboard = () => {
  const { api } = useContext(AdminContext);
  const users = [
    { username: "jdoe", name: "John Doe", role: "Admin", age: 28 },
    { username: "asmith", name: "Alice Smith", role: "Premium", age: 24 },
    { username: "mjane", name: "Mary Jane", role: "User", age: 30 },
  ];

  const [escorts, setEscorts] = useState([]);
  const [clients, setClients] = useState([]);
  const [unverifiedEscorts, setUnverifiedEscorts] = useState([]);
  const [premiumEscorts, setPremiumEscorts] = useState([]);
  const [stats, setStats] = useState({
    escortsLast24Hours: 0,
    escortsLast7Days: 0,
  });

  const [search, setSearch] = useState("");
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  const getAllEscorts = async () => {
    try {
      const response = await api.get(`${baseUrl}admin/getallescorts`);
      setEscorts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllClients = async () => {
    try {
      const response = await api.get(`${baseUrl}admin/getallclients`);
      setClients(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const pendingVerification = async () => {
    try {
      const response = await api.get(`${baseUrl}admin/getunverifiedescorts`);
      setUnverifiedEscorts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getpremiumEscorts = async () => {
    try {
      const response = await api.get(`${baseUrl}admin/getpremiumescorts`);
      setPremiumEscorts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get("/admin/user-stats");
      setStats(response.data.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    getAllEscorts();
    getAllClients();
    pendingVerification();
    getpremiumEscorts();
    fetchStats();
  }, []);

  return (
    <div className="flex text-white overflow-x-hidden mx-auto">
      <AdminSidebar />

      <div className="flex-1 p-3 md:p-6 md:ml-64 mx-auto">
        <h1 className="text-2xl font-bold mb-6 md:mt-0 mt-12">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* All Users */}
          <div className="bg-gradient-to-r from-customPink to-pink-600 rounded-xl px-4 py-8 shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
            <p className="text-base md:text-lg font-medium">All Users</p>
            <p className="text-3xl font-bold my-2">
              {escorts.length + clients.length}
            </p>
          </div>

          {/* All Escorts */}
          <div className="bg-gradient-to-r from-customPink to-pink-600 rounded-xl px-4 py-8 shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
            <p className="text-base md:text-lg font-medium">All Escorts</p>
            <p className="text-3xl font-bold my-2">{escorts?.length}</p>
            <Link
              to="/admin/escorts"
              className="inline-block bg-white text-customPink font-semibold px-4 py-2 mt-2 rounded-md shadow hover:bg-gray-100 transition"
            >
              See all
            </Link>
          </div>

          {/* All Clients */}
          <div className="bg-gradient-to-r from-customPink to-pink-600 rounded-xl px-4 py-8 shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
            <p className="text-base md:text-lg font-medium">All Clients</p>
            <p className="text-3xl font-bold my-2">{clients?.length}</p>
            <Link
              to="/admin/users"
              className="inline-block bg-white text-customPink font-semibold px-4 py-2 mt-2 rounded-md shadow hover:bg-gray-100 transition"
            >
              See all
            </Link>
          </div>

          {/* Pending Verification */}
          <div className="bg-gradient-to-r from-customPink to-pink-600 rounded-xl px-4 py-8 shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
            <p className="text-base md:text-lg font-medium">
              Pending Verification
            </p>
            <p className="text-3xl font-bold my-2">
              {unverifiedEscorts?.length}
            </p>
            <Link
              to="/admin/pending"
              className="inline-block bg-white text-customPink font-semibold px-4 py-2 mt-2 rounded-md shadow hover:bg-gray-100 transition"
            >
              See all
            </Link>
          </div>

          {/* Premium Escorts */}
          <div className="bg-gradient-to-r from-customPink to-pink-600 rounded-xl px-4 py-8 shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
            <p className="text-base md:text-lg font-medium">
              Premium Subscriptions
            </p>
            <p className="text-3xl font-bold my-2">
              {premiumEscorts?.length || "0"}
            </p>
            <Link
              to="/admin/subscriptions"
              className="inline-block bg-white text-customPink font-semibold px-4 py-2 mt-2 rounded-md shadow hover:bg-gray-100 transition"
            >
              See all
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-sm text-gray-400">Joined (Last 24h)</p>
            <h3 className="text-2xl font-bold text-customPink">
              {stats.escortsLast24Hours}
            </h3>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-sm text-gray-400">Joined (Last 7 days)</p>
            <h3 className="text-2xl font-bold text-customPink">
              {stats.escortsLast7Days}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
