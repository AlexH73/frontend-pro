import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../../features/cart/cartSlice';
import {
  ShoppingCart as CartIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

export default function NavBar() {
  const location = useLocation();
  const cartItemCount = useSelector(selectCartItemCount);
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
    <nav className='bg-white shadow-lg border-b border-gray-200 relative'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex-shrink-0 flex items-center'>
            <Link to='/' className='text-2xl font-bold text-blue-600'>
              RTK-App
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
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Cart Icon */}
          <div className='flex items-center space-x-4'>
            <Link
              to='/cart'
              className='relative p-2 text-gray-700 hover:text-blue-600 transition-colors'
            >
              <CartIcon className='w-6 h-6' />
              {cartItemCount > 0 && (
                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <div className='md:hidden'>
              <button
                ref={menuButtonRef}
                type='button'
                onClick={toggleMobileMenu}
                className='bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors'
                aria-expanded='false'
              >
                <span className='sr-only'>Open main menu</span>
                {isMobileMenuOpen ? (
                  <CloseIcon className='block h-6 w-6' />
                ) : (
                  <MenuIcon className='block h-6 w-6' />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className='md:hidden absolute top-16 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-200'
        >
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={closeMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  item.current
                    ? 'text-blue-600 bg-blue-100'
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
