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
} from '@mui/icons-material';

export default function DishForm(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string>('');
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
    return true;
  }

  function clearInputsAndError(): void {
    setCategory('');
    setTitle('');
    setPrice(0);
    setImage('');
    setError('');
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (validateInputs()) {
      dispatch({
        type: 'dishes/create',
        payload: { title, category, price, image },
      });
      clearInputsAndError();
    }
  }

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
        <div className='grid grid-cols-3 gap-4'>
          {/* Категория */}
          <div className='col-span-2'>
            <label className='block text-sm font-medium text-gray-700 mb-2 flex items-center'>
              <CategoryIcon className='text-gray-400 mr-2 text-lg' />
              Категория
            </label>
            <select
              name='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-gray-50 cursor-pointer'
            >
              <option value='' disabled>
                Выберите категорию
              </option>
              <option value='main'>Основное блюдо</option>
              <option value='dessert'>Десерт</option>
              <option value='snack'>Закуска</option>
            </select>
          </div>

          {/* Цена */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2 flex gap-2 items-center'>
              <EuroIcon className='text-gray-400 mr-2 text-lg' />
              Цена (€)
            </label>
            <input
              type='number'
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
              min='0'
              step='0.01'
              placeholder='0.00'
            />
          </div>
        </div>

        {/* Кнопка отправки */}
        <button
          type='submit'
          className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center mt-2'
        >
          <AddIcon className='mr-2 text-lg' />
          Добавить в меню
        </button>
      </form>
    </div>
  );
}
