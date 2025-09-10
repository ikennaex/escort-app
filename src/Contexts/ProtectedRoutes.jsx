import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../Components/Loaders/Loader";

const ProtectedRoutes = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader />
      </div>
    );
  }

  // Redirect to login if user is not authenticated
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
