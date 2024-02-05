/// <reference types="vite-plugin-svgr/client" />

import { useContext } from "react";
import styles from "./Sidebar.module.css";
import { UiContext } from "../../context/uiContext";
import SidebarLink from "./components/SidebarLink/SidebarLink";
import BoardIcon from "./assets/icon-board.svg?react";
import HideIcon from "./assets/icon-hide-sidebar.svg?react";
import ShowIcon from "./assets/icon-show-sidebar.svg?react";
import SidebarShowButton from "./components/SidebarShowButton/SidebarShowButton";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import { Board } from "../../models/board";

type SidebarProps = {
  boards: Board[];
  onToggle: () => void;
};

const Sidebar = ({ boards, onToggle }: SidebarProps) => {
  const { selectBoard } = useContext(UiContext);

  const handleBoardSelection = (id: number) => {
    selectBoard(id);
  };

  const handleBoardCreation = () => {
    console.log("create board");
  };

  return (
    <nav className={styles.sidebar}>
      <div className={styles["sidebar__boardList"]}>
        <p className={`${styles["sidebar__title"]} text--bold`}>All boards</p>
        {boards && (
          <ul>
            {boards.map((board) => (
              <SidebarLink
                key={board.name}
                board={board.name}
                icon={<BoardIcon />}
                onClick={() => handleBoardSelection(board.id)}
              >
                {board.name}
              </SidebarLink>
            ))}
            <SidebarLink
              specialLink={true}
              icon={<BoardIcon />}
              onClick={handleBoardCreation}
            >
              + Create New Board
            </SidebarLink>
          </ul>
        )}
      </div>
      <div className={styles["sidebar__controls"]}>
        <ThemeToggle />
        <SidebarLink icon={<HideIcon />} onClick={onToggle}>
          Hide Sidebar
        </SidebarLink>
      </div>
      <SidebarShowButton icon={<ShowIcon />} onClick={onToggle} />
    </nav>
  );
};

export default Sidebar;
