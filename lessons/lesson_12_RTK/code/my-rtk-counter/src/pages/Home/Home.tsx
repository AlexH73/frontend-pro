import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  People,
  Restaurant,
  AddCircle,
  ArrowForward,
  ShoppingCart,
  Forum,
  Cloud,
  PhotoLibraryTwoTone,
} from '@mui/icons-material';
import Links from '@mui/material/Link';
import { selectTheme } from '../../features/theme/themeSlice';
import { useSelector } from 'react-redux';

export default function Home() {
  const theme = useSelector(selectTheme);

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
    {
      name: 'Orders',
      description: 'Track and manage customer orders in real-time.',
      icon: ShoppingCart,
      path: '/cart',
      color: 'bg-red-500',
    },
    {
      name: 'Forum',
      description:
        'Join discussions with other users. Available only after authentication.',
      icon: Forum,
      path: '/posts',
      color: 'bg-indigo-500',
    },
    {
      name: 'Weather',
      description:
        'Check current weather based on your browser location or search for any city.',
      icon: Cloud,
      path: '/weather',
      color: 'bg-cyan-500',
    },
    {
      name: 'APOD',
      description:
        'Discover Astronomy Picture of the Day with real space photos from NASA.',
      icon: PhotoLibraryTwoTone,
      path: '/apod',
      color: 'bg-purple-800',
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white'
          : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900'
      }`}
    >
      {/* Hero Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <h1
            className={`text-5xl md:text-6xl font-bold ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
            } mb-6`}
          >
            Welcome to <span className='text-blue-600'>RTK-App</span>
          </h1>
          <p
            className={`text-xl md:text-2xl ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            } mb-8 max-w-3xl mx-auto`}
          >
            Discover amazing products, manage users, and explore interactive
            features in our modern React application built with{' '}
            <Links
              href='https://redux-toolkit.js.org/introduction/getting-started'
              underline='hover'
              rel='noreferrer'
              target='_blank'
            >
              Redux Toolkit
            </Links>
            ,{' '}
            <Links
              href='https://mui.com/material-ui/getting-started/'
              underline='hover'
              rel='noreferrer'
              target='_blank'
            >
              Material UI
            </Links>
            , and{' '}
            <Links
              href='https://tailwindcss.com/docs/installation/using-vite'
              underline='hover'
              rel='noreferrer'
              target='_blank'
            >
              Tailwind CSS
            </Links>
            .
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
              className={`inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-colors border shadow-lg ${
                theme === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
              }`}
            >
              View Users
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={`py-16 transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2
              className={`text-4xl font-bold ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
              } mb-4`}
            >
              Application Features
            </h2>
            <p
              className={`text-xl max-w-2xl mx-auto ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              } mb-8 max-w-3xl mx-auto`}
            >
              Explore the various features and functionalities of our React
              application
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature) => (
              <Link
                key={feature.name}
                to={feature.path}
                className={`group block p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600  hover:shadow-blue-600/50'
                    : 'bg-white border-gray-200 hover:shadow-blue-300/50'
                }`}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.color} text-white mb-4`}
                >
                  <feature.icon className='w-6 h-6' />
                </div>
                <h3
                  className={`text-xl font-semibold mb-2 transition-colors ${
                    theme === 'dark'
                      ? 'group-hover:text-blue-400'
                      : 'group-hover:text-blue-600'
                  }`}
                >
                  {feature.name}
                </h3>
                <p
                  className={
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }
                >
                  {feature.description}
                </p>
                <div
                  className={`mt-4 flex items-center font-semibold ${
                    theme === 'dark'
                      ? 'text-blue-400 group-hover:text-blue-300'
                      : 'text-blue-600 group-hover:text-blue-700'
                  }`}
                >
                  Explore
                  <ArrowForward className='ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform' />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className={`py-16 transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
        }`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
            <div
              className={`p-8 rounded-xl shadow-md ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className='text-3xl font-bold text-blue-600 mb-2'>100+</div>
              <div
                className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
              >
                Products Available
              </div>
            </div>
            <div
              className={`p-8 rounded-xl shadow-md ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className='text-3xl font-bold text-green-600 mb-2'>50+</div>
              <div
                className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
              >
                Happy Customers
              </div>
            </div>
            <div
              className={`p-8 rounded-xl shadow-md ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className='text-3xl font-bold text-purple-600 mb-2'>
                24/7
              </div>
              <div
                className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
              >
                Customer Support
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
