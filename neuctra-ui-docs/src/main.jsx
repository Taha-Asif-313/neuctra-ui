import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthixProvider } from "@neuctra/authix";
import { Authix } from "./layouts/blog/utils/neuctraAuthix.js";
import { AdminProvider } from "./layouts/blog/contexts/AdminContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthixProvider authix={Authix}>
      <ThemeProvider>
        <AdminProvider>
          <App />
        </AdminProvider>
      </ThemeProvider>
    </AuthixProvider>
  </StrictMode>,
);
