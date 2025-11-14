import { useState, type FormEvent, type JSX } from 'react';
import { useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import type Movie from '../../types/Movie';
import styles from './Movies.module.css';

export default function MovieFullEdit({
  movie,
}: {
  movie: Movie;
}): JSX.Element {
  const [toggle, setToggle] = useState<boolean>(false);
  const [formData, setFormData] = useState<Omit<Movie, 'id'>>({
    title: movie.title,
    genre: movie.genre,
    country: movie.country,
    releaseDate: movie.releaseDate,
    poster: movie.poster,
    description: movie.description,
  });
  const [error, setError] = useState<string>('');

  const dispatch = useDispatch();

  function handleToggle(): void {
    setToggle(!toggle);
    setFormData({
      title: movie.title,
      genre: movie.genre,
      country: movie.country,
      releaseDate: movie.releaseDate,
      poster: movie.poster,
      description: movie.description,
    });
    setError('');
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (
      Object.values(formData).some((value) => value.toString().trim() === '')
    ) {
      setError('Все поля должны быть заполнены');
      return;
    }
    dispatch({
      type: 'movies/edit',
      payload: { ...formData, id: movie.id },
    });
    setToggle(false);
    setError('');
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className='inline'>
      <button
        onClick={handleToggle}
        className='p-2 bg-blue-400 hover:bg-blue-300 text-white rounded-full shadow-lg transition duration-200 transform hover:scale-110'
        title='Редактировать фильм'
      >
        <EditIcon className='text-sm' />
      </button>
      {toggle && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div
            className={`${styles.card} bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}
          >
            <h3 className='text-2xl font-bold text-gray-800 mb-6'>
              Редактировать фильм
            </h3>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {error && <div className={styles.error}>{error}</div>}

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Название фильма
                  </label>
                  <input
                    type='text'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 bg-white text-gray-900 transition duration-200'
                    placeholder='Введите название фильма'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Жанр
                  </label>
                  <div className={styles.selectContainer}>
                    <select
                      name='genre'
                      value={formData.genre}
                      onChange={handleChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 transition duration-200 appearance-none cursor-pointer'
                    >
                      <option value='' disabled>
                        Выберите жанр
                      </option>
                      <option value='Action'>Боевик</option>
                      <option value='Comedy'>Комедия</option>
                      <option value='Drama'>Драма</option>
                      <option value='Sci-Fi'>Фантастика</option>
                      <option value='Horror'>Ужасы</option>
                      <option value='Romance'>Романтика</option>
                      <option value='Thriller'>Триллер</option>
                      <option value='Fantasy'>Фэнтези</option>
                      <option value='Animation'>Анимация</option>
                      <option value='Documentary'>Документальный</option>
                    </select>
                    <ArrowDropDownIcon className={styles.selectArrow} />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Страна
                  </label>
                  <input
                    type='text'
                    name='country'
                    value={formData.country}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 bg-white text-gray-900 transition duration-200'
                    placeholder='Страна производства'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Дата выхода
                  </label>
                  <input
                    type='date'
                    name='releaseDate'
                    value={formData.releaseDate}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 transition duration-200'
                  />
                </div>

                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Ссылка на постер
                  </label>
                  <input
                    type='url'
                    name='poster'
                    value={formData.poster}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 bg-white text-gray-900 transition duration-200'
                    placeholder='https://example.com/poster.jpg'
                  />
                </div>

                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Описание фильма
                  </label>
                  <textarea
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 bg-white text-gray-900 transition duration-200 resize-none'
                    placeholder='Краткое описание сюжета...'
                  />
                </div>
              </div>

              <div className='flex space-x-3 pt-4'>
                <button
                  type='submit'
                  className='flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 transform hover:scale-105'
                >
                  Сохранить изменения
                </button>
                <button
                  type='button'
                  onClick={handleToggle}
                  className='flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200'
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
