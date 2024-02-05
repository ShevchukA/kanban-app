import { useContext } from "react";
import styles from "./Header.module.css";
import logoDark from "./assets/logo-dark.svg";
import logoLight from "./assets/logo-light.svg";
import { UiContext } from "../../context/uiContext";
import Button from "../ui/Button/Button";
import ContextMenu from "../ui/ContextMenu/ContextMenu";

type HeaderPropsType = {
  title?: string;
};

const Header = ({ title }: HeaderPropsType) => {
  const { isDarkMode, openModal } = useContext(UiContext);
  const logoSrc = isDarkMode ? logoLight : logoDark;

  const handleEditBoard = () => {
    console.log("Edit", title);
  };

  const handleDeleteBoard = () => {
    console.log("Delete", title);
  };

  return (
    <header className={styles.header}>
      <img src={logoSrc} alt="logo" />
      <h1 className="heading--xl">{title}</h1>
      {title && (
        <div className={styles.header__controls}>
          <Button
            text="+ Add New Task"
            size="large"
            // onClick={() => {
            //   openModal(<TaskModal />);
            // }}
          />
          <ContextMenu
            target="Board"
            onDelete={handleDeleteBoard}
            onEdit={handleEditBoard}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
