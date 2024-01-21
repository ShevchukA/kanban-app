import { NavLink } from "react-router-dom";
import styles from "./SidebarLink.module.css";
import { ReactNode } from "react";

type SidebarLinkPropsType = {
  board?: string;
  children?: ReactNode;
  icon?: ReactNode;
  specialLink?: boolean;
  onClick?: () => void;
};
const SidebarLink = ({
  board,
  children,
  icon,
  specialLink,
  onClick,
}: SidebarLinkPropsType) => {
  return board ? (
    <NavLink
      to={`/boards/${board?.toLowerCase()}`}
      onClick={onClick}
      className={({ isActive }) => {
        return isActive
          ? `${styles.link} ${styles["link--active"]}`
          : styles.link;
      }}
    >
      {icon}
      {children}
    </NavLink>
  ) : (
    <button
      onClick={onClick}
      className={`${styles.link} ${specialLink ? styles["link--spacial"] : ""}`}
    >
      {icon}
      {children}
    </button>
  );
};

export default SidebarLink;
