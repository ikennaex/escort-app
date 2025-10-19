import React, { useContext, useEffect, useState } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import { AdminContext } from "../../Contexts/AdminContext";
import { ChevronDown, ChevronUp, AlertTriangle, Ban } from "lucide-react";
import { Link } from "react-router";
import { Gallery, Item } from "react-photoswipe-gallery";

const AdminReports = () => {
  const { api } = useContext(AdminContext);
  const [reports, setReports] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);


  const [dimensions, setDimensions] = useState({});

  const fetchReports = async () => {
    try {
      const response = await api.get("admin/getreports");
      console.log("Reports fetched:", response.data);
      setReports(response.data.reports || []);
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    if (!reports || reports.length === 0) return;

    reports.forEach((report) => {
      if (!report.images || report.images.length === 0) return;

      report.images.forEach((img, index) => {
        const key = `${report._id}-${index}`;
        if (dimensions[key]) return;

        const image = new Image();
        image.src = img;

        image.onload = () => {
          setDimensions((prev) => ({
            ...prev,
            [key]: {
              width: image.naturalWidth,
              height: image.naturalHeight,
            },
          }));
        };

        image.onerror = () => {
          setDimensions((prev) => ({
            ...prev,
            [key]: { width: 1024, height: 768 },
          }));
        };
      });
    });
  }, [reports]);

  const handleBlacklist = async (report) => {
    try {
      window.confirm("Are you sure you want to blacklist this escort?");
      const response = await api.post("admin/blacklist", {
        escortId: report.escort._id,
        reason: report.reason,
        details: report.details,
        proof: report.images || [],
      });
      console.log("Escort blacklisted:", response.data);
      alert(response.data.message);
    } catch (err) {
      console.error("Error blacklisting escort:", err);
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="flex text-white mx-auto">
      <AdminSidebar />

      <div className="flex-1 p-3 md:p-6 md:ml-64 mx-auto">
        <h1 className="text-2xl font-bold md:mt-0 mt-12 mb-6">
          Reports Management
        </h1>
        <p className="text-gray-300 text-sm mb-6">
          View and manage all user-submitted reports
        </p>

        {loading ? (
          <div className="text-center text-gray-500 py-20">
            Loading reports...
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <AlertTriangle className="mx-auto h-10 w-10 mb-3 text-gray-400" />
            No reports have been submitted yet.
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
                    Proof
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
                {reports.map((report, index) => (
                  <React.Fragment key={report._id}>
                    <tr className="border-t border-gray-700 hover:bg-gray-700 transition cursor-pointer">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 text-customPink font-medium hover:underline">
                        <Link to={`/admin/escort/${report.escort?._id}`}>
                          {report.escort?.username || "Unknown"}
                        </Link>
                      </td>
                      <td className="px-4 py-3 capitalize">{report.reason}</td>
                      <td className="px-4 py-3 truncate max-w-xs text-gray-300">
                        {report.details.slice(0, 50)}...
                      </td>
                      <td className="px-4 py-3">
                        {report.images?.length > 0 ? (
                          <span className="text-customPink font-medium">
                            {report.images.length} file(s)
                          </span>
                        ) : (
                          <span className="text-gray-400">None</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {new Date(report.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() =>
                            setExpanded(
                              expanded === report._id ? null : report._id
                            )
                          }
                          className="text-customPink hover:text-pink-600 flex items-center gap-1 float-right"
                        >
                          {expanded === report._id ? (
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

                    {expanded === report._id && (
                      <tr className="bg-gray-900 border-t border-gray-700">
                        <td colSpan="7" className="p-6">
                          <div className="space-y-3">
                            <h3 className="font-semibold text-white">
                              Full Details:
                            </h3>
                            <p className="text-gray-300">{report.details}</p>

                            {report.images?.length > 0 && (
                              <div>
                                <h4 className="font-medium text-white mb-2">
                                  Proof Images:
                                </h4>
                                <Gallery>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {report.images.map((img, index) => {
                                      const key = `${report._id}-${index}`;
                                      const dim = dimensions[key] || {
                                        width: 1024,
                                        height: 768,
                                      };
                                      return (
                                        <Item
                                          key={key}
                                          original={img}
                                          thumbnail={img}
                                          width={dim.width}
                                          height={dim.height}
                                          caption={`Photo ${index + 1} of ${
                                            report?.escort?.username ||
                                            "Unknown"
                                          }`}
                                        >
                                          {({ ref, open }) => (
                                            <div
                                              ref={ref}
                                              onClick={open}
                                              className="w-full aspect-square flex items-center justify-center rounded-lg overflow-hidden cursor-pointer"
                                            >
                                              <img
                                                src={img}
                                                alt="Gallery"
                                                className="w-full h-full object-cover"
                                              />
                                            </div>
                                          )}
                                        </Item>
                                      );
                                    })}
                                  </div>
                                </Gallery>
                              </div>
                            )}
                            <button
                              onClick={() => handleBlacklist(report)}
                              className="border-2 border-customPink hover:bg-customPink flex gap-3"
                            >
                              <Ban className="h-5" /> Blacklist Escort
                            </button>
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

export default AdminReports;
