import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import sandwichReducer from '../features/sandwich/sandwichSlice';
import usersReducer from '../features/users/usersSlice';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';
import themeReducer from '../features/theme/themeSlice';
import authSlice from '../features/auth/authSlice';
import postsSlice from '../features/posts/postsSlice';
import weatherReducer from '../features/weather/weatherSlice';

// -> Импортируем configureStore - простой способ создать store.
export const store = configureStore({
  reducer: {
    sandwich: sandwichReducer,
    counter: counterReducer,
    users: usersReducer,
    products: productsReducer,
    cart: cartReducer,
    theme: themeReducer,
    auth: authSlice,
    posts: postsSlice,
    weather: weatherReducer,
  },
});

// Типы для useSelector и useDispatch

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// -> Создаем типы для селектора и диспатчера, чтобы использовать в TS-компонентах
