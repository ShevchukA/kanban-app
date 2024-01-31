import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

import styles from "./Root.module.css";
import { useContext } from "react";
import { UiContext } from "../../context/uiContext";
import Modal from "../../components/ui/Modal/Modal";
// type RootProps = {
//   propName: string;
// };

const Root = () => {
  const { isSidebarShown, isModalShown, activeModal, toggleSidebar } =
    useContext(UiContext);

  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  return (
    <div className={styles.app}>
      {isModalShown && <Modal window={activeModal} />}
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
