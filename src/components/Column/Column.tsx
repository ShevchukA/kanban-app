import styles from "./Column.module.css";
import { Card } from "../../models/card";
import TaskCard from "../TaskCard/TaskCard";
import ColumnModal from "../../modals/ColumnModal/ColumnModal";
import { useContext } from "react";
import { UiContext } from "../../context/uiContext";

type ColumnProps = {
  name?: string;
  cards?: Card[];
  addNewColumn?: boolean;
};

const Column = ({ name, cards, addNewColumn }: ColumnProps) => {
  const { openModal } = useContext(UiContext);
  const handleAddNewColumn = () => {
    openModal(<ColumnModal />);
  };

  return addNewColumn ? (
    <div className={`${styles.column} ${styles["column--new"]}`}>
      <button className={styles.column__addBtn} onClick={handleAddNewColumn}>
        + New Column
      </button>
    </div>
  ) : (
    <div className={styles.column}>
      <div className={styles.column__title}>
        <span className={styles.column__pointer}></span>
        <span className={styles.column__name}>
          {name} ({cards?.length})
        </span>
      </div>
      {cards?.map((card) => (
        <TaskCard key={card?.title} card={card} />
      ))}
      <TaskCard addNewCard={true} />
    </div>
  );
};

export default Column;
