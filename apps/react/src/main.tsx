import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import { TestEditor } from "./components/Editor.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TestEditor />
  </StrictMode>,
);
