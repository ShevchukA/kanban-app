import { useContext, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import ContextMenu from '../../components/ui/ContextMenu/ContextMenu';
import { Card } from '../../models/card';
import styles from './TaskModal.module.css';
import { UiContext } from '../../context/uiContext';
import DeleteModal from '../DeleteModal/DeleteModal';
import CardModal from '../CardModal/CardModal';
import { Subtask } from '../../models/subtask';
import { Board } from '../../models/board';
import useBoardsMutation, { Action } from '../../hooks/useBoardsMutation';
import Button from '../../components/ui/Button/Button';
import { editCard } from '../../helpers/operations';

interface TaskModalProps {
  card: Card;
  columnIndex: number;
}

const TaskModal = ({ card, columnIndex }: TaskModalProps) => {
  const { openModal } = useContext(UiContext);
  const [subtasks, setSubtasks] = useState<Subtask[]>(card.subtasks);
  const [subtasksEdited, setSubtasksEdited] = useState(false);
  const updateBoard = useBoardsMutation(Action.UpdateBoard);
  const { activeBoardIndex } = useContext(UiContext);
  const queryClient = useQueryClient();

  const handleDeleteTask = () => {
    openModal(<DeleteModal target='card' object={card} />);
  };

  const handleEditTask = () => {
    openModal(
      <CardModal type='editCard' card={card} columnIndex={columnIndex} />
    );
  };

  const handleSubtaskComplete = (taskId: string) => {
    const updatedSubtasks = subtasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setSubtasks(updatedSubtasks);
    setSubtasksEdited(true);
  };

  const handleSubmit = () => {
    const boards: Board[] = queryClient.getQueryData(['boards']) ?? [];

    const updatedCard: Card = {
      ...card,
      subtasks: subtasks,
    };

    const newBoards = editCard(
      boards,
      activeBoardIndex,
      columnIndex,
      updatedCard
    );

    updateBoard.mutate(newBoards);
  };

  return (
    <div className={styles.taskModal}>
      <div className={styles.taskModal__title}>
        <h1 className='heading--xl'>{card.title}</h1>
        <ContextMenu
          target='Card'
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          centered
        />
      </div>
      {card.description && <p className='text'>{card.description}</p>}

      <div>
        <p className='heading--s'>Subtasks</p>
        {subtasks.length === 0 ? (
          <p className='text'>No subtasks</p>
        ) : (
          <ul className={styles.taskModal__subtasks}>
            {subtasks.map((subtask) => (
              <li
                key={subtask.name}
                className={
                  subtask.isCompleted
                    ? `${styles['taskModal__subtask--completed']} ${styles.taskModal__subtask}`
                    : `${styles.taskModal__subtask}`
                }
              >
                <input
                  type='checkbox'
                  defaultChecked={subtask.isCompleted}
                  onChange={() => {
                    handleSubtaskComplete(subtask.id);
                  }}
                />
                <label>{subtask.name}</label>
              </li>
            ))}
          </ul>
        )}
      </div>

      {subtasksEdited && (
        <Button
          text='Save Changes'
          disabled={updateBoard.isPending}
          onClick={handleSubmit}
        />
      )}
    </div>
  );
};

export default TaskModal;
