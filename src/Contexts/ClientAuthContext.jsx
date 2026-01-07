import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { baseUrl } from "../baseUrl";

const ClientAuthContext = createContext(null);

export const ClientAuthProvider = ({ children }) => {
  // 1. HYDRATE STATE FROM LOCAL STORAGE
  const [clientAccessToken, setClientAccessTokenState] = useState(() =>
    localStorage.getItem("clientAccessToken")
  );

  const [client, setClient] = useState(() => {
    const storedClient = localStorage.getItem("client");
    return storedClient ? JSON.parse(storedClient) : null;
  });

  const [loading, setLoading] = useState(true);

  const isClientAuthenticated = !!clientAccessToken;

  // 2. PERSIST ACCESS TOKEN
  useEffect(() => {
    if (clientAccessToken) {
      localStorage.setItem("clientAccessToken", clientAccessToken);
    } else {
      localStorage.removeItem("clientAccessToken");
    }
  }, [clientAccessToken]);

  // 3. PERSIST CLIENT
  useEffect(() => {
    if (client) {
      localStorage.setItem("client", JSON.stringify(client));
    } else {
      localStorage.removeItem("client");
    }
  }, [client]);

  // 4. MEMOIZED AXIOS INSTANCE WITH AUTH HEADER
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: baseUrl,
    });

    instance.interceptors.request.use(
      (config) => {
        if (clientAccessToken) {
          config.headers.Authorization = `Bearer ${clientAccessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return instance;
  }, [clientAccessToken]);

  // 5. REVALIDATE CLIENT ON APP LOAD / REFRESH
  useEffect(() => {
    const revalidateClient = async () => {
      if (!clientAccessToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/api/client/profile");
        setClient(res.data.data);
      } catch (err) {
        console.error("Client validation failed", err);

        // HARD LOGOUT ONLY IF TOKEN IS INVALID
        if (err.response?.status === 401) {
          setClientAccessTokenState(null);
          setClient(null);
        }
      } finally {
        setLoading(false);
      }
    };

    revalidateClient();
  }, [clientAccessToken, api]);

  // 6. SAFE TOKEN SETTER
  const setClientAccessToken = (token) => {
    setClientAccessTokenState(token);
    if (!token) {
      setClient(null);
    }
  };

  // 7. LOGOUT
  const logoutClient = () => {
    setClientAccessTokenState(null);
    setClient(null);
  };

  return (
    <ClientAuthContext.Provider
      value={{
        clientAccessToken,
        setClientAccessToken,
        client,
        setClient,
        isClientAuthenticated,
        api,
        loading,
        logoutClient,
      }}
    >
      {children}
    </ClientAuthContext.Provider>
  );
};

export const useClientAuth = () => {
  const context = useContext(ClientAuthContext);
  if (!context) {
    throw new Error(
      "useClientAuth must be used within a ClientAuthProvider"
    );
  }
  return context;
};
