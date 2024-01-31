import MenuButton from "../../components/ui/MenuButton/MenuButton";
import { Card } from "../../models/card";
import styles from "./TaskModal.module.css";

type TaskModalProps = {
  card: Card;
};

const TaskModal = ({ card }: TaskModalProps) => {
  return (
    <div className={styles.taskModal}>
      <div className={styles.taskModal__title}>
        <h1 className="heading--xl">{card.title}</h1>
        <MenuButton />
      </div>
      {card.description && <p className="text">{card.description}</p>}
      {card.subtasks && (
        <div>
          <p className="heading--s">Subtasks</p>
          <ul className={styles.taskModal__subtasks}>
            {card.subtasks.map((subtask) => (
              <li
                key={subtask.title}
                className={
                  subtask.isCompleted
                    ? `${styles["taskModal__subtask--completed"]} ${styles.taskModal__subtask}`
                    : `${styles.taskModal__subtask}`
                }
              >
                <input type="checkbox" checked={subtask.isCompleted} />
                <label>{subtask.title}</label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskModal;
