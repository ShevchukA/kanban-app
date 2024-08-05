import { useContext } from 'react';
import Button from '../../components/ui/Button/Button';
import { Board } from '../../models/board';
import styles from './DeleteModal.module.css';
import { UiContext } from '../../context/uiContext';
import { useQueryClient } from '@tanstack/react-query';
import useBoardsMutation, { Action } from '../../hooks/useBoardsMutation';
import { Column } from '../../models/column';
import { Card } from '../../models/card';
import { deleteBoard, deleteCard } from '../../helpers/operations';

interface DeleteModalProps {
  target: 'board' | 'column' | 'card';
  object: Board | Column | Card;
}

const DeleteModal = ({ target, object }: DeleteModalProps) => {
  const { closeModal } = useContext(UiContext);
  const queryClient = useQueryClient();
  const updateBoardsWithDelete = useBoardsMutation(Action.DeleteBoard);
  const updateBoardsWithEdit = useBoardsMutation(Action.UpdateBoard);

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

    if (target == 'board') {
      const newBoards = deleteBoard(boards, object as Board);
      updateBoardsWithDelete.mutate(newBoards);
    }

    if (target == 'card') {
      const newBoards = deleteCard(boards, object as Card);
      updateBoardsWithEdit.mutate(newBoards);
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
