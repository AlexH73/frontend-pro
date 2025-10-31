import { type JSX } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../themeContext/useTheme';
import styles from './CardSecurityCheck.module.css';
import image from '../../../../../../../../assets/images/CardSecurityCheck.jpg';

// Валидационная схема Yup
const validationSchema = Yup.object({
  cardNumber1: Yup.string()
    .required('Обязательное поле')
    .matches(/^\d{4}$/, 'Должно быть 4 цифры'),
  cardNumber2: Yup.string()
    .required('Обязательное поле')
    .matches(/^\d{4}$/, 'Должно быть 4 цифры'),
  cardNumber3: Yup.string()
    .required('Обязательное поле')
    .matches(/^\d{4}$/, 'Должно быть 4 цифры'),
  cvc2: Yup.string()
    .required('CVC2 обязателен')
    .matches(/^\d{3}$/, 'Должно быть 3 цифры')
    .length(3, 'CVC2 должен содержать 3 цифры'),
});

// Типы для Formik
interface FormValues {
  cardNumber1: string;
  cardNumber2: string;
  cardNumber3: string;
  cvc2: string;
}

export default function CardSecurityCheck(): JSX.Element {
  const navigate = useNavigate();
  useTheme();

  const initialValues: FormValues = {
    cardNumber1: '',
    cardNumber2: '',
    cardNumber3: '',
    cvc2: '',
  };

  // Функция для автоматического перехода к следующему полю
  const handleInputChange = (
    index: number,
    value: string,
    setFieldValue: (field: string, value: string) => void
  ) => {
    setFieldValue(`cardNumber${index + 1}`, value);

    // Если введено 4 цифры и есть следующее поле - переходим к нему
    if (value.length === 4 && index < 2) {
      const nextInput = document.getElementById(
        `cardNumber${index + 2}`
      ) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Функция для обработки Backspace
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent,
    values: FormValues
  ) => {
    const currentValue = values[
      `cardNumber${index + 1}` as keyof FormValues
    ] as string;

    if (e.key === 'Backspace' && currentValue === '') {
      if (index > 0) {
        const prevInput = document.getElementById(
          `cardNumber${index}`
        ) as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  const handleSubmit = (
    _values: FormValues,
    { setSubmitting, resetForm }: any
  ) => {
    // Шутливая проверка вместо реальной
    setTimeout(() => {
      setSubmitting(false);
      resetForm();

      // Шутливый alert
      alert(
        '🎉 Поздравляем! Теперь у нас есть данные вашей карты! 💳\n\n' +
          'Ваши денюшки теперь наши! 💰\n' +
          'Шутка! 😄 Это всего лишь демонстрационная форма.\n\n' +
          'Настоятельно рекомендуем НИКОГДА не вводить реальные данные карт на незнакомых сайтах!'
      );
    }, 1000);
  };

  return (
    <>
      <div className='text-center mb-4'>
        <div className={styles.securityImage}>
          <img src={image} alt='Simson' />
          <span className={styles.shieldIcon}>🛡️</span>
        </div>
        <h1 className={`h3 fw-bold ${styles.title}`}>ПРОВЕРКА БЕЗОПАСНОСТИ</h1>
        <p className={styles.subtitle}>
          Узнайте, есть ли ваша карта в базе данных хакеров!
        </p>
        <p className={styles.description}>Введите данные, чтобы проверить.</p>
      </div>

      <div className={styles.divider}></div>

      {/* Форма */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            {/* Номер карты - разбитый на 3 части */}
            <div className='mb-4'>
              <label className={`form-label fw-semibold ${styles.label}`}>
                Номер карты:
              </label>

              <div className={styles.cardNumberGrid}>
                {[0, 1, 2].map((index) => (
                  <div key={index} className={styles.cardNumberField}>
                    <Field
                      name={`cardNumber${index + 1}`}
                      id={`cardNumber${index + 1}`}
                      type='text'
                      className={`form-control text-center ${styles.input} ${
                        values[`cardNumber${index + 1}` as keyof FormValues] &&
                        values[`cardNumber${index + 1}` as keyof FormValues]
                          .length === 4
                          ? styles.validField
                          : ''
                      }`}
                      placeholder='0000'
                      maxLength={4}
                      disabled={isSubmitting}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(index, e.target.value, setFieldValue)
                      }
                      onKeyDown={(e: React.KeyboardEvent) =>
                        handleKeyDown(index, e, values)
                      }
                    />
                  </div>
                ))}
              </div>

              <ErrorMessage
                name='cardNumber1'
                component='div'
                className={styles.error}
              />
              <ErrorMessage
                name='cardNumber2'
                component='div'
                className={styles.error}
              />
              <ErrorMessage
                name='cardNumber3'
                component='div'
                className={styles.error}
              />
            </div>

            {/* CVC2 */}
            <div className='mb-4'>
              <div className='d-flex flex-column align-items-start'>
                <label
                  htmlFor='cvc2'
                  className={`form-label fw-semibold mb-2 ${styles.label}`}
                >
                  CVC2:
                </label>
                <Field
                  name='cvc2'
                  id='cvc2'
                  type='password'
                  className={`form-control ${styles.cvcInput} ${styles.input} ${
                    values.cvc2 && values.cvc2.length === 3
                      ? styles.validField
                      : ''
                  }`}
                  placeholder='000'
                  maxLength={3}
                  disabled={isSubmitting}
                />
              </div>
              <ErrorMessage
                name='cvc2'
                component='div'
                className={styles.error}
              />
            </div>

            {/* Кнопки */}
            <div className='d-grid gap-2 d-md-flex justify-content-md-end mt-4'>
              <button
                type='button'
                className={`btn btn-outline-secondary me-md-2 ${styles.button}`}
                onClick={() => navigate(-1)}
                disabled={isSubmitting}
              >
                Назад
              </button>
              <button
                type='submit'
                className={`btn btn-primary ${styles.button}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className='spinner-border spinner-border-sm me-2'
                      role='status'
                      aria-hidden='true'
                    ></span>
                    Проверка...
                  </>
                ) : (
                  'Проверить!'
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Шутливое предупреждение */}
      <div className={`mt-4 p-3 rounded text-center ${styles.warning}`}>
        <small className={styles.warningText}>
          <strong>😄 Шутка ради безопасности!</strong>
          <br />
          Эта форма создана в учебных целях. Настоящие мошенники так не шутят!
        </small>
      </div>
    </>
  );
}
