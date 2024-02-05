import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UiContextProvider } from "./context/uiContext.tsx";
import { BoardContextProvider } from "./context/boardsContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// React Query client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UiContextProvider>
      <BoardContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BoardContextProvider>
    </UiContextProvider>
  </React.StrictMode>
);
