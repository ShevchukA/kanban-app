import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      <p>All boards</p>
      <ul>
        <li>Platform Launch</li>
        <li>Marketing Plan</li>
        <li>Roadmap</li>
      </ul>
      <button>+ Create New Board</button>
      <div>toggle</div>
      <button>Hide Sidebar</button>
    </nav>
  );
};

export default Sidebar;
