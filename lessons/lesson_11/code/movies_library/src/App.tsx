import type { JSX } from 'react';
import MovieCreation from './features/movies/MovieCreation';
import Movies from './features/movies/Movies';

function App(): JSX.Element {
  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4 max-w-6xl'>
        <header className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            Movies Library
          </h1>
          <p className='text-gray-600'>Управляйте своей коллекцией фильмов</p>
        </header>

        <MovieCreation />
        <Movies />
      </div>
    </div>
  );
}

export default App;
