import { configureStore, combineReducers } from "@reduxjs/toolkit";

import counterReducer from "../features/counter/counterSlice";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import apodReducer from "../features/apod/apodSlice";
import { weatherApi } from "../features/weather/weatherApi";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { usersApi } from "../features/users/usersApi";
import weatherStateReducer from '../features/weather/weatherSlice'

// ---------- Комбинируем все редьюсеры ----------

const rootReducer = combineReducers({
  counter: counterReducer,
  products: productsReducer,
  cart: cartReducer,
  apod: apodReducer,
  weatherState: weatherStateReducer,

  // RTK Query reducers
  [weatherApi.reducerPath]: weatherApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  
});

// ---------- Настройки persist ----------
// Сохраняем ТОЛЬКО кэш (usersApi + weatherApi)

const persistConfig = {
  key: 'root', //имя "корневого" ключа, под которым всё состояние будет храниться в storage
  // в localStorage будет ключ вроде: persist:root
  storage, //Это означает: используй localStorage браузера.
  whitelist: [
    usersApi.reducerPath,
    weatherApi.reducerPath,
    'weatherState',
    'counter',
  ],
  //список строк с именами редьюсеров, которые нужно сохранять.
  //Важно: только эти части состояния попадут в localStorage. Остальное — нет.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//▶ Оборачиваем твой rootReducer (который собран через combineReducers) в persistReducer.

// persistReducer берёт:

// твой persistConfig,

// твой rootReducer,

// и возвращает новый редьюсер persistedReducer, который:

// при изменениях состояния сохраняет его в localStorage,

// при старте приложения восстанавливает состояние из localStorage.

// ---------- Создаём store ----------

export const store = configureStore({
  reducer: persistedReducer,//В reducer мы передаём не rootReducer, а уже обёрнутый persistedReducer.
//То есть теперь всем управляeт redux-persist.
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false, // обязательно для redux-persist
      //Это проверка, что в Redux store лежат только сериализуемые значения,
      //  то есть такие, которые можно безопасно сохранить как JSON. те данные которые можно безопасно превратить в строку
// ✔️ Сериализуемые:
// строки
// числа
// булевы
// массивы
// объекты (plain object)
    })
      .concat(usersApi.middleware)
      .concat(weatherApi.middleware),
});

// Persistor
export const persistor = persistStore(store);
//▶ Вызываем persistStore(store):

// Передаём в него созданный store.

// persistStore запускает процесс:

// загрузки сохранённого состояния из storage (rehydration),

// подписки на изменения store для дальнейшего сохранения.

// persistor потом обычно используется в index.tsx вот так:

// <PersistGate loading={null} persistor={persistor}>
//   <App />
// </PersistGate>


// Это говорит React: "Не рендери App, пока persisted state не восстановится".


// Типы
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


// Persist store = служебный объект, управляющий процессом persist/rehydrate.

// 🏛 1. Основной store (Redux store)

// Это:

// текущее состояние приложения

// логика редьюсеров

// RTK Query кэш

// middleware

// всё, что происходит в рамках Redux

// 💾 2. persistStore — это механизм-посредник

// Когда ты вызываешь:

// export const persistor = persistStore(store);


// Redux-persist создаёт объект persistor, который делает две вещи:

// 🔹 1. Слушает изменения Redux store

// Когда store обновляется, persistor смотрит:

// какие редьюсеры включены в whitelist

// надо ли их сохранять

// сериализует их

// записывает в localStorage (или другой storage)

// 🔹 2. При запуске приложения восстанавливает данные

// persistor читает сохранённые данные из localStorage →
// передаёт их в persistReducer, чтобы Redux store загрузил старое состояние.

// 📦 Визуальная схема
// Без persist:
// Redux store ← (reducers, middleware, actions)

// С persist:
// Redux store ← persistReducer ← persistor ← localStorage


// 🔍 Здесь:

// Redux store → хранит реальные рабочие данные

// persistReducer → внедряет механизм восстановления и сохранения в Redux

// persistor → управляет процессом сохранения/загрузки

// localStorage → фактическое место, куда кладутся данные

// 📌 Важно: persist НЕ создаёт второй store

// Persist делает:

// Что	Да / Нет
// Создаёт новый Redux store	❌ НЕТ
// Хранит копию данных	❌ НЕТ
// Управляет сохранением store в localStorage	✔️ ДА
// Управляет восстановлением store при загрузке	✔️ ДА
// Слушает изменения store	✔️ ДА
// 🔥 Простая аналогия

// Представь:

// Redux store → твой холодильник

// persistReducer → полка, на которой всё аккуратно раскладывается

// persistor → человек, который кладёт продукты в морозилку и достаёт обратно

// localStorage → морозилка

// Сам холодильник один, просто часть продуктов хранится дольше благодаря морозилке.

// 📝 Итог

// ✔ persistStore — это НЕ отдельное хранилище
// ✔ persistStore — это контролёр, который синхронизирует Redux store с localStorage
// ✔ persist работает вместе с основным store, но не заменяет его
// ✔ persistReducer — обёртка, которая интегрирует persist в Redux