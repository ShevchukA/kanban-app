import styles from "./TaskCard.module.css";
import { Card } from "../../models/card";

type TaskCardProps = {
  card?: Card;
  newCard?: boolean;
};

const TaskCard = ({ card, newCard }: TaskCardProps) => {
  return newCard ? (
    <div className={`${styles.card} ${styles["card--new"]}`}>
      <button className={styles.card__addBtn}>+ New Task</button>
    </div>
  ) : (
    <div className={styles.card}>
      <div className="heading--m">{card?.title}</div>
      <div className="text--bold">{card?.subtasks.length} subtasks</div>
    </div>
  );
};

export default TaskCard;
