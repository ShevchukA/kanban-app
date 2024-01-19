import { useContext } from "react";
import styles from "./Sidebar.module.css";
import { BoardContext } from "../../context/boardsContext";
import { UiContext } from "../../context/uiContext";

type SidebarProps = {
  onClick: () => void;
};

const Sidebar = ({ onClick }: SidebarProps) => {
  const { boards } = useContext(BoardContext);
  const { selectBoard } = useContext(UiContext);

  const handleBoardSelection = (index: number) => {
    selectBoard(index);
  };

  return (
    <nav className={styles.sidebar}>
      <div className={styles.boardList}>
        <p className={`${styles.title} text--bold`}>All boards</p>
        <ul>
          {boards.map((board, index) => (
            <li key={board.name} onClick={() => handleBoardSelection(index)}>
              {board.name}
            </li>
          ))}
        </ul>
        <button>+ Create New Board</button>
      </div>

      <div>toggle</div>
      <button onClick={onClick}>Hide Sidebar</button>
    </nav>
  );
};

export default Sidebar;
