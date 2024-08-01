import { useContext } from 'react';
import styles from './Board.module.css';
import { UiContext } from '../../context/uiContext';
import { useQueryClient } from '@tanstack/react-query';
import Column from '../../components/Column/Column';
import { Board as BoardType } from '../../models/board';
import { Column as ColumnType } from '../../models/column';

const Board = () => {
  const { activeBoardIndex } = useContext(UiContext);
  const queryClient = useQueryClient();

  const boards: BoardType[] = queryClient.getQueryData(['boards']) ?? [];
  const board = boards[activeBoardIndex];
  const columns: ColumnType[] = board.columns;

  return (
    <div className={styles.board}>
      <div className={styles.board__scrollContainer}>
        <div className={styles.board__container}>
          {columns.map((column: ColumnType, index: number) => (
            <Column
              key={column.id}
              index={index}
              name={column.name}
              cards={column.tasks}
            />
          ))}
          <Column addNewColumn={true} />
        </div>
      </div>
    </div>
  );
};

export default Board;
