import { type JSX } from 'react'

export default function Swimming(): JSX.Element {
  return (
    <div className='px-28 py-20'>
      <h2 className='font-bold text-4xl p-4 m-4'>Swimming Course</h2>
      <p className='p-4 m-4'>
        Swimming is not only a vital life skill but also an excellent full-body
        workout. Our course focuses on building confidence, proper technique,
        and water safety.
      </p>
      <h3 className='font-bold text-2xl p-4 m-4'>Course Topics:</h3>
      <ul className='px-6 mx-4 py-1 my-1 flex flex-wrap gap-2'>
        <li className='border py-2 px-4 border-gray-500 rounded-2xl w-fit shadow-2xl'>
          Breathing techniques and coordination
        </li>
        <li className='border py-2 px-4 border-gray-500 rounded-2xl w-fit shadow-2xl'>
          Freestyle (front crawl) mastery
        </li>
        <li className='border py-2 px-4 border-gray-500 rounded-2xl w-fit shadow-2xl'>
          Backstroke fundamentals
        </li>
        <li className='border py-2 px-4 border-gray-500 rounded-2xl w-fit shadow-2xl'>
          Breaststroke technique
        </li>
        <li className='border py-2 px-4 border-gray-500 rounded-2xl w-fit shadow-2xl'>
          Water safety and survival skills
        </li>
        <li className='border py-2 px-4 border-gray-500 rounded-2xl w-fit shadow-2xl'>
          Endurance building
        </li>
      </ul>
      <p className='p-4 m-4'>
        Ideal for all ages and levels - from complete beginners to swimmers
        looking to improve their stroke efficiency
      </p>
    </div>
  );
}