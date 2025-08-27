import {
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import React from "react";

const menu = [
  {
    icon: <HomeIcon className="h-5" />,
    title: "Home",
    path: "/",
  },
  {
    icon: <UserIcon className="h-5" />,
    title: "Profile",
    path: "/profile",
  },
  {
    icon: <Cog6ToothIcon className="h-5" />,
    title: "Settings",
    path: "/settings",
  },
  {
    icon: <ArrowLeftStartOnRectangleIcon className="h-5" />,
    title: "Logout",
    path: "/logout",
  },
];

const SideNavbar = () => {
  return (
    <div className="bg-customGray h-full w-full">
      <h2 className="hidden lg:block text-white text-lg font-bold p-4">Menu</h2>
      <ul>
        {menu.map((item) => (
          <div className="flex items-center gap-1 text-white p-4 text-sm hover:bg-customPink" key={item.title}>
            <div>{item.icon}</div>
            <li className="hidden lg:block">
               {item.title}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SideNavbar;
