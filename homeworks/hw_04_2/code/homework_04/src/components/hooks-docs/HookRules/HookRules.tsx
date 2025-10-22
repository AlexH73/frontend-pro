import { type JSX } from 'react'

export default function HookRules(): JSX.Element {
  const rules = [
    'Вызывайте хуки только на верхнем уровне - не в циклах, условиях или вложенных функциях',
    'Вызывайте хуки только из React-функций - функциональных компонентов или кастомных хуков',
    'useEffect с пустым массивом зависимостей [] - выполняется только при монтировании',
    'useEffect без массива зависимостей - выполняется при каждом рендере',
  ];

  return (
    <div className='card border-secondary'>
      <div className='card-header bg-secondary text-white'>
        <h5 className='mb-0'>📋 Правила использования хуков</h5>
      </div>
      <div className='card-body'>
        <ul className='list-group list-group-flush'>
          {rules.map((rule, index) => (
            <li key={index} className='list-group-item'>
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}