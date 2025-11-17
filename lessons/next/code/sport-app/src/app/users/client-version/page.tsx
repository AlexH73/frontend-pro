'use client';
import { User } from '@/types';
import { useEffect, useState, type JSX } from 'react';

export default function UsersClientVersion(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const res = await fetch('https://api.escuelajs.co/api/v1/users');
    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }
    const arr = await res.json();
    setUsers(arr);
  }

  return (
    <ul className='px-28 py-20'>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
