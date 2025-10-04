import React, { useEffect, useState } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { AdminContext } from "../../Contexts/AdminContext";
import { useContext } from "react";

const AdminDashboard = () => {
  const {api} = useContext(AdminContext)
  const users = [
    { username: "jdoe", name: "John Doe", role: "Admin", age: 28 },
    { username: "asmith", name: "Alice Smith", role: "Premium", age: 24 },
    { username: "mjane", name: "Mary Jane", role: "User", age: 30 },
  ];

  const [escorts, setEscorts] = useState([]);
  const [clients, setClients] = useState([]);
  const [unverifiedEscorts, setUnverifiedEscorts] = useState([]);
  const [premiumEscorts, setPremiumEscorts] = useState([]);

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

  useEffect(() => {
    getAllEscorts();
    getAllClients();
    pendingVerification();
    getpremiumEscorts();
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
            <p className="text-base md:text-lg font-medium">Premium Subscriptions</p>
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

        {/* <div className="bg-customGray rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold">Recently added users</h2>
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-md text-black outline-none focus:ring-2 focus:ring-customPink w-full md:w-auto"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-customGray rounded-lg">
              <thead className="bg-gray-700 rounded-lg">
                <tr>
                  <th className="px-2 py-2 text-left">Username</th>
                  <th className="px-2 py-2 text-left">Name</th>
                  <th className="px-2 py-2 text-left">Role</th>
                  <th className="px-2 py-2 text-left">Age</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={index} className="border-t border-gray-700">
                    <td className="px-2 py-2">{user.username}</td>
                    <td className="px-2 py-2">{user.name}</td>
                    <td className="px-2 py-2">{user.role}</td>
                    <td className="px-2 py-2">{user.age}</td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-4 text-center text-gray-400"
                    >
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Link
            className="bg-customPink px-4 py-2 font-bold mt-6 rounded-md"
            to="/admin/users"
          >
            See all
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
