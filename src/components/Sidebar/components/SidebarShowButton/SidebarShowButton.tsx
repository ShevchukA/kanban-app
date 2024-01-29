import { ReactNode, useContext } from "react";
import styles from "./SidebarShowButton.module.css";
import { UiContext } from "../../../../context/uiContext";

type SidebarShowButtonProps = {
  icon?: ReactNode;
  onClick: () => void;
};

const SidebarShowButton = ({ icon, onClick }: SidebarShowButtonProps) => {
  const { isSidebarShown } = useContext(UiContext);

  return (
    <button
      onClick={onClick}
      className={`${styles["sidebar__showButton"]} ${
        isSidebarShown ? styles["sidebar__showButton--hidden"] : ""
      }`}
    >
      {icon}
    </button>
  );
};

export default SidebarShowButton;
