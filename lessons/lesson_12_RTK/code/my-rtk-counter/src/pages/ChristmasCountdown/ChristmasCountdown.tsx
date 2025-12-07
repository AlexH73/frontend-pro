import React from 'react';
import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import { Home, Celebration } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import CountdownFull from '../../features/countdown/CountdownFull'; 
import { selectTheme } from '../../features/theme/themeSlice';
import { useSelector } from 'react-redux';

const ChristmasCountdown: React.FC = () => {
  const theme = useSelector(selectTheme);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 to-gray-800'
          : 'bg-gradient-to-br from-red-50 via-white to-green-50'
      }`}
    >
      <Container maxWidth='lg' className='py-8'>
        {/* Хлебные крошки */}
        <Breadcrumbs className='mb-6' aria-label='breadcrumb'>
          <MuiLink
            component={Link}
            to='/'
            className={`flex items-center gap-3 hover:underline mb-5 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
            }`}
          >
            <Home fontSize='small' />
            Home
          </MuiLink>
          <Typography
            className={`flex items-center gap-1 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
            }`}
          >
            <Celebration fontSize='small' />
            Christmas Countdown
          </Typography>
        </Breadcrumbs>

        {/* Заголовок */}
        <Box className='text-center mb-8 mt-8'>
          <Typography
            variant='h1'
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
            style={{
              fontFamily: "'MerryChristmasFlake', cursive",
              textShadow:
                theme === 'dark'
                  ? '0 2px 4px rgba(0,0,0,0.5)'
                  : '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            🎄 Christmas Countdown 2025 🎅
          </Typography>
          <Typography
            variant='h6'
            className={`mb-6 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Real-time countdown to Christmas with live updates and festive
            design
          </Typography>
        </Box>

        {/* Основной компонент отсчета */}
        <Box className='mb-12'>
          <CountdownFull />
        </Box>

        {/* Информационная секция */}
        <Box
          className={`rounded-2xl p-8 mb-8 ${
            theme === 'dark'
              ? 'bg-gray-800/50 border border-gray-700'
              : 'bg-white border border-gray-200 shadow-lg'
          }`}
        >
          <Typography
            variant='h5'
            className={`font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
          >
            About This Countdown
          </Typography>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div>
              <Typography
                variant='h6'
                className={`font-semibold mb-3 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                How It Works
              </Typography>
              <ul
                className={`space-y-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <li className='flex items-start gap-2'>
                  <span className='text-green-500 mt-1'>✓</span>
                  <span>Data fetched from ChristmasCountdown.live API</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-green-500 mt-1'>✓</span>
                  <span>Stored in Redux with Redux Persist</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-green-500 mt-1'>✓</span>
                  <span>Local countdown updates every second</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-green-500 mt-1'>✓</span>
                  <span>API data refreshes every 10 minutes</span>
                </li>
              </ul>
            </div>

            <div>
              <Typography
                variant='h6'
                className={`font-semibold mb-3 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Technologies Used
              </Typography>
              <div className='flex flex-wrap gap-2 mb-4'>
                {[
                  'React',
                  'TypeScript',
                  'Redux Toolkit',
                  'RTK Query',
                  'Tailwind CSS',
                  'Material-UI',
                ].map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Box>

        {/* Кнопка возврата */}
        <Box className='text-center'>
          <Link
            to='/'
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            ← Back to Home
          </Link>
        </Box>
      </Container>

      {/* Инлайн стили для шрифта */}
      <style>
        {`
          @font-face {
            font-family: 'MerryChristmasFlake';
            src: url('/fonts/MerryChristmasFlake.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
        `}
      </style>
    </div>
  );
};

export default ChristmasCountdown;
