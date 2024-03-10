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
import BoardModal from "../../modals/BoardModal/BoardModal";

type SidebarProps = {
  boards: string[];
  onToggle: () => void;
};

const Sidebar = ({ boards, onToggle }: SidebarProps) => {
  const { selectBoard, openModal } = useContext(UiContext);

  const handleBoardSelection = (index: number) => {
    selectBoard(index);
  };

  const handleBoardCreation = () => {
    openModal(<BoardModal type="newBoard" />);
  };

  return (
    <nav className={styles.sidebar}>
      <div className={styles["sidebar__boardList"]}>
        <p className={`${styles["sidebar__title"]} text--bold`}>All boards</p>
        {boards && (
          <ul>
            {boards.map((board, index) => (
              <SidebarLink
                key={board}
                board={board}
                icon={<BoardIcon />}
                onClick={() => handleBoardSelection(index)}
              >
                {board}
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
