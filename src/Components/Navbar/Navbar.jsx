import React, { useContext, useEffect, useState } from "react";
import {
  Bars3Icon,
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router";
import MobileNav from "../MobileNav/MobileNav";
import { UserContext } from "../../Contexts/UserContext";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { logo } from "../../../imports";
import FilterBox from "../FilterBox/FilterBox";
import { useClientAuth } from "../../Contexts/ClientAuthContext";
import { baseUrl } from "../../baseUrl";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, api } = useContext(UserContext);
  const { client } = useClientAuth();
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  let loggedUser = user || client;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handlePopUp = () => {
    setOpen(!open);
  };

  const getNotificationCount = async () => {
    try {
      const res = await api.get(`${baseUrl}notifications/count`);
      setUnreadCount(res.data.count)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNotificationCount();
  }, []);

  return (
    <div className="bg-customGray flex flex-col fixed left-0 top-0 w-full h-28 z-50 px-4 py-3 gap-3 justify-between">
      <FilterBox open={open} handlePopUp={handlePopUp} />
      {/* mobile menu to show on mobile view only */}

      <MobileNav isOpen={isOpen} handleToggle={handleToggle} />
      {/* Left side: Hamburger + Logo */}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div className="flex items-center gap-4 ">
          <Bars3Icon
            className="text-white h-8 cursor-pointer lg:hidden"
            onClick={handleToggle}
          />
          <Link to={"/"}>
            <img className="h-12" src={logo} alt="oscrovilla logo" />
          </Link>
        </div>

        {/* Right side: Icons + Buttons */}
        <div className="flex justify-between items-center gap-6">
          {/* Icons */}
          <div className="flex gap-3">
            <MagnifyingGlassIcon
              onClick={handlePopUp}
              className="text-white h-7 bg-customPink p-1 rounded-full cursor-pointer"
            />
            {/* <ChatBubbleOvalLeftEllipsisIcon className="text-white h-7 p-1 rounded-full bg-customPink" /> */}
            <Link to="/notifications" className="relative">
              <BellIcon className="text-white h-7 p-1 rounded-full bg-customPink" />

              {unreadCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-red-600 text-white text-xs 
      min-w-[18px] h-[18px] flex items-center justify-center 
      rounded-full font-semibold"
                >
                  {unreadCount}
                </span>
              )}
            </Link>
          </div>

          {/* Buttons */}
          {loggedUser ? (
            <Link
              to={
                loggedUser?.role === "client"
                  ? `/clientdashboard`
                  : loggedUser?.registrationComplete
                  ? `/escortdashboard/${loggedUser._id}`
                  : "#"
              }
            >
              <p className="flex items-center gap-2 text-md font-semibold text-white">
                {loggedUser?.gallery?.[0] ? (
                  <img
                    className="h-6 w-6 rounded-full"
                    src={user.gallery[0]}
                    alt="User avatar"
                  />
                ) : (
                  <UserCircleIcon className="w-6 h-6 text-customPink" />
                )}

                {"Hi " + (loggedUser?.username || "there")}
              </p>
            </Link>
          ) : (
            <div className="flex gap-3">
              <Link to={"/register-card"}>
                <button className="bg-transparent border border-customPink text-sm text-white px-3 py-1 rounded-xl">
                  Sign Up
                </button>
              </Link>
              <Link to={"/login/as"}>
                <button className="bg-customPink text-sm text-white px-3 py-1 rounded-xl">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
