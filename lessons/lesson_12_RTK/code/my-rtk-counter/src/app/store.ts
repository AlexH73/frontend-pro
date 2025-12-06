import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
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
import newsReducer from '../features/news/newsSlice';
import { newsApi } from '../features/news/newsApi';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: [usersApi.reducerPath, 'cart', 'theme', 'counter', 'news'],
  // ИЛИ blacklist для исключения определенных редьюсеров
  // blacklist: ['products', 'users'] // Например, не сохраняем эти
};

const rootReducer = combineReducers({
  sandwich: sandwichReducer,
  counter: counterReducer,
  products: productsReducer,
  cart: cartReducer,
  theme: themeReducer,
  auth: authSlice,
  posts: postsSlice,
  weather: weatherReducer,
  apod: apodReducer,
  news: newsReducer,

  // RTK Query API
  // [productsApi.reducerPath]: productsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// -> Импортируем configureStore - простой способ создать store.
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(usersApi.middleware)
      .concat(newsApi.middleware),
});

// Типы для useSelector и useDispatch
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// -> Создаем типы для селектора и диспатчера, чтобы использовать в TS-компонентах
