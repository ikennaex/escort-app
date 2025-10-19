import React, { useContext, useEffect, useState } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import { AdminContext } from "../../Contexts/AdminContext";
import {
  ChevronDown,
  ChevronUp,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Gallery, Item } from "react-photoswipe-gallery";

const AdminPremiumRequests = () => {
  const { api } = useContext(AdminContext);
  const [requests, setRequests] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPremiumRequests = async () => {
    try {
      const response = await api.get("admin/receipts");
      setRequests(response.data.receipts || []);
    } catch (err) {
      console.error("Error fetching premium requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPremiumRequests();
  }, []);

  // control img dimension
  const [dimensions, setDimensions] = useState({});

  useEffect(() => {
    if (requests.length > 0) {
      requests.forEach((req) => {
        if (req.receipt && !dimensions[req._id]) {
          const image = new Image();
          image.src = req.receipt;
          image.onload = () => {
            setDimensions((prev) => ({
              ...prev,
              [req._id]: {
                width: image.naturalWidth,
                height: image.naturalHeight,
              },
            }));
          };
        }
      });
    }
  }, [requests]);

  console.log(requests);

  const handleApprove = async (request) => {
    if (!window.confirm("Approve this premium request?")) return;
    try {
      const response = await api.post("admin/approve-receipts", {
        receiptId: request._id,
      });
      alert(response.data.message);
      fetchPremiumRequests();
    } catch (err) {
      console.error("Error approving premium request:", err);
      alert(err.response?.data?.message || "Error approving request");
    }
  };

  const handleReject = async (request) => {
    if (!window.confirm("Reject this premium request?")) return;
    try {
      const response = await api.post("admin/reject-receipts", {
        receiptId: request._id,
      });
      alert(response.data.message);
      fetchPremiumRequests();
    } catch (err) {
      console.error("Error rejecting premium request:", err);
      alert(err.response?.data?.message || "Error rejecting request");
    }
  };

  return (
    <div className="flex text-white mx-auto">
      <AdminSidebar />

      <div className="flex-1 p-3 md:p-6 md:ml-64 mx-auto">
        <h1 className="text-2xl font-bold md:mt-0 mt-12 mb-6">
          Premium Requests Management
        </h1>
        <p className="text-gray-300 text-sm mb-6">
          View and manage all escort premium subscription requests
        </p>

        {loading ? (
          <div className="text-center text-gray-500 py-20">
            Loading premium requests...
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <AlertTriangle className="mx-auto h-10 w-10 mb-3 text-gray-400" />
            No premium requests yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700 bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Escort
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Plan
                  </th>
                  {/* <th className="px-4 py-3 text-left text-sm font-semibold">Duration</th> */}
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, index) => (
                  <React.Fragment key={req._id}>
                    <tr className="border-t border-gray-700 hover:bg-gray-700 transition cursor-pointer">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 text-customPink font-medium hover:underline">
                        <Link to={`/admin/escort/${req.user?._id}`}>
                          {req.user?.username || "Unknown"}
                        </Link>
                      </td>
                      <td className="px-4 py-3 capitalize">{req.plan}</td>
                      {/* <td className="px-4 py-3">{req.plan}</td> */}
                      <td className="px-4 py-3">
                        ₦{req.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        {new Date(req.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() =>
                            setExpanded(expanded === req._id ? null : req._id)
                          }
                          className="text-customPink hover:text-pink-600 flex items-center gap-1 float-right"
                        >
                          {expanded === req._id ? (
                            <>
                              Hide <ChevronUp size={16} />
                            </>
                          ) : (
                            <>
                              View <ChevronDown size={16} />
                            </>
                          )}
                        </button>
                      </td>
                    </tr>

                    {expanded === req._id && (
                      <tr className="bg-gray-900 border-t border-gray-700">
                        <td colSpan="7" className="p-6">
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-semibold text-white mb-2">
                                Payment Details
                              </h3>
                              <p className="text-gray-300">
                                Transaction ID: {req.transactionId || "N/A"}
                              </p>
                              <p className="text-gray-300">
                                Payment Method: {req.paymentMethod || "N/A"}
                              </p>
                              <p className="text-gray-300">
                                Requested On:{" "}
                                {new Date(req.createdAt).toLocaleString(
                                  "en-GB"
                                )}
                              </p>

                              <Gallery>
                                <Item
                                  original={req?.receipt}
                                  thumbnail={req?.receipt}
                                  width={dimensions[req._id]?.width || 1024}
                                  height={dimensions[req._id]?.height || 768}
                                >
                                  {({ ref, open }) => (
                                    <img
                                      ref={ref}
                                      onClick={open}
                                      src={req?.receipt}
                                      alt="receipt"
                                      className="w-40 h-40 object-cover rounded-lg border border-gray-700 cursor-pointer"
                                    />
                                  )}
                                </Item>
                              </Gallery>
                            </div>

                            <div className="flex gap-4 mt-4">
                              <button
                                onClick={() => handleApprove(req)}
                                className="flex items-center gap-2 border-2 border-green-500 text-green-400 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition"
                              >
                                <CheckCircle size={18} /> Approve
                              </button>
                              <button
                                onClick={() => handleReject(req)}
                                className="flex items-center gap-2 border-2 border-red-500 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                              >
                                <XCircle size={18} /> Reject
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPremiumRequests;
