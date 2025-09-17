import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../Components/AdminSidebar";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { differenceInYears, format } from "date-fns";

const AdminPending = () => {
  const [escorts, setEscorts] = useState([]);

  const pendingVerification = async () => {
    try {
      const response = await axios.get(`${baseUrl}admin/getunverifiedescorts`);
      setEscorts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    return differenceInYears(new Date(), new Date(dob));
  };

  useEffect(() => {
    pendingVerification();
  }, []);

  return (
    <div className="flex text-white min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8 md:ml-64">
        <h1 className="text-3xl font-bold mb-8">
          Pending Approvals ({escorts.length}) 
        </h1>

        {escorts.length === 0 ? (
          <p className="text-gray-400 text-center mt-12">
            No pending escorts found.
          </p>
        ) : (
          <div className="space-y-4">
            {escorts.map((user) => (
              <Link
                key={user._id}
                to={`/admin/pending/${user._id}`}
                className="block border border-gray-700 bg-gray-900 hover:bg-gray-800 rounded-xl p-5 shadow-sm transition duration-200"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="space-y-1">
                    <p className="text-lg font-semibold">{user.displayName}</p>
                    <p className="text-sm text-gray-400">@{user.username}</p>
                    <p className="text-sm text-gray-300">
                      Age: {calculateAge(user.dob)}
                    </p>
                    <p>
                      <span className="font-semibold text-customPink">Account created on:{" "}</span>
                      {format(new Date(user.createdAt), "PPP")}
                    </p>
                  </div>

                  <div className="mt-3 md:mt-0 text-customPink text-sm font-medium flex items-center gap-1">
                    <span>Review</span>
                    <span className="text-lg">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPending;
