import { useState, type JSX } from 'react';
import style from './Sandwich.module.css';
import { useTheme } from '../themeContext/useTheme';

export default function Sandwich(): JSX.Element {
  const [sandwich, setSandwich] = useState<string>('Sandwich: ');
  const { theme, toggleTheme } = useTheme(); // Используем хук для темы

  function handleAddBread(): void {
    setSandwich(`${sandwich} Bread 🍞`);
  }

  function handleAddCheese(): void {
    setSandwich(`${sandwich} Cheese 🧀`);
  }

  function handleAddBacon(): void {
    setSandwich(`${sandwich} Bacon 🥓`);
  }

  function handleAddSalat(): void {
    setSandwich(`${sandwich} Salat 🥬`);
  }

  function handleAddReset(): void {
    setSandwich('Sandwich: ');
  }

  return (
    <div
      className={`${style.container} ${
        theme === 'dark' ? style.dark : style.light
      }`}
    >
      <h2>Sandwich</h2>
      <img
        src='https://mur-mur.top/uploads/posts/2023-05/1683186165_mur-mur-top-p-mini-burgeri-keitering-krasivo-53.jpg'
        alt='Sandwich'
      />
      <p>{sandwich}</p>
      <div className={style.btnContainer}>
        <button type='button' onClick={handleAddBread} className={style.btn}>
          Add bread
        </button>
        <button type='button' onClick={handleAddCheese} className={style.btn}>
          Add cheese
        </button>
        <button type='button' onClick={handleAddSalat} className={style.btn}>
          Add salat
        </button>
        <button type='button' onClick={handleAddBacon} className={style.btn}>
          Add bacon
        </button>
        <button type='button' onClick={handleAddReset} className={style.btn}>
          Reset
        </button>
      </div>
      <button type='button' className={style.themeToggle} onClick={toggleTheme}>
        Переключить тему на: {theme === 'dark' ? 'light' : 'dark'} (текущая:{' '}
        {theme})
      </button>
    </div>
  );
}
