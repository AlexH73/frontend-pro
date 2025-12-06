import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface NewsState {
  favorites: string[];
  viewed: string[];
  category: string;
  sortBy: 'newest' | 'oldest';
  viewMode: 'grid' | 'list';
  showFavorites: boolean;
}

const initialState: NewsState = {
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
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const articleId = action.payload;
      const index = state.favorites.indexOf(articleId);

      if (index === -1) {
        state.favorites.push(articleId);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    markAsViewed: (state, action: PayloadAction<string>) => {
      const articleId = action.payload;
      if (!state.viewed.includes(articleId)) {
        state.viewed.push(articleId);
      }
    },
    setSortBy: (state, action: PayloadAction<'newest' | 'oldest'>) => {
      state.sortBy = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },
    setShowFavorites: (state, action: PayloadAction<boolean>) => {
      state.showFavorites = action.payload;
    },
    
    resetFilters: (state) => {
      state.category = 'technology';
      state.sortBy = 'newest';
      state.viewMode = 'grid';
      state.showFavorites = false;
    },
    
    clearFavorites: (state) => {
      state.favorites = [];
    },
    clearHistory: (state) => {
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
  clearHistory,
} = newsSlice.actions;

// Селекторы
export const selectFavorites = (state: RootState) => state.news.favorites;
export const selectCategory = (state: RootState) => state.news.category;
export const selectSortBy = (state: RootState) => state.news.sortBy;
export const selectViewMode = (state: RootState) => state.news.viewMode;
export const selectShowFavorites = (state: RootState) =>
  state.news.showFavorites;

export default newsSlice.reducer;
