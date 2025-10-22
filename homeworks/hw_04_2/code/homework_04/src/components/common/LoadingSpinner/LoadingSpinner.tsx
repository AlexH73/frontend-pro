import { type JSX } from 'react'
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({
  message = 'Загрузка...',
}: LoadingSpinnerProps): JSX.Element {
  return (
    <div className={styles.spinnerContainer}>
      <div className='spinner-border text-primary' role='status'>
        <span className='visually-hidden'>Загрузка...</span>
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
