import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

import styles from "./Root.module.css";
import { useContext } from "react";
import { UiContext } from "../../context/uiContext";
// type RootProps = {
//   propName: string;
// };

const Root = () => {
  const { isSidebarShown, toggleSidebar } = useContext(UiContext);

  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  return (
    <>
      <Header />
      <main
        className={
          isSidebarShown
            ? `${styles.container}`
            : `${styles.container} ${styles["container--hidden"]}`
        }
      >
        <Sidebar onToggle={handleToggleSidebar} />
        <Outlet />
      </main>
    </>
  );
};

export default Root;
