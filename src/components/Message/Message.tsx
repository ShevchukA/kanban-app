import styles from './Message.module.css';

interface MessageProps {
  message: string;
}

export const Message = ({ message }: MessageProps) => (
  <div className={styles.container}>
    <h1 className='heading--l'>{message}</h1>
  </div>
);
