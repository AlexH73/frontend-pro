import { combineReducers, createStore } from 'redux';
import counterReducer from './components/counter/counterReducer';
import sandwichReducer from './components/sandwich/sandwichReducer';
import tasksReducer from './components/tasks/tasksReducer';

const store = createStore(
  combineReducers({ counter: counterReducer, sandwich: sandwichReducer, tasks: tasksReducer })
);

export default store;

export type RootState = ReturnType<typeof store.getState>;

// import { combineReducers, createStore } from 'redux';
// Здесь импортируются функции combineReducers и createStore из библиотеки Redux
// combineReducers используется для объединения нескольких редюсеров в один,
// а createStore используется для создания Redux-хранилища

// export type RootState = ReturnType<typeof store.getState>; - Экспорт типа RootState,
// который представляет тип состояния Redux.
// ReturnType<typeof store.getState> используется для извлечения типа состояния,
// возвращаемого функцией getState объекта store.
