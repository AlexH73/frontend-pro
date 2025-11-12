import { useState, type FormEvent, type JSX } from 'react';
import {
  Edit as EditIcon,
  Error as ErrorIcon,
  Fastfood as FastfoodIcon,
  Link as LinkIcon,
  Category as CategoryIcon,
  Euro as EuroIcon,
  Close as CloseIcon,
  Photo as PhotoIcon,
  Save as SaveIcon,
  KeyboardArrowUp as UpIcon,
  KeyboardArrowDown as DownIcon,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import type Dish from './types/Dish';
import styles from './DishEditForm.module.css';

export default function DishEditForm(props: { dish: Dish }): JSX.Element {
  const { dish } = props;
  const [toggle, setToggle] = useState<boolean>(false);
  const handleToggle = (): void => {
    setToggle(!toggle);
  };

  const [title, setTitle] = useState<string>(dish.title);
  const [category, setCategory] = useState<string>(dish.category);
  const [image, setImage] = useState<string>(dish.image);
  const [price, setPrice] = useState<number>(dish.price);
  const [error, setError] = useState<string>('');

  function validateInputs(): boolean {
    if (title.trim() === '') {
      setError('Название не должно быть пустым');
      return false;
    }
    if (category.trim() === '') {
      setError('Выберите категорию');
      return false;
    }
    if (image.trim() === '') {
      setError('Заполните поле картинка');
      return false;
    }
    if (price <= 0) {
      setError('Цена должна быть больше 0');
      return false;
    }
    return true;
  }

  function resetInputsAndError(): void {
    setCategory(dish.category);
    setTitle(dish.title);
    setPrice(dish.price);
    setImage(dish.image);
    setError('');
  }

  const handlePriceIncrement = () => {
    setPrice((prev) => {
      const newPrice = Math.round((prev + 0.01) * 100) / 100;
      return newPrice;
    });
  };

  const handlePriceDecrement = () => {
    setPrice((prev) => {
      if (prev <= 0.01) return 0;
      const newPrice = Math.round((prev - 0.01) * 100) / 100;
      return newPrice;
    });
  };

  const dispatch = useDispatch();
  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (validateInputs()) {
      dispatch({
        type: 'dishes/edit',
        payload: {
          title,
          category,
          image,
          price,
          id: dish.id,
        },
      });
      resetInputsAndError();
      setToggle(false);
    }
  }

  return (
    <>
      <button
        onClick={handleToggle}
        className='w-9 h-9 flex items-center justify-center bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-100 transition-colors'
        title='Редактировать блюдо'
      >
        <EditIcon fontSize='small' />
      </button>

      {/* Модальное окно */}
      {toggle && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            {/* Заголовок модального окна */}
            <div className='flex justify-between items-center p-6 border-b border-gray-200'>
              <div className='flex items-center'>
                <div className='w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3'>
                  <EditIcon className='text-white text-sm' />
                </div>
                <h3 className='text-xl font-bold text-gray-800'>
                  Редактировать блюдо
                </h3>
              </div>
              <button
                onClick={() => {
                  setToggle(false);
                  resetInputsAndError();
                }}
                className='w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors'
              >
                <CloseIcon fontSize='small' />
              </button>
            </div>

            {/* Форма редактирования */}
            <form onSubmit={handleSubmit} className='p-6 space-y-5'>
              {error && (
                <div className='bg-red-50 border border-red-200 rounded-lg p-4 flex items-start'>
                  <ErrorIcon className='text-red-500 mr-2 mt-0.5 flex-shrink-0' />
                  <span className='text-red-700 text-sm'>{error}</span>
                </div>
              )}

              {/* Название блюда */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2 flex items-center'>
                  <FastfoodIcon className='text-gray-400 mr-2 text-lg' />
                  Название блюда
                </label>
                <input
                  type='text'
                  placeholder='Введите название блюда'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                />
              </div>

              {/* Ссылка на изображение */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2 flex items-center'>
                  <LinkIcon className='text-gray-400 mr-2 text-lg' />
                  Ссылка на изображение
                </label>
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='https://example.com/image.jpg'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className='w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pl-11'
                  />
                  <PhotoIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl' />
                </div>
              </div>

              {/* Категория и цена */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-2 flex items-center'>
                    <CategoryIcon className='text-gray-400 mr-2 text-lg' />
                    Категория
                  </label>
                  <div className={styles.selectContainer}>
                    <select
                      name='category'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer appearance-none'
                    >
                      <option value='' disabled>
                        Выберите категорию
                      </option>
                      <option value='main'>🍝 Основное блюдо</option>
                      <option value='dessert'>🍰 Десерт</option>
                      <option value='snack'>🥗 Закуска</option>
                    </select>
                    <DownIcon className={styles.selectArrow} />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2 flex items-center'>
                    <EuroIcon className='text-gray-400 mr-2 text-lg' />
                    Цена
                  </label>
                  <div className={styles.numberInput}>
                    <input
                      type='number'
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${styles.numberInput}`}
                      min='0'
                      step='0.01'
                      placeholder='0.00'
                    />
                    <div className={styles.numberButtons}>
                      <button
                        type='button'
                        className={styles.numberButton}
                        onClick={handlePriceIncrement}
                        aria-label='Увеличить цену'
                      >
                        <UpIcon className={styles.numberIcon} />
                      </button>
                      <button
                        type='button'
                        className={styles.numberButton}
                        onClick={handlePriceDecrement}
                        aria-label='Уменьшить цену'
                      >
                        <DownIcon className={styles.numberIcon} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Кнопки действий */}
              <div className='flex justify-end space-x-3 pt-4 gap-2'>
                <button
                  type='button'
                  onClick={() => {
                    setToggle(false);
                    resetInputsAndError();
                  }}
                  className='px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
                >
                  Отмена
                </button>
                <button
                  type='submit'
                  className='px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center'
                >
                  <SaveIcon className='mr-2 text-lg' />
                  Сохранить изменения
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
