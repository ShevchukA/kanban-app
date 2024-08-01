import styles from './MenuButton.module.css';
import MenuIcon from './assets/icon-vertical-ellipsis.svg?react';

interface MenuButtonProps {
  onClick: (e: React.MouseEvent) => void;
}
const MenuButton = ({ onClick }: MenuButtonProps) => {
  return (
    <button
      onClick={(e) => {
        onClick(e);
      }}
      className={styles.menuButton}
    >
      <MenuIcon />
    </button>
  );
};

export default MenuButton;
