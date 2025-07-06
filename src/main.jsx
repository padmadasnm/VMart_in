import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/NavbarMain.css";
import "./css/LoginPageMain.css";
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <>
    <App />
  </>
  // </StrictMode>
);
