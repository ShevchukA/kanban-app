import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root/Root";
import Board from "./pages/Board/Board";
import { useContext, useEffect } from "react";
import { BoardContext } from "./context/boardsContext";

import { useQuery } from "@tanstack/react-query";
import { getBoards } from "./database/api";

function App() {
  // useEffect(() => {
  //   fetch(
  //     "https://my-kanban-e646e-default-rtdb.asia-southeast1.firebasedatabase.app/kanban.json",
  //     { method: "PUT", body: JSON.stringify(data) }
  //   );
  // }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Board />,
        },
        {
          path: "boards/:boardID",
          element: <Board />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
