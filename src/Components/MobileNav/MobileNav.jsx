import {
    ArchiveBoxXMarkIcon,
  ArrowLeftStartOnRectangleIcon,
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
import React from 'react'
import { Link } from 'react-router'

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
    path: "/events",
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

const MobileNav = ({ isOpen, handleToggle }) => {
  return (
    <div className={`fixed inset-0 z-50 flex ${isOpen ? "visible" : "invisible"}`}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${isOpen ? "opacity-70" : "opacity-0"}`}
        onClick={handleToggle}
      />

      {/* Sidebar */}
      <div
        className={`
          relative bg-gray-800 w-2/4 max-w-xs h-full p-1 flex flex-col transform 
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close button */}
        <button
          onClick={handleToggle}
          className="self-end text-white text-2xl hover:text-gray-300 transition"
        >
          ✕
        </button>

        {/* Menu Links */}
        <nav className="flex flex-col gap-5 overflow-y-auto">
          {menu.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="text-white text-lg flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-pink-700 transition"
              onClick={handleToggle}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
