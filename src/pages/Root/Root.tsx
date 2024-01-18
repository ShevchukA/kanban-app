import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

import styles from "./Root.module.css";
// type RootProps = {
//   propName: string;
// };

const Root = () => {
  return (
    <>
      <Header />
      <main className={styles["main-container"]}>
        <Sidebar />
        <Outlet />
      </main>
    </>
  );
};

export default Root;