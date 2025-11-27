import type WeatherData from './WeatherData';

export default interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}
