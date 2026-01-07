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
  Wallet,
  Gift,
  Rocket,
  Ban,
  Landmark,
  CalendarDays,
  FileWarning,
  Lock,
  Power,
  Trash2,
  Activity,
  Plus,
  LocateIcon,
  LocationEditIcon,
} from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { baseUrl } from "../../baseUrl";
import { useNavigate } from "react-router";
import Loader from "../../Components/Loaders/Loader";
import { CheckBadgeIcon, StarIcon } from "@heroicons/react/24/solid";
import { format, formatDistanceToNow } from "date-fns";
import { Gallery, Item } from "react-photoswipe-gallery";
import imageCompression from "browser-image-compression";

const EscortDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Menu"); // default tab
  const { user } = useContext(UserContext);
  const [bankDetails, setBankDetails] = useState();
  const [loading, setLoading] = useState(false);
  const { api, setUser } = useContext(UserContext);
  const [subscriptionDetails, setSubscriptionDetails] = useState("");

  const handleNavigation = (path) => {
    if (!user.isActive) {
      alert("Your profile is not yet active");
      return;
    }
    navigate(path);
  };

  const getBankDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${baseUrl}escorts/bankdetails`);

      setBankDetails(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getSubcriptionDetails = async () => {
    try {
      const response = await api.get(
        `${baseUrl}escorts/premium/subscriptiondetails`
      );
      setSubscriptionDetails(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBankDetails();
    getSubcriptionDetails();
  }, []);

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    try {
      await api.post(`${baseUrl}auth/logout`);
      setUser(null);
      navigate("/login/as");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Something went wrong during logout");
    }
  };

  // handle image upload
  const handleImageUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const filesArray = Array.from(e.target.files);
    const formData = new FormData();

    for (let file of filesArray) {
      // Compress only if larger than 3MB
      if (file.size / 1024 / 1024 > 3) {
        file = await imageCompression(file, {
          maxSizeMB: 1, // compress to ~1MB
          maxWidthOrHeight: 1920, // resize if bigger
          useWebWorker: true, // faster compression
        });
      }

      formData.append("gallery", file);
    }

    try {
      setLoading(true);

      const response = await api.put(`${baseUrl}escortgallery`, formData);

      // Update user state immediately
      setUser((prev) => ({
        ...prev,
        gallery: response.data.gallery,
      }));
      toast.success("Upload successful", {
        autoClose: 3000,
        position: "top-right",
      });
    } catch (err) {
      toast.error("Upload failed", {
        autoClose: 3000,
        position: "top-right",
      });
      console.error("Upload failed:", err.response?.data || err.message);
    } finally {
      setLoading(false);
      e.target.value = ""; // reset input so same files can be reselected
    }
  };

  // handle image delete
  const handleDelete = async (imageUrl) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmed) return;

    try {
      const response = await api.delete(`${baseUrl}escortgallery`, {
        data: { escortId: user._id, imageUrl }, // send payload in "data"
      });

      setUser((prevUser) => ({
        ...prevUser,
        gallery: prevUser.gallery.filter((img) => img !== imageUrl),
      }));
    } catch (error) {
      console.error("Error deleting image:", error.response?.data);
    }
  };

  // delete profile
  const handleDeleteProfile = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your profile? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      await api.delete(`${baseUrl}escortdelete`);
      alert("Profile deleted successfully.");
      await api.post(`${baseUrl}auth/logout`);
      setUser(null);
      navigate("/");
      window.location.reload();
    } catch (err) {
      alert(err.response.data.message);
      console.error("Error deleting profile:", err.response?.data);
    }
  };

  const handleShare = async () => {
    const profileUrl = `${window.location.origin}/escorts/${user?._id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${user?.displayName}'s Profile`,
          text: `Check out ${user?.displayName}'s profile on our OscroVilla.com.`,
          url: profileUrl,
        });
      } catch (err) {
        console.error("Share canceled or failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(profileUrl);
        alert("Profile link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  // set correct dimension to images
  const [dimensions, setDimensions] = useState({});
  useEffect(() => {
    user?.gallery?.forEach((img, i) => {
      const image = new Image();
      image.src = img;
      image.onload = () => {
        setDimensions((prev) => ({
          ...prev,
          [i]: { width: image.naturalWidth, height: image.naturalHeight },
        }));
      };
    });
  }, [user?.gallery]);

  // if (user.isActive === false) {
  //   return (
  //     navigate("/")
  //   )
  // }

  return (
    <div className="lg:flex min-h-screen bg-pink-200 text-white gap-5 justify-center">
      {/* {!user && <Loader />} */}
      <div className="lg:w-[38%] lg:mt-4 justify-center">
        <div className="rounded-xl bg-pink-100 p-4 flex flex-col gap-4 text-black">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <img
                src={
                  user?.gallery?.[0]
                    ? user.gallery[0]
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH6gP2cXHCBfE3Q4snVK7RZuquprmqEBFHkg&s"
                }
                alt="profile"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-lg flex items-center gap-1">
                  {user.displayName}{" "}
                  <CheckBadgeIcon className="text-blue-500 h-4" />
                </p>
                <p className="text-sm">@{user.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center ">
                <Eye className="w-4 h-4 mr-1" /> {user.views || 0} views
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-1 bg-orange-100 text-orange-600 text-sm px-3 py-1 rounded-full"
              >
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

          {subscriptionDetails?.status === "active" && (
            <div className="flex gap-2 items-center">
              <StarIcon className="text-yellow-400 h-5" />
              <p className="font-bold text-customPink">Premium Escort</p>
            </div>
          )}
        </div>

        {/**bank details */}
        {/* {bankDetails ? (
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
        )} */}

        <div className="mt-5 rounded-xl bg-pink-100 p-4 flex flex-col gap-6 text-black">
          {/* BOOST Section */}
          <div className="flex justify-between items-center border-b pb-2">
            <p className="font-bold">PREMIUM</p>
            <p className="text-sm text-gray-500">
              {new Date(subscriptionDetails?.endDate) > new Date() ? (
                <span>Expires in </span>
              ) : (
                <span>Expired </span>
              )}

              {subscriptionDetails?.endDate
                ? formatDistanceToNow(new Date(subscriptionDetails?.endDate), {
                    addSuffix: true,
                  })
                : "No end date"}
            </p>
          </div>

          {/* AVAILABLE TODAY Section */}
          {/* <div className="flex justify-between items-center border-b pb-2">
            <p className="font-bold">AVAILABLE TODAY</p>
            <p className="text-sm text-gray-500">0 Days left</p>
          </div> */}

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
              <div
                onClick={() =>
                  handleNavigation(`/escorts/boost-profile/${user._id}`)
                }
              >
                <button className="mt-4 border-2 border-yellow-400 text-yellow-400 font-bold rounded-full py-1 px-4">
                  BOOST NOW
                </button>
              </div>
            </div>

            {/* Make Available Today */}
            {/* <div className="flex-1 rounded-xl bg-green-500 text-white p-4 flex flex-col justify-between">
              <div>
                <p className="font-bold">Make Available Today</p>
                <p className="text-sm text-green-100">
                  More chances to match with extra features.
                </p>
              </div>
              <button className="mt-4 border-2 border-yellow-400 text-yellow-400 font-bold rounded-full py-1 px-4">
                AVAILABLE NOW - 100
              </button>
            </div> */}
          </div>

          {/* Footer Section */}
          <div className="flex flex-wrap justify-between items-center text-sm">
            <p className="text-pink-500">
              Last login at{" "}
              <span className="font-bold">
                {" "}
                {user?.lastLogin
                  ? format(new Date(user?.lastLogin), "MMM d, yyyy h:mm a")
                  : "—"}
              </span>
            </p>
            <p>
              Registered on{" "}
              <span className="font-bold">
                {user?.createdAt
                  ? format(new Date(user.createdAt), "MMM d, yyyy h:mm a")
                  : "—"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="lg:w-[58%] mt-4 rounded-xl h-fit bg-pink-100">
        <nav className="rounded-lg bg-[#fff8f9] lg:h-fit my-4 py-4 px-2 shrink-0">
          <ul className="flex overflow-x-auto gap-6 px-2 text-gray-700 scrollbar-hidden">
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

            {/* <div
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
            </div> */}

            {/* <div
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
            </div> */}

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
              ·<p>{user?.gallery?.length}</p>
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
                <div
                  onClick={() => handleNavigation(`/escorts/${user._id}`)}
                  className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50"
                >
                  <User className="h-8 w-8 text-pink-500" />
                  <p className="mt-2 text-sm">My Profile</p>
                </div>

                <div
                  onClick={() => handleNavigation(`/escorts/edit/${user._id}`)}
                  className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50"
                >
                  <Pencil className="h-8 w-8 text-pink-500" />
                  <p className="mt-2 text-sm">Edit Profile</p>
                </div>

                <div
                  onClick={() =>
                    handleNavigation(`/escorts/edit-location/${user._id}`)
                  }
                  className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50"
                >
                  <LocationEditIcon className="h-8 w-8 text-pink-500" />
                  <p className="mt-2 text-sm">Edit Location</p>
                </div>

                <div
                  onClick={() =>
                    handleNavigation(`/escorts/booking/${user._id}`)
                  }
                  className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50"
                >
                  <Calendar className="h-8 w-8 text-pink-500" />
                  <p className="mt-2 text-sm">My Bookings</p>
                </div>

                {/* <div
                  onClick={() =>
                    handleNavigation(`/escorts/requests/${user._id}`)
                  }
                  className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50"
                >
                  <Hand className="h-8 w-8 text-pink-500" />
                  <p className="mt-2 text-sm">My Requests</p>
                </div> */}

                <div
                  onClick={() =>
                    handleNavigation(`/escorts/boost-profile/${user._id}`)
                  }
                  className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50"
                >
                  <Rocket className="h-8 w-8 text-pink-500" />
                  <p className="mt-2 text-sm">Boost Profile</p>
                </div>

                <div
                  onClick={() =>
                    handleNavigation(`/escorts/blacklist/${user._id}`)
                  }
                  className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50"
                >
                  <Ban className="h-8 w-8 text-pink-500" />
                  <p className="mt-2 text-sm">Blacklisted Client</p>
                </div>

                {/* <div
              onClick={() => handleNavigation(`/escorts/bank/${user._id}`)}
              className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50"
            >
              <Landmark className="h-8 w-8 text-pink-500" />
              <p className="mt-2 text-sm">Edit Bank Details</p>
            </div> */}

                {/* <div
                  onClick={() =>
                    handleNavigation(`/escorts/events/${user._id}`)
                  }
                  className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50"
                >
                  <CalendarDays className="h-8 w-8 text-pink-500" />
                  <p className="mt-2 text-sm">My Events</p>
                </div> */}

                {/* <div
                  onClick={() =>
                    handleNavigation(`/escorts/reports/${user._id}`)
                  }
                  className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50"
                >
                  <FileWarning className="h-8 w-8 text-pink-500" />
                  <p className="mt-2 text-sm">Pending Reports</p>
                </div> */}

                <div
                  onClick={() =>
                    handleNavigation(`/escorts/change-password/${user._id}`)
                  }
                  className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50"
                >
                  <Lock className="h-8 w-8 text-pink-500" />
                  <p className="mt-2 text-sm">Change Password</p>
                </div>

                {/* <div
                  onClick={() =>
                    handleNavigation(`/escorts/status/${user._id}`)
                  }
                  className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50"
                >
                  <Activity className="h-8 w-8 text-green-500" />
                  <p className="mt-2 text-sm">Status</p>
                </div> */}

                <div
                  onClick={handleLogout}
                  className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50"
                >
                  <Power className="h-8 w-8 text-pink-500" />
                  <p className="mt-2 text-sm">Logout</p>
                </div>

                <div
                  onClick={handleDeleteProfile}
                  className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:bg-pink-50"
                >
                  <Trash2 className="h-8 w-8 text-red-500" />
                  <p className="mt-2 text-sm">Delete Profile</p>
                </div>
              </div>
            </>
          )}

          <div className="text-black">
            {activeTab === "Gallery" && user.isActive !== false && (
              <Gallery withDownloadButton withZoomButton withFullscreenButton>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
                  <label className="bg-customPink flex items-center justify-center gap-2 py-2 px-4 rounded-lg cursor-pointer hover:opacity-90 transition">
                    <Plus className="h-5 text-white" />
                    <p className="text-white">Add Image</p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                  {user?.gallery.map((img, index) => {
                    const dim = dimensions[index] || {
                      width: 1024,
                      height: 768,
                    };

                    return (
                      <Item
                        key={index}
                        original={img}
                        thumbnail={img}
                        width={dim.width}
                        height={dim.height}
                        caption={`Photo ${index + 1} of ${user?.displayName}`}
                      >
                        {({ ref, open }) => (
                          <div
                            ref={ref}
                            onClick={open}
                            className="relative w-full aspect-square border-2 border-dotted border-pink-400 rounded-lg overflow-hidden cursor-pointer group"
                          >
                            <img
                              src={img}
                              alt="Gallery"
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation(); // prevents triggering open()
                                  handleDelete(img); // your delete function
                                }}
                                className="bg-red-500 text-white text-sm px-3 py-1 rounded-md hover:bg-red-600 transition"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </Item>
                    );
                  })}
                </div>
              </Gallery>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscortDashboard;
