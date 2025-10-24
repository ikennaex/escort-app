import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Homepage from "./Pages/Homepage/Homepage";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Pages/Login/Login";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./Pages/Register/Register";
import RegisterCard from "./Pages/Register/RegisterCard";
import ClientRegister from "./Pages/Register/ClientRegister";
import EscortDetailsPage from "./Pages/EscortDetailsPage/EscortDetailsPage";
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
import AdminProtectedRoute from "./Contexts/AdminProtectedRoute";
import VerificationImage from "./Pages/Register/Escorts/VerificationImage";
import EscortDashboard from "./Pages/EscortDashboardPage/EscortDashboard";
import { FormProvider } from "./Contexts/FormContext";
import ScrollToTop from "./Components/ScrollToTop";
import EscortBankDetailsPage from "./Pages/EscortBankDetailsPage/EscortBankDetailsPage";
import EscortEditPage from "./Pages/EscortEditPage/EscortEditPage";
import EscortChangePasswordPage from "./Pages/EscortChangePasswordPage/EscortChangePasswordPage";
import EscortFeed from "./Pages/EscortFeed/EscortFeed";
import EscortAdverts from "./Pages/EscortAdverts/EscortAdverts";
import EscortEvents from "./Pages/EscortEvents/EscortEvents";
import NaughtyVideos from "./Pages/NaughtyVideos/NaughtyVideos";
import EscortRooms from "./Pages/EscortRooms/EscortRooms";
import EscortReviews from "./Pages/EscortReviews/EscortReviews";
import EscortBlacklisted from "./Pages/EscortBlacklisted/EscortBlacklisted";
import EscortBlog from "./Pages/EscortBlog/EscortBlog";
import EscortTestimonials from "./Pages/EscortTestimonials/EscortTestimonials";
import EscortFAQS from "./Pages/EscortFAQS/EscortFAQS";
import EscortContactAdmin from "./Pages/EscortContactAdmin/EscortContactAdmin";
import EscortSetting from "./Pages/EscortSettings/EscortSetting";
import EscortNotifications from "./Pages/EscortNotifications/EscortNotifications";
import FilteredEscorts from "./Pages/FilteredEscorts/FilteredEscorts";
import EscortBoostProfile from "./Pages/EscortBoostProfile/EscortBoostProfile";
import EscortBankPay from "./Pages/EscortPaymentMethods/EscortBankPay/EscortBankPay";
import EscortCryptoPay from "./Pages/EscortPaymentMethods/EscortCryptoPay/EscortCryptoPay";
import AdminEscorts from "./Admin/Pages/AdminEscorts";
import AdminEscortDetails from "./Admin/Pages/AdminEscortDetails";
import AdminLogin from "./Admin/Pages/AdminLogin";
import { AdminContextProvider } from "./Contexts/AdminContext";
import AdminReports from "./Admin/Pages/AdminReports";
import AdminBlacklistedEscorts from "./Admin/Pages/AdminBlacklistedEscorts";
import AdminPremiumRequests from "./Admin/Pages/AdminPremiumRequests";
import EscortBlacklistDetails from "./Pages/EscortBlacklistDetails/EscortBlacklistDetails";

const App = () => {
  const location = useLocation();
  // for navbar
  const [collapsed, setCollapsed] = useState(false);

  // Check if the current path starts with /admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <FormProvider>
      <ScrollToTop />
      <div className="flex">
        {/* Side Navbar (only show if NOT admin) */}
        {!isAdminRoute && (
          <div className="hidden lg:block lg:w-32 w-14 h-screen fixed top-0 left-0">
            <SideNavbar collapsed={collapsed} setCollapsed={setCollapsed} />
          </div>
        )}

        {/* Main Content */}
        <div
          className={`flex-1 overflow-x-hidden transition-all duration-300 ${
            !isAdminRoute
              ? collapsed
                ? "lg:ml-16" // smaller margin when collapsed
                : "lg:ml-32" // full margin when expanded
              : ""
          }`}
        >
          {/* Only show Navbar if not admin */}
          {!isAdminRoute && <Navbar />}

          <div className="pt-28">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register-client" element={<ClientRegister />} />
              <Route path="/register-escort" element={<EscortRegister />} />
              <Route path="/register-card" element={<RegisterCard />} />
              <Route path="/feed" element={<EscortFeed />} />
              <Route path="/adverts" element={<EscortAdverts />} />
              <Route path="/events" element={<EscortEvents />} />
              <Route path="/naughtyvideos" element={<NaughtyVideos />} />
              <Route path="/rooms" element={<EscortRooms />} />
              <Route path="/reviews" element={<EscortReviews />} />
              <Route path="/blacklisted" element={<EscortBlacklisted />} />
              <Route path="/blogs" element={<EscortBlog />} />
              <Route path="/testimonials" element={<EscortTestimonials />} />
              <Route path="/faqs" element={<EscortFAQS />} />
              <Route path="/contact-admin" element={<EscortContactAdmin />} />
              <Route path="/settings" element={<EscortSetting />} />
              <Route path="/notifications" element={<EscortNotifications />} />
              <Route path="/search" element={<FilteredEscorts />} />

              <Route element={<ProtectedRoutes />}>
                {/* escort dashboard  */}
                <Route
                  path="/escortdashboard/:id"
                  element={<EscortDashboard />}
                />

                {/* Boost profile  */}
                <Route
                  path="/escorts/boost-profile/:id"
                  element={<EscortBoostProfile />}
                />
                <Route path="/escorts/bankpay" element={<EscortBankPay />} />
                <Route
                  path="/escorts/cryptopay"
                  element={<EscortCryptoPay />}
                />
              </Route>

              {/* Onboarding Routes */}
              <Route path="/escort-details" element={<AdditionalDetails />} />
              <Route path="/escort-services" element={<Services />} />
              <Route path="/escort-rates" element={<Rates />} />
              <Route path="/escort-gallery" element={<Gallery />} />
              <Route
                path="/escort-verification"
                element={<VerificationImage />}
              />

              {/* Escort Dashboard   */}
              <Route
                path="/escorts/bank/:id"
                element={<EscortBankDetailsPage />}
              />
              <Route
                path="/escorts/change-password/:id"
                element={<EscortChangePasswordPage />}
              />
              <Route path="/escorts/:id" element={<EscortDetailsPage />} />
              <Route path="/escorts/edit/:id" element={<EscortEditPage />} />

              {/* blacklisted escorts details page */}
              <Route path="blacklist/:id" element={<EscortBlacklistDetails />} />

              {/* Admin  */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route element={<AdminProtectedRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/premium" element={<AdminPremiumUsers />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/reports" element={<AdminReports />} />
                <Route path="/admin/blacklist" element={<AdminBlacklistedEscorts />} />
                <Route path="/admin/premium-requests" element={<AdminPremiumRequests />} />
                <Route
                  path="/admin/subscriptions"
                  element={<AdminPayments />}
                />
                <Route path="/admin/escorts" element={<AdminEscorts />} />
                <Route
                  path="/admin/escort/:id"
                  element={<AdminEscortDetails />}
                />
                <Route path="/admin/pending" element={<AdminPending />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route
                  path="/admin/pending/:id"
                  element={<AdminPendingApprovalDetails />}
                />
                <Route path="/admin/user/:id" element={<AdminUserDetails />} />
              </Route>
            </Routes>
          </div>
          <ToastContainer />
        </div>
      </div>
    </FormProvider>
  );
};

export default App;
