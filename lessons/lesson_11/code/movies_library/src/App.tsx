import MovieCreation from './features/movies/MovieCreation';
import Movies from './features/movies/Movies';
import { Theaters } from '@mui/icons-material';

function App() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8'>
      <div className='container mx-auto px-4 max-w-7xl'>
        <header className='text-center mb-12'>
          <div className='inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg border border-white/20 mb-6'>
            <div className='p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl'>
              <Theaters className='text-2xl text-white' />
            </div>
            <div className='text-left'>
              <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                Movies Library
              </h1>
              <p className='text-gray-600 text-lg'>
                Управляйте своей коллекцией фильмов
              </p>
            </div>
          </div>
        </header>

        <div className='space-y-8'>
          <MovieCreation />
          <Movies />
        </div>

        <footer className='text-center mt-12 pt-8 border-t border-gray-200'>
          <p className='text-gray-500'>
            © 2025 Movies Library. Ваша персональная фильмотека.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
