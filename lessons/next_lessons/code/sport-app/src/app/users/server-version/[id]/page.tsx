import { User } from '@/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default async function UserInfo({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const res = await fetch(`https://api.escuelajs.co/api/v1/users/${id}`);

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    return { message: 'Failed to load user info' };
  }
  const user: User = await res.json();

  return (
    <section className='bg-secondary py-20 px-14 md:px-32 flex justify-center'>
      <div className='bg-primary w-64 p-8 flex flex-col items-center gap-6 rounded-2xl border border-border'>
        <h2>{user.name}</h2>
        <span className='text-sm text-info'>ID: {id}</span>
        <Image
          unoptimized
          src={user.avatar}
          alt={user.name + 's-avatar'}
          width={300}
          height={300}
          className='rounded-2xl shadow-2xl'
        />
        <p className='bg-secondary w-26 sm:w-28 md:w-50 lg:w-60'>
          {user.email}
        </p>
        <Link href={"/users/server-version"} >To users</Link>
      </div>
    </section>
  );
}
