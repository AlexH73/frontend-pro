import { useDispatch, useSelector } from 'react-redux';
import image from '../../../../../../lesson_10_2/code/my-redux-app/src/assets/sandwich.jpg';
import { addIngredient, reset } from './sandwichSlice';
import type { RootState } from '../../app/store';

export default function Sandwich() {
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (state: RootState) => state.sandwich.ingredients
  );

  const handleAdd = (ingredient: string) => {
    dispatch(addIngredient(ingredient));
  };

  const handleReset = () => {
    dispatch(reset());
  };

  const buttonClasses =
    'px-4 py-2 mx-1 rounded-lg font-semibold transition-colors';

  return (
    <div className='max-w-2xl mx-auto mt-8 p-6'>
      <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
        <div className='text-center p-6'>
          <h2 className='text-3xl font-bold text-gray-800 mb-4'>
            Sandwich Maker
          </h2>
          <img
            src={image}
            alt='Sandwich'
            className='w-full h-48 object-cover rounded-lg mb-4'
          />
          <p className='text-xl text-gray-700 mb-6 min-h-8'>
            {ingredients.length > 0
              ? ingredients.join(' ')
              : 'Start adding ingredients!'}
          </p>
          <div className='flex flex-wrap justify-center gap-2 my-4'>
            <button
              onClick={() => handleAdd('Bread 🍞')}
              className={`${buttonClasses} bg-yellow-400 hover:bg-yellow-500 text-white`}
            >
              Add Bread 🍞
            </button>
            <button
              onClick={() => handleAdd('Cheese 🧀')}
              className={`${buttonClasses} bg-blue-400 hover:bg-blue-500 text-white`}
            >
              Add Cheese 🧀
            </button>
            <button
              onClick={() => handleAdd('Salat 🥬')}
              className={`${buttonClasses} bg-green-500 hover:bg-green-600 text-white`}
            >
              Add Salat 🥬
            </button>
            <button
              onClick={() => handleAdd('Bacon')}
              className={`${buttonClasses} bg-red-500 hover:bg-red-600 text-white`}
            >
              Add Bacon 🥓
            </button>
            <button
              onClick={handleReset}
              className={`${buttonClasses} bg-gray-500 hover:bg-gray-600 text-white`}
            >
              Reset ❌
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { addIngredient, reset } from './sandwichSlice';
