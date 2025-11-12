import type { JSX } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Warning as WarningIcon,
  Restaurant as RestaurantIcon,
  LocalOffer as LocalOfferIcon,
} from '@mui/icons-material';
import selectDishes from './selectors';
import ClearIcon from '@mui/icons-material/Clear';
import type { DishId } from './types/Dish';
import DishEditForm from './DishEditForm';

export default function DishesList(): JSX.Element {
  const dishes = useSelector(selectDishes);
  const dispatch = useDispatch();

  const handleDelete = (id: DishId): void => {
    if (window.confirm('Вы уверены, что хотите удалить это блюдо?')) {
      dispatch({ type: 'dishes/delete', payload: id });
    }
  };

  const getCategoryLabel = (category: string): string => {
    const labels = {
      main: 'Основное',
      dessert: 'Десерт',
      snack: 'Закуска',
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getCategoryColor = (category: string): string => {
    const colors = {
      main: 'bg-blue-100 text-blue-800',
      dessert: 'bg-pink-100 text-pink-800',
      snack: 'bg-green-100 text-green-800',
    };
    return (
      colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
    );
  };

  return (
    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6'>
      {/* Заголовок списка */}
      <div className='flex justify-between items-center mb-8'>
        <div className='flex items-center'>
          <div className='w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3'>
            <RestaurantIcon className='text-white' />
          </div>
          <div>
            <h2 className='text-2xl font-bold text-gray-800'>Список блюд</h2>
            <p className='text-gray-600 text-sm'>Все блюда вашего меню</p>
          </div>
        </div>
        <div className='bg-blue-50 text-blue-600 px-4 py-2 rounded-lg flex items-center'>
          <LocalOfferIcon className='mr-2 text-lg' />
          <span className='font-semibold'>{dishes.length} блюд</span>
        </div>
      </div>

      {/* Состояние пустого списка */}
      {dishes.length === 0 ? (
        <div className='text-center py-16'>
          <div className='text-gray-300 mb-4'>
            <WarningIcon style={{ fontSize: 80 }} />
          </div>
          <h3 className='text-xl font-semibold text-gray-600 mb-2'>
            Меню пустое
          </h3>
          <p className='text-gray-500 max-w-md mx-auto'>
            Добавьте первое блюдо с помощью формы слева, чтобы начать
            формировать ваше меню
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className='bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-200 group'
            >
              {/* Изображение блюда */}
              <div className='relative h-48 overflow-hidden transform-3d'>
                <img
                  src={dish.image}
                  alt={dish.title}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                />
                <div className='absolute top-3 right-3'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                      dish.category
                    )}`}
                  >
                    {getCategoryLabel(dish.category)}
                  </span>
                </div>
              </div>

              {/* Информация о блюде */}
              <div className='p-5'>
                <div className='flex justify-between items-start mb-3'>
                  <h3 className='text-xs text-gray-800 line-clamp-2 flex-1 mr-2'>
                    {dish.title}
                  </h3>
                </div>

                <div className='flex justify-between items-center'>
                  <span className='text-2xl font-bold text-blue-600'>
                    {dish.price} €
                  </span>

                  <div className='flex space-x-2'>
                    <DishEditForm dish={dish} />
                    <button
                      onClick={() => handleDelete(dish.id)}
                      className='w-9 h-9 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors'
                      title='Удалить блюдо'
                    >
                      <ClearIcon fontSize='small' />
                    </button>
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
