import { SyntheticEvent } from "react";
import styles from "./InputText.module.css";

type InputTextProps = {
  type: "text" | "multiText";
  value: string;
  id?: string;
  label?: string;
  placeholder?: string;
  onChange: (e: SyntheticEvent) => void;
};

const InputText = ({
  id,
  value,
  label,
  placeholder,
  onChange,
}: InputTextProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={`${styles.label} text--bold`}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        placeholder={placeholder}
        className={styles.input}
        onChange={onChange}
      />
    </div>
  );
};

export default InputText;
