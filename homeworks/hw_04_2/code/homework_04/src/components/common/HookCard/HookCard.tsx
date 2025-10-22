import { type JSX } from 'react'
import { type HookInfo } from '../../../types/post';

interface HookCardProps {
  hook: HookInfo;
}

export default function HookCard({ hook }: HookCardProps): JSX.Element {

  return (
    <div className={`card h-100 border-${hook.color}`}>
      <div className={`card-header bg-${hook.color} text-white`}>
        <h5 className='mb-0'>{hook.name}</h5>
      </div>
      <div className='card-body'>
        <h6 className='card-subtitle mb-2 text-muted'>Для чего нужен:</h6>
        <p className='card-text'>{hook.purpose}</p>

        <h6 className='card-subtitle mb-2 text-muted'>Что принимает:</h6>
        <p className='card-text'>{hook.accepts}</p>

        <h6 className='card-subtitle mb-2 text-muted'>Что возвращает:</h6>
        <p className='card-text'>{hook.returns}</p>

        <div className='mt-3'>
          <pre className='bg-light p-2 rounded small'>{hook.example}</pre>
        </div>
      </div>
    </div>
  );
}