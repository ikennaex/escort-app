import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../Components/AdminSidebar";

const AdminUsers = () => {
  const users = [
    { id: 1, username: "jdoe", name: "John Doe", role: "Admin", age: 28 },
    { id: 2, username: "asmith", name: "Alice Smith", role: "Premium", age: 34 },
    { id: 3, username: "bjones", name: "Bob Jones", role: "User", age: 22 },
    { id: 4, username: "cjohnson", name: "Carol Johnson", role: "User", age: 30 },
  ];

const [search, setSearch] = useState("");
const filteredUsers = users.filter(
    (user) =>
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className="flex text-white mx-auto">
      <AdminSidebar />
      <div className="flex-1 p-3 md:p-6 md:ml-64 mx-auto">
        <h1 className="text-2xl font-bold md:mt-0 mt-12 mb-6">
          Total Users on the Site
        </h1>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-md text-black outline-none focus:ring-2 focus:ring-customPink w-full md:w-auto"
            />
          </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Full Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Username</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Age</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-700 hover:bg-gray-700 transition cursor-pointer"
                  onClick={() => (window.location.href = `/admin/user/${user.id}`)}
                >
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3 text-gray-300">@{user.username}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3">{user.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
