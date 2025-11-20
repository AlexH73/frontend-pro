import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

import {
  fetchUsers,
  selectUsers,
  selectLoading,
  selectError,
} from './usersSlice';
import type { AppDispatch } from '../../app/store';

export const UsersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
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
      <div className='flex justify-center items-center mt-16'>
        <CircularProgress size='3rem' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-2xl mx-auto mt-8 p-6'>
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
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6'>
      {users.map((user) => (
        <div
          key={user.id}
          className='bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-250 hover:-translate-y-1 flex flex-col'
        >
          <h2 className='text-xl font-bold mb-3 text-gray-800'>
            {user.name.firstname} {user.name.lastname}
          </h2>
          <div className='space-y-2 flex-grow'>
            <p className='text-gray-600 text-sm'>
              <span className='font-semibold text-gray-800'>Email:</span>{' '}
              {user.email}
            </p>

            <p className='text-gray-600 text-sm'>
              <span className='font-semibold text-gray-800'>Username:</span>{' '}
              {user.username}
            </p>

            <p className='text-gray-600 text-sm'>
              <span className='font-semibold text-gray-800'>Phone:</span>{' '}
              {user.phone}
            </p>
          </div>
          <div className='mt-4 pt-3 border-t border-gray-100'>
            <span className='font-semibold text-gray-800 text-sm'>
              Address:
            </span>
            <div className='text-gray-600 text-sm mt-1'>
              <p>
                {user.address.city}, {user.address.street} {user.address.number}
              </p>
              <p>ZIP: {user.address.zipcode}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
