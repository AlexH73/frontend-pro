import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  People,
  Restaurant,
  AddCircle,
  ArrowForward,
} from '@mui/icons-material';

export default function Home() {
  const features = [
    {
      name: 'Products',
      description:
        'Browse our wide selection of products with detailed information and ratings.',
      icon: ShoppingBag,
      path: '/products',
      color: 'bg-blue-500',
    },
    {
      name: 'Users',
      description:
        'View user profiles and manage user information from our API.',
      icon: People,
      path: '/users',
      color: 'bg-green-500',
    },
    {
      name: 'Sandwich Maker',
      description:
        'Create your perfect sandwich with our interactive sandwich builder.',
      icon: Restaurant,
      path: '/sandwich',
      color: 'bg-yellow-500',
    },
    {
      name: 'Counter',
      description: 'Simple counter application demonstrating state management.',
      icon: AddCircle,
      path: '/counter',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      {/* Hero Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-6'>
            Welcome to <span className='text-blue-600'>RTK-App</span>
          </h1>
          <p className='text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto'>
            Discover amazing products, manage users, and explore interactive
            features in our modern React application built with Redux Toolkit,
            Material UI, and Tailwind CSS.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              to='/products'
              className='inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg'
            >
              Explore Products
              <ArrowForward className='ml-2 w-5 h-5' />
            </Link>
            <Link
              to='/users'
              className='inline-flex items-center px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-lg hover:bg-gray-50 transition-colors border border-gray-300 shadow-lg'
            >
              View Users
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Application Features
            </h2>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              Explore the various features and functionalities of our React
              application
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature) => (
              <Link
                key={feature.name}
                to={feature.path}
                className='group block p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300'
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.color} text-white mb-4`}
                >
                  <feature.icon className='w-6 h-6' />
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors'>
                  {feature.name}
                </h3>
                <p className='text-gray-600'>{feature.description}</p>
                <div className='mt-4 flex items-center text-blue-600 group-hover:text-blue-700 font-semibold'>
                  Explore
                  <ArrowForward className='ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform' />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
            <div className='bg-white p-8 rounded-xl shadow-md'>
              <div className='text-3xl font-bold text-blue-600 mb-2'>100+</div>
              <div className='text-gray-600'>Products Available</div>
            </div>
            <div className='bg-white p-8 rounded-xl shadow-md'>
              <div className='text-3xl font-bold text-green-600 mb-2'>50+</div>
              <div className='text-gray-600'>Happy Customers</div>
            </div>
            <div className='bg-white p-8 rounded-xl shadow-md'>
              <div className='text-3xl font-bold text-purple-600 mb-2'>
                24/7
              </div>
              <div className='text-gray-600'>Customer Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
