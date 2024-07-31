import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

import styles from "./Root.module.css";
import { useContext, useEffect, useState } from "react";
import { UiContext } from "../../context/uiContext";
import Modal from "../../components/ui/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { getBoardsList } from "../../database/api";

const Root = () => {
  const {
    isSidebarShown,
    isModalShown,
    activeModal,
    activeBoardIndex,
    toggleSidebar,
    setContentIsLoaded,
  } = useContext(UiContext);

  const [boardTitle, setBoardTitle] = useState("");

  const navigate = useNavigate();

  const { data: boards } = useQuery({
    queryKey: ["getBoardsList"],
    queryFn: getBoardsList, // fetch from my api
    // select: (boards) => boards.map((board: Board) => board.name), // get array of names from response data, it does't affect on cache
  });

  useEffect(() => {
    if (boards) {
      setContentIsLoaded();
      setBoardTitle(boards[activeBoardIndex]?.name);
      navigate(`/boards/${boards[activeBoardIndex]?.id}`);
    }
  }, [boards, activeBoardIndex]);

  // const boardTitle = boards && boards[activeBoardIndex]?.name;

  // useEffect(() => {
  //   if (data) {
  //     updateBoards(data);
  //     selectBoard(data[0]?.id);
  //   }
  // }, [data]);

  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  return (
    <div className={styles.app}>
      {isModalShown && <Modal window={activeModal} />}
      <Header title={boardTitle} />
      <main
        className={
          isSidebarShown
            ? `${styles.main}`
            : `${styles.main} ${styles["main--hidden"]}`
        }
      >
        <Sidebar boards={boards} onToggle={handleToggleSidebar} />
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
