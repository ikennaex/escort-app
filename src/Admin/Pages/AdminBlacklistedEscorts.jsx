import React, { useState, useEffect, useContext } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import axios from "axios";
import { AdminContext } from "../../Contexts/AdminContext";
import { AlertTriangle } from "lucide-react";

const AdminBlacklistedEscorts = () => {
  const { api } = useContext(AdminContext);
  const [blacklistedEscorts, setBlacklistedEscorts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlacklistedEscorts = async () => {
    try {
      const response = await api.get("admin/blacklist");
      setBlacklistedEscorts(response.data.blacklists || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlacklistedEscorts();
  }, []);

  return (
    <div className="flex text-white min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-3 md:p-6 md:ml-64 mx-auto">
        <h1 className="text-2xl font-bold md:mt-0 mt-12 mb-6">
          Blacklisted Escorts
        </h1>
        <p className="text-gray-300 text-sm mb-6">
          All users who have been blacklisted
        </p>

        {loading ? (
          <div className="text-center text-gray-500 py-20">
            Loading blacklisted escorts...
          </div>
        ) : blacklistedEscorts.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <AlertTriangle className="mx-auto h-10 w-10 mb-3 text-gray-400" />
            No blacklisted escorts found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700 bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">#</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Escort
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Reason
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Details
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {blacklistedEscorts.map((escort, index) => (
                  <tr
                    key={escort._id}
                    className="border-t border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-customPink">
                      {escort.name || escort.escort?.username || "Unknown"}
                    </td>
                    <td className="px-4 py-3 capitalize">{escort.reason}</td>
                    <td className="px-4 py-3 truncate max-w-xs text-gray-300">
                      {escort.details?.slice(0, 60) || "N/A"}...
                    </td>
                    <td className="px-4 py-3">
                      {new Date(escort.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-3 py-1 bg-red-600 text-white text-xs rounded-full">
                        Blacklisted
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlacklistedEscorts;
