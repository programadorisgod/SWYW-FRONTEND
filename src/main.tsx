import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./global-utilities.css";
import Router from "./Router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
