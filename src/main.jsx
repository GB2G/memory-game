import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GameProvider } from "./pages/GameDesign/GameContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </StrictMode>
);
