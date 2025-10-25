import { useEffect, useState, type JSX } from 'react';
import type User from './types/User';
import { Link } from 'react-router-dom';
import style from "./UsersPage.module.css"

export default function UsersPage(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  async function loadUsers(): Promise<void> {
    const res = await fetch('https://fakestoreapi.com/users');
    const arr = await res.json();
    setUsers(arr);
  }
  useEffect(() => {
    loadUsers();
  }, []);
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li
            className={style.userList}
            key={user.id}
          >
            <div>Ник:{user.username}</div>
            <div>
              Имя,Фамилия: {user.name.firstname} {user.name.lastname}
            </div>
            <div>Телефон: {user.phone}</div>
            <div>Email: {user.email}</div>
            <div>Zip-code: {user.address.zipcode}</div>
            <Link to={String(user.id)}>К пользователю</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
