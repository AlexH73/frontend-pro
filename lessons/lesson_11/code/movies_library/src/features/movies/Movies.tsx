import type { JSX } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Delete as DeleteIcon,
  Movie as MovieIcon,
  Star as StarIcon,
  CalendarToday as CalendarIcon,
  Language as LanguageIcon,
  Theaters as TheatersIcon,
} from '@mui/icons-material';
import selectMovies from './selectors';
import type Movie from '../../types/Movie';
import styles from './Movies.module.css';
import MovieFullEdit from './MovieFullEdit';
import no_image from "../../assets/placeholder-poster.jpg"
import MovieEdit from './MovieEdit';

export default function Movies(): JSX.Element {
  const movies = useSelector(selectMovies);
  const dispatch = useDispatch();

  const handleDelete = (id: string): void => {
    if (window.confirm('Вы уверены, что хотите удалить этот фильм?')) {
      dispatch({ type: 'movies/delete', payload: id });
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center space-x-3 mb-6'>
        <div className='p-2 bg-blue-100 rounded-xl'>
          <TheatersIcon className='text-2xl text-blue-600' />
        </div>
        <div>
          <h2 className='text-2xl font-bold text-gray-800'>Моя фильмотека</h2>
          <p className='text-gray-600'>Всего фильмов: {movies.length}</p>
        </div>
      </div>

      {movies.length === 0 ? (
        <div className='text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100'>
          <MovieIcon className='text-6xl text-gray-300 mx-auto mb-4' />
          <h3 className='text-xl font-semibold text-gray-700 mb-2'>
            Фильмов пока нет
          </h3>
          <p className='text-gray-500'>
            Добавьте первый фильм в вашу коллекцию!
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {movies.map((movie: Movie) => (
            <div
              key={movie.id}
              className={`${styles.movieCard} group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100`}
            >
              {/* Постер */}
              <div className='relative h-80 overflow-hidden'>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className='w-full h-full object-cover group-hover:scale-105 transition duration-300'
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `${no_image}`;
                  }}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300' />

                {/* Кнопки действий поверх постера */}
                <div className='absolute top-15 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition duration-300'>
                  <MovieFullEdit movie={movie} />
                </div>
                <div className='absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition duration-300'>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className='p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition duration-200 transform hover:scale-110'
                    title='Удалить фильм'
                  >
                    <DeleteIcon className='text-sm' />
                  </button>
                </div>
              </div>

              {/* Информация о фильме */}
              <div className='p-5'>
                <div className='flex justify-between items-start mb-3'>
                  <h3 className='text-xl font-bold text-gray-800 line-clamp-2 flex-1 mr-2'>
                    {movie.title}
                  </h3>
                  <MovieEdit movie={movie} />
                </div>

                <p className='text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed'>
                  {movie.description}
                </p>

                <div className='space-y-2 text-sm text-gray-600'>
                  <div className='flex items-center space-x-2'>
                    <StarIcon className='text-yellow-500 flex-shrink-0' />
                    <span className='font-medium'>Жанр:</span>
                    <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium'>
                      {movie.genre}
                    </span>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <LanguageIcon className='text-green-500 flex-shrink-0' />
                    <span className='font-medium'>Страна:</span>
                    <span>{movie.country}</span>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <CalendarIcon className='text-purple-500 flex-shrink-0' />
                    <span className='font-medium'>Год:</span>
                    <span>{new Date(movie.releaseDate).getFullYear()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
