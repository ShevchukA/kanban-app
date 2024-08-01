import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import Button from '../../components/ui/Button/Button';
import InputMultipleFields from '../../components/ui/InputMultipleFields/InputMultipleFields';
import InputText from '../../components/ui/InputText/InputText';
import { Card } from '../../models/card';
import styles from './CardModal.module.css';
import { Subtask } from '../../models/subtask';
import { v4 as generateId } from 'uuid';
import useBoardsMutation, { Action } from '../../hooks/useBoardsMutation';
import { useQueryClient } from '@tanstack/react-query';
import { Board } from '../../models/board';
import { UiContext } from '../../context/uiContext';

interface CardModalProps {
  type: 'newCard' | 'editCard';
  columnIndex?: number;
  card?: Card;
}

const CardModal = ({ type, columnIndex, card }: CardModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const editBoard = useBoardsMutation(Action.EditBoard);
  const queryClient = useQueryClient();
  const { activeBoardIndex } = useContext(UiContext);

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setDescription(card.description);
      setSubtasks(card.subtasks || []);
    }
  }, [card]);

  const handleChangeName = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    setTitle(input.value);
  };

  const handleChangeDescription = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    setDescription(input.value);
  };

  const handleChangeSubtasks = (e: SyntheticEvent, index: number) => {
    const input = e.target as HTMLInputElement;
    const newSubtasksSet = [...subtasks];
    newSubtasksSet[index] = { ...newSubtasksSet[index], name: input.value };
    setSubtasks(newSubtasksSet);
  };

  const handleAddNewSubtask = () => {
    const newSubtasksSet = [
      ...subtasks,
      { id: generateId(), name: '', isCompleted: false },
    ];
    setSubtasks(newSubtasksSet);
  };

  const handleDeleteSubtask = (id: string) => {
    const newSubtasksSet = subtasks.filter((subtask) => subtask.id !== id);
    setSubtasks(newSubtasksSet);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // get boards array from cache for further mutation
    const boardsList: Board[] = queryClient.getQueryData(['']) || [];

    switch (type) {
      case 'newCard':
        if (title.length !== 0 && columnIndex !== undefined) {
          const newCard: Card = {
            id: generateId(),
            title: title,
            description: description,
            status: '',
            subtasks: subtasks,
          };

          const newBoardsList = [...boardsList];

          // if current column doesn't have cards, than add empty array
          if (!newBoardsList[activeBoardIndex].columns[columnIndex].tasks) {
            newBoardsList[activeBoardIndex].columns[columnIndex].tasks = [];
          }

          // add new card
          newBoardsList[activeBoardIndex].columns[columnIndex]?.tasks.push(
            newCard
          );

          editBoard.mutate(newBoardsList);
        }
        break;

      case 'editCard':
        if (card && columnIndex !== undefined) {
          const updatedCard: Card = {
            ...card,
            title: title,
            description: description,
            subtasks: subtasks,
          };

          const newBoardsList = [...boardsList];

          // find card to be edited and update cards array
          const updatedCards = newBoardsList[activeBoardIndex].columns[
            columnIndex
          ].tasks.map((card: Card) => {
            if (card.id === updatedCard.id) {
              return updatedCard;
            } else {
              return card;
            }
          });

          newBoardsList[activeBoardIndex].columns[columnIndex].tasks =
            updatedCards;

          editBoard.mutate(newBoardsList);
        }
        break;

      default:
        break;
    }
  };

  const cardTitle = type === 'newCard' ? 'Add New Card' : 'Edit Card';
  const buttonText = type === 'newCard' ? 'Create New Card' : 'Save Changes';

  return (
    <form
      className={styles.cardModal}
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <h1 className='heading--xl'>{cardTitle}</h1>
      <InputText
        type='text'
        id='title'
        value={title}
        label='Title'
        placeholder='e.g. Take coffee break'
        onChange={(e) => {
          handleChangeName(e);
        }}
      />
      <InputText
        type='text'
        id='description'
        value={description}
        label='Description'
        placeholder='e.g. It’s always good to take a break. This 15 minute break will 
        recharge the batteries a little.'
        onChange={(e) => {
          handleChangeDescription(e);
        }}
      />
      <InputMultipleFields
        label='Subtasks'
        value={subtasks}
        onChange={handleChangeSubtasks}
        onAdd={handleAddNewSubtask}
        onDelete={handleDeleteSubtask}
      />
      <Button text={buttonText} submit={true} disabled={editBoard.isPending} />
    </form>
  );
};

export default CardModal;
