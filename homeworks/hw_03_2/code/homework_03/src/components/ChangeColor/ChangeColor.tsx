import { useState, type JSX } from 'react';
import style from './ChangeColor.module.css';

export default function ChangeColor(): JSX.Element {
  const [containerColor, setContainerColor] = useState('#f0f0f0');

  return (
    <div className={style.taskColor}>
      <h2>Задание 1: Изменение цвета контейнера</h2>
      <div className={style.btnGroup}>
        <button
          className={`${style.colorBtn} ${style.red}`}
          onClick={() => setContainerColor('#ff6b6b')}
        >
          Red
        </button>
        <button
          className={`${style.colorBtn} ${style.green}`}
          onClick={() => setContainerColor('#51cf66')}
        >
          Green
        </button>
        <button
          className={`${style.colorBtn} ${style.blue}`}
          onClick={() => setContainerColor('#339af0')}
        >
          Blue
        </button>
      </div>
      <div
        className={style.colorContainer}
        style={{ backgroundColor: containerColor }}
      >
        <p>Контейнер Color</p>
        <p>Текущий цвет: {containerColor}</p>
      </div>
    </div>
  );
}
