import type User from './User';

export default interface AuthState {
  user: User | undefined;
  error?: string;
}
