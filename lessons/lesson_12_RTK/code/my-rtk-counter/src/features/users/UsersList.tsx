import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

import {
  fetchUsers,
  selectUsers,
  selectLoading,
  selectError,
} from './usersSlice';
import type { AppDispatch } from '../../app/store';
import { selectTheme } from '../../features/theme/themeSlice';

export const UsersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const theme = useSelector(selectTheme);

  // Состояние для ограничения количества карточек
  const [displayLimit, setDisplayLimit] = useState(4);
  const usersToShow = users.slice(0, displayLimit);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const loadMore = () => {
    setDisplayLimit((prev) => prev + 4);
  };

  const showAll = () => {
    setDisplayLimit(users.length);
  };

  // Тогда почему React  не знает что dispatch — это стабильная функция
  //   и она не пересоздаётся и не меняется между рендерами. ?

  // Потому что React не знает, что:

  // мы используем Redux

  // dispatch — стабилен

  // он не изменится

  // React-хуки устроены универсально и говорят:

  // “Ты используешь переменную в эффекте?
  // Значит, добавь её в массив зависимостей”.

  if (loading) {
    return (
      <div
        className={`flex flex-col items-center justify-center min-h-96 transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        <CircularProgress size='4rem' />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`rounded-xl p-6 text-center transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-red-900 border-red-700'
            : 'bg-red-50 border-red-200'
        } border`}
      >
        <div className='bg-red-50 border border-red-200 rounded-xl p-6 text-center'>
          <div className='text-red-600 text-6xl mb-4'>⚠️</div>
          <h3 className='text-xl font-bold text-red-800 mb-2'>
            Ошибка загрузки
          </h3>
          <p className='text-red-600 mb-4'>{error}</p>
          <button
            onClick={() => dispatch(fetchUsers())}
            className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors'
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-6 min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      <div
        className={`flex justify-between items-center mb-6 p-6 rounded-lg transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-800 to-gray-700'
            : 'bg-gradient-to-br from-white to-zinc-200'
        }`}
      >
        <div>
          <h2
            className={`text-3xl font-bold transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
          >
            Users
          </h2>
          <p
            className={`mt-1 transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Showing {usersToShow.length} of {users.length} users
          </p>
        </div>
        <div className='flex gap-2'>
          {displayLimit < users.length && (
            <>
              <button
                onClick={loadMore}
                className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2'
              >
                Load More
                <ExpandMoreIcon className='w-4 h-4' />
              </button>
              <button
                onClick={showAll}
                className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors'
              >
                Show All
              </button>
            </>
          )}
        </div>
      </div>

      {users.length === 0 ? (
        <div className='text-center py-12'>
          <div className='text-6xl mb-4'>👥</div>
          <h3
            className={`text-xl font-bold mb-2 transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Нет пользователей
          </h3>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
            Список пользователей пуст
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {usersToShow.map((user) => (
            <div
              key={user.id}
              className={`rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <h2
                className={`font-semibold text-lg mb-2 line-clamp-2 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}
              >
                {user.name.firstname} {user.name.lastname}
              </h2>
              <div className='space-y-2 flex-grow'>
                <p
                  className={`text-sm line-clamp-2 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  <span
                    className={`font-semibold transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                    }`}
                  >
                    Email:
                  </span>{' '}
                  {user.email}
                </p>

                <p
                  className={`text-sm line-clamp-2 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  <span
                    className={`font-semibold transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                    }`}
                  >
                    Username:
                  </span>{' '}
                  {user.username}
                </p>

                <p
                  className={`text-sm line-clamp-2 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  <span
                    className={`font-semibold transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                    }`}
                  >
                    Phone:
                  </span>{' '}
                  {user.phone}
                </p>
              </div>
              <div
                className={`mt-4 pt-3 border-t ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
                } `}
              >
                <span
                  className={`font-semibold transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                  }`}
                >
                  Address:
                </span>
                <div
                  className={`text-sm transition-colors duration-300 mt-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  <p>
                    {user.address.city}, {user.address.street}{' '}
                    {user.address.number}
                  </p>
                  <p>ZIP: {user.address.zipcode}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Кнопка загрузки еще внизу */}
      {displayLimit < users.length && (
        <div className='flex justify-center mt-8'>
          <button
            onClick={loadMore}
            className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2'
          >
            Load More Users
            <ExpandMoreIcon className='w-5 h-5' />
          </button>
        </div>
      )}
    </div>
  );
};
