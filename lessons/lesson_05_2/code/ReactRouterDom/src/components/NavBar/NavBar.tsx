import { type JSX } from 'react';
import style from './NavBar.module.css';
import { NavLink } from 'react-router-dom';

export default function NavBar(): JSX.Element {
  return (
    <nav className={style.navigation}>
      <ul className={style.list}>
        <li className={style.listElement}>
          <NavLink to='home' className={style.link}>
            Home
          </NavLink>
        </li>
        <li className={style.listElement}>
          <NavLink to='alcohol' className={style.link}>
            Alcohol
          </NavLink>
        </li>
        <li className={style.listElement}>
          <NavLink to='carshop' className={style.link}>
            Car Shop
          </NavLink>
        </li>
        <li className={style.listElement}>
          <NavLink to='counter' className={style.link}>
            Counter
          </NavLink>
        </li>
        <li className={style.listElement}>
          <NavLink to='playground' className={style.link}>
            Playground
          </NavLink>
        </li>
        <li className={style.listElement}>
          <NavLink to='userspage' className={style.link}>
            Users Page
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
