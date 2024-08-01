import styles from './CloseButton.module.css';
import CloseIcon from './assets/icon-close.svg?react';

interface CloseButtonProps {
  onClick?: () => void;
}
const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <button onClick={onClick} className={styles.closeButton}>
      <CloseIcon />
    </button>
  );
};

export default CloseButton;
