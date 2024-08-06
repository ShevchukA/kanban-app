import { useContext, useEffect, useState } from 'react';
import styles from './Board.module.css';
import { UiContext } from '../../context/uiContext';
import { useQueryClient } from '@tanstack/react-query';
import { Column, NewColumn } from '../../components/Column/Column';
import { Board as BoardType } from '../../models/board';
import { Column as ColumnType } from '../../models/column';
import { Message } from '../../components/ui/Message/Message';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import useBoardsMutation, { Action } from '../../hooks/useBoardsMutation';
import { replaceCard } from '../../helpers/operations';

const Board = () => {
  const { activeBoardIndex, isSidebarShown } = useContext(UiContext);
  const queryClient = useQueryClient();
  const updateBoards = useBoardsMutation(Action.UpdateBoard);

  const boards: BoardType[] = queryClient.getQueryData(['boards']) ?? [];

  // to avoid 'react-beautiful-dnd' bug with strict mode
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  const onDragEnd = (result: DropResult) => {
    const updatedBoards = replaceCard(boards, activeBoardIndex, result);
    if (updatedBoards) {
      updateBoards.mutate(updatedBoards);
    }
  };

  if (boards.length === 0) {
    return <Message message='Create New Board to start...' />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {ready && (
        <div
          className={
            isSidebarShown
              ? `${styles.board}`
              : `${styles.board} ${styles['board--fullscreen']}`
          }
        >
          <div className={styles.board__scrollContainer}>
            <div className={styles.board__container}>
              {boards[activeBoardIndex].columns.map(
                (column: ColumnType, index: number) => (
                  <Column key={column.id} columnIndex={index} column={column} />
                )
              )}
              <NewColumn />
            </div>
          </div>
        </div>
      )}
    </DragDropContext>
  );
};

export default Board;
