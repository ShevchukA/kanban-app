import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root/Root";
import Board from "./pages/Board/Board";

function App() {
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
