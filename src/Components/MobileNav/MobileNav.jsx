import { ArrowLeftStartOnRectangleIcon, Cog6ToothIcon, HomeIcon, UserIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Link } from 'react-router'

const menu = [
  { name: "Home", path: "/", icon: <HomeIcon className="h-5" /> },
  { name: "Profile", path: "/profile", icon: <UserIcon className="h-5" /> },
  { name: "Settings", path: "/settings", icon: <Cog6ToothIcon className="h-5" /> },
  { name: "Logout", path: "/logout", icon: <ArrowLeftStartOnRectangleIcon className="h-5" /> },
]

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
          relative bg-gray-800 w-3/4 max-w-xs h-full p-6 flex flex-col transform 
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
        <nav className="mt-6 flex flex-col gap-5">
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-white text-lg flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-pink-700 transition"
              onClick={handleToggle}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
