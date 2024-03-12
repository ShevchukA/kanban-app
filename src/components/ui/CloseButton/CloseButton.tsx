import styles from "./CloseButton.module.css";
import CloseIcon from "./assets/icon-close.svg?react";

type CloseButtonPropsType = {
  onClick?: () => void;
};
const CloseButton = ({ onClick }: CloseButtonPropsType) => {
  return (
    <button onClick={onClick} className={styles.closeButton}>
      <CloseIcon />
    </button>
  );
};

export default CloseButton;
