import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { UserContextProvider } from "./Contexts/UserContext.jsx";
import { AdminContextProvider } from "./Contexts/AdminContext.jsx";
import { ClientAuthProvider } from "./Contexts/ClientAuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <AdminContextProvider>
          <ClientAuthProvider>
            <App />
          </ClientAuthProvider>
        </AdminContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>
);
