import Link from 'next/link';
import { type JSX } from 'react'

export default function NotFound(): JSX.Element {
  return (
    <div className='w-full flex justify-center items-center flex-col p-6'>
      <h2 className='font-bold text-3xl'>Page not found</h2>
      <Link className='mt-8 btn-primary bg-gradient-to-t from-yellow-400 to-red-500 px-2 py-1 rounded' href={"/"}>Back to home</Link>
    </div>
  );
}