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

  const menuRef = useRef(null);

  // useEffect(() => {
  //   if (isMenuShown) {
  //     document.addEventListener("click", (e) => {
  //       if (!menuRef.current?.contains(e.target)) {
  //         handleToggleMenu();
  //       }
  //     });
  //   } else {
  //     document.removeEventListener("click", () => {});
  //   }
  // }, [isMenuShown]);

  const handleToggleMenu = () => {
    setIsMenuShown((prevState) => !prevState);
  };

  return (
    <>
      <MenuButton onClick={handleToggleMenu} />
      <div
        ref={menuRef}
        className={`${styles.contextMenu} ${
          isMenuShown ? "" : styles["contextMenu--hidden"]
        }`}
      >
        <div
          onClick={() => {
            handleToggleMenu();
            onEdit && onEdit();
          }}
          className={`text ${styles["contextMenu__editItem"]}`}
        >
          Edit {target}
        </div>
        <div
          onClick={() => {
            handleToggleMenu();
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
