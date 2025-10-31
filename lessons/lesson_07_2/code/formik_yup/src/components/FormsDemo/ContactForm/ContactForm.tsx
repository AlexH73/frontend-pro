import { type JSX } from 'react';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styles from './ContactForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Обязательное поле')
    .min(2, 'Имя должно содержать минимум 2 символа'),
  email: Yup.string().required('Обязательное поле').email('Некорректный email'),
  message: Yup.string()
    .required('Обязательное поле')
    .min(10, 'Сообщение должно содержать минимум 10 символов'),
});

interface FormValues {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm(): JSX.Element {
  const initialValues: FormValues = {
    name: '',
    email: '',
    message: '',
  };

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    setTimeout(() => {
      alert(`Спасибо, ${values.name}! Ваше сообщение отправлено.`);
      console.log('Отправленные данные:', values);

      setSubmitting(false);
      resetForm();
    }, 1000);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Имя
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
              Email
            </label>
            <Field
              name='email'
              type='email'
              className={`form-control ${styles.input} ${
                values.email && !values.email.includes('@')
                  ? ''
                  : styles.validField
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
            <label htmlFor='message' className='form-label'>
              Сообщение
            </label>
            <Field
              as='textarea'
              name='message'
              className={`form-control ${styles.input} ${
                values.message && values.message.length >= 10
                  ? styles.validField
                  : ''
              }`}
              rows={3}
              placeholder='Ваше сообщение...'
              disabled={isSubmitting}
            />
            <ErrorMessage
              name='message'
              component='div'
              className={styles.error}
            />
          </div>

          <button
            type='submit'
            className='btn btn-primary w-100'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
