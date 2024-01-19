import styles from "./Sidebar.module.css";

type SidebarProps = {
  onClick: () => void;
};

const Sidebar = ({ onClick }: SidebarProps) => {
  return (
    <nav className={styles.sidebar} onClick={onClick}>
      <div className={styles.boardList}>
        <p className={`${styles.title} text--bold`}>All boards</p>
        <ul>
          <li>Platform Launch</li>
          <li>Marketing Plan</li>
          <li>Roadmap</li>
        </ul>
        <button>+ Create New Board</button>
      </div>

      <div>toggle</div>
      <button>Hide Sidebar</button>
    </nav>
  );
};

export default Sidebar;
