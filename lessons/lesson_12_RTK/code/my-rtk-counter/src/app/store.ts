import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import sandwichReducer from '../features/sandwich/sandwichSlice';
import usersReducer from '../features/users/usersSlice';

// -> Импортируем configureStore - простой способ создать store.
export const store = configureStore({
  reducer: {
    sandwich: sandwichReducer,
    counter: counterReducer,
    users: usersReducer,
  },
});

// Типы для useSelector и useDispatch

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// -> Создаем типы для селектора и диспатчера, чтобы использовать в TS-компонентах
