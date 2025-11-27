import type { RootState } from '../../app/store';
import type WeatherData from './types/WeatherData';

export const selectWeatherData = (state: RootState): WeatherData | null =>
  state.weather.data;

export const selectWeatherLoading = (state: RootState): boolean =>
  state.weather.loading;

export const selectWeatherError = (state: RootState): string | null =>
  state.weather.error;
