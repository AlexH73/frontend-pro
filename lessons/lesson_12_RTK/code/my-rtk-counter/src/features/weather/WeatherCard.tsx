import { type JSX } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../theme/themeSlice';
import { selectWeatherData } from './selectors';
import { getWeatherIconUrl, formatTime, getWindDirection } from './api';
import {
  North as NorthIcon,
  LocationOn as LocationIcon,
  Thermostat as TempIcon,
  Air as WindIcon,
  Whatshot as GustIcon,
  Opacity as HumidityIcon,
  Visibility as VisibilityIcon,
  WbTwilight as SunsetIcon,
  Compress as PressureIcon,
  Navigation as WindDirectionIcon,
} from '@mui/icons-material';
import { amber, blue, orange, purple, red, yellow } from '@mui/material/colors';

export default function WeatherCard(): JSX.Element {
  const theme = useSelector(selectTheme);
  const weatherData = useSelector(selectWeatherData);

  if (!weatherData) {
    return (
      <div className='flex justify-center py-16'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  const getTemperatureColor = (temp: number): string => {
    if (temp < -10) return 'text-blue-300';
    if (temp < 0) return 'text-blue-400';
    if (temp < 10) return 'text-blue-500';
    if (temp < 20) return 'text-yellow-500';
    if (temp < 30) return 'text-orange-500';
    return 'text-red-500';
  };

  const getCardGradient = (): string => {
    return theme === 'dark'
      ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900'
      : 'bg-gradient-to-br from-gray-100 via-gray-200 to-blue-300';
  };

  return (
    <div
      className={`max-w-2xl mx-auto rounded-2xl shadow-2xl overflow-hidden ${getCardGradient()} ${
        theme === 'dark' ? 'text-white' : 'text-gray-700'
      }`}
    >
      {/* Header with Location */}
      <div
        className={`p-6 drop-shadow-md transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-800 to-gray-700'
            : 'bg-gradient-to-br from-white to-zinc-500'
        }`}
      >
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center'>
            <LocationIcon className='w-5 h-5 mr-2' />
            <h2 className='text-xl font-bold'>
              {weatherData.city}, {weatherData.country}
            </h2>
          </div>
          <span className='text-sm opacity-90'>
            {formatTime(Math.floor(Date.now() / 1000))}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <img
            src={getWeatherIconUrl(weatherData.icon)}
            alt={weatherData.description}
            className='w-8 h-8'
          />
          <span className='text-lg capitalize'>{weatherData.description}</span>
        </div>
      </div>
      {/* Main Content */}
      <div className='p-6'>
        {/* Temperature - Main Highlight */}
        <div className='text-center mb-6'>
          <TempIcon
            className={`${getTemperatureColor(
              weatherData.temperature
            )} mb-2 w-10 h-10`}
          />
          <div
            className={`text-9xl font-bold text-shadow-lg/30 ${getTemperatureColor(
              weatherData.temperature
            )} mb-2`}
          >
            {weatherData.temperature}°
          </div>
          <div className='text-xl opacity-90'>
            Feels like {weatherData.feelsLike}°
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className='grid grid-cols-2 gap-4 mb-6'>
          {/* Wind Speed */}
          <div className='bg-opacity-50 backdrop-blur-sm rounded-xl p-3 border border-white border-opacity-30'>
            <div className='flex items-center gap-2 mb-1'>
              <WindIcon className='w-5 h-5' sx={{ color: yellow[800] }} />
              <span className='font-semibold'>Wind Speed</span>
            </div>
            <div className='text-lg font-bold'>{weatherData.windSpeed} m/s</div>
          </div>

          {/* Wind Direction */}
          <div className='bg-opacity-20 backdrop-blur-sm rounded-xl p-3 border border-white border-opacity-30'>
            <div className='flex items-center gap-2 mb-1'>
              <WindDirectionIcon className='w-5 h-5' sx={{ color: red[300] }} />
              <span className='font-semibold'>Wind Direction</span>
            </div>
            <div className='text-lg font-bold'>
              <NorthIcon
                className='w-5 h-5 mr-2'
                sx={{ color: red[800] }}
                style={{
                  transform: `rotate(${weatherData.windDirection}deg)`,
                  transition: 'transform 0.5s ease-out',
                }}
              />
              {getWindDirection(weatherData.windDirection)}
              <div className='text-xs text-right'>
                {weatherData.windDirection}°
              </div>
            </div>
          </div>

          {/* Humidity */}
          <div className='bg-opacity-20 backdrop-blur-sm rounded-xl p-3 border border-white border-opacity-30'>
            <div className='flex items-center gap-2 mb-1'>
              <HumidityIcon className='w-5 h-5' sx={{ color: blue[800] }} />
              <span className='font-semibold'>Humidity</span>
            </div>
            <div className='text-lg font-bold'>{weatherData.humidity}%</div>
          </div>

          {/* Pressure */}
          <div className='bg-opacity-20 backdrop-blur-sm rounded-xl p-3 border border-white border-opacity-30'>
            <div className='flex items-center gap-2 mb-1'>
              <PressureIcon className='w-5 h-5' sx={{ color: purple[800] }} />
              <span className='font-semibold'>Pressure</span>
            </div>
            <div className='text-lg font-bold'>{weatherData.pressure} hPa</div>
          </div>
        </div>

        {/* Additional Info Grid */}
        <div className='grid grid-cols-2 gap-4'>
          {/* Visibility */}
          <div className='text-center p-3'>
            <VisibilityIcon
              className='w-6 h-6 mx-auto mb-2 opacity-80'
              sx={{ color: blue[400] }}
            />
            <div className='text-sm opacity-90'>Visibility</div>
            <div className='text-lg font-bold'>{weatherData.visibility} km</div>
          </div>

          {/* Wind Gust */}
          {weatherData.windGust > 0 && (
            <div className='text-center p-3'>
              <GustIcon
                className='w-6 h-6 mx-auto mb-2 opacity-80'
                sx={{ color: amber[400] }}
              />
              <div className='text-sm opacity-90'>Wind Gust</div>
              <div className='text-lg font-bold'>
                {weatherData.windGust} m/s
              </div>
            </div>
          )}

          {/* Sunrise */}
          <div className='text-center p-3'>
            <SunsetIcon
              className='w-6 h-6 mx-auto mb-2 opacity-80'
              sx={{ color: orange[200] }}
            />
            <div className='text-sm opacity-90'>Sunrise</div>
            <div className='text-lg font-bold'>
              {formatTime(weatherData.sunrise)}
            </div>
          </div>

          {/* Sunset */}
          <div className='text-center p-3'>
            <SunsetIcon
              className='w-6 h-6 mx-auto mb-2 opacity-80 transform rotate-180'
              sx={{ color: orange[800] }}
            />
            <div className='text-sm opacity-90'>Sunset</div>
            <div className='text-lg font-bold'>
              {formatTime(weatherData.sunset)}
            </div>
          </div>
        </div>

        {/* Coordinates */}
        <div className='mt-4 text-center'>
          <div className='text-xs opacity-70'>
            Lat: {weatherData.coordinates.lat.toFixed(4)}, Lon:{' '}
            {weatherData.coordinates.lon.toFixed(4)}
          </div>
        </div>
      </div>
    </div>
  );
}
