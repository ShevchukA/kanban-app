import styles from "./Card.module.css";
import { Card as CardType } from "../../models/card";
import { useContext } from "react";
import { UiContext } from "../../context/uiContext";
import TaskModal from "../../modals/TaskModal/TaskModal";
import CardModal from "../../modals/CardModal/CardModal";

type CardProps = {
  card?: CardType;
  addNewCard?: boolean;
  columnIndex?: number;
};

const Card = ({ card, addNewCard, columnIndex }: CardProps) => {
  const { openModal } = useContext(UiContext);

  const handleCardClick = () => {
    if (card && columnIndex !== undefined) {
      openModal(<TaskModal card={card} columnIndex={columnIndex} />);
    }
  };

  const handleAddNewCard = () => {
    openModal(<CardModal type="newCard" columnIndex={columnIndex} />);
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
      <div className="text--bold">{card?.subtasks?.length || 0} subtasks</div>
    </div>
  );
};

export default Card;
