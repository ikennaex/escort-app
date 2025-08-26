import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import SlideNavbar from "./Components/SideNavbar/SlideNavbar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Below Navbar: Sidebar + Page Content */}
      <div className="flex flex-1">
        <SlideNavbar />

        {/* Routed pages appear here */}
        <main className="flex-1 p-4 ml-60 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};


export default Layout;