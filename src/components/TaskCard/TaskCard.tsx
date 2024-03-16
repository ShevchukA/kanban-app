import styles from "./TaskCard.module.css";
import { Card } from "../../models/card";
import { useContext } from "react";
import { UiContext } from "../../context/uiContext";
import TaskModal from "../../modals/TaskModal/TaskModal";
import CardModal from "../../modals/CardModal/CardModal";

type TaskCardProps = {
  card?: Card;
  addNewCard?: boolean;
};

const TaskCard = ({ card, addNewCard }: TaskCardProps) => {
  const { openModal } = useContext(UiContext);

  const handleCardClick = () => {
    card && openModal(<TaskModal card={card} />);
  };

  const handleAddNewCard = () => {
    openModal(<CardModal type="newCard" />);
  };

  return addNewCard ? (
    <div className={`${styles.card} ${styles["card--new"]}`}>
      <button className={styles.card__addBtn} onClick={handleAddNewCard}>
        + New Card
      </button>
    </div>
  ) : (
    <div className={styles.card} onClick={handleCardClick}>
      <div className="heading--m">{card?.title}</div>
      <div className="text--bold">{card?.subtasks.length} subtasks</div>
    </div>
  );
};

export default TaskCard;
