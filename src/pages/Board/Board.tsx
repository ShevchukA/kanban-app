import { useContext } from "react";
import { BoardContext } from "../../context/boardsContext";
import styles from "./Board.module.css";
import { UiContext } from "../../context/uiContext";
import Column from "../../components/Column/Column";

const Board = () => {
  const { boards } = useContext(BoardContext);
  const { activeBoardIndex } = useContext(UiContext);
  const activeBoard = boards[activeBoardIndex];
  const columns = activeBoard.columns;

  return (
    <div className={styles.board}>
      <div className={styles.board__scrollContainer}>
        <div className={styles.board__container}>
          {columns.map((column) => (
            <Column key={column.name} name={column.name} cards={column.tasks} />
          ))}
          <Column addNewColumn={true} />
        </div>
      </div>
    </div>
  );
};

export default Board;
