/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import { useContext } from 'react';
import styles from './Header.module.css';
import logoDark from './assets/logo-dark.svg';
import logoLight from './assets/logo-light.svg';
import { UiContext } from '../../context/uiContext';
import ContextMenu from '../ui/ContextMenu/ContextMenu';
import BoardModal from '../../modals/BoardModal/BoardModal';
import { Board } from '../../models/board';
import { useQueryClient } from '@tanstack/react-query';
import DeleteModal from '../../modals/DeleteModal/DeleteModal';

const Header = () => {
  const { activeBoardIndex, isDarkMode, openModal } = useContext(UiContext);
  const queryClient = useQueryClient();
  const boards = queryClient.getQueryData(['boards']) as Board[];

  const title = boards && boards[activeBoardIndex]?.name;

  const logoSrc = isDarkMode ? logoLight : logoDark;

  const handleEditBoard = () => {
    const board = boards[activeBoardIndex];
    openModal(<BoardModal type='editBoard' board={board} />);
  };

  const handleDeleteBoard = () => {
    const board = boards[activeBoardIndex];
    openModal(<DeleteModal target='board' object={board} />);
  };

  return (
    <header className={styles.header}>
      <img src={logoSrc} alt='logo' />
      {title && (
        <>
          <h1 className='heading--xl'>{title}</h1>
          <div className={styles.header__controls}>
            <ContextMenu
              target='Board'
              onDelete={handleDeleteBoard}
              onEdit={handleEditBoard}
            />
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
