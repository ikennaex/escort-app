import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../Components/AdminSidebar";
import { baseUrl } from "../../baseUrl";
import { differenceInYears, format } from "date-fns";
import { AdminContext } from "../../Contexts/AdminContext";
import Loader from "../../Components/Loaders/Loader";

const AdminPending = () => {
  const [escorts, setEscorts] = useState([]);
  const [filter, setFilter] = useState("all");
  const { api } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(100);
  const [hasMore, setHasMore] = useState(true);

  const pendingVerification = async (currentPage = 1) => {
    try {
      setLoading(true);
      const response = await api.get(
        `${baseUrl}admin/getunverifiedescorts?page=${currentPage}&limit=${limit}`
      );

      const data = response.data;

      // ✅ Safely handle object structure
      const newEscorts = data.escorts || [];

      // ✅ Detect if there are more
      if (newEscorts.length < limit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      // ✅ Append data when next page is clicked
      if (currentPage === 1) {
        setEscorts(newEscorts);
      } else {
        setEscorts((prev) => [...prev, ...newEscorts]);
      }
    } catch (err) {
      console.error("Error fetching escorts:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    return differenceInYears(new Date(), new Date(dob));
  };

  useEffect(() => {
    pendingVerification(page);
  }, [page]);

  // Filter logic
  const filteredEscorts = escorts.filter((escort) => {
    if (filter === "complete") return escort.registrationComplete === true;
    if (filter === "incomplete") return escort.registrationComplete === false;
    return true;
  });

  // Pagination handlers
  const handleNext = () => {
    if (hasMore && !loading) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1 && !loading) setPage((prev) => prev - 1);
  };

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
            <option className="text-white" value="all">
              All
            </option>
            <option className="text-white" value="complete">
              Registration Complete
            </option>
            <option className="text-white" value="incomplete">
              Not Complete
            </option>
          </select>
        </div>

        {loading && page === 1 && <Loader />}

        {filteredEscorts.length === 0 && !loading ? (
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

        {/* Pagination buttons */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            disabled={page === 1 || loading}
            className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-800 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={!hasMore || loading}
            className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Next"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminPending;
