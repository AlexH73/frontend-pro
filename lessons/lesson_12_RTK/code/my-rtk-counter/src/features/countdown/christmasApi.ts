import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { normalizeTimeLeft } from './utils';

interface ApiResponse {
  months?: number;
  weeks?: number;
  sleeps?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export const christmasApi = createApi({
  reducerPath: 'christmasApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://christmascountdown.live/api/',
  }),
  endpoints: (builder) => ({
    getChristmasTimeLeft: builder.query<
      ReturnType<typeof normalizeTimeLeft>,
      void
    >({
      query: () => 'timeleft',
      transformResponse: (response: ApiResponse) => {
        console.log('Raw API response:', response);

        // Универсальный парсер: используем наиболее точное доступное значение
        let totalSeconds = 0;

        if (response.seconds !== undefined) {
          // Используем seconds как самый точный источник
          totalSeconds = Math.floor(response.seconds);
        } else if (response.minutes !== undefined) {
          // Используем minutes
          totalSeconds = Math.floor(response.minutes * 60);
        } else if (response.hours !== undefined) {
          // Используем hours
          totalSeconds = Math.floor(response.hours * 3600);
        } else if (response.days !== undefined) {
          // Используем days
          totalSeconds = Math.floor(response.days * 86400);
        } else if (response.weeks !== undefined) {
          // Используем weeks
          totalSeconds = Math.floor(response.weeks * 7 * 86400);
        } else if (response.months !== undefined) {
          // Используем months (приблизительно)
          totalSeconds = Math.floor(response.months * 30.44 * 86400);
        } else {
          // Fallback: локальный расчет
          return calculateLocalChristmasTime();
        }

        // Разбиваем общее количество секунд на компоненты
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        console.log('Parsed time:', {
          days,
          hours,
          minutes,
          seconds,
          totalSeconds,
        });

        return normalizeTimeLeft(days, hours, minutes, seconds);
      },
      transformErrorResponse: (error) => {
        console.error('API error:', error);
        return calculateLocalChristmasTime();
      },
    }),
  }),
});

// Локальный расчет как fallback
function calculateLocalChristmasTime() {
  const now = new Date();
  const currentYear = now.getFullYear();
  let targetYear = currentYear;

  // Определяем, до какого Рождества считаем
  // Если сейчас после 25 декабря, считаем до Рождества следующего года
  if (now.getMonth() === 11 && now.getDate() > 25) {
    targetYear = currentYear + 1;
  }

  const christmasDate = new Date(targetYear, 11, 25);
  const diffMs = christmasDate.getTime() - now.getTime();

  // Округляем вниз до целых секунд
  const diffSeconds = Math.max(0, Math.floor(diffMs / 1000));

  const days = Math.floor(diffSeconds / 86400);
  const hours = Math.floor((diffSeconds % 86400) / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);
  const seconds = diffSeconds % 60;

  console.log('Local calculation for Christmas', targetYear, ':', {
    days,
    hours,
    minutes,
    seconds,
  });

  return { days, hours, minutes, seconds };
}

export const { useGetChristmasTimeLeftQuery } = christmasApi;
