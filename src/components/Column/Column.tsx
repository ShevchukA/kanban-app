import { ReactNode } from "react";
import styles from "./Column.module.css";
import { Card } from "../../models/card";
import TaskCard from "../TaskCard/TaskCard";

type ColumnProps = {
  name?: string;
  cards?: Card[];
  newColumn?: boolean;
  children?: ReactNode;
};

const Column = ({ name, cards, newColumn }: ColumnProps) => {
  return newColumn ? (
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
      <TaskCard newCard={true} />
    </div>
  );
};

export default Column;
