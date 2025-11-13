import { useState, type FormEvent, type JSX } from 'react';
import { useDispatch } from 'react-redux';
import type MovieCredentials from '../../types/MovieCredentials';
import styles from './Movies.module.css';

export default function MovieCreation(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [releaseDate, setReleaseDate] = useState<string>('');
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
    setError('');
    return true;
  }

  function clearInputsAndError(): void {
    setTitle('');
    setGenre('');
    setCountry('');
    setReleaseDate('');
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
      };
      dispatch({ type: 'movies/add', payload: movieData });
      clearInputsAndError();
    }
  }

  return (
    <div className={`${styles.card} bg-white shadow-lg rounded-lg p-6 mb-6`}>
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>Добавить фильм</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {error && <div className={styles.error}>{error}</div>}

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <input
            type='text'
            placeholder='Название фильма'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500'
          />
          <input
            type='text'
            placeholder='Жанр'
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500'
          />
          <input
            type='text'
            placeholder='Страна'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500'
          />
          <input
            type='date'
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500'
          />
        </div>

        <button
          type='submit'
          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200'
        >
          Создать фильм
        </button>
      </form>
    </div>
  );
}
