import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter', // имя кусочка/срез состояния, Redux Toolkit сам создает типы action на основе этого имени.
  initialState, // -> Подключаем начальное состояние
  reducers: {
    // Раздел, где мы описываем функции, которые изменяют состояние.
    // Каждый reducer автоматически создает action.
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    multiDecrement(state) {
      state.value -= 10;
    },
    multiIncrement(state) {
      state.value += 10;
    },
    // -> Пример reducer с параметром.
    // action.payload - это число, которое передается в action
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, multiDecrement, multiIncrement, incrementByAmount } =
  counterSlice.actions;
// -> Отсюда приходят готовые action creators, которые можно сразу диспатчить.
export default counterSlice.reducer;
// -> Экспортируем reducer, чтобы подключить его в store.
