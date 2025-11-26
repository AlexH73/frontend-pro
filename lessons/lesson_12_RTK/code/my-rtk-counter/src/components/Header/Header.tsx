// components/Header/Header.tsx
import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/theme/themeSlice';
import { selectCartItemCount } from '../../features/cart/cartSlice';
import {
  selectUser,
  selectIsAuthenticated,
} from '../../features/auth/selectors';
import { logout } from '../../features/auth/authSlice';
import {
  ShoppingCart as CartIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { Tooltip, Badge } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import ThemeToggle from '../../features/theme/ThemeToggle';
import { useAppDispatch } from '../../app/hooks';

export default function Header() {
  const theme = useSelector(selectTheme);
  const cartItemCount = useSelector(selectCartItemCount);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header
      className={`transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      } pb-6 shadow-sm`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-4'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo Section */}
          <div className='flex items-center'>
            <Link
              to='/'
              className='flex items-center gap-3 hover:opacity-80 transition-opacity'
            >
              <img src={logo} alt='RTK-App' className='h-8' />
            </Link>
          </div>

          {/* Right Section - Auth & Tools */}
          <div className='flex items-center space-x-4'>
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart Icon */}
            <Tooltip title='Shopping Cart' arrow>
              <Link
                to='/cart'
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                <Badge
                  badgeContent={cartItemCount}
                  color='error'
                  overlap='circular'
                >
                  <CartIcon className='w-6 h-6' />
                </Badge>
              </Link>
            </Tooltip>

            {/* Auth Section */}
            <div className='flex items-center space-x-2'>
              {isAuthenticated && user ? (
                <>
                  {/* User Profile */}
                  <Tooltip title='My Profile' arrow>
                    <Link
                      to='/profile'
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                        theme === 'dark'
                          ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                      }`}
                    >
                      <img
                        src={user.image || '/default-avatar.png'}
                        alt={user.firstName || 'User'}
                        className='w-6 h-6 rounded-full'
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/24?text=U';
                        }}
                      />
                      <span className='hidden sm:block text-sm font-medium'>
                        {user.firstName || user.username}
                      </span>
                    </Link>
                  </Tooltip>

                  {/* Logout Button */}
                  <Tooltip title='Logout' arrow>
                    <button
                      onClick={handleLogout}
                      className={`p-2 rounded-lg transition-colors ${
                        theme === 'dark'
                          ? 'text-gray-300 hover:text-red-400 hover:bg-gray-700'
                          : 'text-gray-600 hover:text-red-600 hover:bg-gray-100'
                      }`}
                    >
                      <LogoutIcon className='w-5 h-5' />
                    </button>
                  </Tooltip>
                </>
              ) : (
                // Login Button
                <Tooltip title='Login' arrow>
                  <Link
                    to='/login'
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                    }`}
                  >
                    <LoginIcon className='w-5 h-5' />
                    <span className='hidden sm:block text-sm font-medium'>
                      Login
                    </span>
                  </Link>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
