import styles from "./Column.module.css";
import { Card } from "../../models/card";
import TaskCard from "../TaskCard/TaskCard";

type ColumnProps = {
  name?: string;
  cards?: Card[];
  addNewColumn?: boolean;
};

const Column = ({ name, cards, addNewColumn }: ColumnProps) => {
  return addNewColumn ? (
    <div className={`${styles.column} ${styles["column--new"]}`}>
      <button className={styles.column__addBtn}>+ New Column</button>
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
