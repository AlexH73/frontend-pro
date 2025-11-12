import type { JSX } from 'react';
import { Restaurant as RestaurantIcon } from '@mui/icons-material';
import DishForm from './DishForm';
import DishesList from './DishesList';

export default function DishesPage(): JSX.Element {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8'>
      <div className='container mx-auto px-4 max-w-7xl'>
        {/* Заголовок */}
        <div className='text-center mb-12'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4'>
            <RestaurantIcon className='text-white text-3xl' />
          </div>
          <h1 className='text-4xl font-bold text-gray-800 mb-3'>
            Ресторанное меню
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Управляйте блюдами, категориями и ценами в вашем ресторане
          </p>
        </div>

        {/* Основной контент */}
        <div className='grid grid-cols-1 xl:grid-cols-6 gap-8'>
          {/* Форма - левая колонка */}
          <div className='xl:col-span-2'>
            <DishForm />
          </div>

          {/* Список блюд - правая колонка */}
          <div className='xl:col-span-4'>
            <DishesList />
          </div>
        </div>
      </div>
    </div>
  );
}
