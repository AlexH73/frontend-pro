import type Movie from '../../types/Movie';
import type { Action } from '../../types/Action';
import { uid } from 'uid';


const initialState: Movie[] = [
  {
    id: uid(),
    title: 'Inception',
    genre: 'Sci-Fi',
    country: 'USA',
    releaseDate: '2010-07-16',
  },
  {
    id: uid(),
    title: 'The Shawshank Redemption',
    genre: 'Drama',
    country: 'USA',
    releaseDate: '1994-09-23',
  },
];

export default function moviesReducer(
  state: Movie[] = initialState,
  action: Action
): Movie[] {
  
  switch (action.type) {
    case 'movies/add':
      return [...state, { ...action.payload, id: uid() }];

    case 'movies/delete':
      return state.filter((movie) => movie.id !== action.payload);

    case 'movies/editTitle':
      return state.map((movie) =>
        movie.id === action.payload.id
          ? { ...movie, title: action.payload.newTitle }
          : movie
      );
    default:
      return state;
  }
}
