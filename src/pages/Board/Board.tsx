import { useContext } from 'react';
import styles from './Board.module.css';
import { UiContext } from '../../context/uiContext';
import { useQueryClient } from '@tanstack/react-query';
import { Column, NewColumn } from '../../components/Column/Column';
import { Board as BoardType } from '../../models/board';
import { Column as ColumnType } from '../../models/column';
import { Message } from '../../components/ui/Message/Message';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import useBoardsMutation, { Action } from '../../hooks/useBoardsMutation';

const Board = () => {
  const { activeBoardIndex } = useContext(UiContext);
  const queryClient = useQueryClient();
  const editBoard = useBoardsMutation(Action.EditBoard);

  const boards: BoardType[] = queryClient.getQueryData(['boards']) ?? [];

  const onDragEnd = (result: DropResult) => {
    const board = boards[activeBoardIndex];
    const columns: ColumnType[] = board.columns;
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = columns.find(
      (column) => column.id === source.droppableId
    );
    const endColumn = columns.find(
      (column) => column.id === destination.droppableId
    );

    // card move inside the column
    if (startColumn && startColumn === endColumn) {
      const newTasks = Array.from(startColumn.tasks);
      const [movedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, movedTask);

      const newColumn: ColumnType = {
        ...startColumn,
        tasks: newTasks,
      };

      const newBoards = boards.map((board: BoardType) => {
        board.columns = board.columns.map((column: ColumnType) => {
          return column.id === newColumn.id ? newColumn : column;
        });
        return board;
      });

      editBoard.mutate(newBoards);
    }
    // card move to another column
    else if (startColumn && endColumn) {
      const startTasks = Array.from(startColumn.tasks);
      const endTasks = Array.from(endColumn.tasks);
      const [movedTask] = startTasks.splice(source.index, 1);
      endTasks.splice(destination.index, 0, movedTask);

      const newStartColumn: ColumnType = {
        ...startColumn,
        tasks: startTasks,
      };

      const newEndColumn: ColumnType = {
        ...endColumn,
        tasks: endTasks,
      };

      const newBoards = boards.map((board: BoardType) => {
        board.columns = board.columns.map((column: ColumnType) => {
          if (column.id === newStartColumn.id) {
            return newStartColumn;
          }
          if (column.id === newEndColumn.id) {
            return newEndColumn;
          }
          return column;
        });
        return board;
      });

      editBoard.mutate(newBoards);
    } else {
      console.log(`Drag'n'drop error`);
    }
  };

  const board = boards[activeBoardIndex];
  const columns: ColumnType[] = board.columns;

  if (boards.length === 0) {
    return <Message message='Create New Board to start...' />;
  }

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
