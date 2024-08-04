import { ReactNode, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { UiContext } from '../../../context/uiContext';

interface ModalProps {
  window?: ReactNode;
}

const Modal = ({ window }: ModalProps) => {
  const modalRoot = document.getElementById('root-modal');
  const { closeModal } = useContext(UiContext);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return (
    <>
      {modalRoot &&
        ReactDOM.createPortal(
          <div className={styles.backdrop} onClick={closeModal}>
            <div
              className={styles.modal}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {window}
            </div>
          </div>,
          modalRoot
        )}
    </>
  );
};

export default Modal;
