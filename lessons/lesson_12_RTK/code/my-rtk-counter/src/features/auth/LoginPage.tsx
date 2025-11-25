import { type FormEvent, type JSX, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectError, selectIsAuthenticated } from './selectors';
import { login, clearError } from './authSlice';
import { useSelector } from 'react-redux';
import { selectTheme } from '../theme/themeSlice';
import { useNavigate } from 'react-router-dom';
import {
  LockPerson as LoginIcon,
  Visibility as ShowIcon,
  VisibilityOff as HideIcon,
} from '@mui/icons-material';
import { Tooltip, IconButton } from '@mui/material';

export default function LoginPage(): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const error = useAppSelector(selectError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const theme = useSelector(selectTheme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Clear error when component unmounts or when inputs change
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    dispatch(login({ username, password }));
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div
        className={`max-w-md w-full space-y-8 p-8 rounded-2xl shadow-xl transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className='text-center'>
          <div
            className={`mx-auto h-16 w-16 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'
            }`}
          >
            <LoginIcon
              className={`h-8 w-8 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}
            />
          </div>
          <h2
            className={`mt-6 text-3xl font-bold transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Sign in to your account
          </h2>
          <p
            className={`mt-2 text-sm transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Demo credentials: <strong>emilys</strong> /{' '}
            <strong>emilyspass</strong>
          </p>
        </div>

        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          {error && (
            <div
              className={`rounded-md p-4 transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-red-900 bg-opacity-50 text-red-200'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              <div className='flex'>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium'>Error</h3>
                  <div className='mt-1 text-sm'>
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className='space-y-4'>
            <div>
              <label
                htmlFor='username'
                className={`sr-only transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Username
              </label>
              <input
                id='username'
                name='username'
                type='text'
                required
                className={`relative block w-full px-3 py-3 border rounded-lg placeholder-gray-500 transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='relative'>
              <label
                htmlFor='password'
                className={`sr-only transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Password
              </label>
              <input
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                required
                className={`relative block w-full px-3 py-3 pr-12 border rounded-lg placeholder-gray-500 transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                <Tooltip
                  title={showPassword ? 'Hide password' : 'Show password'}
                  arrow
                >
                  <IconButton
                    onClick={handleTogglePassword}
                    className={`transition-colors duration-300 ${
                      theme === 'dark'
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    size='small'
                  >
                    {showPassword ? <HideIcon /> : <ShowIcon />}
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50`}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
