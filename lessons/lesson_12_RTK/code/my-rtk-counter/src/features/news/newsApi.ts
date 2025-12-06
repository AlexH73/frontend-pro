import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  NewsApiResponse,
} from './types/types';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://newsapi.org/v2',
    prepareHeaders: (headers) => {
      if (API_KEY) {
        headers.set('X-Api-Key', API_KEY);
      }
      return headers;
    },
  }),
  tagTypes: ['News'],
  endpoints: (builder) => ({
    getNews: builder.query<NewsApiResponse, { category: string; page: number }>(
      {
        query: ({ category, page = 1 }) =>
          `everything?q=${category}&language=en&pageSize=10&page=${page}`,
        transformResponse: (response: any) => {
          // Трансформируем ответ, чтобы поле id было строкой
          const transformedArticles = response.articles.map((article: any) => ({
            ...article,
            source: {
              id: article.source?.id || 'unknown',
              name: article.source?.name || 'Unknown Source',
            },
          }));
          return {
            ...response,
            articles: transformedArticles,
          };
        },
        providesTags: ['News'],
      }
    ),
  }),
});

export const { useGetNewsQuery } = newsApi;
