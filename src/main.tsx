import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UiContextProvider } from "./context/uiContext.tsx";
import { BoardContextProvider } from "./context/boardsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UiContextProvider>
      <BoardContextProvider>
        <App />
      </BoardContextProvider>
    </UiContextProvider>
  </React.StrictMode>
);
