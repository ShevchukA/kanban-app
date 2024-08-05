import { DropResult } from 'react-beautiful-dnd';
import { Board } from '../models/board';
import { Card } from '../models/card';
import { Column } from '../models/column';

export const addBoard = (boards: Board[], addedBoard: Board) => {
  const updatedBoards = [...boards, addedBoard];
  return updatedBoards;
};

export const editBoard = (boards: Board[], editedBoard: Board) => {
  const updatedBoards = boards.map((board) => {
    return board.id === editedBoard.id ? editedBoard : board;
  });
  return updatedBoards;
};

export const deleteBoard = (boards: Board[], deletedBoard: Board) => {
  const updatedBoards = boards.filter((board) => board.id !== deletedBoard.id);
  return updatedBoards;
};

export const addColumn = (
  boards: Board[],
  boardIndex: number,
  column: Column
) => {
  const updatedBoards = [...boards];
  updatedBoards[boardIndex].columns.push(column);
  return updatedBoards;
};

export const addNewCard = (
  boards: Board[],
  boardIndex: number,
  columnIndex: number,
  card: Card
) => {
  const updatedBoards = [...boards];

  // add new card
  updatedBoards[boardIndex].columns[columnIndex]?.tasks.push(card);

  return updatedBoards;
};

export const editCard = (
  boards: Board[],
  boardIndex: number,
  columnIndex: number,
  updatedCard: Card
) => {
  const updatedBoards = [...boards];

  // find card to be edited and update cards array
  const updatedCards = updatedBoards[boardIndex].columns[columnIndex].tasks.map(
    (card: Card) => {
      return card.id === updatedCard.id ? updatedCard : card;
    }
  );

  updatedBoards[boardIndex].columns[columnIndex].tasks = updatedCards;

  return updatedBoards;
};

export const deleteCard = (boards: Board[], deletedCard: Card) => {
  const updatedBoards = boards.map((board: Board) => {
    board.columns = board.columns.map((column: Column) => {
      column.tasks = column.tasks.filter(
        (card: Card) => card.id !== deletedCard.id
      );
      return column;
    });
    return board;
  });

  return updatedBoards;
};

export const replaceCard = (
  boards: Board[],
  boardIndex: number,
  result: DropResult
) => {
  const columns: Column[] = boards[boardIndex].columns;
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

    const newColumn: Column = {
      ...startColumn,
      tasks: newTasks,
    };

    const updateBoards = boards.map((board: Board) => {
      board.columns = board.columns.map((column: Column) => {
        return column.id === newColumn.id ? newColumn : column;
      });
      return board;
    });

    return updateBoards;
  }
  // card move to another column
  else if (startColumn && endColumn) {
    const startTasks = Array.from(startColumn.tasks);
    const endTasks = Array.from(endColumn.tasks);
    const [movedTask] = startTasks.splice(source.index, 1);
    endTasks.splice(destination.index, 0, movedTask);

    const newStartColumn: Column = {
      ...startColumn,
      tasks: startTasks,
    };

    const newEndColumn: Column = {
      ...endColumn,
      tasks: endTasks,
    };

    const updateBoards = boards.map((board: Board) => {
      board.columns = board.columns.map((column: Column) => {
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

    return updateBoards;
  } else {
    console.log(`Drag'n'drop error`);
  }
};
