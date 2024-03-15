import { useContext } from "react";
import styles from "./Header.module.css";
import logoDark from "./assets/logo-dark.svg";
import logoLight from "./assets/logo-light.svg";
import { UiContext } from "../../context/uiContext";
import Button from "../ui/Button/Button";
import ContextMenu from "../ui/ContextMenu/ContextMenu";
import BoardModal from "../../modals/BoardModal/BoardModal";
import { Board } from "../../models/board";
import { useQueryClient } from "@tanstack/react-query";
import DeleteModal from "../../modals/DeleteModal/DeleteModal";

type HeaderPropsType = {
  title?: string;
};

const Header = ({ title }: HeaderPropsType) => {
  const { activeBoardIndex, isDarkMode, openModal } = useContext(UiContext);
  const queryClient = useQueryClient();

  const logoSrc = isDarkMode ? logoLight : logoDark;

  const handleEditBoard = () => {
    const boardsList = queryClient.getQueryData(["getBoardsList"]) as Board[];
    const board = boardsList[activeBoardIndex];
    openModal(<BoardModal type="editBoard" board={board} />);
  };

  const handleDeleteBoard = () => {
    const boardsList = queryClient.getQueryData(["getBoardsList"]) as Board[];
    const board = boardsList[activeBoardIndex];
    openModal(<DeleteModal target="board" object={board} />);
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
