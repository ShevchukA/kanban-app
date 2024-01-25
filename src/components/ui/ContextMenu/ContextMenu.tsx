import { useState } from "react";
import MenuButton from "../MenuButton/MenuButton";
import styles from "./ContextMenu.module.css";

type ContextMenuPropsType = {
  target?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

const ContextMenu = ({ target, onDelete, onEdit }: ContextMenuPropsType) => {
  const [isMenuShown, setIsMenuShown] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuShown((prevState) => !prevState);
  };

  return (
    <>
      <MenuButton onClick={handleToggleMenu} />
      <div
        className={`${styles.contextMenu} ${
          isMenuShown ? "" : styles["contextMenu--hidden"]
        }`}
      >
        <div
          onClick={onEdit}
          className={`${styles["contextMenu__editItem"]} text`}
        >
          Edit {target}
        </div>
        <div
          onClick={onDelete}
          className={`${styles["contextMenu__deleteItem"]} text`}
        >
          Delete {target}
        </div>
      </div>
    </>
  );
};

export default ContextMenu;
