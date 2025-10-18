import { useState, type JSX } from 'react';
import style from './InputMirror.module.css';

export default function InputMirror(): JSX.Element {
  const [text, setText] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  return (
    <div className={style.inputMirror}>
      <h3>Управление полем ввода</h3>
      <input
        type='text'
        value={text}
        onChange={handleInputChange}
        placeholder='Введите текст...'
        className={style.inputField}
      />
      <p className={style.mirrorText}>
        Вы ввели: <span className={style.highlight}>{text}</span>
      </p>
      <p className={style.charCount}>Количество символов: {text.length}</p>
    </div>
  );
}
