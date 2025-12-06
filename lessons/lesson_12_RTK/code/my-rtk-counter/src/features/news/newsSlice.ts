import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { NewsState } from './types/types';

const initialState: NewsState = {
  articles: [],
  favorites: [],
  viewed: [],
  category: 'technology',
  sortBy: 'newest',
  viewMode: 'grid',
  showFavorites: false,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    // Установка категории
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },

    // Добавление/удаление из избранного
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const articleId = action.payload;
      const index = state.favorites.indexOf(articleId);

      if (index === -1) {
        state.favorites.push(articleId);
      } else {
        state.favorites.splice(index, 1);
      }
    },

    // Отметка как просмотренное
    markAsViewed: (state, action: PayloadAction<string>) => {
      const articleId = action.payload;
      if (!state.viewed.includes(articleId)) {
        state.viewed.push(articleId);
      }
    },

    // Сортировка
    setSortBy: (state, action: PayloadAction<'newest' | 'oldest'>) => {
      state.sortBy = action.payload;
    },

    // Режим отображения
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },

    // Показать только избранные
    setShowFavorites: (state, action: PayloadAction<boolean>) => {
      state.showFavorites = action.payload;
    },

    // Сброс фильтров
    resetFilters: (state) => {
      state.category = 'technology';
      state.sortBy = 'newest';
      state.viewMode = 'grid';
      state.showFavorites = false;
    },

    // Очистка избранного
    clearFavorites: (state) => {
      state.favorites = [];
    },

    // Очистка истории просмотров
    clearViewed: (state) => {
      state.viewed = [];
    },
  },
});

export const {
  setCategory,
  toggleFavorite,
  markAsViewed,
  setSortBy,
  setViewMode,
  setShowFavorites,
  resetFilters,
  clearFavorites,
  clearViewed,
} = newsSlice.actions;

// Селекторы
export const selectNewsState = (state: RootState) => state.news;
export const selectArticles = (state: RootState) => state.news.articles;
export const selectFavorites = (state: RootState) => state.news.favorites;
export const selectViewed = (state: RootState) => state.news.viewed;
export const selectCategory = (state: RootState) => state.news.category;
export const selectSortBy = (state: RootState) => state.news.sortBy;
export const selectViewMode = (state: RootState) => state.news.viewMode;
export const selectShowFavorites = (state: RootState) =>
  state.news.showFavorites;
export const selectIsFavorite = (articleId: string) => (state: RootState) =>
  state.news.favorites.includes(articleId);
export const selectIsViewed = (articleId: string) => (state: RootState) =>
  state.news.viewed.includes(articleId);

export default newsSlice.reducer;
