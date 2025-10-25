import { useState } from 'react';
import styles from './Header.module.css';

type HeaderProps = {
  onAccountClick: () => void;
};
// type HeaderProps - создаем тип для пропсов (входных параметров) компонента
// onAccountClick: () => void - объявляем,
//  что компонент ожидает функцию onAccountClick,
//  которая не принимает аргументов и не возвращает значения (void)

function Header({ onAccountClick }: HeaderProps) {
  // function Header - объявляем функциональный компонент React
  // ({ onAccountClick }: HeaderProps) - деструктуризация пропсов.
  //  Мы сразу извлекаем onAccountClick и указываем TypeScript,
  //   что пропсы должны соответствовать типу HeaderProps
  const [isOpen, setIsOpen] = useState(false);
  // Это состояние будет управлять видимостью мобильного меню
  return (
    <header className={styles.header}>
      <a href='#' className={styles.logo}>
        LOGO
      </a>

      <ul className={`${styles.navMenu} ${isOpen ? styles.active : ''}`}>
        {/* Динамические классы:
        styles.navMenu - базовые стили навигационного меню
        ${isOpen ? styles.active : ""} - условно добавляем класс active,
        если isOpen === true
        Это позволяет показывать/скрывать меню на мобильных устройствах */}
        <li>
          <a href='#'>About</a>
        </li>
        <li>
          <a href='#'>Services</a>
        </li>
        <li>
          <a href='#'>Good</a>
        </li>
        <li>
          <a href='#' onClick={onAccountClick}>
            Account
          </a>
        </li>
        {/* onClick={onAccountClick} - при клике вызываем функцию,
         переданную из родительского компонента */}
      </ul>

      <p className={styles.burgerIcon} onClick={() => setIsOpen(!isOpen)}>
        ☰
      </p>
      {/* onClick={() => setIsOpen(!isOpen)} - при клике переключаем состояние isOpen на
       противоположное */}
    </header>
  );
}

export default Header;

// Ключевые концепции :
// Хуки состояния - useState для управления внутренним состоянием

// Пропсы - передача данных и функций от родителя к ребенку

// Обработчики событий - onClick для реагирования на действия пользователя

// Условный рендеринг - динамическое изменение классов на основе состояния

// CSS-модули - изоляция стилей компонента

// TypeScript - типизация пропсов для надежности кода
