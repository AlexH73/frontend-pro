import type { RootState } from '../../app/store';
import type { ApodItem } from './types/ApodItem';

export const selectTodayApod = (state: RootState): ApodItem | null =>
  state.apod.apodOfTheDay;

export const selectRandomApods = (state: RootState): ApodItem[] =>
  state.apod.randomApods;

export const selectAllApods = (state: RootState): ApodItem[] => {
  const today = state.apod.apodOfTheDay;
  const random = state.apod.randomApods;
  return today ? [today, ...random] : random;
};

export const selectApodLoading = (state: RootState): boolean =>
  state.apod.loading;

export const selectApodError = (state: RootState): string | null =>
  state.apod.error;

export const selectSelectedImageIndex = (state: RootState): number | null =>
  state.apod.selectedImageIndex;

export const selectSelectedApod = (state: RootState): ApodItem | null => {
  const index = state.apod.selectedImageIndex;
  const all = selectAllApods(state);
  return index !== null && index >= 0 && index < all.length ? all[index] : null;
};

export const selectHasNextImage = (state: RootState): boolean => {
  const index = state.apod.selectedImageIndex;
  const all = selectAllApods(state);
  return index !== null && index < all.length - 1;
};

export const selectHasPrevImage = (state: RootState): boolean => {
  const index = state.apod.selectedImageIndex;
  return index !== null && index > 0;
};
