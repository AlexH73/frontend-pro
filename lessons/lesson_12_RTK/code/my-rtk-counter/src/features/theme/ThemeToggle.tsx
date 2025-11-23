import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, selectTheme } from './themeSlice';
import type { AppDispatch } from '../../app/store';
import {
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
} from '@mui/icons-material';
import { Tooltip } from '@mui/material';

export default function ThemeToggle() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector(selectTheme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Tooltip title='Toggle theme' arrow>
      <button
        onClick={handleToggle}
        className={`
        relative inline-flex items-center justify-center 
        p-2 rounded-full transition-all duration-300
        ${
          theme === 'dark'
            ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }
        focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50
      `}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'dark' ? (
          <LightIcon className='w-5 h-5' />
        ) : (
          <DarkIcon className='w-5 h-5' />
        )}
      </button>
    </Tooltip>
  );
}
