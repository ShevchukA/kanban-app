import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/pages/Root";
import Board from "./components/pages/Board";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "boards",
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
