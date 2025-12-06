import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { NewsDataApiResponse } from './types/types';

const API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY;

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://newsdata.io/api/1',
  }),
  tagTypes: ['News'],
  endpoints: (builder) => ({
    getNews: builder.query<
      NewsDataApiResponse,
      {
        category: string;
      }
    >({
      query: ({ category }) => {
        const params = new URLSearchParams({
          apikey: API_KEY || '',
          q: category,
          language: 'en',
        });
        return `/news?${params.toString()}`;
      },
      providesTags: ['News'],
      // Обработка ошибок
      transformErrorResponse: (response: any) => {
        console.error('NewsData.io API error:', response);

        if (response.status === 422) {
          throw new Error(
            'Invalid API key or request parameters. Please check your NewsData.io API key.'
          );
        }

        if (response.status === 429) {
          throw new Error(
            'Rate limit exceeded. NewsData.io free tier allows only 200 requests per day.'
          );
        }

        throw new Error('Failed to fetch news. Please try again later.');
      },
      // Добавляем информацию о бесплатном тарифе в ответ
      transformResponse: (response: NewsDataApiResponse) => {
        return {
          ...response,
          // На бесплатном тарифе всегда 10 результатов максимум
          totalResults: Math.min(response.totalResults, 10),
          nextPage: null, // На бесплатном тарифе пагинации нет
        };
      },
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
