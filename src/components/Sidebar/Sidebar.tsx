/// <reference types="vite-plugin-svgr/client" />

import { useContext } from "react";
import styles from "./Sidebar.module.css";
import { BoardContext } from "../../context/boardsContext";
import { UiContext } from "../../context/uiContext";
import SidebarLink from "./components/SidebarLink/SidebarLink";
import BoardIcon from "./assets/icon-board.svg?react";
import HideIcon from "./assets/icon-hide-sidebar.svg?react";
import Toggle from "../ui/Toggle/Toggle";

type SidebarProps = {
  onToggle: () => void;
};

const Sidebar = ({ onToggle }: SidebarProps) => {
  const { boards } = useContext(BoardContext);
  const { selectBoard } = useContext(UiContext);

  const handleBoardSelection = (index: number) => {
    selectBoard(index);
  };

  const handleBoardCreation = () => {
    console.log("create board");
  };

  return (
    <nav className={styles.sidebar}>
      <div className={styles["sidebar__boardList"]}>
        <p className={`${styles["sidebar__title"]} text--bold`}>All boards</p>
        <ul>
          {boards.map((board, index) => (
            <SidebarLink
              key={board.name}
              board={board.name}
              icon={<BoardIcon />}
              onClick={() => handleBoardSelection(index)}
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
      </div>
      <div className={styles["sidebar__controls"]}>
        <Toggle />
        <SidebarLink icon={<HideIcon />} onClick={onToggle}>
          Hide Sidebar
        </SidebarLink>
      </div>
    </nav>
  );
};

export default Sidebar;
