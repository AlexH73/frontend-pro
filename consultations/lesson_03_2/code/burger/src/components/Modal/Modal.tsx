import styles from './Modal.module.css';

type ModalProps = {
  onClose: () => void;
};
// Создаем тип для пропсов компонента Modal
// onClose: () => void - объявляем, что компонент ожидает:
// функцию с именем onClose
// которая не принимает аргументов (())
// и не возвращает значения (void)
// Это функция, которая будет вызвана при закрытии модального окна

function Modal({ onClose }: ModalProps) {
  // ({ onClose }: ModalProps) - деструктурируем пропсы и указываем TypeScript тип
  // Компонент получает единственный пропс - функцию onClose
  return (
    <div className={styles.popup}>
      <div className={styles.popupBody}>
        <div className={styles.popupContent}>
          <span className={styles.crossIcon} onClick={onClose}>
            ×
          </span>
          {/* onClick={onClose} - при клике вызываем функцию onClose, переданную из родителя */}
          <form className={styles.registrationForm}>
            <h3>Registration</h3>
            <input type='email' placeholder='Email' name='email' />
            <input type='password' placeholder='Password' name='password' />
            <p>By registering, you agree to our Rules and Privacy Policy.</p>
            <button type='button'>Register</button>
            <div>Login</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
