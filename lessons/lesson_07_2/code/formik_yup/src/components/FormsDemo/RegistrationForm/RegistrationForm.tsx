import { type JSX } from 'react';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styles from './RegistrationForm.module.css';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required('Обязательное поле')
    .min(2, 'Имя должно содержать минимум 2 символа'),
  lastName: Yup.string()
    .required('Обязательное поле')
    .min(2, 'Фамилия должна содержать минимум 2 символа'),
  email: Yup.string().required('Обязательное поле').email('Некорректный email'),
  password: Yup.string()
    .required('Обязательное поле')
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .matches(/[a-zA-Z]/, 'Пароль должен содержать буквы')
    .matches(/\d/, 'Пароль должен содержать цифры'),
  confirmPassword: Yup.string()
    .required('Подтвердите пароль')
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
  agreeToTerms: Yup.boolean().oneOf([true], 'Необходимо принять условия'),
});

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export default function RegistrationForm(): JSX.Element {
  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  };

  const handleSubmit = (values: FormValues, {setSubmitting, resetForm}: FormikHelpers<FormValues>) => {
    setTimeout(() => {
      alert(
        `🎉 Добро пожаловать, ${values.firstName} ${values.lastName}!\n\nРегистрация прошла успешно!`
      );
      setSubmitting(false);
      resetForm();
    }, 1500);
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <div className='row'>
            <div className='col-md-6 mb-3'>
              <label htmlFor='firstName' className='form-label'>
                Имя *
              </label>
              <Field
                name='firstName'
                type='text'
                className={`form-control ${styles.input} ${
                  values.firstName && values.firstName.length >= 2
                    ? styles.validField
                    : ''
                }`}
              />
              <ErrorMessage
                name='firstName'
                component='div'
                className={styles.error}
              />
            </div>

            <div className='col-md-6 mb-3'>
              <label htmlFor='lastName' className='form-label'>
                Фамилия *
              </label>
              <Field
                name='lastName'
                type='text'
                className={`form-control ${styles.input} ${
                  values.lastName && values.lastName.length >= 2
                    ? styles.validField
                    : ''
                }`}
                placeholder='Ваша фамилия'
                disabled={isSubmitting}
              />
              <ErrorMessage
                name='lastName'
                component='div'
                className={styles.error}
              />
            </div>
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
            <label htmlFor='password' className='form-label'>
              Пароль *
            </label>
            <Field
              name='password'
              type='password'
              className={`form-control ${styles.input} ${
                values.password && values.password.length >= 8
                  ? styles.validField
                  : ''
              }`}
              placeholder='Не менее 8 символов'
              disabled={isSubmitting}
            />
            <ErrorMessage
              name='password'
              component='div'
              className={styles.error}
            />
            <div className='form-text'>
              Пароль должен содержать минимум 8 символов, включая буквы и цифры
            </div>
          </div>

          <div className='mb-3'>
            <label htmlFor='confirmPassword' className='form-label'>
              Подтверждение пароля *
            </label>
            <Field
              name='confirmPassword'
              type='password'
              className={`form-control ${styles.input} ${
                values.confirmPassword &&
                values.confirmPassword === values.password
                  ? styles.validField
                  : ''
              }`}
              placeholder='Повторите пароль'
              disabled={isSubmitting}
            />
            <ErrorMessage
              name='confirmPassword'
              component='div'
              className={styles.error}
            />
          </div>

          <div className='mb-3'>
            <div className='form-check'>
              <Field
                name='agreeToTerms'
                type='checkbox'
                className='form-check-input'
                id='agreeToTerms'
                disabled={isSubmitting}
              />
              <label className='form-check-label' htmlFor='agreeToTerms'>
                Я принимаю <a href='#'>условия использования</a> и{' '}
                <a href='#'>политику конфиденциальности</a> *
              </label>
            </div>
            <ErrorMessage
              name='agreeToTerms'
              component='div'
              className={styles.error}
            />
          </div>

          <button
            type='submit'
            className='btn btn-success w-100'
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span
                  className='spinner-border spinner-border-sm me-2'
                  role='status'
                ></span>
                Регистрация...
              </>
            ) : (
              'Зарегистрироваться'
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
}
