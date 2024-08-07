/// <reference types="vite-plugin-svgr/client" />

import { useContext } from 'react';
import styles from './Sidebar.module.css';
import { UiContext } from '../../context/uiContext';
import SidebarLink from './components/SidebarLink/SidebarLink';
import BoardIcon from './assets/icon-board.svg?react';
import HideIcon from './assets/icon-hide-sidebar.svg?react';
import ShowIcon from './assets/icon-show-sidebar.svg?react';
import SidebarShowButton from './components/SidebarShowButton/SidebarShowButton';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import BoardModal from '../../modals/BoardModal/BoardModal';

import { Board } from '../../models/board';

interface SidebarProps {
  boards?: Board[];
}

const Sidebar = ({ boards }: SidebarProps) => {
  const { toggleSidebar, selectBoard, openModal, isSidebarShown } =
    useContext(UiContext);

  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  const handleBoardSelection = (index: number) => {
    selectBoard(index);
  };

  const handleBoardCreation = () => {
    openModal(<BoardModal type='newBoard' />);
  };

  return (
    <nav
      className={
        isSidebarShown
          ? `${styles.sidebar}`
          : `${styles.sidebar} ${styles['sidebar--hidden']}`
      }
    >
      <div className={styles.sidebar__boardList}>
        <p className={`${styles.sidebar__title} text--bold`}>All boards</p>
        <ul>
          {boards && boards.length > 0 && (
            <>
              {boards.map((board: Board, index: number) => (
                <SidebarLink
                  key={board.id}
                  link={board.id}
                  icon={<BoardIcon />}
                  onClick={() => {
                    handleBoardSelection(index);
                  }}
                >
                  {board.name}
                </SidebarLink>
              ))}
            </>
          )}
          <SidebarLink
            specialLink={true}
            icon={<BoardIcon />}
            onClick={handleBoardCreation}
          >
            + Create New Board
          </SidebarLink>
        </ul>
      </div>

      <div className={styles.sidebar__controls}>
        <ThemeToggle />
        <SidebarLink icon={<HideIcon />} onClick={handleToggleSidebar}>
          Hide Sidebar
        </SidebarLink>
      </div>
      <SidebarShowButton icon={<ShowIcon />} onClick={handleToggleSidebar} />
    </nav>
  );
};

export default Sidebar;
