import { NavLink } from "react-router-dom";
import styles from "./SidebarLink.module.css";
import { ReactNode } from "react";

type SidebarLinkPropsType = {
  link?: string;
  children?: ReactNode;
  icon?: ReactNode;
  specialLink?: boolean;
  onClick?: () => void;
};
const SidebarLink = ({
  link,
  children,
  icon,
  specialLink,
  onClick,
}: SidebarLinkPropsType) => {
  return link ? (
    <NavLink
      to={`/boards/${link}`}
      onClick={onClick}
      className={({ isActive }) => {
        return isActive
          ? `${styles.sidebar__link} ${styles["sidebar__link--active"]}`
          : styles.sidebar__link;
      }}
    >
      {icon}
      {children}
    </NavLink>
  ) : (
    <button
      onClick={onClick}
      className={`${styles.sidebar__link} ${
        specialLink ? styles["sidebar__link--spacial"] : ""
      }`}
    >
      {icon}
      {children}
    </button>
  );
};

export default SidebarLink;
