import styles from "./TaskCard.module.css";
import { Card } from "../../models/card";

type TaskCardProps = {
  card?: Card;
  addNewCard?: boolean;
};

const TaskCard = ({ card, addNewCard }: TaskCardProps) => {
  return addNewCard ? (
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
