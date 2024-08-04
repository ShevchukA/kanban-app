import { SyntheticEvent } from 'react';
import styles from './InputText.module.css';

interface InputTextProps {
  type: 'text' | 'multiText';
  value: string;
  id?: string;
  label?: string;
  placeholder?: string;
  onChange: (e: SyntheticEvent) => void;
}

const InputText = ({
  type,
  id,
  value,
  label,
  placeholder,
  onChange,
}: InputTextProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={`${styles.label} text--bold`}>
        {label}
      </label>
      {type === 'text' ? (
        <input
          type='text'
          id={id}
          value={value}
          placeholder={placeholder}
          className={styles.input}
          onChange={onChange}
        />
      ) : (
        <textarea
          id={id}
          value={value}
          placeholder={placeholder}
          className={styles.textarea}
          onChange={onChange}
          rows={4}
          maxLength={160}
        />
      )}
    </div>
  );
};

export default InputText;
