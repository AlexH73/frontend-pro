// features/weather/api/index.ts
import axios from 'axios';
import type { OpenWeatherResponse } from './types/WeatherData';
import type WeatherData from './types/WeatherData';

const API_KEY = '1e2cb50fff6384cf25692efcdb9ece14';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Функция для получения геолокации пользователя
export const getCurrentLocation = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error(`Unable to retrieve location: ${error.message}`));
      },
      {
        timeout: 10000,
        enableHighAccuracy: true,
      }
    );
  });
};

// Функция для получения погоды по координатам
export const fetchWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  try {
    const response = await axios.get<OpenWeatherResponse>(API_URL, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric', // Для получения в Цельсиях
        lang: 'en',
      },
    });

    const data = response.data;

    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      windGust: data.wind.gust || 0,
      windDirection: data.wind.deg,
      visibility: data.visibility / 1000, // Конвертируем в км
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      coordinates: {
        lat: data.coord.lat,
        lon: data.coord.lon,
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Weather API error: ${error.response?.data?.message || error.message}`
      );
    }
    throw error;
  }
};

// Функция для получения погоды по названию города
export const fetchWeatherByCity = async (
  city: string
): Promise<WeatherData> => {
  try {
    const response = await axios.get<OpenWeatherResponse>(API_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'en',
      },
    });

    const data = response.data;

    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      windGust: data.wind.gust || 0,
      windDirection: data.wind.deg,
      visibility: data.visibility / 1000,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      coordinates: {
        lat: data.coord.lat,
        lon: data.coord.lon,
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Weather API error: ${error.response?.data?.message || error.message}`
      );
    }
    throw error;
  }
};

// Основная функция для получения погоды
export const getFullWeatherData = async (
  city?: string
): Promise<WeatherData> => {
  try {
    if (city) {
      return await fetchWeatherByCity(city);
    } else {
      const location = await getCurrentLocation();
      return await fetchWeatherByCoords(location.lat, location.lon);
    }
  } catch (error) {
    // Fallback to default city if location fails
    console.warn('Failed to get user location, using default city:', error);
    return await fetchWeatherByCity('Moscow');
  }
};

// Функция для получения URL иконки погоды
export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

// Функция для форматирования времени из timestamp
export const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

// Функция для получения направления ветра по градусам
export const getWindDirection = (degrees: number): string => {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};
