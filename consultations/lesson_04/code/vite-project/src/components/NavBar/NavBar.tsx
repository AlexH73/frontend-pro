import type { JSX } from "react";
import style from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

export default function NavBar(): JSX.Element {
  return (
    <nav className={style.navigation}>
      <ul className={style.list}>
        <li className={style.listElement}>
          <NavLink to={"/alcohol"} className={style.link}>
            Alcohol
          </NavLink>
        </li>
        <li className={style.listElement}>
          <NavLink to={"/citypage"} className={style.link}>
            CityPage
          </NavLink>
        </li>
        <li className={style.listElement}>
          <NavLink to={"/home"} className={style.link}>
            Home
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
