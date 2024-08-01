import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  size?: 'large';
  type?: 'secondary' | 'negative';
  stretched?: boolean;
  disabled?: boolean;
  submit?: boolean;
  onClick?: () => void;
}

const Button = ({
  text,
  size,
  type,
  stretched,
  disabled,
  submit,
  onClick,
}: ButtonProps) => {
  const style = `${styles.button} ${
    size === 'large' ? styles['button--large'] : ''
  } ${type === 'secondary' ? styles['button--secondary'] : ''} ${
    type === 'negative' ? styles['button--negative'] : ''
  } ${stretched ? styles['button--stretched'] : ''}`;

  return (
    <button
      disabled={disabled}
      className={style}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
    >
      {text}
    </button>
  );
};

export default Button;
