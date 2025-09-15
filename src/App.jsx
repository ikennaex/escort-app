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
import EscortRegister from "./Pages/Register/Escorts/EscortRegister";
import AdditionalDetails from "./Pages/Register/Escorts/AdditionalDetails";
import AdminUsers from "./Admin/Pages/AdminUsers";
import AdminPayments from "./Admin/Pages/AdminPayments";
import AdminPremiumUsers from "./Admin/Pages/AdminPremiumUsers";
import Services from "./Pages/Register/Escorts/Services";
import Rates from "./Pages/Register/Escorts/Rates";
import Gallery from "./Pages/Register/Escorts/Gallery";
import AdminPendingApprovalDetails from "./Admin/Pages/AdminPendingApprovalDetails";
import AdminUserDetails from "./Admin/Pages/AdminUserDetails";
import ProtectedRoutes from "./Contexts/ProtectedRoutes";
import VerificationImage from "./Pages/Register/Escorts/VerificationImage";
import EscortDashboard from "./Pages/EscortDashboardPage/EscortDashboard";
import { FormProvider } from "./Contexts/FormContext";
import ScrollToTop from "./Components/ScrollToTop";
import EscortBankDetailsPage from "./Pages/EscortBankDetailsPage/EscortBankDetailsPage";
import EscortEditPage from "./Pages/EscortEditPage/EscortEditPage";

const App = () => {
  const location = useLocation();

  // Check if the current path starts with /admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
      <FormProvider>
        <ScrollToTop />
        {" "}
        {/* provides form state  */}
        <div className="flex">
          {/* Side Navbar (only show if NOT admin) */}
          {!isAdminRoute && (
            <div className="hidden lg:block lg:w-32 w-14 h-screen fixed top-0 left-0">
              <SideNavbar />
            </div>
          )}

          {/* Main Content */}
          <div
            className={`flex-1 ${
              !isAdminRoute ? "lg:ml-32" : ""
            } overflow-x-hidden`}
          >
            {/* Only show Navbar if not admin */}
            {!isAdminRoute && <Navbar />}

            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register-client" element={<ClientRegister />} />
              <Route path="/register-escort" element={<EscortRegister />} />
              <Route path="/register-card" element={<RegisterCard />} />
              <Route path="/escorts/:id" element={<EscortDetailsPage />} />
              <Route path="/escorts/edit/:id" element={<EscortEditPage />} />

              <Route element={<ProtectedRoutes />}>
                {/* escort dashboard  */}
                <Route
                  path="/escortdashboard/:id"
                  element={<EscortDashboard />}
                />
              </Route>

              {/* Onboarding Routes */}a
              <Route path="/escort-details" element={<AdditionalDetails />} />
              <Route path="/escort-services" element={<Services />} />
              <Route path="/escort-rates" element={<Rates />} />
              <Route path="/escort-gallery" element={<Gallery />} />
              <Route path="/escorts/bank/:id" element={<EscortBankDetailsPage />} />
              <Route
                path="/escort-verification"
                element={<VerificationImage />}
              />

              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/premium" element={<AdminPremiumUsers />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/payments" element={<AdminPayments />} />
              <Route path="/admin/pending" element={<AdminPending />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route
                path="/admin/pending/:id"
                element={<AdminPendingApprovalDetails />}
              />
              <Route path="/admin/user/:id" element={<AdminUserDetails />} />
            </Routes>
          </div>
        </div>
      </FormProvider>
  );
};

export default App;
