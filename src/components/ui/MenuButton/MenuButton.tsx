import styles from "./MenuButton.module.css";
import MenuIcon from "./assets/icon-vertical-ellipsis.svg?react";

const MenuButton = () => {
  return (
    <button className={styles.menuButton}>
      <MenuIcon />
    </button>
  );
};

export default MenuButton;
