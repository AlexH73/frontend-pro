import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../../features/cart/cartSlice';
import { selectTheme } from '../../features/theme/themeSlice';
import {
  ShoppingCart as CartIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import logo from "../../assets/logo.svg"
import { Tooltip } from '@mui/material';
import ThemeToggle from '../../features/theme/ThemeToggle';

export default function NavBar() {
  const location = useLocation();
  const cartItemCount = useSelector(selectCartItemCount);
  const theme = useSelector(selectTheme);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    {
      name: 'Products',
      href: '/products',
      current: location.pathname === '/products',
    },
    { name: 'Users', href: '/users', current: location.pathname === '/users' },
    {
      name: 'Sandwich',
      href: '/sandwich',
      current: location.pathname === '/sandwich',
    },
    {
      name: 'Counter',
      href: '/counter',
      current: location.pathname === '/counter',
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Обработчик клика вне меню
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Если меню открыто и клик был вне меню и вне кнопки меню
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        closeMobileMenu();
      }
    };

    // Добавляем обработчик при монтировании
    document.addEventListener('mousedown', handleClickOutside);

    // Убираем обработчик при размонтировании
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]); // Пересоздаем эффект при изменении isMobileMenuOpen

  // Закрываем меню при изменении маршрута
  useEffect(() => {
    closeMobileMenu();
  }, [location]);

  return (
    <nav
      className={`transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700 text-white'
          : 'bg-white border-gray-200 text-gray-900'
      } shadow-lg border-b sticky top-0 z-50`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link to='/' className='flex items-center gap-2'>
              <img src={logo} alt='RTK-App' className='h-7 text-blue-500' />
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className='hidden md:flex items-center space-x-8'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  item.current
                    ? theme === 'dark'
                      ? 'text-blue-400 bg-blue-900 bg-opacity-50'
                      : 'text-blue-600 bg-blue-50'
                    : theme === 'dark'
                    ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className='flex items-center space-x-4'>
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart Icon */}
            <Tooltip title='Go to cart' arrow>
              <Link
                to='/cart'
                className={`relative p-2 rounded-md transition-colors
                  ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  } focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50`}
              >
                <CartIcon className='w-6 h-6' />
                {cartItemCount > 0 && (
                  <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </Tooltip>

            {/* Mobile menu button */}
            <div className='md:hidden'>
              <Tooltip title='Open menu' arrow>
                <button
                  ref={menuButtonRef}
                  type='button'
                  onClick={toggleMobileMenu}
                  className={`inline-flex items-center justify-center p-2 rounded-md transition-colors
                  ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50`}
                  aria-expanded='false'
                >
                  <span className='sr-only'>Open main menu</span>
                  {isMobileMenuOpen ? (
                    <CloseIcon className='block h-6 w-6' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' />
                  )}
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className={`md:hidden absolute top-16 left-0 right-0 z-50 shadow-lg border-b transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <div
            className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 transition-colors duration-300 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={closeMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  item.current
                    ? theme === 'dark'
                      ? 'text-blue-400 bg-blue-900 bg-opacity-50'
                      : 'text-blue-600 bg-blue-100'
                    : theme === 'dark'
                    ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
