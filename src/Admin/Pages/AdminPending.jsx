import React from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../Components/AdminSidebar";

const AdminPending = () => {
  const pendingUsers = [
    { id: 1, username: "jdoe", name: "John Doe", age: 25 },
    { id: 2, username: "asmith", name: "Alice Smith", age: 30 },
    { id: 3, username: "bjones", name: "Bob Jones", age: 22 },
  ];

  return (
    <div className="flex text-white mx-auto">
      <AdminSidebar />
      <div className="flex-1 p-3 md:p-6 md:ml-64 mx-auto">
        <h1 className="text-2xl font-bold md:mt-0 mt-12 mb-6">
          Pending Approvals
        </h1>

        <div className="space-y-4">
          {pendingUsers.map((user) => (
            <Link
              key={user.id}
              to={`/admin/pending/${user.id}`}
              className="block bg-gray-800 hover:bg-gray-700 rounded-2xl p-4 shadow-md transition"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-400">@{user.username}</p>
                  <p className="text-sm">Age: {user.age}</p>
                </div>

                <div className="mt-3 md:mt-0 text-blue-400 text-sm font-medium">
                  Review →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPending;
