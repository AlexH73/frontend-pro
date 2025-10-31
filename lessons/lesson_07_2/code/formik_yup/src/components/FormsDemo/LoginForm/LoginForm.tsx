import { type JSX } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './LoginForm.module.css';

const validationSchema = Yup.object({
  email: Yup.string().required('Обязательное поле').email('Некорректный email'),
  password: Yup.string()
    .required('Обязательное поле')
    .min(6, 'Пароль должен содержать минимум 6 символов'),
});

interface FormValues {
  email: string;
  password: string;
}

export default function LoginForm(): JSX.Element {
  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: any
  ) => {
    setTimeout(() => {
      alert(`Добро пожаловать, ${values.email}!`);
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
            <label htmlFor='loginEmail' className='form-label'>
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
            <label htmlFor='password' className='form-label'>
              Пароль
            </label>
            <Field
              name='password'
              type='password'
              className={`form-control ${styles.input} ${
                values.password && values.password.length >= 6
                  ? styles.validField
                  : ''
              }`}
              placeholder='Ваш пароль'
              disabled={isSubmitting}
            />
            <ErrorMessage
              name='password'
              component='div'
              className={styles.error}
            />
          </div>

          <div className='mb-3 form-check'>
            <Field
              name='remember'
              type='checkbox'
              className='form-check-input'
              id='remember'
            />
            <label className='form-check-label' htmlFor='remember'>
              Запомнить меня
            </label>
          </div>

          <button
            type='submit'
            className='btn btn-primary w-100'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Вход...' : 'Войти'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
