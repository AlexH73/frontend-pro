import { type JSX } from 'react'
import { type HookInfo } from '../../../types/post';
import HookCard from '../../common/HookCard/HookCard';

export default function HooksList(): JSX.Element {

    const hooks: HookInfo[] = [
      {
        name: 'useState',
        purpose: 'Управление состоянием функционального компонента',
        accepts: 'Начальное значение состояния (может быть функцией)',
        returns:
          'Массив из двух элементов: [текущее значение, функция для обновления]',
        example: 'const [state, setState] = useState(initialValue);',
        color: 'primary',
      },
      {
        name: 'useEffect',
        purpose:
          'Выполнение побочных эффектов (запросы к API, подписки, ручное изменение DOM)',
        accepts: 'Функцию с эффектом и опциональный массив зависимостей',
        returns: 'Опционально функцию очистки (cleanup)',
        example: `useEffect(() => {
  // эффект
  return () => {
    // cleanup
  };
}, [dependencies]);`,
        color: 'success',
      },
      // ... остальные хуки
    ];

  return (
    <div className='row'>
      {hooks.map((hook, index) => (
        <div key={index} className='col-md-6 mb-4'>
          <HookCard hook={hook} />
        </div>
      ))}
    </div>
  );
}