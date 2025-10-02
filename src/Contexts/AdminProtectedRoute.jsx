import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../Components/Loaders/Loader";
import { AdminContext } from "./AdminContext";

const AdminProtectedRoutes = () => {
  const { admin, loading } = useContext(AdminContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader />
      </div>
    );
  }

  // Redirect to login if user is not authenticated
  return admin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoutes;
