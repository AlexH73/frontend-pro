import axios from 'axios';
import type { ApodItem } from '../types/ApodItem';
import { NASA_API_KEY, NASA_API_URL } from '../../../config/nasa.config';

export const fetchApod = async (date?: string): Promise<ApodItem> => {
  try {
    const params: Record<string, string> = {
      api_key: NASA_API_KEY,
    };

    if (date) {
      params.date = date;
    }

    const response = await axios.get<ApodItem>(NASA_API_URL, { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `NASA APOD API error: ${error.response?.data?.msg || error.message}`
      );
    }
    throw error;
  }
};

// Функция для получения нескольких рандомных APOD
export const fetchRandomApods = async (
  count: number = 6
): Promise<ApodItem[]> => {
  const requests = [];
  const startDate = new Date('1995-06-16'); // Первая APOD
  const endDate = new Date();

  // Генерируем случайные даты
  for (let i = 0; i < count; i++) {
    const randomTime =
      startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime());
    const randomDate = new Date(randomTime).toISOString().split('T')[0];

    requests.push(
      fetchApod(randomDate).catch((error) => {
        console.warn(`Failed to fetch APOD for date ${randomDate}:`, error);
        return null;
      })
    );
  }

  const results = await Promise.all(requests);
  return results.filter((item): item is ApodItem => item !== null);
};

// Функция для получения APOD за сегодня
export const fetchTodayApod = async (): Promise<ApodItem> => {
  return fetchApod();
};

// Функция для получения даты в формате YYYY-MM-DD
export const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};
