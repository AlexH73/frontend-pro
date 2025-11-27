import { type JSX } from 'react';
import { getWindDirection } from './api';

interface WindDirectionProps {
  degrees: number;
  showCompass?: boolean;
}

export default function WindDirection({
  degrees,
  showCompass = true,
}: WindDirectionProps): JSX.Element {
  return (
    <div className='flex flex-col items-center'>
      {showCompass && (
        <div className='relative w-20 h-20 mb-3'>
          {/* Компас */}
          <div className='absolute inset-0 rounded-full border-2 border-white border-opacity-50'></div>

          {/* Маркеры направлений */}
          <div className='absolute top-1 left-1/2 transform -translate-x-1/2 text-xs text-white opacity-70'>
            N
          </div>
          <div className='absolute top-1/2 right-1 transform -translate-y-1/2 text-xs text-white opacity-70'>
            E
          </div>
          <div className='absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-white opacity-70'>
            S
          </div>
          <div className='absolute top-1/2 left-1 transform -translate-y-1/2 text-xs text-white opacity-70'>
            W
          </div>

          {/* Стрелка */}
          <div
            className='absolute top-1/2 left-1/2 w-1 h-8 bg-red-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 origin-bottom transition-all duration-1000 ease-out shadow-lg'
            style={{ transform: `translate(-50%, -50%) rotate(${degrees}deg)` }}
          >
            {/* Наконечник стрелки */}
            <div className='absolute -top-1 left-1/2 w-0 h-0 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-red-400'></div>
          </div>

          {/* Центр компаса */}
          <div className='absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2'></div>
        </div>
      )}

      {/* Текстовое отображение */}
      <div className='text-center'>
        <div className='text-xl font-bold'>{getWindDirection(degrees)}</div>
        <div className='text-sm opacity-80 mt-1'>{degrees}°</div>
      </div>
    </div>
  );
}
