import { lazy, Suspense, type JSX } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { CircularProgress } from '@mui/material';
import { selectTheme } from './features/theme/themeSlice';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import PostsList from './features/posts/PostsList';

const Home = lazy(() => import('./pages/Home/Home'));
const ProductsList = lazy(() => import('./features/products/ProductList'));
const UsersList = lazy(() =>
  import('./features/users/UsersList').then((m) => ({ default: m.UsersList }))
);
const Sandwich = lazy(() => import('./features/sandwich/Sandwich'));
const Counter = lazy(() => import('./features/counter/Counter'));
const CartPage = lazy(() => import('./features/cart/CartPage'));
const LoginPage = lazy(() => import('./features/auth/LoginPage'));
const ProfilePage = lazy(() => import('./features/auth/ProfilePage'));
const WeatherPage = lazy(() => import('./features/weather/WeatherPage'));

// import Home from './pages/Home/Home';
// import ProductsList from './features/products/ProductList';
// import { UsersList } from './features/users/UsersList';
// import Sandwich from './features/sandwich/Sandwich';
// import Counter from './features/counter/Counter';
// import CartPage from './features/cart/CartPage';
// import './App.css';
// import LoginPage from './features/auth/LoginPage';
// import ProfilePage from './features/auth/ProfilePage';

function App(): JSX.Element {
  const theme = useSelector(selectTheme);

  return (
    <Layout>
      <Suspense fallback={<CircularProgress />} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductsList />} />
        <Route path='/users' element={<UsersList />} />
        <Route
          path='posts'
          element={<ProtectedRoute outlet={<PostsList />} />}
        />
        <Route path='/sandwich' element={<Sandwich />} />
        <Route path='/counter' element={<Counter />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/weather' element={<WeatherPage />} />
        {/* 404 Route */}
        <Route
          path='*'
          element={
            <div
              className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white'
                  : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900'
              }`}
            >
              <div className='text-center'>
                <h1
                  className={`text-9xl font-bold ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                  } mb-4`}
                >
                  404
                </h1>
                <p
                  className={`text-xl md:text-2xl mb-8 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  } mb-8 max-w-3xl mx-auto`}
                >
                  Page not found
                </p>
                <a
                  href='/'
                  className='inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors'
                >
                  Go back home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
