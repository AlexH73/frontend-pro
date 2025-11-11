import { type JSX } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import styles from './Counter.module.css';

export default function Counter(): JSX.Element {
  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => state.counter.value);

  function handlePlus(): void {
    dispatch({ type: 'counter/plus', payload: 1 });
  }

  function handleMinus(): void {
    dispatch({ type: 'counter/minus', payload: 1 });
  }

  function handleReset(): void {
    dispatch({ type: 'counter/reset' });
  }

  return (
    <div className={`container mt-4 ${styles.container}`}>
      <div className='row justify-content-center'>
        <div className='col-md-6 text-center'>
          <div className='card'>
            <div className='card-body'>
              <h2 className='card-title'>Counter</h2>
              <div className='d-flex justify-content-center align-items-center gap-3 my-3'>
                <button
                  type='button'
                  className='btn btn-danger btn-lg'
                  onClick={handleMinus}
                >
                  -
                </button>
                <span className='h3 mb-0'>{counter}</span>
                <button
                  type='button'
                  className='btn btn-success btn-lg'
                  onClick={handlePlus}
                >
                  +
                </button>
              </div>
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
  );
}
