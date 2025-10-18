
import { type JSX } from 'react'
import style from "./UseStateTask.module.css"
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import InputMirror from '../assets/InputMirror/InputMirror';

export default function UseStateTask(): JSX.Element {
  return (
    <div className={style.useStateTask}>
      <h1> useState ThemeSwitcher & InputMirror</h1>

      <div className={style.componentsContainer}>
        <div className={style.componentSection}>
          <ThemeSwitcher />
        </div>

        <div className={style.componentSection}>
          <InputMirror />
        </div>
      </div>
    </div>
  );
}
