import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import styles from './Root.module.css';
import { useContext, useEffect } from 'react';
import { UiContext } from '../../context/uiContext';
import Modal from '../../components/ui/Modal/Modal';
import { useQuery } from '@tanstack/react-query';
import { getBoards } from '../../database/api';
import { Board } from '../../models/board';

const Root = () => {
  const {
    isSidebarShown,
    isModalShown,
    activeModal,
    activeBoardIndex,
    toggleSidebar,
  } = useContext(UiContext);

  const navigate = useNavigate();

  const {
    data: boards,
    isLoading,
    isError,
    error,
  } = useQuery<Board[]>({
    queryKey: ['boards'],
    queryFn: getBoards, // fetch from my api
    // select: (boards) => boards.map((board: Board) => board.name), // get array of names from response data, it does't affect on cache
  });

  useEffect(() => {
    if (boards) {
      navigate(`/boards/${boards[activeBoardIndex]?.id}`);
    }
  }, [boards, activeBoardIndex, navigate]);

  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  const Loader = () => (
    <div className={styles.container}>
      <h1 className='heading--xl'>Loading...</h1>
    </div>
  );

  const Error = () => (
    <div className={styles.container}>
      <h1 className='heading--xl'>{error?.message}</h1>
    </div>
  );

  return (
    <div className={styles.app}>
      {isModalShown && <Modal window={activeModal} />}
      <Header title={boards?.[activeBoardIndex].name} />
      <main
        className={
          isSidebarShown
            ? `${styles.main}`
            : `${styles.main} ${styles['main--hidden']}`
        }
      >
        <Sidebar boards={boards} onToggle={handleToggleSidebar} />
        {isLoading ? <Loader /> : isError ? <Error /> : <Outlet />}
      </main>
    </div>
  );
};

export default Root;
