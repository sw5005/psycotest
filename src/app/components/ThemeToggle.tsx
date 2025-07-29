'use client';

import { useTheme } from '../context/ThemeContext';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`${
        theme === 'light' ? '다크' : '라이트'
      } 모드로 변경`}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
