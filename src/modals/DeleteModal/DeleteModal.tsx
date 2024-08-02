import { useContext } from 'react';
import Button from '../../components/ui/Button/Button';
import { Board } from '../../models/board';
import styles from './DeleteModal.module.css';
import { UiContext } from '../../context/uiContext';
import { useQueryClient } from '@tanstack/react-query';
import useBoardsMutation, { Action } from '../../hooks/useBoardsMutation';
import { Column } from '../../models/column';
import { Card } from '../../models/card';

interface DeleteModalProps {
  target: 'board' | 'column' | 'card';
  object: Board | Column | Card;
}

const DeleteModal = ({ target, object }: DeleteModalProps) => {
  const { closeModal } = useContext(UiContext);
  const queryClient = useQueryClient();
  const deleteBoard = useBoardsMutation(Action.DeleteBoard);
  const editBoard = useBoardsMutation(Action.EditBoard);

  const confirmMessage = {
    board: `Are you sure you want to delete the ‘${
      (object as Board).name
    }’ board? This action will remove all columns and tasks and cannot be reversed.`,

    column: `Are you sure you want to delete the ‘${
      (object as Column).name
    }’ column? This action will remove all tasks and cannot be reversed.`,

    card: `Are you sure you want to delete the ‘${
      (object as Card).title
    }’ task and its subtasks? This action cannot be reversed`,
  };

  const handleDelete = () => {
    const boards = queryClient.getQueryData(['boards']) as Board[];
    let newBoards: Board[];

    if (target == 'board') {
      newBoards = boards.filter((board) => board.id !== (object as Board).id);
      deleteBoard.mutate(newBoards);
    }

    if (target == 'column') {
      console.log('Delete column');

      // TODO
      // newBoards = boards.map((board: Board) => {
      //   board.columns = board.columns.filter(
      //     (column: Column) => column.id !== (object as Column).id
      //   );
      //   return board;
      // });
      // editBoard.mutate(newBoards);

      // openModal(<BoardModal type='editBoard' />);
    }

    if (target == 'card') {
      newBoards = boards.map((board: Board) => {
        board.columns = board.columns.map((column: Column) => {
          column.tasks = column.tasks.filter(
            (card: Card) => card.id !== (object as Card).id
          );
          return column;
        });
        return board;
      });
      editBoard.mutate(newBoards);
    }

    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };
  return (
    <div className={styles.container}>
      <h1 className={`heading--l ${styles.heading}`}>Delete this {target}?</h1>
      <p className='text'>{confirmMessage[target]}</p>
      <div className={styles.buttonsContainer}>
        <Button
          type='negative'
          stretched
          text='Delete'
          onClick={handleDelete}
        />
        <Button
          type='secondary'
          stretched
          text='Cancel'
          onClick={handleCancel}
        />
      </div>
    </div>
  );
};

export default DeleteModal;
