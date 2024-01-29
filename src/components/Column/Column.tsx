import { ReactNode } from "react";
import styles from "./Column.module.css";
import { Card } from "../../models/card";
import TaskCard from "../TaskCard/TaskCard";

type ColumnProps = {
  name: string;
  cards: Card[];
  children?: ReactNode;
};

const Column = ({ name, cards }: ColumnProps) => {
  return (
    <div className={styles.column}>
      <div className={styles.column__title}>
        <span className={styles.column__pointer}></span>
        <span className={styles.column__name}>
          {name} ({cards.length})
        </span>
      </div>
      {cards.map((card) => (
        <TaskCard key={card?.title} card={card} />
      ))}
    </div>
  );
};

export default Column;
