import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Loader from "../Components/Loaders/Loader";

const ProtectedRoutes = () => {
    const { user, loading } = useContext(UserContext);
    const navigate = useNavigate()

    if (loading) {
        // Optionally show a loader while checking auth
        return <div><Loader /></div>;
    }

    // Redirect to login if user is not authenticated
    return user ? <Outlet /> : navigate("/login");
};

export default ProtectedRoutes;