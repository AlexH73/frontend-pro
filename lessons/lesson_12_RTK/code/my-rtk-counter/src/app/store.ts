import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import sandwichReducer from '../features/sandwich/sandwichSlice';
import usersReducer from '../features/users/usersSlice';
import productsReducer from '../features/products/productsSlice';

// -> Импортируем configureStore - простой способ создать store.
export const store = configureStore({
  reducer: {
    sandwich: sandwichReducer,
    counter: counterReducer,
    users: usersReducer,
    products: productsReducer,
  },
});

// Типы для useSelector и useDispatch

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// -> Создаем типы для селектора и диспатчера, чтобы использовать в TS-компонентах
