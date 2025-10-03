import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loaders/Loader";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [adminAccessToken, setAdminAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true, // send cookies (refreshToken)
  });

  // Attach token to requests
  api.interceptors.request.use((config) => {
    if (adminAccessToken) {
      config.headers.Authorization = `Bearer ${adminAccessToken}`;
    }
    return config;
  });

  // Auto-refresh expired access token
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (originalRequest.url.includes("admin/refresh")) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const res = await api.post("admin/refresh");
          const newToken = res.data.adminAccessToken; // ✅ match backend
          setAdminAccessToken(newToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (err) {
          console.error("Admin token refresh failed:", err);
          logout();
        }
      }
      return Promise.reject(error);
    }
  );

  // Logout
  const logout = async () => {
    try {
      await api.post("admin/logout");
    } catch (err) {
      console.error("Admin logout error:", err.message);
    }
    setAdminAccessToken(null);
    setAdmin(null);
    setLoading(false);
    navigate("/admin/login");
  };

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const res = await api.get("admin/profile");
      setAdmin(res.data);
    } catch (err) {
      console.error("Admin profile fetch failed:", err);
      setAdmin(null);
    }
  };

  // Try refresh on load
  useEffect(() => {
    const tryRefresh = async () => {
      try {
        setLoading(true);
        const res = await api.post("admin/refresh");
        console.log(res)
        setAdminAccessToken(res.data.adminAccessToken);
      } catch (err) {
        console.log("Admin auto refresh failed:", err.response?.data || err.message);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };
    tryRefresh();
  }, []);

  // Fetch profile when token changes
  useEffect(() => {
    if (adminAccessToken) fetchProfile();
  }, [adminAccessToken]);

  return (
    <AdminContext.Provider
      value={{ admin, api, loading, setAdmin, logout, fetchProfile, setAdminAccessToken }}
    >
      {loading ? <div className="h-screen mx-auto flex justify-center items-center my-auto"><Loader /></div> : children}
    </AdminContext.Provider>
  );
};
