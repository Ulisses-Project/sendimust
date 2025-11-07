import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DimensionsProvider } from "./context/DimensionsContext.tsx";
import "@fontsource-variable/geist";
import "@fontsource/geist-mono";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DimensionsProvider>
      <App />
    </DimensionsProvider>
  </StrictMode>
);
