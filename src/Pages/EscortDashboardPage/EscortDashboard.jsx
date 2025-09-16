import React, { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  Eye,
  Share,
  Menu,
  Newspaper,
  Play,
  BookImage,
  SquarePlay,
  User,
  Pencil,
  Calendar,
  Hand,
  Heart,
  Share2,
  Wallet,
  Gift,
  Rocket,
  Map,
  Ban,
  Landmark,
  ShoppingCart,
  Bed,
  CalendarDays,
  FileWarning,
  Gamepad,
  Lock,
  Power,
  Trash2,
  Activity,
} from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { baseUrl } from "../../baseUrl";
import { useNavigate } from "react-router";
import Loader from "../../Components/Loaders/Loader";

const EscortDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Menu"); // default tab
  const { user } = useContext(UserContext);
  const [bankDetails, setBankDetails] = useState();
  const [loading, setLoading] = useState(false);
  const { api } = useContext(UserContext);
  console.log(user);

  const getBankDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${baseUrl}escorts/bankdetails`);

      setBankDetails(response.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBankDetails();
  }, []);

  return (
    <div className="lg:flex min-h-screen bg-pink-200 text-white gap-5 justify-center">
      {/* {!user && <Loader />} */}
      <div className="lg:w-[38%] lg:mt-4 justify-center">
        <div className="rounded-xl bg-pink-100 p-4 flex flex-col gap-4 text-black">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH6gP2cXHCBfE3Q4snVK7RZuquprmqEBFHkg&s"
                alt="profile"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-lg">{user.displayName}</p>
                <p className="">@{user.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center ">
                <Eye className="w-4 h-4 mr-1" /> 0
              </div>
              <button className="flex items-center gap-1 bg-orange-100 text-orange-600 text-sm px-3 py-1 rounded-full">
                <Share className="w-4 h-4" /> Share
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 ">
              <Phone className="w-4 h-4 text-pink-500" />
              {user.phoneNumber}
            </div>
            <div className="flex items-center gap-2 ">
              <Mail className="w-4 h-4 text-pink-500" />
              {user.email}
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <div className="flex flex-col gap-2">
              {/* Top row */}
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Status</span>
                {user.isActive ? (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                    Active
                  </span>
                ) : (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs">
                    Inactive
                  </span>
                )}
              </div>

              {/* Explanations */}
              <div className="ml-7 text-xs text-gray-500 space-y-1">
                <p>Active – anyone can see your profile</p>
                <p>Inactive – no one can see your profile</p>
              </div>
            </div>
          </div>
        </div>

        {/**bank details */}
        {bankDetails ? (
          <div className="rounded-xl bg-pink-100 p-4 mt-4 flex flex-col gap-4 text-black">
            <p className="font-bold">Account Details</p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                {bankDetails.accountNumber}
              </div>
              <div className="flex items-center gap-2">
                {bankDetails.bankName}
              </div>
              <div className="flex items-center gap-2">
                {bankDetails.accountName}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl bg-pink-100 p-4 mt-4 flex flex-col gap-4 text-black">
            <Loader />
          </div>
        )}

        <div className="mt-5 rounded-xl bg-pink-100 p-4 flex flex-col gap-6 text-black">
          {/* BOOST Section */}
          <div className="flex justify-between items-center border-b pb-2">
            <p className="font-bold">BOOST</p>
            <p className="text-sm text-gray-500">0 Days left</p>
          </div>

          {/* AVAILABLE TODAY Section */}
          <div className="flex justify-between items-center border-b pb-2">
            <p className="font-bold">AVAILABLE TODAY</p>
            <p className="text-sm text-gray-500">0 Days left</p>
          </div>

          {/* Action Cards */}
          <div className="flex gap-4">
            {/* Boost My Profile */}
            <div className="flex-1 rounded-xl bg-pink-500 text-white p-4 flex flex-col justify-between">
              <div>
                <p className="font-bold">Boost My Profile</p>
                <p className="text-sm text-pink-100">
                  More chances to match with extra features.
                </p>
              </div>
              <button className="mt-4 border-2 border-yellow-400 text-yellow-400 font-bold rounded-full py-1 px-4">
                BOOST NOW - 100
              </button>
            </div>

            {/* Make Available Today */}
            <div className="flex-1 rounded-xl bg-green-500 text-white p-4 flex flex-col justify-between">
              <div>
                <p className="font-bold">Make Available Today</p>
                <p className="text-sm text-green-100">
                  More chances to match with extra features.
                </p>
              </div>
              <button className="mt-4 border-2 border-yellow-400 text-yellow-400 font-bold rounded-full py-1 px-4">
                AVAILABLE NOW - 100
              </button>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex justify-between items-center text-sm">
            <p className="text-pink-500">
              Last login at <span className="font-bold">10:50 AM · Mon</span>
            </p>
            <p className="text-gray-600">
              Registered on <span className="font-bold">Sep 15, 2025</span>
            </p>
          </div>
        </div>
      </div>

      <div className="lg:w-[58%] mt-4 rounded-xl h-fit bg-pink-100">
        <nav className="mx-3 rounded-lg bg-[#fff8f9] my-4 py-4 px-1">
          <ul className="flex gap-6 whitespace-nowrap px-4 text-gray-700">
            <div
              onClick={() => setActiveTab("Menu")}
              className="flex gap-1 items-center cursor-pointer"
            >
              <Menu className="h-4" />
              <li
                className={
                  activeTab === "Menu" ? "font-bold text-pink-600" : ""
                }
              >
                Menu
              </li>
            </div>

            <div
              onClick={() => setActiveTab("Timeline")}
              className="flex gap-1 items-center cursor-pointer"
            >
              <Newspaper className="h-4" />
              <li
                className={
                  activeTab === "Timeline" ? "font-bold text-pink-600" : ""
                }
              >
                Timeline
              </li>
              ·<p>0</p>
            </div>

            <div
              onClick={() => setActiveTab("Story")}
              className="flex gap-1 items-center cursor-pointer"
            >
              <Play className="h-4" />
              <li
                className={
                  activeTab === "Story" ? "font-bold text-pink-600" : ""
                }
              >
                Story
              </li>
              ·<p>0</p>
            </div>

            <div
              onClick={() => setActiveTab("Gallery")}
              className="flex gap-1 items-center cursor-pointer"
            >
              <BookImage className="h-4" />
              <li
                className={
                  activeTab === "Gallery" ? "font-bold text-pink-600" : ""
                }
              >
                Gallery
              </li>
              ·<p>0</p>
            </div>

            <div
              onClick={() => setActiveTab("Videos")}
              className="flex gap-1 items-center cursor-pointer"
            >
              <SquarePlay className="h-4" />
              <li
                className={
                  activeTab === "Videos" ? "font-bold text-pink-600" : ""
                }
              >
                Videos
              </li>
              ·<p>0</p>
            </div>
          </ul>
        </nav>

        {/* CONTENT */}
        <div className="bg-[#fff8f9] my-4 mx-3 p-4 text-black">
          {activeTab === "Menu" && (
            <>
              <p className="font-semibold mb-4">Menu</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {/* Item */}
                <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50">
                  <Link to={`/escorts/${user._id}`}>
                    <User className="h-8 w-8 text-pink-500" />
                    <p className="mt-2 text-sm">My Profile</p>
                  </Link>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50">
                  <Link to={`/escorts/edit/${user._id}`}>
                    <Pencil className="h-8 w-8 text-pink-500" />
                    <p className="mt-2 text-sm">Edit Profile</p>
                  </Link>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50">
                  <Link to={`/escorts/booking/${user._id}`}>
                    <Calendar className="h-8 w-8 text-pink-500" />
                    <p className="mt-2 text-sm">My Bookings</p>
                  </Link>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50">
                  <Link to={`/escorts/requests/${user._id}`}>
                    <Hand className="h-8 w-8 text-pink-500" />
                    <p className="mt-2 text-sm">My Requests</p>
                  </Link>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50">
                  <Link to={`/escorts/wallet/${user._id}`}>
                    <Wallet className="h-8 w-8 text-pink-500" />
                    <p className="mt-2 text-sm">My Wallet</p>
                  </Link>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50">
                  <Link to={`/escorts/gifts/${user._id}`}>
                    <Gift className="h-8 w-8 text-pink-500" />
                    <p className="mt-2 text-sm">My Gifts</p>
                  </Link>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50">
                  <Link to={`/escorts/boost-profile/${user._id}`}>
                    <Rocket className="h-8 w-8 text-pink-500" />
                    <p className="mt-2 text-sm">Boost Profile</p>
                  </Link>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50">
                  <Link to={`/escorts/blacklist/${user._id}`}>
                    <Ban className="h-8 w-8 text-pink-500" />
                    <p className="mt-2 text-sm">Blacklisted Client</p>
                  </Link>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50">
                  <Link to={`/escorts/bank/${user._id}`}>
                    <Landmark className="h-8 w-8 text-pink-500" />
                    <p className="mt-2 text-sm">Edit Bank Details</p>
                  </Link>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50">
                  <Link to={`/escorts/events/${user._id}`}>
                    <CalendarDays className="h-8 w-8 text-pink-500" />
                    <p className="mt-2 text-sm">My Events</p>
                  </Link>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50">
                  <Link to={`/escorts/reports/${user._id}`}>
                    <FileWarning className="h-8 w-8 text-pink-500" />
                    <p className="mt-2 text-sm">Pending Reports</p>
                  </Link>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50">
                  <Link to={`/escorts/change-password/${user._id}`}>
                    <Lock className="h-8 w-8 text-pink-500" />
                    <p className="mt-2 text-sm">Change Password</p>
                  </Link>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50">
                  <Link to={`/escorts/status/${user._id}`}>
                    <Activity className="h-8 w-8 text-green-500" />
                    <p className="mt-2 text-sm">Status</p>
                  </Link>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50">
                  <Power className="h-8 w-8 text-pink-500" />
                  <p className="mt-2 text-sm">Logout</p>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50">
                  <Trash2 className="h-8 w-8 text-red-500" />
                  <p className="mt-2 text-sm">Delete Profile</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EscortDashboard;
