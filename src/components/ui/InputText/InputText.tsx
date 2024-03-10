import styles from "./InputText.module.css";

type InputTextProps = {
  type: "text" | "multiText";
  id?: string;
  label?: string;
  placeholder?: string;
};

const InputText = ({ id, label, placeholder }: InputTextProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={`${styles.label} text--bold`}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default InputText;
