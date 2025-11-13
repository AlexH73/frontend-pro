import type { MovieId } from "./Movie";
import type MovieCredentials from "./MovieCredentials";
import type Movie from "./Movie";

export type Action =
  | { type: 'movies/add'; payload: MovieCredentials }
  | { type: 'movies/delete'; payload: MovieId }
  | { type: 'movies/editTitle'; payload: { id: string; newTitle: string } }
  | { type: "movies/edit"; payload: Movie };