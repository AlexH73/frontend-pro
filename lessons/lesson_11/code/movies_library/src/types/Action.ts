import type { MovieId } from "./Movie";
import type MovieCredentials from "./MovieCredentials";

export type Action =
  | { type: 'movies/add'; payload: MovieCredentials }
  | { type: 'movies/delete'; payload: MovieId }
  | { type: 'movies/editTitle'; payload: { id: string; newTitle: string } };