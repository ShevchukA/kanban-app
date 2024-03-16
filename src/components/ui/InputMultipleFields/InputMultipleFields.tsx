import styles from "./InputMultipleFields.module.css";
import CloseButton from "../CloseButton/CloseButton";
import Button from "../Button/Button";
import { SyntheticEvent } from "react";
import { Column } from "../../../models/column";
import { Subtask } from "../../../models/subtask";

type InputMultipleFieldsProps = {
  value: Column[] | Subtask[];
  label?: string;
  onChange: (e: SyntheticEvent, index: number) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
};

const InputMultipleFields = ({
  value,
  label,
  onChange,
  onAdd,
  onDelete,
}: InputMultipleFieldsProps) => {
  const buttonText =
    label == "Board Columns" ? "+Add New Column" : "+Add New Subtask";
  return (
    <div className={styles.container}>
      <label className={`${styles.label} text--bold`}>{label}</label>
      {value?.map((item, index) => (
        <span key={item.id} className={styles.line}>
          <input
            type="text"
            value={item.name}
            className={styles.input}
            onChange={(e) => onChange(e, index)}
          />
          <CloseButton onClick={() => onDelete(item.id)} />
        </span>
      ))}

      <Button text={buttonText} type="secondary" onClick={onAdd} />
    </div>
  );
};

export default InputMultipleFields;
