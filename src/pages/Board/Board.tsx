import { useContext, useEffect, useState } from "react";
import styles from "./Board.module.css";
import { UiContext } from "../../context/uiContext";
import { useQueryClient } from "@tanstack/react-query";
import Column from "../../components/Column/Column";
import { Board as BoardType } from "../../models/board";
import { Column as ColumnType } from "../../models/column";

const Board = () => {
  const { activeBoardIndex, isContentLoaded } = useContext(UiContext);

  const [board, setBoard] = useState<BoardType | null>(null);
  const queryClient = useQueryClient();
  const boards: BoardType[] = queryClient.getQueryData(["getBoardsList"]) || [];

  useEffect(() => {
    if (boards) {
      setBoard(boards[activeBoardIndex]);
    }
  }, [boards, activeBoardIndex, isContentLoaded]);

  const columns: ColumnType[] = board?.columns || [];

  // the code below is an imitation of query to the backend to get single board
  // all boards have already fetched in the initial query 'getBoardsList'

  // const {
  //   data: board,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["getBoard", activeBoardIndex],
  //   queryFn: () => getBoard(activeBoardIndex),
  //   refetchInterval: 30 * 1000,
  // });

  // const columns: ColumnType[] = board?.columns || [];

  // if (isError) {
  //   return (
  //     <div className={styles.boardLoader}>
  //       <h1 className="heading--xl">Loading error. Please try later...</h1>
  //     </div>
  //   );
  // }

  // if (isLoading) {
  //   return (
  //     <div className={styles.boardLoader}>
  //       <h1 className="heading--xl">Loading board...</h1>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.board}>
      <div className={styles.board__scrollContainer}>
        <div className={styles.board__container}>
          {columns.map((column: ColumnType) => (
            <Column key={column.id} name={column.name} cards={column.tasks} />
          ))}
          <Column addNewColumn={true} />
        </div>
      </div>
    </div>
  );
};

export default Board;
