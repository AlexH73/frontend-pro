import type MovieCredentials from './MovieCredentials';

export default interface Movie extends MovieCredentials {
  id: string;
}

export type MovieId = Movie['id'];
