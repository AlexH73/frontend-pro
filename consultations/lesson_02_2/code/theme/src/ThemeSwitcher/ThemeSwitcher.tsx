import { useState, type JSX } from 'react';
import style from './ThemeSwitcher.module.css';

export const ThemeSwitcher = (): JSX.Element => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggleTheme = (): void => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    // Применяем тему напрямую к корневому элементу
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className={style.themeSwitcher}>
      <h3>Переключатель темы</h3>
      <p className={style.currentTheme}>Текущая тема: {theme}</p>
      <button className={style.toggleButton} onClick={toggleTheme}>
        Сменить тему
      </button>
    </div>
  );
};
