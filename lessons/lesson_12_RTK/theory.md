# Пример приложения счетчика на Redux Toolkit и TypeScript

Это простое приложение счетчика, построенное с использованием React, Redux Toolkit и TypeScript.

## Начало работы

npm create vite@latest my-rtk-counter -- --template react-ts cd my-rtk-counter npm install npm install @reduxjs/toolkit react-redux

### Предварительные требования

Убедитесь, что у вас установлен Node.js и npm (или yarn) на вашем компьютере.

### Установка зависимостей

Выполните следующую команду для установки необходимых зависимостей:

```bash
npm install @reduxjs/toolkit react-redux typescript
```

```bash
yarn add @reduxjs/toolkit react-redux typescript
```

Структура проекта Создайте каталог с именем redux для файлов, связанных с Redux, и каталог с именем components для компонентов React в каталоге src вашего проекта.

Создание Slice Создайте файл с именем counterSlice.ts в каталоге redux. В этом файле будет содержаться Slice Redux для счетчика.

### Пример counterSlice.ts:

```tsx
// counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};
```

```tsx
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
```

### Создание компонента

### Создайте компонент React в каталоге components, который будет использовать Redux store.

### Пример компонента Counter.tsx:

```tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { increment, decrement, incrementByAmount } from '../redux/counterSlice';

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div>
      <h1>Счетчик: {count}</h1>
      <button onClick={() => dispatch(increment())}>Увеличить</button>
      <button onClick={() => dispatch(decrement())}>Уменьшить</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Увеличить на 5</button>
    </div>
  );
};

export default Counter;
```

### Использование компонента

### Используйте созданный компонент в вашем приложении, например, в корневом компоненте.

### Пример использования в App.tsx:

```tsx
// App.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CounterReducer from './counterSlice';
import Counter from './components/Counter';

const store = configureStore({
  reducer: {
    counter: CounterReducer,
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

### Если у вас уже есть rootReducer, который объединяет срезы с помощью combineSlices() (или combineReducers()), то вам не нужно добавлять каждый срез отдельно в функцию configureStore().

#### Пример добавления:

```tsx
const rootReducer = combineSlices(
    counterSlice,
)
```

## Пример приложения счетчика на Redux Toolkit и TypeScript из нашего урока где Counter уже был при сборке

1.  Создали папку Counter
2.  Создали counterAPI.ts :

```
//Этот код  представляет функцию fetchCount, которая имитирует асинхронный запрос данных,
// возвращая обещание (Promise). Эта функция принимает опциональный параметр amount, который по умолчанию равен 1.
// Функция задерживает выполнение на 500 миллисекунд (через setTimeout) и затем разрешает обещание,
// возвращая объект с данными { data: amount }, где amount - значение переданное в функцию или значение по умолчанию,
// если ничего не было передано.
```

```tsx
export const fetchCount = (amount = 1) => {
    return new Promise<{ data: number }>(resolve => setTimeout(() => resolve({ data: amount }), 500))
}
```

2.  Создали Counter.tsx :

```tsx
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import styles from './Counter.module.css'
import {
    decrement,
    increment,
    incrementAsync,
    incrementByAmount,
    incrementIfOdd,
    selectCount,
    selectStatus,
} from './counterSlice'
```

```
* useState - хук React для работы с локальным состоянием компонента.
* useAppDispatch, useAppSelector - пользовательские хуки, используемые для получения диспетчера Redux и селекторов состояния из хранилища Redux.
* styles - объект, содержащий классы CSS для стилизации компонента Counter.
* decrement, increment, incrementAsync, incrementByAmount, incrementIfOdd, selectCount, selectStatus - действия и селекторы, экспортируемые из counterSlice, часть Redux state management.
```

```tsx
export function Counter(): JSX.Element {
    const dispatch = useAppDispatch()
    const count = useAppSelector(selectCount)
    const status = useAppSelector(selectStatus)
    const [incrementAmount, setIncrementAmount] = useState('2')
    const incrementValue = Number(incrementAmount) || 0

    return (
        <div>
            {/* кнопки увеличения и уменьшения значения счетчика */}
            <div className={styles.row}>
                <button
                    className={styles.button}
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    -
                </button>
                <span aria-label="Count" className={styles.value}>
                    {count}
                </span>
                <button
                    className={styles.button}
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    +
                </button>
            </div>

            {/* поле ввода для установки значения инкремента и кнопки для выполнения операций */}
            <div className={styles.row}>
                <input
                    className={styles.textbox}
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    type="number"
                    onChange={e => {
                        setIncrementAmount(e.target.value)
                    }}
                />
                <button
                    className={styles.button}
                    onClick={() => dispatch(incrementByAmount(incrementValue))}
                >
                    Add Amount
                </button>
                <button
                    className={styles.asyncButton}
                    disabled={status !== 'idle'}
                    onClick={() => dispatch(incrementAsync(incrementValue))}
                >
                    Add Async
                </button>
                <button
                    className={styles.button}
                    onClick={() => {
                        dispatch(incrementIfOdd(incrementValue))
                    }}
                >
                    Add If Odd
                </button>
            </div>
        </div>
    )
}
```

```
dispatch - функция для отправки действий в Redux store.
count - текущее значение счетчика, полученное из Redux store через селектор selectCount.
status - статус асинхронной операции, полученный из Redux store через селектор selectStatus.
incrementAmount - состояние для хранения значения инкремента, установленного пользователем в поле ввода.
incrementValue - числовое значение инкремента, полученное из incrementAmount.

Рендеринг интерфейса:

Компонент отображает кнопки для увеличения и уменьшения значения счетчика.
Отображает текущее значение счетчика count.
Предоставляет поле ввода для установки значения инкремента.
Предоставляет кнопки для выполнения операций счетчика, таких как добавление значения, добавление значения асинхронно, и добавление значения только если текущее значение счетчика нечетное.
Обработчики событий:

onClick обработчики для кнопок увеличения и уменьшения счетчика, отправляют соответствующие действия в Redux store.
onChange обработчик для поля ввода, обновляет состояние incrementAmount при изменении значения в поле.
onClick обработчики для кнопок выполнения операций счетчика, отправляют соответствующие действия в Redux store с учетом текущего значения инкремента.
```

3.  Создали counterSlice.ts :

```tsx
import type { PayloadAction } from '@reduxjs/toolkit'
import { createAppSlice } from '../../app/createAppSlice'
import type { AppThunk } from '../../app/store'
import { fetchCount } from './counterAPI'

export interface CounterSliceState {
    value: number
    status: 'idle' | 'loading' | 'failed'
}

const initialState: CounterSliceState = {
    value: 0,
    status: 'idle',
}
```

// If you are not using async thunks you can use the standalone `createSlice`.

```tsx
export const counterSlice = createAppSlice({
    name: 'counter',
    // createSlice будет выводить тип состояния из аргумента initialState.
    initialState,
    // Поле reducers позволяет нам определять редьюсеры и генерировать связанные с ними действия.
    reducers: create => ({
        increment: create.reducer(state => {
            // Redux Toolkit позволяет нам писать "мутирующую" логику в редьюсерах.
            // Он фактически не мутирует состояние, потому что использует библиотеку Immer,
            // которая обнаруживает изменения в "черновом состоянии" и создает совершенно новое
            // неизменяемое состояние на основе этих изменений.
            state.value += 1
        }),
        decrement: create.reducer(state => {
            state.value -= 1
        }),
        // Используйте тип PayloadAction для объявления содержимого action.payload.
        incrementByAmount: create.reducer((state, action: PayloadAction<number>) => {
            state.value += action.payload
        }),
        
            // Функция ниже называется "санк" и позволяет выполнять асинхронную логику. Ее можно отправить как обычное действие: dispatch(incrementAsync(10)). Это вызовет санк с функцией dispatch в качестве первого аргумента. Затем может быть выполнен асинхронный код и отправлены другие действия. 'Санки' обычно используются для выполнения асинхронных запросов.
        incrementAsync: create.asyncThunk(
            async (amount: number) => {
                const response = await fetchCount(amount)
                // Значение, которое мы возвращаем, становится содержимым действия fulfilled.
                return response.data
            },
            {
                pending: state => {
                    state.status = 'loading'
                },
                fulfilled: (state, action) => {
                    state.status = 'idle'
                    state.value += action.payload
                },
                rejected: state => {
                    state.status = 'failed'
                },
            }
        ),
    }),
    // Здесь вы можете определить свои селекторы.
    // Эти селекторы получают состояние среза как свой первый аргумент.
    selectors: {
        selectCount: counter => counter.value,
        selectStatus: counter => counter.status,
    },
})

// Для каждой функции редьюсера генерируются создатели действий.
export const { decrement, increment, incrementByAmount, incrementAsync } = counterSlice.actions

// Селекторы, возвращаемые slice.selectors, принимают корневое состояние в качестве своего первого аргумента.
export const { selectCount, selectStatus } = counterSlice.selectors


// Мы также можем писать thunks вручную, которые могут содержать как синхронную, так и асинхронную логику.
// Вот пример условной отправки действий на основе текущего состояния.
export const incrementIfOdd =
    (amount: number): AppThunk =>
    (dispatch, getState) => {
        const currentValue = selectCount(getState())

        if (currentValue % 2 === 1 || currentValue % 2 === -1) {
            dispatch(incrementByAmount(amount))
        }
    }
```
