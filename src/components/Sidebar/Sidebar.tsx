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
import Button from '../ui/Button/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resetServerData } from '../../database/api';
import { Board } from '../../models/board';

interface SidebarProps {
  boards?: Board[];
  onToggle: () => void;
}

const Sidebar = ({ boards, onToggle }: SidebarProps) => {
  const { selectBoard, openModal, isSidebarShown } = useContext(UiContext);

  const queryClient = useQueryClient();

  // TODO delete
  const resetMutation = useMutation({
    mutationFn: resetServerData,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['boards'],
      });
    },
  });

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
        <SidebarLink icon={<HideIcon />} onClick={onToggle}>
          Hide Sidebar
        </SidebarLink>
        <Button
          text='Reset'
          onClick={() => {
            resetMutation.mutate();
            selectBoard(0);
          }}
        />
      </div>
      <SidebarShowButton icon={<ShowIcon />} onClick={onToggle} />
    </nav>
  );
};

export default Sidebar;
