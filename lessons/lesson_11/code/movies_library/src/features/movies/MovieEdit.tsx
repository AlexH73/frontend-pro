import { useState, type FormEvent, type JSX } from 'react';
import { useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import type Movie from '../../types/Movie';
import styles from './Movies.module.css';

export default function MovieEdit({ movie }: { movie: Movie }): JSX.Element {
  const [toggle, setToggle] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(movie.title);
  const [error, setError] = useState<string>('');

  const dispatch = useDispatch();

  function handleToggle(): void {
    setToggle(!toggle);
    setNewTitle(movie.title);
    setError('');
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (newTitle.trim() === '') {
      setError('Название не должно быть пустым');
      return;
    }
    dispatch({
      type: 'movies/editTitle',
      payload: { id: movie.id, newTitle: newTitle.trim() },
    });
    setToggle(false);
    setError('');
  }

  return (
    <div className='inline'>
      <button
        onClick={handleToggle}
        className='text-blue-600 hover:text-blue-800 transition duration-200 flex items-center space-x-1'
      >
        <EditIcon fontSize='small' />
        <span className='text-sm'>Редактировать</span>
      </button>
      {toggle && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className={`${styles.card} bg-white rounded-lg p-6 w-96`}>
            <h3 className='text-lg font-semibold mb-4'>
              Редактировать название
            </h3>
            <form onSubmit={handleSubmit} className='space-y-4'>
              {error && <div className={styles.error}>{error}</div>}
              <input
                type='text'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500'
                placeholder='Новое название'
                autoFocus
              />
              <div className='flex space-x-2'>
                <button
                  type='submit'
                  className='flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200'
                >
                  Сохранить
                </button>
                <button
                  type='button'
                  onClick={handleToggle}
                  className='flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200'
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
