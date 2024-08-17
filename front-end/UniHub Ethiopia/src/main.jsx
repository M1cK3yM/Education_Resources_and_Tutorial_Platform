import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "rsuite/dist/rsuite.min.css";
import { CustomProvider } from "rsuite";
import { ThemeProvider } from "@/components/themeProvider";
import "../app/globals.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CustomProvider theme="dark">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </CustomProvider>
  </StrictMode>,
);
