import React from "react";
import Homepage from "./Pages/Homepage/Homepage";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Pages/Login/Login";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./Pages/Register/Register";
import RegisterCard from "./Pages/Register/RegisterCard";
import ClientRegister from "./Pages/Register/ClientRegister";
import EscortDetailsPage from "./Pages/EscortDetailsPage/EscortDetailsPage";
import AdminHome from "./Admin/Pages/AdminHome";
import SideNavbar from "./Components/SideNavbar/SideNavbar";
import AdminDashboard from "./Admin/Pages/AdminDashboard";
import AdminPending from "./Admin/Pages/AdminPending";
import AdminSettings from "./Admin/Pages/AdminSettings";

const App = () => {
  const location = useLocation();

  // Check if the current path starts with /admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex">
      {/* Side Navbar (only show if NOT admin) */}
      {!isAdminRoute && (
        <div className="lg:w-32 w-14 h-screen fixed top-0 left-0">
          <SideNavbar />
        </div>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 ${
          !isAdminRoute ? "lg:ml-32 ml-14" : ""
        } overflow-x-hidden`}
      >
        {/* Only show Navbar if not admin */}
        {!isAdminRoute && <Navbar />}

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-client" element={<ClientRegister />} />
          <Route path="/register-card" element={<RegisterCard />} />
          <Route path="/:id" element={<EscortDetailsPage />} />


          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/pending" element={<AdminPending />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
