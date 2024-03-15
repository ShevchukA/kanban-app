import { useEffect, useRef, useState } from "react";
import MenuButton from "../MenuButton/MenuButton";
import styles from "./ContextMenu.module.css";

type ContextMenuPropsType = {
  target?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

const ContextMenu = ({ target, onDelete, onEdit }: ContextMenuPropsType) => {
  const [isMenuShown, setIsMenuShown] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent) => {
    if (!isMenuShown) {
      // prevent close menu from handleClickOutside()
      event.stopPropagation();
    }

    setIsMenuShown((prevState) => !prevState);
  };

  const handleCloseMenu = () => {
    setIsMenuShown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleCloseMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <MenuButton onClick={handleOpenMenu} />
      <div
        ref={menuRef}
        className={`${styles.contextMenu} ${
          isMenuShown ? "" : styles["contextMenu--hidden"]
        }`}
      >
        <div
          onClick={() => {
            handleCloseMenu();
            onEdit && onEdit();
          }}
          className={`text ${styles["contextMenu__editItem"]}`}
        >
          Edit {target}
        </div>
        <div
          onClick={() => {
            handleCloseMenu();
            onDelete && onDelete();
          }}
          className={`text ${styles["contextMenu__deleteItem"]}`}
        >
          Delete {target}
        </div>
      </div>
    </>
  );
};

export default ContextMenu;
