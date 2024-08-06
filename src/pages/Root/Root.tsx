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
import { Message } from '../../components/ui/Message/Message';

const Root = () => {
  const { isModalShown, activeModal, activeBoardIndex, toggleSidebar } =
    useContext(UiContext);

  const navigate = useNavigate();

  const {
    data: boards,
    isLoading,
    isError,
    error,
  } = useQuery<Board[]>({
    queryKey: ['boards'],
    queryFn: getBoards, // fetch from api
  });

  useEffect(() => {
    if (boards) {
      if (boards.length === 0) {
        navigate('/');
      } else {
        navigate(`/boards/${boards[activeBoardIndex]?.id}`);
      }
    }
  }, [boards, activeBoardIndex, navigate]);

  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  return (
    <div className={styles.app}>
      {isModalShown && <Modal window={activeModal} />}
      <Header />
      <main className={styles.main}>
        <Sidebar boards={boards} onToggle={handleToggleSidebar} />
        {isLoading && <Message message='Loading...' />}
        {isError && <Message message={error.message} />}
        {boards && <Outlet />}
      </main>
    </div>
  );
};

export default Root;
