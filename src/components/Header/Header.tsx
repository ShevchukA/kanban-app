import { useContext } from "react";
import styles from "./Header.module.css";
import logoDark from "./assets/logo-dark.svg";
import logoLight from "./assets/logo-light.svg";
import { UiContext } from "../../context/uiContext";
import { BoardContext } from "../../context/boardsContext";
import Button from "../ui/Button/Button";
import ContextMenu from "../ui/ContextMenu/ContextMenu";

const Header = () => {
  const { boards } = useContext(BoardContext);
  const { isDarkMode, activeBoard } = useContext(UiContext);
  const logoSrc = isDarkMode ? logoLight : logoDark;

  const handleEditBoard = () => {
    console.log("Edit", boards[activeBoard]?.name);
  };

  const handleDeleteBoard = () => {
    console.log("Delete", boards[activeBoard]?.name);
  };

  return (
    <header className={styles.header}>
      <img src={logoSrc} alt="logo" />
      <h1 className="heading--xl">{boards[activeBoard]?.name}</h1>
      <div className={styles.header__controls}>
        <Button text="+ Add New Task" size="large" />
        <ContextMenu
          target="Board"
          onDelete={handleDeleteBoard}
          onEdit={handleEditBoard}
        />
      </div>
    </header>
  );
};

export default Header;
