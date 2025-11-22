import type { JSX } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import ProductsList from './features/products/ProductList';
import { UsersList } from './features/users/UsersList';
import Sandwich from './features/sandwich/Sandwich';
import Counter from './features/counter/Counter';
import CartPage from './features/cart/CartPage';
import './App.css';

function App(): JSX.Element {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductsList />} />
        <Route path='/users' element={<UsersList />} />
        <Route path='/sandwich' element={<Sandwich />} />
        <Route path='/counter' element={<Counter />} />
        <Route path='/cart' element={<CartPage />} />
        {/* 404 Route */}
        <Route
          path='*'
          element={
            <div className='min-h-screen flex items-center justify-center bg-gray-50'>
              <div className='text-center'>
                <h1 className='text-9xl font-bold text-gray-900 mb-4'>404</h1>
                <p className='text-2xl text-gray-600 mb-8'>Page not found</p>
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
