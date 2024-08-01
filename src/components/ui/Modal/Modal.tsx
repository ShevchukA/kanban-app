import { ReactNode, useContext } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { UiContext } from '../../../context/uiContext';

interface ModalProps {
  window?: ReactNode;
}

const Modal = ({ window }: ModalProps) => {
  const modalRoot = document.getElementById('root-modal');
  const { closeModal } = useContext(UiContext);

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
