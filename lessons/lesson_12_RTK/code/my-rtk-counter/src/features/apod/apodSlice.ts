import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { ApodState } from './types/ApodItem';
import * as api from './api';

const initialState: ApodState = {
  apodOfTheDay: null,
  randomApods: [],
  loading: false,
  error: null,
  selectedDate: null,
  selectedImageIndex: null,
};

// Экшен для загрузки сегодняшней картинки
export const fetchTodayApod = createAsyncThunk(
  'apod/fetchTodayApod',
  async (_, { rejectWithValue }) => {
    try {
      return await api.fetchTodayApod();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch today's APOD"
      );
    }
  }
);

// Экшен для загрузки рандомных картинок
export const fetchRandomApods = createAsyncThunk(
  'apod/fetchRandomApods',
  async (count: number, { rejectWithValue }) => {
    try {
      return await api.fetchRandomApods(count);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch random APODs'
      );
    }
  }
);

// Экшен для загрузки всех данных
export const fetchAllApodData = createAsyncThunk(
  'apod/fetchAllApodData',
  async (_, { dispatch }) => {
    await dispatch(fetchTodayApod());
    await dispatch(fetchRandomApods(8)); // 8 рандомных картинок
  }
);

export const apodSlice = createSlice({
  name: 'apod',
  initialState,
  reducers: {
    clearApodError: (state) => {
      state.error = null;
    },
    resetApod: (state) => {
      state.apodOfTheDay = null;
      state.randomApods = [];
      state.loading = false;
      state.error = null;
      state.selectedDate = null;
      state.selectedImageIndex = null;
    },
    setSelectedImageIndex: (state, action) => {
      state.selectedImageIndex = action.payload;
    },
    clearSelectedImageIndex: (state) => {
      state.selectedImageIndex = null;
    },
    navigateToNextImage: (state) => {
      if (state.selectedImageIndex !== null) {
        const totalImages = 1 + state.randomApods.length; // Сегодняшняя + рандомные
        state.selectedImageIndex = (state.selectedImageIndex + 1) % totalImages;
      }
    },
    navigateToPrevImage: (state) => {
      if (state.selectedImageIndex !== null) {
        const totalImages = 1 + state.randomApods.length;
        state.selectedImageIndex =
          (state.selectedImageIndex - 1 + totalImages) % totalImages;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Today's APOD
      .addCase(fetchTodayApod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodayApod.fulfilled, (state, action) => {
        state.loading = false;
        state.apodOfTheDay = action.payload;
        state.selectedDate = action.payload.date;
        state.error = null;
      })
      .addCase(fetchTodayApod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Random APODs
      .addCase(fetchRandomApods.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRandomApods.fulfilled, (state, action) => {
        state.loading = false;
        state.randomApods = action.payload;
        state.error = null;
      })
      .addCase(fetchRandomApods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // All data
      .addCase(fetchAllApodData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllApodData.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAllApodData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearApodError,
  resetApod,
  setSelectedImageIndex,
  clearSelectedImageIndex,
  navigateToNextImage,
  navigateToPrevImage,
} = apodSlice.actions;
export default apodSlice.reducer;
