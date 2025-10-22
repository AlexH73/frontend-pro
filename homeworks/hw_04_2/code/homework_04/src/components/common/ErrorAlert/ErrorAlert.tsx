import { type JSX } from 'react'

interface ErrorAlertProps {
  error: string;
  onRetry?: () => void;
}

export default function ErrorAlert({ error, onRetry }: ErrorAlertProps): JSX.Element {

  return (
    <div className='alert alert-danger' role='alert'>
      <h4 className='alert-heading'>Ошибка!</h4>
      <p>{error}</p>
      {onRetry && (
        <button className='btn btn-outline-danger' onClick={onRetry}>
          Попробовать снова
        </button>
      )}
    </div>
  );
}