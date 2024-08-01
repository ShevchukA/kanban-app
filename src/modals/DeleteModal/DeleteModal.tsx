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

  let text = '';
  switch (target) {
    case 'board':
      text = `Are you sure you want to delete the ‘${
        (object as Board).name
      }’ board? This action will remove all columns and tasks and cannot be reversed.`;
      break;
    case 'column':
      text = `Are you sure you want to delete the ‘${
        (object as Column).name
      }’ column? This action will remove all tasks and cannot be reversed.`;
      break;
    case 'card':
      text = `Are you sure you want to delete the ‘${
        (object as Card).title
      }’ task and its subtasks? This action cannot be reversed`;
      break;
    default:
      break;
  }

  const handleDelete = () => {
    const boardsList = queryClient.getQueryData(['boards']) as Board[];
    let newBoardsList: Board[];

    switch (target) {
      case 'board':
        newBoardsList = boardsList.filter(
          (board) => board.id !== (object as Board).id
        );
        deleteBoard.mutate(newBoardsList);
        break;

      case 'card':
        newBoardsList = boardsList.map((board: Board) => {
          board.columns = board.columns.map((column: Column) => {
            column.tasks = column.tasks.filter(
              (card: Card) => card.id !== (object as Card).id
            );
            return column;
          });
          return board;
        });
        editBoard.mutate(newBoardsList);
        break;
      default:
        break;
    }

    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };
  return (
    <div className={styles.container}>
      <h1 className={`heading--l ${styles.heading}`}>Delete this {target}?</h1>
      <p className='text'>{text}</p>
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
