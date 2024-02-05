import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

import styles from "./Root.module.css";
import { useContext, useEffect } from "react";
import { UiContext } from "../../context/uiContext";
import Modal from "../../components/ui/Modal/Modal";
import { BoardContext } from "../../context/boardsContext";
import { useQuery } from "@tanstack/react-query";
import { getBoards } from "../../database/api";
import { Board } from "../../models/board";

const Root = () => {
  const {
    isSidebarShown,
    isModalShown,
    activeModal,
    activeBoardId,
    selectBoard,
    toggleSidebar,
  } = useContext(UiContext);

  const { updateBoards } = useContext(BoardContext);

  const { data, isLoading } = useQuery({
    queryKey: ["getBoards"],
    queryFn: getBoards, // fetch from my api
  });

  useEffect(() => {
    console.log(data);
    if (data) {
      updateBoards(data);
      selectBoard(data[0]?.id);
    }
  }, [data]);

  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  return (
    <div className={styles.app}>
      {isModalShown && <Modal window={activeModal} />}
      <Header
        title={data?.find((board: Board) => board.id === activeBoardId)?.name}
      />
      <main
        className={
          isSidebarShown
            ? `${styles.main}`
            : `${styles.main} ${styles["main--hidden"]}`
        }
      >
        <Sidebar boards={data} onToggle={handleToggleSidebar} />
        {isLoading ? "Loading..." : <Outlet />}
      </main>
    </div>
  );
};

export default Root;
