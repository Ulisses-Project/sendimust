import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DimensionsProvider } from "./context/DimensionsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DimensionsProvider>
      <App />
    </DimensionsProvider>
  </StrictMode>
);
