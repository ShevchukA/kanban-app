import { useCallback, useContext } from 'react';
import styles from './Board.module.css';
import { UiContext } from '../../context/uiContext';
import { useQueryClient } from '@tanstack/react-query';
import { Column, NewColumn } from '../../components/Column/Column';
import { Board as BoardType } from '../../models/board';
import { Column as ColumnType } from '../../models/column';
import { Message } from '../../components/Message/Message';
import { DragDropContext } from 'react-beautiful-dnd';

const Board = () => {
  const { activeBoardIndex } = useContext(UiContext);
  const queryClient = useQueryClient();
  const boards: BoardType[] = queryClient.getQueryData(['boards']) ?? [];

  const onDragEnd = useCallback(() => {
    console.log('drag end');
  }, []);

  if (boards.length === 0) {
    return <Message message='Create New Board to start...' />;
  }

  const board = boards[activeBoardIndex];
  const columns: ColumnType[] = board.columns;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.board}>
        <div className={styles.board__scrollContainer}>
          <div className={styles.board__container}>
            {columns.map((column: ColumnType, index: number) => (
              <Column key={column.id} columnIndex={index} column={column} />
            ))}
            <NewColumn />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
