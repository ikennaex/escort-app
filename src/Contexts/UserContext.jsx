import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true)

  const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true, // allow refreshToken cookie
  });

  // attach token to requests
  api.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  // handle token expiry (auto refresh)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop if refresh itself fails
    if (originalRequest.url.includes("auth/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await api.post("auth/refresh");
        const newToken = res.data.accessToken;
        setAccessToken(newToken);

        // retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        logout();
      }
    }
    return Promise.reject(error);
  }
);


  // logout
  const logout = async () => {
    await api.post("/auth/logout");
    setAccessToken(null);
    setUser(null);
    setLoading(false)
  };

  // fetch profile if token available
  const fetchProfile = async () => {
    try {
      const res = await api.get("auth/profile");
      setUser(res.data);
    } catch (err) {
      console.error("Profile fetch failed:", err);
    }
  };

  // fetch profile whenever token changes
  useEffect(() => {
    if (accessToken) fetchProfile();
  }, [accessToken]);

  // auto refresh on app load
  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const res = await api.post("auth/refresh");
        setAccessToken(res.data.accessToken);
        await fetchProfile();
      } catch (err) {
        console.log("Auto refresh failed:", err.response?.data || err.message);
      } finally {
        setLoading(false)
      }
    };
    tryRefresh();
  }, []);

  return (
    <UserContext.Provider value={{ user, api, loading, setUser, logout, fetchProfile, setAccessToken }}>
      {children}
    </UserContext.Provider>
  );
};