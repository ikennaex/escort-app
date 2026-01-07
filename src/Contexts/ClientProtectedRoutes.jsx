import { Navigate, Outlet } from "react-router-dom";
import Loader from "../Components/Loaders/Loader";
import { useClientAuth } from "./ClientAuthContext";

const ClientProtectedRoutes = () => {
  const {loading, isClientAuthenticated} = useClientAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center mx-auto h-screen w-screen">
        <Loader />
      </div>
    );
  }

  // Redirect to login if user is not authenticated
  return isClientAuthenticated ? <Outlet /> : <Navigate to="/login/as" replace />;
};

export default ClientProtectedRoutes;
