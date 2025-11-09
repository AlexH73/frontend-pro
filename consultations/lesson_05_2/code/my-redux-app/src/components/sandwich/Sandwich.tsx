import { type JSX } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import styles from './Sandwich.module.css';
import image from "../../assets/sandwich.jpg"

export default function Sandwich(): JSX.Element {
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (state: RootState) => state.sandwich.ingredients
  );

  function handleAddBread(): void {
    dispatch({ type: 'sandwich/addIngredient', payload: 'Bread 🍞' });
  }

  function handleAddCheese(): void {
    dispatch({ type: 'sandwich/addIngredient', payload: 'Cheese 🧀' });
  }

  function handleAddBacon(): void {
    dispatch({ type: 'sandwich/addIngredient', payload: 'Bacon 🥓' });
  }

  function handleAddSalat(): void {
    dispatch({ type: 'sandwich/addIngredient', payload: 'Salat 🥬' });
  }

  function handleReset(): void {
    dispatch({ type: 'sandwich/reset' });
  }

  return (
    <div className={`container mt-4 ${styles.container}`}>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <div className='card'>
            <div className='card-body text-center'>
              <h2 className='card-title'>Sandwich Maker</h2>
              <img
                src={image}
                alt='Sandwich'
                className='img-fluid mb-3'
              />
              <p className='h5'>Sandwich: {ingredients.join(' ')}</p>
              <div className='d-flex flex-wrap justify-content-center gap-2 my-3'>
                <button
                  type='button'
                  className='btn btn-warning'
                  onClick={handleAddBread}
                >
                  Add Bread
                </button>
                <button
                  type='button'
                  className='btn btn-info'
                  onClick={handleAddCheese}
                >
                  Add Cheese
                </button>
                <button
                  type='button'
                  className='btn btn-success'
                  onClick={handleAddSalat}
                >
                  Add Salat
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={handleAddBacon}
                >
                  Add Bacon
                </button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
