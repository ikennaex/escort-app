import React, { useState } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const users = [
    { username: "jdoe", name: "John Doe", role: "Admin", age: 28 },
    { username: "asmith", name: "Alice Smith", role: "Premium", age: 24 },
    { username: "mjane", name: "Mary Jane", role: "User", age: 30 },
  ];

  const [search, setSearch] = useState("");
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex text-white overflow-x-hidden mx-auto">
      <AdminSidebar />

      <div className="flex-1 p-3 md:p-6 md:ml-64 mx-auto">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-customPink rounded-lg px-3 py-6 md:p-6 shadow-md">
            <p className="text-lg font-semibold">All Users</p>
            <p className="text-3xl font-bold mb-4">9,887</p>
            <Link
              to="/admin/total"
              className="inline-block bg-white text-customPink font-semibold px-4 py-2 rounded-md shadow transition"
            >
              See all
            </Link>
          </div>

          <div className="bg-customPink rounded-lg px-3 py-6 md:p-6 shadow-md">
            <p className="text-lg font-semibold">Premium Users</p>
            <p className="text-3xl font-bold mb-4">239</p>
            <Link
              to="/admin/premium"
              className="inline-block bg-white text-customPink font-semibold px-4 py-2 rounded-md shadow hover:bg-gray-200 transition"
            >
              See all
            </Link>
          </div>
        </div>

        <div className="bg-customGray rounded-lg shadow-md p-6">
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
