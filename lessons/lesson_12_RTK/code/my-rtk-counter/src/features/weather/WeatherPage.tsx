import { type JSX, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useSelector } from 'react-redux';
import { selectTheme } from '../theme/themeSlice';
import { fetchWeather } from './weatherSlice';
import { selectWeatherLoading, selectWeatherError } from './selectors';
import WeatherCard from './WeatherCard';
import {
  Cached as CachedIcon,
  ReportGmailerrorred as ErrorIcon,
  LocationOn as LocationIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

export default function WeatherPage(): JSX.Element {
  const theme = useSelector(selectTheme);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectWeatherLoading);
  const error = useAppSelector(selectWeatherError);
  const [searchCity, setSearchCity] = useState('');

  useEffect(() => {
    dispatch(fetchWeather(undefined));
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchWeather(undefined));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCity.trim()) {
      dispatch(fetchWeather(searchCity.trim()));
      setSearchCity('');
    }
  };

  const handleUseCurrentLocation = () => {
    dispatch(fetchWeather(undefined));
  };

  const getBackgroundClass = (): string => {
    return theme === 'dark'
      ? 'bg-gray-900  bg-[url(https://alexh73.github.io/frontend_cohort57/assets/weather-app/images/pic2.png)] bg-cover bg-no-repeat bg-center'
      : 'bg-gradient-to-br from-blue-50 to-cyan-100';
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${getBackgroundClass()}`}
    >
      <div className='container mx-auto px-4 py-8 max-w-4xl'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1
            className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            🌤️ Weather Forecast
          </h1>
          <p
            className={`text-xl transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Real-time weather information powered by OpenWeatherMap
          </p>
        </div>

        {/* Search Section */}
        <div
          className={`rounded-2xl p-6 mb-6 shadow-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <form onSubmit={handleSearch}>
            <div className='flex gap-3 mb-4'>
              <div className='flex-1 relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <SearchIcon className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  type='text'
                  placeholder='Search by city name...'
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
              <button
                type='submit'
                disabled={!searchCity.trim()}
                className='px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
              >
                Search
              </button>
            </div>
          </form>

          <button
            onClick={handleUseCurrentLocation}
            className={`w-full py-3 rounded-lg font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              theme === 'dark'
                ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700'
                : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <div className='flex items-center justify-center gap-2'>
              <LocationIcon className='w-5 h-5' />
              Use My Current Location
            </div>
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            className={`rounded-lg p-4 mb-6 ${
              theme === 'dark'
                ? 'bg-red-900 text-red-200'
                : 'bg-red-50 text-red-700'
            }`}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <ErrorIcon className='w-5 h-5 mr-2' />
                <span>{error}</span>
              </div>
              <button
                onClick={handleRefresh}
                className='text-sm font-medium hover:underline focus:outline-none'
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className='flex justify-center py-16'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto'></div>
              <p
                className={`mt-4 text-lg font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-700'
                }`}
              >
                Loading weather data...
              </p>
            </div>
          </div>
        )}

        {/* Weather Card */}
        {!loading && !error && (
          <div>
            <WeatherCard />
            <div className='text-center mt-6'>
              <button
                onClick={handleRefresh}
                className={`px-6 py-2 rounded-lg font-medium border transition-colors hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === 'dark'
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className='flex items-center gap-2'>
                  <CachedIcon className='w-5 h-5' />
                  Refresh Data
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div
          className={`mt-12 rounded-2xl p-6 shadow-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h3
            className={`text-xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            ℹ️ About This Weather App
          </h3>
          <p
            className={`mb-3 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            This weather application uses the OpenWeatherMap API to provide
            real-time weather information. You can either use your current
            location or search for any city worldwide.
          </p>
          <p
            className={`${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <strong
              className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
            >
              Features include:
            </strong>{' '}
            current temperature, "feels like" temperature, humidity, pressure,
            wind speed and direction, visibility, sunrise/sunset times, and
            detailed weather descriptions.
          </p>
        </div>
      </div>
    </div>
  );
}
