import { useContext, useEffect, useState } from 'react';
import styles from './Board.module.css';
import { UiContext } from '../../context/uiContext';
import { useQuery } from '@tanstack/react-query';
import { Column, NewColumn } from '../../components/Column/Column';
import { Board as BoardType } from '../../models/board';
import { Column as ColumnType } from '../../models/column';
import { Message } from '../../components/ui/Message/Message';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import useBoardsMutation, { Action } from '../../hooks/useBoardsMutation';
import { replaceCard } from '../../helpers/operations';
import { getBoards } from '../../database/api';

const Board = () => {
  const { activeBoardIndex, isSidebarShown } = useContext(UiContext);
  const updateBoards = useBoardsMutation(Action.UpdateBoard);

  // TODO preferable way, but doesn't work
  // const queryClient = useQueryClient();
  // const boards = queryClient.getQueryData<BoardType[]>(['boards']);

  const { data: boards } = useQuery<BoardType[]>({
    queryKey: ['boards'],
    queryFn: getBoards,
    networkMode: 'offlineFirst', // get data from cache first
  });

  // to avoid 'react-beautiful-dnd' bug with strict mode
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  const onDragEnd = (result: DropResult) => {
    const updatedBoards =
      boards && replaceCard(boards, activeBoardIndex, result);
    if (updatedBoards) {
      updateBoards.mutate(updatedBoards);
    }
  };

  if (!boards) {
    return null;
  }

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
