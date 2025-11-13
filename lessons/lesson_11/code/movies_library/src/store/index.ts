import { combineReducers, createStore } from 'redux';
import moviesReducer from '../features/movies/moviesReducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
});

const store = createStore(rootReducer);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
