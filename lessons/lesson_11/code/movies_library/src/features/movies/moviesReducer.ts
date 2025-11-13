import type Movie from '../../types/Movie';
import type { Action } from '../../types/Action';
import { uid } from 'uid';
import Inception from "../../assets/Inception.jpg"
import Shawshank from "../../assets/shawshank.jpg"

const initialState: Movie[] = [
  {
    id: uid(),
    title: 'Inception',
    genre: 'Sci-Fi',
    country: 'USA',
    releaseDate: '2010-07-16',
    poster: `${Inception}`,
    description:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
  },
  {
    id: uid(),
    title: 'The Shawshank Redemption',
    genre: 'Drama',
    country: 'USA',
    releaseDate: '1994-09-23',
    poster: `${Shawshank}`,
    description:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
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

    case 'movies/edit':
      return state.map((movie) =>
        movie.id === action.payload.id ? { ...movie, ...action.payload } : movie
      );

    default:
      return state;
  }
}
