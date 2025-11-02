## Инструкция по подключению Redux Toolkit в React-проект

### 0. Установка Redux Toolkit

```bash
npm install @reduxjs/toolkit react-redux
```

### 1. Создание Redux-хранилища (store) с помощью configureStore

- Импортируйте функцию `configureStore` из `@reduxjs/toolkit`.
- Вызовите `configureStore` и передайте объект с ключом `reducer`, куда передайте ваш редуктор (или комбинированные редукторы).
- `configureStore` автоматически настроит хранилище со всеми необходимыми настройками по умолчанию.

```js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
});
```

### 2. Обеспечение доступа к Redux-хранилищу во всем приложении React

- Оберните корневой компонент `<App />` в компонент `<Provider>` из `react-redux`.
- Пропишите проп `store={store}` у компонента `<Provider>`, чтобы все дочерние компоненты смогли подключаться к хранилищу.

```js
import { Provider } from "react-redux";

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
```

### 3. Создание типизированных хуков shared/hooks/hooks.ts

```js
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
```

### 4. Создание Redux "слайса" с помощью `createSlice`

- Импортируйте `createSlice` из `@reduxjs/toolkit`.
- Вызовите `createSlice` с объектом, который содержит:
  - `name` — имя слайса (строка).
  - `initialState` — начальное состояние слайса.
  - `reducers` — объект с методами-редукторами, которые могут "изменять" состояние напрямую благодаря библиотеке Immer.
- Экспортируйте созданный редуктор и генераторы экшенов.

```js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

### 5. Создание асинхронных экшенов с помощью `createAsyncThunk`

```js
const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId: number, thunkAPI) => {
    const response = await userAPI.fetchById(userId)
    return response.data
  },
)
```

### 6. Подключение AsyncThunk в Slice:

```js
const userSlice = createSlice({
  name: 'user',
  initialState: { user: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchUserById.fulfilled, (state, action) => {
      state.user = action.payload
    })
    .addCase(fetchUserById.rejected, (state) => {
      state.user = null
    })
    .addCase(fetchUserById.pending, (state) => {
      state.user = null
    })
  },
})

export default userSlice.reducer
```

### 7. Использование хуков React-Redux в компонентах

- Для чтения данных из хранилища используйте хук `useSelector`.
- Для отправки экшенов используйте хук `useDispatch`.

```js
import { useSelector, useDispatch } from "react-redux";
import { increment } from "./counterSlice";

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <div>{count}</div>
      <button onClick={() => dispatch(increment())}>+</button>
    </>
  );
}
```

## Ссылка на документацию Redux Toolkit: [https://redux-toolkit.js.org/tutorials/quick-start](https://redux-toolkit.js.org/tutorials/quick-start)

Расширение: https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
