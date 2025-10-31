import { useState, type JSX } from 'react';
import style from './Counter.module.css';

export const Counter = (): JSX.Element => {
  const [counter, setCounter] = useState<number>(0);
  // создали переменную состояния counter
  // и функцию setCounter для изменения состояния
  // useState -  это хук
  // в круглых скобках начальное состояние переменной состояния
  // хук useState  принимает начальное значение переменной состояния
  // возвращает массив в котором на первом месте переменная состояния
  // а на втором месте функция  сетер
  // Хук - это функция которая используется только внутри компонента
  // В жизненном цикле компонента React есть 3 фазы:
  // Сборка (mounting)
  // Обновление (updating)
  // Разборка (unmounting)
  function handlePlus(): void {
    setCounter(counter + 1);
  }
  function handleMinus(): void {
    setCounter(counter - 1);
  }
  function handlePlusHundred(): void {
    setCounter(counter + 100);
  }
  function handleReset(): void {
    setCounter(0);
  }

  return (
    <div>
      <h2>Добавление денег</h2>
      <img
        src='https://www.zastavki.com/pictures/originals/2020Finance_Wallpapers___Money_Lot_of_euro_bills_close_up_145693_.jpg'
        alt='Деньги'
      />
      <div className={`${style.container} ${style.counterClass}`}>
        <button className={style.btn} type='button' onClick={handlePlus}>
          Добавить денег на счет
        </button>
        <button className={style.btn} type='button' onClick={handlePlusHundred}>
          Добавить 100€ на счет
        </button>
        <span style={{ color: 'red' }}>{counter} €</span>
        <button className={style.btn} type='button' onClick={handleMinus}>
          Снять деньги с счета
        </button>
        <button className={style.btn} type='button' onClick={handleReset}>
          Обнулить деньги на счете
        </button>
      </div>
    </div>
  );
};
