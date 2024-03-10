import { useContext } from "react";
import styles from "./Board.module.css";
import { UiContext } from "../../context/uiContext";
import Column from "../../components/Column/Column";
import { useQuery } from "@tanstack/react-query";
import { getBoard } from "../../database/api";
import { Column as ColumnType } from "../../models/column";

const Board = () => {
  const { activeBoardIndex } = useContext(UiContext);

  const {
    data: board,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getBoard", activeBoardIndex],
    queryFn: () => getBoard(activeBoardIndex),
    refetchInterval: 30 * 1000,
  });

  const columns = board?.columns;

  if (isError) {
    return (
      <div className={styles.boardLoader}>
        <h1 className="heading--xl">Loading error. Please try later...</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.boardLoader}>
        <h1 className="heading--xl">Loading board...</h1>
      </div>
    );
  }

  return (
    <div className={styles.board}>
      <div className={styles.board__scrollContainer}>
        <div className={styles.board__container}>
          {columns?.map((column: ColumnType) => (
            <Column key={column.name} name={column.name} cards={column.tasks} />
          ))}
          <Column addNewColumn={true} />
        </div>
      </div>
    </div>
  );
};

export default Board;
