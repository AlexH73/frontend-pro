import type { RootState } from '../../store';
import type Movie from '../../types/Movie';

export const selectMovies = (state: RootState): Movie[] => state.movies;

export default selectMovies;
