import styles from "./MenuButton.module.css";
import MenuIcon from "./assets/icon-vertical-ellipsis.svg?react";

type MenuButtonPropsType = {
  onClick?: () => void;
};
const MenuButton = ({ onClick }: MenuButtonPropsType) => {
  return (
    <button onClick={onClick} className={styles.menuButton}>
      <MenuIcon />
    </button>
  );
};

export default MenuButton;
