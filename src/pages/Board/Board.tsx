import { useContext } from "react";
import styles from "./Board.module.css";
import { UiContext } from "../../context/uiContext";
import Column from "../../components/Column/Column";
import { useQuery } from "@tanstack/react-query";
import { getBoard } from "../../database/api";
import { Column as ColumnType } from "../../models/column";

const Board = () => {
  const { activeBoardIndex } = useContext(UiContext);

  const { data: board, isLoading } = useQuery({
    queryKey: ["getBoard", activeBoardIndex],
    queryFn: () => getBoard(activeBoardIndex),
    refetchInterval: 30 * 1000,
  });

  const columns = board?.columns;

  return (
    <div className={styles.board}>
      {isLoading ? (
        <div className={styles.boardLoader}>
          <h1 className="heading--xl">Loading board...</h1>
        </div>
      ) : (
        <div className={styles.board__scrollContainer}>
          <div className={styles.board__container}>
            {columns?.map((column: ColumnType) => (
              <Column
                key={column.name}
                name={column.name}
                cards={column.tasks}
              />
            ))}
            <Column addNewColumn={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
