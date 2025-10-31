import { type JSX, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './FeedbackForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Обязательное поле')
    .min(2, 'Имя должно содержать минимум 2 символа'),
  email: Yup.string().required('Обязательное поле').email('Некорректный email'),
  rating: Yup.number()
    .required('Поставьте оценку')
    .min(1, 'Минимальная оценка 1')
    .max(5, 'Максимальная оценка 5'),
  category: Yup.string().required('Выберите категорию'),
  message: Yup.string()
    .required('Обязательное поле')
    .min(10, 'Сообщение должно содержать минимум 10 символов')
    .max(500, 'Сообщение должно содержать максимум 500 символов'),
});

interface FormValues {
  name: string;
  email: string;
  rating: number;
  category: string;
  message: string;
}

export default function FeedbackForm(): JSX.Element {
  const [hoverRating, setHoverRating] = useState(0);

  const initialValues: FormValues = {
    name: '',
    email: '',
    rating: 0,
    category: '',
    message: '',
  };

  const categories = [
    '💻 Техническая поддержка',
    '🚀 Предложения по улучшению',
    '🐛 Сообщение об ошибке',
    '💬 Общий отзыв',
    '📱 Работа приложения',
  ];

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: any
  ) => {
    setTimeout(() => {
      const ratingText = ['😞', '🙁', '😐', '😊', '😍'][values.rating - 1];
      alert(
        `📝 Спасибо за ваш отзыв, ${values.name}!\n\n` +
          `Оценка: ${values.rating}/5 ${ratingText}\n` +
          `Категория: ${values.category}\n\n` +
          `Мы ценим ваше мнение!`
      );
      setSubmitting(false);
      resetForm();
      setHoverRating(0);
    }, 1000);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Имя *
            </label>
            <Field
              name='name'
              type='text'
              className={`form-control ${styles.input} ${
                values.name && values.name.length >= 2 ? styles.validField : ''
              }`}
              placeholder='Ваше имя'
              disabled={isSubmitting}
            />
            <ErrorMessage
              name='name'
              component='div'
              className={styles.error}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email *
            </label>
            <Field
              name='email'
              type='email'
              className={`form-control ${styles.input} ${
                values.email && values.email.includes('@')
                  ? styles.validField
                  : ''
              }`}
              placeholder='your@email.com'
              disabled={isSubmitting}
            />
            <ErrorMessage
              name='email'
              component='div'
              className={styles.error}
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Оценка *</label>
            <div className={styles.ratingContainer}>
              <span className={styles.ratingLabels}>Плохо</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type='button'
                  className={`${styles.star} ${
                    star <= (hoverRating || values.rating) ? styles.active : ''
                  }`}
                  onClick={() => setFieldValue('rating', star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  disabled={isSubmitting}
                >
                  ★
                </button>
              ))}
              <span className={styles.ratingLabels}>Отлично</span>
            </div>
            <ErrorMessage
              name='rating'
              component='div'
              className={styles.error}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='category' className='form-label'>
              Категория *
            </label>
            <Field
              as='select'
              name='category'
              className={`form-select ${styles.input} ${
                values.category ? styles.validField : ''
              }`}
              disabled={isSubmitting}
            >
              <option value=''>Выберите категорию</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name='category'
              component='div'
              className={styles.error}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='message' className='form-label'>
              Сообщение *
            </label>
            <Field
              as='textarea'
              name='message'
              className={`form-control ${styles.input} ${
                values.message && values.message.length >= 10
                  ? styles.validField
                  : ''
              }`}
              rows={4}
              placeholder='Расскажите подробнее...'
              disabled={isSubmitting}
            />
            <div className='form-text'>
              {values.message.length}/500 символов
            </div>
            <ErrorMessage
              name='message'
              component='div'
              className={styles.error}
            />
          </div>

          <button
            type='submit'
            className='btn btn-info w-100'
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span
                  className='spinner-border spinner-border-sm me-2'
                  role='status'
                ></span>
                Отправка...
              </>
            ) : (
              '📤 Отправить отзыв'
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
}
