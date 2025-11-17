import { type JSX } from 'react'

export default function Football(): JSX.Element {
  return (
    <section className='px-28 py-20'>
      <h2 className='font-bold text-4xl p-4 m-4'>Football Course</h2>
      <p className='p-4 m-4'>
        Football is more than just a game - it's a global passion that combines
        athleticism, strategy, and teamwork. Our comprehensive course will take
        you from fundamentals to advanced techniques.
      </p>
      <h3 className='font-bold text-2xl p-4 m-4'>Course Topics:</h3>
      <ul className='px-6 mx-4 py-1 my-1 flex flex-wrap gap-2'>
        <li className='border py-2 px-4 border-gray-500 rounded-2xl w-fit shadow-2xl'>Ball control and dribbling</li>
        <li className='border py-2 px-4 border-gray-500 rounded-2xl w-fit shadow-2xl'>Passing and receiving techniques</li>
        <li className='border py-2 px-4 border-gray-500 rounded-2xl w-fit shadow-2xl'>Shooting accuracy and power</li>
        <li className='border py-2 px-4 border-gray-500 rounded-2xl w-fit shadow-2xl'>Tactical understanding</li>
        <li className='border py-2 px-4 border-gray-500 rounded-2xl w-fit shadow-2xl'>Set pieces and game strategy</li>
        <li className='border py-2 px-4 border-gray-500 rounded-2xl w-fit shadow-2xl'>Physical conditioning</li>
      </ul>
      <p className='p-4 m-4'>
        Perfect for beginners starting their football journey and intermediate
        players looking to refine their skills
      </p>
    </section>
  );
}