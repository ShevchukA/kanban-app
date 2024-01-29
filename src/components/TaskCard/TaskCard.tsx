import styles from "./TaskCard.module.css";
import { Card } from "../../models/card";

type TaskCardProps = {
  card: Card;
};

const TaskCard = ({ card }: TaskCardProps) => {
  return (
    <div className={styles.card}>
      <div className="heading--m">{card.title}</div>
      <div className="text--bold">{card.subtasks.length} subtasks</div>
    </div>
  );
};

export default TaskCard;
