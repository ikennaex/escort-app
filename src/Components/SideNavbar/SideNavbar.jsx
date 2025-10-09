import {
  ArchiveBoxXMarkIcon,
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
  CalendarDaysIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  HandThumbUpIcon,
  HomeIcon,
  MegaphoneIcon,
  PencilSquareIcon,
  PhotoIcon,
  QuestionMarkCircleIcon,
  UserIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import { BedSingleIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

const SideNavbar = ({collapsed, setCollapsed}) => {
  const { user } = useContext(UserContext);

  const menu = [
    {
      icon: <HomeIcon className="h-5" />,
      title: "Home",
      path: "/",
    },
    {
      icon: <UserIcon className="h-5" />,
      title: "Profile",
      path: `/escorts/${user?._id}`,
    },
    {
      icon: <PhotoIcon className="h-5" />,
      title: "Feed",
      path: "/feed",
    },
    {
      icon: <MegaphoneIcon className="h-5" />,
      title: "Adverts",
      path: "/adverts",
    },
    {
      icon: <CalendarDaysIcon className="h-5" />,
      title: "Events",
      path: "/events",
    },
    {
      icon: <VideoCameraIcon className="h-5" />,
      title: "Naughty Videos",
      path: "/naughtyvideos",
    },
    {
      icon: <BedSingleIcon className="h-5" />,
      title: "Rooms",
      path: "/rooms",
    },
    {
      icon: <ChatBubbleLeftRightIcon className="h-5" />,
      title: "Reviews",
      path: "/reviews",
    },
    {
      icon: <ArchiveBoxXMarkIcon className="h-5" />,
      title: "Blacklisted",
      path: "/blacklisted",
    },
    {
      icon: <PencilSquareIcon className="h-5" />,
      title: "Blogs",
      path: "/blogs",
    },
    {
      icon: <HandThumbUpIcon className="h-5" />,
      title: "Testimonials",
      path: "/testimonials",
    },
    {
      icon: <QuestionMarkCircleIcon className="h-5" />,
      title: "FAQs",
      path: "/faqs",
    },
    {
      icon: <ChatBubbleBottomCenterIcon className="h-5" />,
      title: "Contact Admin",
      path: "/contact-admin",
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

  return (
    <div
      className={`bg-customGray mt-24 overflow-y-auto py-6 scrollbar-hidden h-full ${
        collapsed ? "w-16" : "w-full"
      }`}
    >
      {/* Toggle Button */}
      <Bars3Icon
        className="text-white h-6 cursor-pointer px-4"
        onClick={() => setCollapsed(!collapsed)}
      />

      <ul>
        {menu.map((item) => (
          <Link to={item.path} key={item.title}>
            <div className="flex items-center gap-1 text-white p-4 text-sm hover:bg-customPink cursor-pointer">
              <div>{item.icon}</div>
              {/* Only hide/show title on toggle */}
              {!collapsed && <li className="hidden lg:block">{item.title}</li>}
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SideNavbar;
