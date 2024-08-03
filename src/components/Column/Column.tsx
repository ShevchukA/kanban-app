import styles from './Column.module.css';
import ColumnModal from '../../modals/ColumnModal/ColumnModal';
import { useContext } from 'react';
import { UiContext } from '../../context/uiContext';
import { Card, NewCard } from '../Card/Card';
import { Droppable } from 'react-beautiful-dnd';
import { Column as ColumnType } from '../../models/column';

interface ColumnProps {
  columnIndex: number;
  column: ColumnType;
}

export const Column = ({ columnIndex, column }: ColumnProps) => {
  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={styles.column}
        >
          <div className={styles.column__title}>
            <span className={styles.column__pointer}></span>
            <span className={styles.column__name}>
              {column.name} {column.tasks.length}
            </span>
          </div>
          {column.tasks.map((card, cardIndex) => (
            <Card
              key={card.title}
              card={card}
              cardIndex={cardIndex}
              columnIndex={columnIndex}
            />
          ))}
          {provided.placeholder}
          <NewCard columnIndex={columnIndex} />
        </div>
      )}
    </Droppable>
  );
};

export const NewColumn = () => {
  const { openModal } = useContext(UiContext);
  const handleAddNewColumn = () => {
    openModal(<ColumnModal />);
  };

  return (
    <div className={`${styles.column} ${styles['column--new']}`}>
      <button className={styles.column__addBtn} onClick={handleAddNewColumn}>
        + New Column
      </button>
    </div>
  );
};
