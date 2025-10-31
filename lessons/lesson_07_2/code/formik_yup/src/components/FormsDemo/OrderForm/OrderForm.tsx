import { type JSX } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './OrderForm.module.css';

const validationSchema = Yup.object({
  product: Yup.string().required('Выберите продукт'),
  quantity: Yup.number()
    .required('Укажите количество')
    .min(1, 'Минимум 1 шт.')
    .max(10, 'Максимум 10 шт.'),
  color: Yup.string().required('Выберите цвет'),
  deliveryDate: Yup.date()
    .required('Укажите дату доставки')
    .min(new Date(), 'Дата должна быть в будущем'),
  address: Yup.string()
    .required('Укажите адрес доставки')
    .min(10, 'Адрес должен содержать минимум 10 символов'),
  notes: Yup.string().max(200, 'Максимум 200 символов'),
});

interface FormValues {
  product: string;
  quantity: number;
  color: string;
  deliveryDate: string;
  address: string;
  notes: string;
}

export default function OrderForm(): JSX.Element {
  const initialValues: FormValues = {
    product: '',
    quantity: 1,
    color: '',
    deliveryDate: '',
    address: '',
    notes: '',
  };

  const products = [
    { id: '1', name: 'iPhone 15 Pro', price: 999 },
    { id: '2', name: 'Samsung Galaxy S24', price: 899 },
    { id: '3', name: 'Google Pixel 8', price: 799 },
    { id: '4', name: 'Xiaomi 14', price: 699 },
  ];

  const colors = [
    { value: 'black', label: '⚫ Черный' },
    { value: 'white', label: '⚪ Белый' },
    { value: 'blue', label: '🔵 Синий' },
    { value: 'red', label: '🔴 Красный' },
  ];

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: any
  ) => {
    const selectedProduct = products.find((p) => p.id === values.product);
    const totalPrice = selectedProduct
      ? selectedProduct.price * values.quantity
      : 0;

    setTimeout(() => {
      alert(
        `✅ Заказ оформлен!\n\n` +
          `Товар: ${selectedProduct?.name}\n` +
          `Количество: ${values.quantity} шт.\n` +
          `Цвет: ${colors.find((c) => c.value === values.color)?.label}\n` +
          `Дата доставки: ${new Date(
            values.deliveryDate
          ).toLocaleDateString()}\n` +
          `Адрес: ${values.address}\n` +
          `Общая стоимость: $${totalPrice}\n\n` +
          `Спасибо за заказ!`
      );
      setSubmitting(false);
      resetForm();
    }, 1500);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => {
        const selectedProduct = products.find((p) => p.id === values.product);
        const totalPrice = selectedProduct
          ? selectedProduct.price * (values.quantity || 0)
          : 0;

        return (
          <Form>
            <div className='mb-3'>
              <label htmlFor='product' className='form-label'>
                Товар *
              </label>
              <Field
                as='select'
                name='product'
                className={`form-select ${styles.input} ${
                  values.product ? styles.validField : ''
                }`}
                disabled={isSubmitting}
              >
                <option value=''>Выберите товар</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} - ${product.price}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name='product'
                component='div'
                className={styles.error}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='quantity' className='form-label'>
                Количество *
              </label>
              <Field
                name='quantity'
                type='number'
                className={`form-control ${styles.input} ${
                  values.quantity && values.quantity >= 1
                    ? styles.validField
                    : ''
                }`}
                min='1'
                max='10'
                disabled={isSubmitting}
              />
              <ErrorMessage
                name='quantity'
                component='div'
                className={styles.error}
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Цвет *</label>
              <div className={styles.radioGroup}>
                {colors.map((color) => (
                  <div key={color.value} className='form-check'>
                    <Field
                      type='radio'
                      name='color'
                      value={color.value}
                      className='form-check-input'
                      id={`color-${color.value}`}
                      disabled={isSubmitting}
                    />
                    <label
                      className='form-check-label'
                      htmlFor={`color-${color.value}`}
                    >
                      {color.label}
                    </label>
                  </div>
                ))}
              </div>
              <ErrorMessage
                name='color'
                component='div'
                className={styles.error}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='deliveryDate' className='form-label'>
                Дата доставки *
              </label>
              <Field
                name='deliveryDate'
                type='date'
                className={`form-control ${styles.input} ${
                  values.deliveryDate ? styles.validField : ''
                }`}
                disabled={isSubmitting}
              />
              <ErrorMessage
                name='deliveryDate'
                component='div'
                className={styles.error}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='address' className='form-label'>
                Адрес доставки *
              </label>
              <Field
                name='address'
                as='textarea'
                className={`form-control ${styles.input} ${
                  values.address && values.address.length >= 10
                    ? styles.validField
                    : ''
                }`}
                rows={2}
                placeholder='Полный адрес доставки...'
                disabled={isSubmitting}
              />
              <ErrorMessage
                name='address'
                component='div'
                className={styles.error}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='notes' className='form-label'>
                Примечания
              </label>
              <Field
                name='notes'
                as='textarea'
                className={`form-control ${styles.input}`}
                rows={2}
                placeholder='Дополнительные пожелания...'
                disabled={isSubmitting}
              />
              <ErrorMessage
                name='notes'
                component='div'
                className={styles.error}
              />
            </div>

            {selectedProduct && (
              <div className={`mb-3 p-3 rounded ${styles.totalPrice}`}>
                <strong>Итого: ${totalPrice}</strong>
              </div>
            )}

            <button
              type='submit'
              className='btn btn-warning w-100'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className='spinner-border spinner-border-sm me-2'
                    role='status'
                  ></span>
                  Оформление заказа...
                </>
              ) : (
                '🛒 Оформить заказ'
              )}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
