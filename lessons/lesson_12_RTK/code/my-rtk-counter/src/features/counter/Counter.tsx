import { type JSX } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  decrement,
  increment,
  multiDecrement,
  multiIncrement,
} from './counterSlice';

export default function Counter(): JSX.Element {
    const value = useAppSelector((state) => state.counter.value)
    //-> Получаем текущий счетчик из Redux
    const dispatch = useAppDispatch()
    // -> Берем типизированный dispatch
  return (
    <div className='bg-amber-100 max-w-2xl mx-auto mt-8 p-6 rounded-xl shadow-lg'>
      <h1 className='mt-8 btn-primary bg-linear-to-t from-green-400 to-blue-500 px-5 py-1 text-white'>
        Счетчик: {value}
      </h1>
      <div className='flex justify-center items-center gap-5 p-6'>
        <button
          className='mt-2 btn-primary bg-linear-to-t from-yellow-400 to-red-500 px-2 py-1 rounded'
          onClick={() => dispatch(multiIncrement())}
        >
          +10
        </button>
        <button
          className='mt-2 btn-primary bg-linear-to-t from-yellow-400 to-red-500 px-2 py-1 rounded'
          onClick={() => dispatch(increment())}
        >
          +1
        </button>
        {/* -> Отправляем действие увеличения счетчика */}
        <button
          className='mt-2 btn-primary bg-linear-to-t from-yellow-400 to-red-500 px-2 py-1 rounded'
          onClick={() => dispatch(decrement())}
        >
          -1
        </button>
        <button
          className='mt-2 btn-primary bg-linear-to-t from-yellow-400 to-red-500 px-2 py-1 rounded'
          onClick={() => dispatch(multiDecrement())}
        >
          -10
        </button>
      </div>
    </div>
  );
}