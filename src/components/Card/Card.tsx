import styles from './Card.module.css';
import { Card as CardType } from '../../models/card';
import { useContext } from 'react';
import { UiContext } from '../../context/uiContext';
import TaskModal from '../../modals/TaskModal/TaskModal';
import CardModal from '../../modals/CardModal/CardModal';
import { Draggable } from 'react-beautiful-dnd';

interface NewCardProps {
  columnIndex: number;
}

interface CardProps {
  card: CardType;
  cardIndex: number;
  columnIndex: number;
}

export const Card = ({ card, cardIndex, columnIndex }: CardProps) => {
  const { openModal } = useContext(UiContext);

  const handleCardClick = () => {
    openModal(<TaskModal card={card} columnIndex={columnIndex} />);
  };

  return (
    <Draggable draggableId={card.id} index={cardIndex}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
          }}
          className={styles.card}
          onClick={handleCardClick}
        >
          <div className='heading--m'>{card.title}</div>
          <div className='text--bold'>{card.subtasks.length} subtasks</div>
        </div>
      )}
    </Draggable>
  );
};

export const NewCard = ({ columnIndex }: NewCardProps) => {
  const { openModal } = useContext(UiContext);
  const handleAddNewCard = () => {
    openModal(<CardModal type='newCard' columnIndex={columnIndex} />);
  };

  return (
    <div
      className={`${styles.card} ${styles['card--new']}`}
      onClick={handleAddNewCard}
    >
      <p className={styles.card__text}>+ New Card</p>
    </div>
  );
};
