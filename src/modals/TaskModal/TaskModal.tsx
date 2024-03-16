import { useContext } from "react";
import ContextMenu from "../../components/ui/ContextMenu/ContextMenu";
import { Card } from "../../models/card";
import styles from "./TaskModal.module.css";
import { UiContext } from "../../context/uiContext";
import DeleteModal from "../DeleteModal/DeleteModal";
import CardModal from "../CardModal/CardModal";

type TaskModalProps = {
  card: Card;
  columnIndex: number;
};

const TaskModal = ({ card, columnIndex }: TaskModalProps) => {
  const { openModal } = useContext(UiContext);

  const handleDeleteTask = () => {
    openModal(<DeleteModal target="card" object={card} />);
  };

  const handleEditTask = () => {
    openModal(
      <CardModal type="editCard" card={card} columnIndex={columnIndex} />
    );
  };

  return (
    <div className={styles.taskModal}>
      <div className={styles.taskModal__title}>
        <h1 className="heading--xl">{card.title}</h1>
        <ContextMenu
          target="Card"
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          centered
        />
      </div>
      {card.description && <p className="text">{card.description}</p>}
      {card.subtasks && (
        <div>
          <p className="heading--s">Subtasks</p>
          <ul className={styles.taskModal__subtasks}>
            {card.subtasks.map((subtask) => (
              <li
                key={subtask.name}
                className={
                  subtask.isCompleted
                    ? `${styles["taskModal__subtask--completed"]} ${styles.taskModal__subtask}`
                    : `${styles.taskModal__subtask}`
                }
              >
                <input type="checkbox" defaultChecked={subtask.isCompleted} />
                <label>{subtask.name}</label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskModal;
