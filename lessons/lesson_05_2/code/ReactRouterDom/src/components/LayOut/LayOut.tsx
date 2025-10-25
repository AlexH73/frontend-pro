import { type JSX } from 'react';
import NavBar from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';

export default function LayOut(): JSX.Element {
  return (
    <>
      <NavBar />
      <Outlet />
      <footer>Тут будет подвал</footer>
    </>
  );
}
