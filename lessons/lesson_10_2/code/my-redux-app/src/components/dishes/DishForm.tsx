import { useState, type FormEvent, type JSX } from 'react';
import { useDispatch } from 'react-redux';
import {
  Add as AddIcon,
  Error as ErrorIcon,
  Fastfood as FastfoodIcon,
  Link as LinkIcon,
  Category as CategoryIcon,
  Euro as EuroIcon,
  Photo as PhotoIcon,
  KeyboardArrowUp as UpIcon,
  KeyboardArrowDown as DownIcon,
} from '@mui/icons-material';
import styles from './DishForm.module.css';

export default function DishForm(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch();

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
    // Проверка URL
    try {
      new URL(image);
    } catch {
      setError('Введите корректную ссылку на изображение');
      return false;
    }
    return true;
  }

  function clearInputsAndError(): void {
    setCategory('');
    setTitle('');
    setPrice(0);
    setImage('');
    setError('');
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError('');

    if (!validateInputs()) return;

    setIsSubmitting(true);

    // Имитация задержки для лучшего UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    dispatch({
      type: 'dishes/create',
      payload: { title, category, price, image },
    });

    clearInputsAndError();
    setIsSubmitting(false);
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

  const quickExamples = [
    {
      title: 'Пицца Маргарита',
      category: 'main',
      price: 14.99,
      image:
        'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=500&fit=crop',
    },
    {
      title: 'Тирамису',
      category: 'dessert',
      price: 6.99,
      image:
        'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&h=500&fit=crop',
    },
  ];

  return (
    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6'>
      <div className='flex items-center mb-6'>
        <div className='w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3'>
          <AddIcon className='text-white' />
        </div>
        <h2 className='text-xl font-bold text-gray-800'>Добавить блюдо</h2>
      </div>

      <form onSubmit={handleSubmit} className='space-y-5'>
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
            placeholder='Например: Пицца Маргарита'
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

        {/* Категория и цена в одной строке */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {/* Категория */}
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
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-gray-50 cursor-pointer'
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

          {/* Цена */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2 flex gap-2 items-center'>
              <EuroIcon className='text-gray-400 mr-2 text-lg' />
              Цена
            </label>
            <div className={styles.numberInput}>
              <input
                type='number'
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className={`w-full px-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${styles.numberInput}`}
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

        {/* Быстрые примеры */}
        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-3'>
            Быстрые примеры:
          </label>
          <div className='grid grid-cols-2 gap-3'>
            {quickExamples.map((example, index) => (
              <button
                key={index}
                type='button'
                onClick={() => {
                  setTitle(example.title);
                  setCategory(example.category);
                  setPrice(example.price);
                  setImage(example.image);
                }}
                className='p-3 border-2 border-dashed border-gray-300 rounded-xl text-left hover:border-blue-300 hover:bg-blue-50 transition-colors group'
              >
                <div className='text-sm font-medium text-gray-800 group-hover:text-blue-600'>
                  {example.title}
                </div>
                <div className='text-xs text-gray-500 mt-1'>
                  {example.price} €
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Кнопка отправки */}
        <button
          type='submit'
          disabled={isSubmitting}
          className={`w-full py-4 px-6 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl transform hover:scale-[1.02]'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3'></div>
              Добавление...
            </>
          ) : (
            <>
              <AddIcon className='mr-3 text-xl' />
              Добавить в меню
            </>
          )}
        </button>
      </form>
    </div>
  );
}
