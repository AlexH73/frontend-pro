import { useState, type JSX } from 'react';

import styles from './App.module.css';
import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';

function App(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // isModalOpen - текущее значение (boolean), изначально false (модалка закрыта)
  // setIsModalOpen - функция для изменения этого состояния
  // useState(false) - инициализация хука с начальным значением false

  return (
    <div className={styles.app}>
      <Header onAccountClick={() => setIsModalOpen(true)} />
      {/* onAccountClick - функция, которая выполнится при клике на "Account"
      () => setIsModalOpen(true) - стрелочная функция,
       которая устанавливает isModalOpen = true (открывает модалку) */}
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
      {/* {isModalOpen && ...} - если isModalOpen = true, то рендерим Modal
      <Modal onClose={() => setIsModalOpen(false)} /> - передаем пропс:
      onClose - функция, которая выполнится при закрытии модалки
      () => setIsModalOpen(false) - стрелочная функция,
       которая устанавливает isModalOpen = false (закрывает модалку) */}
    </div>
  );
}

export default App;

// Ключевые моменты :
// Управление состоянием - App контролирует, открыта модалка или нет

// Передача функций как пропсов - App передает callback-функции детям

// Условный рендеринг - Modal показывается только когда isModalOpen = true

// Односторонний поток данных - данные идут от родителя (App) к детям (Header, Modal)
