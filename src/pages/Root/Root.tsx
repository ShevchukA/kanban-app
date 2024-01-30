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
    <div className={styles.app}>
      <Header />
      <main
        className={
          isSidebarShown
            ? `${styles.main}`
            : `${styles.main} ${styles["main--hidden"]}`
        }
      >
        <Sidebar onToggle={handleToggleSidebar} />
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
