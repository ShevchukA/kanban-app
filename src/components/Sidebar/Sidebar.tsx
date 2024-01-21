import { useContext } from "react";
import styles from "./Sidebar.module.css";
import { BoardContext } from "../../context/boardsContext";
import { UiContext } from "../../context/uiContext";
import BoardLink from "./components/BoardLink/BoardLink";

type SidebarProps = {
  onClick: () => void;
};

const Sidebar = ({ onClick }: SidebarProps) => {
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
      <div className={styles.boardList}>
        <p className={`${styles.title} text--bold`}>All boards</p>
        <ul>
          {boards.map((board, index) => (
            <BoardLink
              key={board.name}
              board={board.name}
              onClick={() => handleBoardSelection(index)}
            >
              {board.name}
            </BoardLink>
          ))}
          <BoardLink onClick={handleBoardCreation}>
            + Create New Board
          </BoardLink>
        </ul>
      </div>

      <div>toggle</div>
      <button onClick={onClick}>Hide Sidebar</button>
    </nav>
  );
};

export default Sidebar;
