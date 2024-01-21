import { useContext } from "react";
import { BoardContext } from "../../context/boardsContext";
import styles from "./Board.module.css";
import { UiContext } from "../../context/uiContext";

const Board = () => {
  const { boards } = useContext(BoardContext);
  const { activeBoard } = useContext(UiContext);

  return (
    <div className={styles.board}>
      <h1>{boards[activeBoard]?.name}</h1>
    </div>
  );
};

export default Board;
