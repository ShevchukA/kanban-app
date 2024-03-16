import styles from "./Column.module.css";
import { Card as CardType } from "../../models/card";
import ColumnModal from "../../modals/ColumnModal/ColumnModal";
import { useContext } from "react";
import { UiContext } from "../../context/uiContext";
import Card from "../Card/Card";

type ColumnProps = {
  index?: number;
  name?: string;
  cards?: CardType[];
  addNewColumn?: boolean;
};

const Column = ({ index, name, cards, addNewColumn }: ColumnProps) => {
  const { openModal } = useContext(UiContext);
  const handleAddNewColumn = () => {
    openModal(<ColumnModal />);
  };

  return addNewColumn ? (
    <div className={`${styles.column} ${styles["column--new"]}`}>
      <button className={styles.column__addBtn} onClick={handleAddNewColumn}>
        + New Column
      </button>
    </div>
  ) : (
    <div className={styles.column}>
      <div className={styles.column__title}>
        <span className={styles.column__pointer}></span>
        <span className={styles.column__name}>
          {name} ({cards?.length || 0})
        </span>
      </div>
      {cards?.map((card) => (
        <Card key={card?.title} card={card} columnIndex={index} />
      ))}
      <Card addNewCard={true} columnIndex={index} />
    </div>
  );
};

export default Column;
