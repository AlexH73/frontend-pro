import type { JSX } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import MovieEdit from './MovieEdit';
import selectMovies from './selectors';
import type Movie from '../../types/Movie';
import styles from './Movies.module.css';

export default function Movies(): JSX.Element {
  const movies = useSelector(selectMovies);
  const dispatch = useDispatch();

  const handleDelete = (id: string): void => {
    dispatch({ type: 'movies/delete', payload: id });
  };

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>Мои фильмы</h2>
      {movies.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
          Фильмов пока нет. Добавьте первый фильм!
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {movies.map((movie: Movie) => (
            <div
              key={movie.id}
              className={`${styles.movieCard} bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden`}
            >
              <div className='p-4'>
                <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                  {movie.title}
                </h3>
                <div className='space-y-1 text-sm text-gray-600'>
                  <p>
                    <span className='font-medium'>Жанр:</span> {movie.genre}
                  </p>
                  <p>
                    <span className='font-medium'>Страна:</span> {movie.country}
                  </p>
                  <p>
                    <span className='font-medium'>Дата выхода:</span>{' '}
                    {movie.releaseDate}
                  </p>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 flex justify-between items-center border-t'>
                <button
                  onClick={() => handleDelete(movie.id)}
                  className='text-red-600 hover:text-red-800 transition duration-200 flex items-center space-x-1'
                >
                  <DeleteIcon fontSize='small' />
                  <span>Удалить</span>
                </button>
                <MovieEdit movie={movie} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
