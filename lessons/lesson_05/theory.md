# 📘 Bootstrap и TypeScript в React

### 🔹 **Bootstrap**

-   Это CSS-фреймворк, который помогает быстро и удобно стилизовать элементы интерфейса.
    
-   В нём уже есть готовые классы для кнопок, сеток, карточек, навигации и т.д.
    
-   Применяется через классы:
    
    ```html
    <button class="btn btn-primary">Кнопка</button>
    ```
    
-   В React можно использовать:
    
    1.  Подключив стили через `index.html` (CDN).
        
    2.  Установив npm-пакет:
        ```bash
        npm install bootstrap
        ```
        
        и импортировав в `main.tsx`:
        
        ```ts
        import 'bootstrap/dist/css/bootstrap.min.css';
        ```
        

➡️ Плюс: экономит время на верстке. ➡️ Минус: дизайн может быть «типовым», если не кастомизировать.

___

### 🔹 **TypeScript (TS) в React**

-   TypeScript — это надстройка над JavaScript, добавляющая **строгую типизацию**.
    
-   Помогает ловить ошибки ещё на этапе разработки.
    
-   В React используется для:
    
    -   Типизации **props** компонентов.
    -   Типизации **state** и **hookов** (`useState`, `useReducer` и т.д.).
    -   Определения интерфейсов и типов для данных из API.

Пример:

```ts
interface UserProps = {
  name: string;
  age: number;
};

const UserCard: React.FC<UserProps> = ({ name, age }) => {
  return <p>{name}, {age} лет</p>;
};
```

➡️ Плюс: меньше багов, удобнее работать в команде. ➡️ Минус: код дольше писать, требует привычки.

___

Хочешь, я сделаю для студентов ещё **мини-практику**: подключить Bootstrap и написать один компонент с типизацией на TS?

### 🔹 Что такое `useEffect`?

`useEffect` — это хук, который позволяет выполнять **побочные эффекты** (side effects) в функциональных компонентах.

Побочные эффекты — это действия, которые не относятся напрямую к отрисовке компонента, например:

-   Загрузка данных с сервера
-   Работа с `setTimeout`, `setInterval`
-   Подписка на события (например, `window.addEventListener`)
-   Работа с localStorage
-   Обновление заголовка страницы и др.

___

### 🔹 Общий синтаксис

```ts
useEffect(() => {
  // побочный эффект

  return () => {
    // очистка (optional)
  };
}, [зависимости]);
```

___

## 🧪 Примеры для разных вариантов зависимостей

___

### 1\. **Без массива зависимостей**

```ts
useEffect(() => {
  console.log('Компонент обновился');
});
```

🔁 Выполняется **после каждого рендера** (включая первое и все последующие обновления).

___

### 2\. **С пустым массивом зависимостей `[]`**

```ts
useEffect(() => {
  console.log('Компонент смонтирован');

  return () => {
    console.log('Компонент размонтирован');
  };
}, []);
```

✅ Эффект выполнится **один раз** после первого рендера. 🧹 Возвращаемая функция вызовется **при размонтировании компонента**.

___

### 3\. **С одной зависимостью**

```ts
const [count, setCount] = useState(0);

useEffect(() => {
  console.log('Сработало изменение count:', count);
}, [count]);
```

⚙️ Эффект срабатывает **каждый раз, когда `count` изменяется**.

___

### 4\. **С несколькими зависимостями**

```ts
const [width, setWidth] = useState(window.innerWidth);
const [height, setHeight] = useState(window.innerHeight);

useEffect(() => {
  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, [width, height]);
```

📦 Этот эффект будет перезапускаться при изменении `width` или `height`. Но ⚠️ лучше в данном случае использовать `[]`, чтобы подписка выполнялась один раз:

```ts
useEffect(() => {
  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

___

### 5\. **С асинхронной логикой (fetch данных)**

```ts
useEffect(() => {
  async function fetchData() {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  }

  fetchData();
}, []);
```

📡 Асинхронные вызовы оформляются через внутреннюю `async` функцию.

___

## 💡 Советы по использованию

-   **Чистите эффекты**: если вы используете таймеры, подписки или слушатели событий — обязательно очищайте их внутри `return`.
-   **Указывайте зависимости правильно**: всё, что используется внутри `useEffect` и может изменяться — должно быть в списке зависимостей.
-   **Избегайте лишнего ререндеринга**: не помещайте изменяемые значения в зависимости без необходимости.

___

## 🧠 Контрольные вопросы

1.  В чём отличие между `useEffect(() => {...})` и `useEffect(() => {...}, [])`?
2.  Как очистить таймер или подписку внутри `useEffect`?
3.  Когда `useEffect` срабатывает повторно?
4.  Как загрузить данные с сервера при первом рендере?
