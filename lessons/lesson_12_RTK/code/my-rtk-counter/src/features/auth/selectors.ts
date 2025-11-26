import type { RootState } from '../../app/store';
import type User from './types/User';

export const selectUser = (state: RootState): User | undefined =>
  state.auth.user;

export const selectError = (state: RootState): string | undefined =>
  state.auth.error;

export const selectIsAuthenticated = (state: RootState): boolean =>
  !!state.auth.user && !!state.auth.user.accessToken;
