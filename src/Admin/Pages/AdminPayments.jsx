import React from "react";
import AdminSidebar from "../Components/AdminSidebar";
import { baseUrl } from "../../baseUrl";
import { useEffect } from "react";
import { useState } from "react";
import { format } from "date-fns";
import { PlusIcon } from "lucide-react";
import { AdminContext } from "../../Contexts/AdminContext";
import { useContext } from "react";
import { Link } from "react-router";

const AdminPayments = () => {
  const {api} = useContext(AdminContext)
  const [subscriptionDetails, setSubscriptionDetails] = useState([]);
  const getSubscriptions = async () => {
    try {
      const response = await api.get(`${baseUrl}admin/subscriptiondetails`);
      setSubscriptionDetails(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  const [search, setSearch] = useState("");

  const filteredSubscriptions = subscriptionDetails.filter(
    (sub) =>
      sub.user?.username?.toLowerCase().includes(search.toLowerCase()) ||
      sub.user?.displayName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex text-white  mx-auto">
      <AdminSidebar />
      <div className="flex-1 p-3 md:p-6 md:ml-64 mx-auto">
        <div className="flex justify-between">
        <h1 className="text-2xl font-bold md:mt-0 mt-12 mb-6">
          Premium Subscriptions
        </h1>

        <div className="">
          <button className="bg-customPink py-3 flex items-center gap-2">
            <PlusIcon className="h-4 text-white" />
          Make User Premium
          </button>
        </div>

        </div>

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
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Display Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Username
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Plan
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Start Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  End Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Transaction ID
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-700 hover:bg-gray-700 transition cursor-pointer"
                >
                  <td className="px-4 py-3">
                    <Link to={`/admin/escort/${user.user._id}`}>
                    {user.user.displayName}
                    </Link>
                    
                    </td>
                  <td className="px-4 py-3 text-gray-300">
                    @{user.user.username}
                  </td>
                  <td className="px-4 py-3">NGN {user.amount}</td>
                  <td className="px-4 py-3">{user.plan}</td>
                  <td className="px-4 py-3">
                    {format(new Date(user?.startDate), "MMMM d, yyyy")}
                  </td>
                  <td className="px-4 py-3">
                    {format(new Date(user?.endDate), "MMMM d, yyyy")}
                  </td>
                  <td className="px-4 py-3">{user.transactionRef}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;
