import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../Components/AdminSidebar";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { differenceInYears, format } from "date-fns";
import { AdminContext } from "../../Contexts/AdminContext";
import Loader from "../../Components/Loaders/Loader";

const AdminPending = () => {
  const [escorts, setEscorts] = useState([]);
  const [filter, setFilter] = useState("all"); // "all", "complete", "incomplete"
  const { api } = useContext(AdminContext);
  const [loading, setLoading] = useState(false)

  const pendingVerification = async () => {
    try {
      setLoading(true)
      const response = await api.get(`${baseUrl}admin/getunverifiedescorts`);
      setEscorts(response.data);
    } catch (err) {
      setLoading(false)
      console.log(err);
    } finally {
      setLoading(false)
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    return differenceInYears(new Date(), new Date(dob));
  };

  useEffect(() => {
    pendingVerification();
  }, []);

  // Apply the filter logic
  const filteredEscorts = escorts.filter((escort) => {
    if (filter === "complete") return escort.registrationComplete === true;
    if (filter === "incomplete") return escort.registrationComplete === false;
    return true; // "all" shows everything
  });

  return (
    <div className="flex text-white min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8 md:ml-64">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            Pending Approvals ({filteredEscorts.length})
          </h1>

          {/* Filter Dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-md"
          >
            <option className="text-white" value="all">All</option>
            <option className="text-white" value="complete">Registration Complete</option>
            <option className="text-white" value="incomplete">Not Complete</option>
          </select>
        </div>

        {loading ? <Loader /> : ""}

        {filteredEscorts.length === 0 && loading == false ? (
          <p className="text-gray-400 text-center mt-12">
            No escorts found for this filter.
          </p>
        ) : (
          <div className="space-y-4">
            {filteredEscorts.map((user) => (
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
                      <span className="font-semibold text-customPink">
                        Account created on:{" "}
                      </span>
                      {format(new Date(user.createdAt), "PPP")}
                    </p>
                    <p>
                      <span className="text-sm text-gray-400">
                        Registration Complete:{" "}
                      </span>
                      {user.registrationComplete ? "✅ Yes" : "❌ No"}
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
