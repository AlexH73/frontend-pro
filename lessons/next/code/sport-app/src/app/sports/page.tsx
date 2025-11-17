import { type JSX } from 'react';

export default function Sports(): JSX.Element {
  return (
    <div className='px-28 py-20'>
      <h2 className='font-bold text-4xl p-4 m-4'>Sports Courses</h2>
      <h3 className='font-bold text-2xl p-4 m-4'>Course List:</h3>
      <ul className='px-6 mx-4 py-2 my-2'>
        <li className='py-2 px-4 border-gray-500 shadow-2xl'>
          <strong>Football:</strong> Master the world's most popular sport with
          professional coaching
        </li>
        <li className='py-2 px-4 border-gray-500 shadow-2xl'>
          <strong>Tennis:</strong> From basic strokes to advanced strategies -
          elevate your game
        </li>
        <li className='py-2 px-4 border-gray-500 shadow-2xl'>
          <strong>Swimming:</strong> Learn proper technique and build confidence
          in the water
        </li>
      </ul>
    </div>
  );
}
