import { useState, type FormEvent, type JSX } from 'react';
import { useDispatch } from 'react-redux';
import type MovieCredentials from '../../types/MovieCredentials';
import styles from './Movies.module.css';

export default function MovieCreation(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [releaseDate, setReleaseDate] = useState<string>('');
  const [poster, setPoster] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string>('');

  const dispatch = useDispatch();

  function validateInputs(): boolean {
    if (title.trim() === '') {
      setError('Название не должно быть пустым');
      return false;
    }
    if (genre.trim() === '') {
      setError('Жанр не должен быть пустым');
      return false;
    }
    if (country.trim() === '') {
      setError('Страна не должна быть пустой');
      return false;
    }
    if (releaseDate.trim() === '') {
      setError('Дата выхода не должна быть пустой');
      return false;
    }
    if (poster.trim() === '') {
      setError('Ссылка на постер не должна быть пустой');
      return false;
    }
    if (description.trim() === '') {
      setError('Описание не должно быть пустым');
      return false;
    }
    setError('');
    return true;
  }

  function clearInputsAndError(): void {
    setTitle('');
    setGenre('');
    setCountry('');
    setReleaseDate('');
    setPoster('');
    setDescription('');
    setError('');
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (validateInputs()) {
      const movieData: MovieCredentials = {
        title,
        genre,
        country,
        releaseDate,
        poster,
        description,
      };
      dispatch({ type: 'movies/add', payload: movieData });
      clearInputsAndError();
    }
  }

  return (
    <div
      className={`${styles.card} bg-white shadow-xl rounded-2xl p-8 mb-8 border border-gray-100`}
    >
      <h2 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
        Добавить новый фильм
      </h2>
      <form onSubmit={handleSubmit} className='space-y-6'>
        {error && <div className={`${styles.error} rounded-xl`}>{error}</div>}

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Левая колонка */}
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Название фильма
              </label>
              <input
                type='text'
                placeholder='Введите название фильма'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 bg-white text-gray-900 transition duration-200'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Жанр
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 transition duration-200'
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
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Страна
              </label>
              <input
                type='text'
                placeholder='Страна производства'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 bg-white text-gray-900 transition duration-200'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Дата выхода
              </label>
              <input
                type='date'
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 transition duration-200'
              />
            </div>
          </div>

          {/* Правая колонка */}
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Ссылка на постер
              </label>
              <input
                type='url'
                placeholder='https://example.com/poster.jpg'
                value={poster}
                onChange={(e) => setPoster(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 bg-white text-gray-900 transition duration-200'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Описание фильма
              </label>
              <textarea
                placeholder='Краткое описание сюжета...'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 bg-white text-gray-900 transition duration-200 resize-none'
              />
            </div>

            {poster && (
              <div className='mt-2'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Предпросмотр постера:
                </label>
                <div className='border border-gray-200 rounded-xl p-2 bg-gray-50'>
                  <img
                    src={poster}
                    alt='Preview'
                    className='w-32 h-48 object-cover rounded-lg mx-auto'
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          type='submit'
          className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-200 transform hover:scale-105 shadow-lg'
        >
          Добавить фильм
        </button>
      </form>
    </div>
  );
}
