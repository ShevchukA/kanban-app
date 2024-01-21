/// <reference types="vite-plugin-svgr/client" />

import { Link, NavLink } from "react-router-dom";
import styles from "./BoardLink.module.css";
import { ReactNode } from "react";
import BoardIcon from "./assets/icon-board.svg?react";

type BoardLinkPropsType = {
  board?: string;
  onClick?: () => void;
  children?: ReactNode;
};
const BoardLink = ({ board, children, onClick }: BoardLinkPropsType) => {
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
      <BoardIcon />
      {children}
    </NavLink>
  ) : (
    <Link
      to="/"
      onClick={onClick}
      className={`${styles.link} ${styles["link--create"]}`}
    >
      <BoardIcon />
      {children}
    </Link>
  );
};

export default BoardLink;
