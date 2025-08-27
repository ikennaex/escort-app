import React from "react";
import Homepage from "./Pages/Homepage/Homepage";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./Pages/Register/Register";
import RegisterCard from "./Pages/Register/RegisterCard";
import ClientRegister from "./Pages/Register/ClientRegister";
import EscortDetailsPage from "./Pages/EscortDetailsPage/EscortDetailsPage";
import SideNavbar from "./Components/SideNavbar/SideNavbar";

const App = () => {
  return (
<div className="flex">
  {/* Side Navbar */}
  <div className="lg:w-32 w-full h-screen fixed top-0 left-0">
    <SideNavbar />
  </div>

  {/* Main Content (shifted to the right of the sidebar) */}
  <div className="flex-1 lg:ml-32 ml-10 overflow-x-hidden">
    <Navbar />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register-client" element={<ClientRegister />} />
      <Route path="/register-card" element={<RegisterCard />} />
      <Route path="/:id" element={<EscortDetailsPage />} />
    </Routes>
  </div>
</div>

  );
};

export default App;
