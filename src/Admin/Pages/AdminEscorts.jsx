import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../Components/AdminSidebar";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { useEffect } from "react";

const AdminEscorts = () => {
  const [escorts, setEscorts] = useState([])

const fetchEscort = async () => {
    try {
        const response = await axios.get(`${baseUrl}admin/getallescorts`)
        setEscorts(response.data)
    } catch (err) {
        console.log(err)
    }
}

useEffect(() => {
    fetchEscort()
}, [])

const [search, setSearch] = useState("");
const filteredUsers = escorts.filter(
    (user) =>
    user.displayName.toLowerCase().includes(search.toLowerCase()) ||
    user.username.toLowerCase().includes(search.toLowerCase()) 
);


  return (
    <div className="flex text-white mx-auto">
      <AdminSidebar />
      <div className="flex-1 p-3 md:p-6 md:ml-64 mx-auto">
        <h1 className="text-2xl font-bold md:mt-0 mt-12 mb-6">
          Total Escorts on the Site
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
                <th className="px-4 py-3 text-left text-sm font-semibold">Location</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Active </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-700 hover:bg-gray-700 transition cursor-pointer"
                  onClick={() => (window.location.href = `/admin/escort/${user._id}`)}
                >
                  <td className="px-4 py-3">{user.displayName}</td>
                  <td className="px-4 py-3 text-gray-300">@{user.username}</td>
                  <td className="px-4 py-3">{user?.state}</td>
                  <td className="px-4 py-3">{user?.email}</td>
                  <td className="px-4 py-3">{user?.isActive? <span className="rounded-xl bg-green-600 py-1 px-2">Active</span> : <span className="rounded-xl bg-red-600 py-1 px-2">Inactive</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminEscorts;
