import { User } from '@/types';
import Link from 'next/link';

// by default - server component
const UsersServerVersion = async () => {
  const res = await fetch('https://api.escuelajs.co/api/v1/users', {
    headers: { 'Api-Key': 'asdasda.asdasd.asdasdasd9123adsmkkasd' },
    next: { tags: ['users'] },
  });

  // кэширование с фетч - только на серверных компонентах
  //1.  cache: "force-cache" - кэширование по умолчанию- при билде кэшировали данные
  // и дальше они не обновляются
  // - статические страницы

  //2. cache: "no-store" - не использует кэширование

  //3. Revalidate вариант
  // next: { revalidate: 60 }, - запросит обновление страницы каждые 60 сек
  // новости, курсы валют, продукты

  //4. Ручное обновление
  // next: { tags: ["users"] }, внутри фетча
  // чтобы вызвать обновление мы можем
  // revalidateTag("users");

  // ключ в серверном компоненте не будет "слит". Клиент его не видит
  if (!res.ok) {
    throw new Error('Fetch users failed');
  }
  const users = await res.json();
  //   console.log(users); // выведет на сервере

  return (
    <ul className='px-28 py-20'>
      {users.map((user: User) => (
        <li key={user.id}>
          {user.name}

          <Link
            className='border rounded px-4 py-2 cursor-pointer'
            href={`/users/server-version/${user.id}`}
          >
            To user
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default UsersServerVersion;
