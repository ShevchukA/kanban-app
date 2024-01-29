import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root/Root";
import Board from "./pages/Board/Board";
import { useContext, useEffect } from "react";
import { BoardContext } from "./context/boardsContext";
// import { onValue, ref } from "firebase/database";
// import db from "./database/firebase";
import data from "./data/data.json";

function App() {
  // useEffect(() => {
  //   fetch(
  //     "https://my-kanban-e646e-default-rtdb.asia-southeast1.firebasedatabase.app/kanban.json",
  //     { method: "PUT", body: JSON.stringify(data) }
  //   );
  // }, []);

  const { updateBoards } = useContext(BoardContext);

  // useEffect(() => {
  //   // async function getBoards() {
  //   //   const res = await fetch(
  //   //     "https://my-kanban-e646e-default-rtdb.asia-southeast1.firebasedatabase.app/kanban.json"
  //   //   );
  //   //   const data = await res.json();
  //   //   console.log(data.boards);
  //   //   updateBoards(data.boards);
  //   // }
  //   // getBoards();

  //   const boardsRef = ref(db, "boards");
  //   // Onvalue() is called every time when data is changed on the specific object reference.
  //   // Use onValue() to observe events.
  //   onValue(
  //     boardsRef,
  //     (snapshot) => {
  //       const data = snapshot.val();
  //       if (!!data) {
  //         console.log(data);
  //         // updateBoards(data.boards);
  //       } else {
  //         console.log("Data not found");
  //       }
  //     },
  //     // Read the data once option
  //     {
  //       onlyOnce: true,
  //     }
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
