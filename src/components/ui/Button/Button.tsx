import styles from "./Button.module.css";

type ButtonPropsType = {
  text: string;
  size?: "large";
  type?: "secondary" | "negative";
  stretched?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  text,
  size,
  type,
  stretched,
  disabled,
  onClick,
}: ButtonPropsType) => {
  const style = `${styles.button} ${
    size === "large" ? styles["button--large"] : ""
  } ${type === "secondary" ? styles["button--secondary"] : ""} ${
    type === "negative" ? styles["button--negative"] : ""
  } ${stretched ? styles["button--stretched"] : ""}`;

  return (
    <button disabled={disabled} className={style} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
