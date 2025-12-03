import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import sandwichReducer from '../features/sandwich/sandwichSlice';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';
import themeReducer from '../features/theme/themeSlice';
import authSlice from '../features/auth/authSlice';
import postsSlice from '../features/posts/postsSlice';
import weatherReducer from '../features/weather/weatherSlice';
import apodReducer from '../features/apod/apodSlice';
import { usersApi } from '../features/users/usersApi';

// -> Импортируем configureStore - простой способ создать store.
export const store = configureStore({
  reducer: {
    sandwich: sandwichReducer,
    counter: counterReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    products: productsReducer,
    cart: cartReducer,
    theme: themeReducer,
    auth: authSlice,
    posts: postsSlice,
    weather: weatherReducer,
    apod: apodReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware),
});

// Типы для useSelector и useDispatch

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// -> Создаем типы для селектора и диспатчера, чтобы использовать в TS-компонентах
