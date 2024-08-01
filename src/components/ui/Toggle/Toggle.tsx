import { useContext } from 'react';
import styles from './Toggle.module.css';
import DarkThemeIcon from './assets/icon-dark-theme.svg?react';
import LightThemeIcon from './assets/icon-light-theme.svg?react';
import { UiContext } from '../../../context/uiContext';

const Toggle = () => {
  const { isDarkMode, toggleDarkMode } = useContext(UiContext);

  const handleToggleTheme = () => {
    toggleDarkMode();
  };

  return (
    <div className={styles.toggle}>
      <LightThemeIcon />
      <div onClick={handleToggleTheme} className={styles.toggle__switch}>
        <div
          className={`${styles.toggle__pointer} ${
            isDarkMode ? styles['toggle--dark'] : styles['toggle--light']
          }`}
        ></div>
      </div>
      <DarkThemeIcon />
    </div>
  );
};

export default Toggle;
