import { type JSX } from 'react'

export default function Tennis(): JSX.Element {
  return (
    <div className='px-28 py-20'>
      <h2 className='font-bold text-4xl p-4 m-4'>Tennis Course</h2>
      <p className='p-4 m-4'>
        Tennis is a sport of precision, strategy, and mental strength. Whether
        you're picking up a racket for the first time or looking to improve your
        competitive game, our course has you covered.
      </p>
      <h3 className='font-bold text-2xl p-4 m-4'>Course Topics:</h3>
      <ul className='px-6 mx-4 py-1 my-1 flex flex-wrap gap-2'>
        <li className='border py-2 px-4 border-gray-500 rounded-2xl w-fit shadow-2xl'>
          Forehand and backhand fundamentals
        </li>
        <li className='border py-2 px-4 border-gray-500 rounded-2xl w-fit shadow-2xl'>
          Serve technique and variations
        </li>
        <li className='border py-2 px-4 border-gray-500 rounded-2xl w-fit shadow-2xl'>
          Volley and net play
        </li>
        <li className='border py-2 px-4 border-gray-500 rounded-2xl w-fit shadow-2xl'>
          Singles and doubles strategies
        </li>
        <li className='border py-2 px-4 border-gray-500 rounded-2xl w-fit shadow-2xl'>
          Match psychology and fitness
        </li>
        <li className='border py-2 px-4 border-gray-500 rounded-2xl w-fit shadow-2xl'>
          Rules and scoring systems
        </li>
      </ul>
      <p className='p-4 m-4'>
        Suitable for complete beginners and players seeking to enhance their
        technique and tactical understanding
      </p>
    </div>
  );
}