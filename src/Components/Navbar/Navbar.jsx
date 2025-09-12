import React, { useContext, useState } from "react";
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-customGray flex-col sticky top-0 z-50 h-22 px-4 py-3 flex gap-3 justify-between">
      {/* mobile menu to show on mobile view only */}

      <MobileNav isOpen={isOpen} handleToggle={handleToggle} />
      {/* Left side: Hamburger + Logo */}
      <div className="flex items-center gap-3">
        <Bars3Icon
          className="text-white h-8 cursor-pointer lg:hidden"
          onClick={handleToggle}
        />
        <Link to={"/"}>
          <h1 className="text-xl text-white font-bold">OS Villa</h1>
        </Link>
      </div>

      {/* Right side: Icons + Buttons */}
      <div className="flex justify-between items-center gap-6">
        {/* Icons */}
        <div className="flex gap-3">
          <MagnifyingGlassIcon className="text-white h-7 bg-customPink p-1 rounded-full" />
          <ChatBubbleOvalLeftEllipsisIcon className="text-white h-7 p-1 rounded-full bg-customPink" />
          <BellIcon className="text-white h-7 p-1 rounded-full bg-customPink" />
        </div>

        {/* Buttons */}
        {user ? (
          <p className="flex items-center gap-2 text-md font-semibold text-white">
            <UserCircleIcon className="w-6 h-6 text-customPink" />
            {"Hi " + user?.username}
          </p>
        ) : (
          <div className="flex gap-3">
            <Link to={"/register-card"}>
              <button className="border border-customPink text-sm text-white px-3 py-1 rounded-xl">
                Sign Up
              </button>
            </Link>
            <Link to={"/login"}>
              <button className="bg-customPink text-sm text-white px-3 py-1 rounded-xl">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
