import { type JSX } from 'react';
import { useTheme } from '../../hooks/themeContext/useTheme';
import CardSecurityCheck from './CardSecurityCheck/CardSecurityCheck';
import ContactForm from './ContactForm/ContactForm';
import LoginForm from './LoginForm/LoginForm';
import styles from './FormsDemo.module.css';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import FeedbackForm from './FeedbackForm/FeedbackForm';
import OrderForm from './OrderForm/OrderForm';

export default function FormsDemo(): JSX.Element {
  const { theme } = useTheme();

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-12'>
          <h1 className={`text-center mb-5 ${styles.mainTitle}`}>
            Демонстрация форм
          </h1>
          <p className={`text-center mb-4 ${styles.subtitle}`}>
            Примеры различных форм с валидацией и темизацией
          </p>
        </div>
      </div>

      <div className='row'>
        {/* Форма обратной связи */}
        <div className='col-lg-6 mb-4'>
          <div
            className={`card h-100 ${styles.demoCard} ${
              theme === 'dark' ? styles.dark : ''
            }`}
          >
            <div className='card-body'>
              <h3 className='card-title h5'>📧 Форма обратной связи</h3>
              <p className='card-text text-muted small'>
                Стандартная контактная форма с валидацией
              </p>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Форма проверки карты */}
        <div className='col-lg-6 mb-4'>
          <div
            className={`card h-100 ${styles.demoCard} ${
              theme === 'dark' ? styles.dark : ''
            }`}
          >
            <div className='card-body'>
              <CardSecurityCheck />
            </div>
          </div>
        </div>

        {/* Форма входа */}
        <div className='col-lg-6 mb-4'>
          <div
            className={`card h-100 ${styles.demoCard} ${
              theme === 'dark' ? styles.dark : ''
            }`}
          >
            <div className='card-body'>
              <h3 className='card-title h5'>🔑 Форма входа</h3>
              <p className='card-text text-muted small'>
                Авторизация с проверкой email и пароля
              </p>
              <LoginForm />
            </div>
          </div>
        </div>

        {/* Форма регистрации */}
        <div className='col-lg-6 mb-4'>
          <div
            className={`card h-100 ${styles.demoCard} ${
              theme === 'dark' ? styles.dark : ''
            }`}
          >
            <div className='card-body'>
              <h3 className='card-title h5'>👤 Регистрация</h3>
              <p className='card-text text-muted small'>
                Полная форма регистрации с подтверждением пароля
              </p>
              <RegistrationForm />
            </div>
          </div>
        </div>

        {/* Форма заказа */}
        <div className='col-lg-6 mb-4'>
          <div
            className={`card h-100 ${styles.demoCard} ${
              theme === 'dark' ? styles.dark : ''
            }`}
          >
            <div className='card-body'>
              <h3 className='card-title h5'>🛒 Форма заказа</h3>
              <p className='card-text text-muted small'>
                Оформление заказа с выбором товара и опций
              </p>
              <OrderForm />
            </div>
          </div>
        </div>

        {/* Форма обратной связи с рейтингом */}
        <div className='col-lg-6 mb-4'>
          <div
            className={`card h-100 ${styles.demoCard} ${
              theme === 'dark' ? styles.dark : ''
            }`}
          >
            <div className='card-body'>
              <h3 className='card-title h5'>⭐ Обратная связь</h3>
              <p className='card-text text-muted small'>
                Форма отзыва с рейтингом и категориями
              </p>
              <FeedbackForm />
            </div>
          </div>
        </div>

        {/* Место для будущих форм */}
        <div className='col-lg-6 mb-4'>
          <div
            className={`card h-100 ${styles.demoCard} ${
              theme === 'dark' ? styles.dark : ''
            }`}
          >
            <div className='card-body d-flex align-items-center justify-content-center'>
              <div className='text-center'>
                <h3 className='card-title h5'>📋 Другие формы</h3>
                <p className='card-text text-muted small'>
                  Здесь появятся новые демонстрационные формы
                </p>
                <span className={styles.placeholderIcon}>✨</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
