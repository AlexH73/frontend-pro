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
  {
    id: uid(),
    title: 'The Dark Knight',
    genre: 'Action',
    country: 'USA',
    releaseDate: '2008-07-18',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
    description:
      'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
  },
  {
    id: uid(),
    title: 'Pulp Fiction',
    genre: 'Crime',
    country: 'USA',
    releaseDate: '1994-10-14',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzJjNDymmYzgyZGYXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    description:
      'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
  },
  {
    id: uid(),
    title: 'Forrest Gump',
    genre: 'Drama',
    country: 'USA',
    releaseDate: '1994-07-06',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    description:
      'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.',
  },
  {
    id: uid(),
    title: 'The Matrix',
    genre: 'Sci-Fi',
    country: 'USA',
    releaseDate: '1999-03-31',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    description:
      'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
  },
  {
    id: uid(),
    title: 'The Godfather',
    genre: 'Crime',
    country: 'USA',
    releaseDate: '1972-03-24',
    poster:
      'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    description:
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
  },
  {
    id: uid(),
    title: 'Fight Club',
    genre: 'Drama',
    country: 'USA',
    releaseDate: '1999-10-15',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg',
    description:
      'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
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
