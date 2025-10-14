# Props

Props или пропсы - это аргументы, передаваемые в React компоненты.

Пропсы передаются через HTML атрибуты (attributes).

Добавление атрибутов "brand" и "color".

`<Car brand="Ford" color="Black"/>;`

В компоненте пропсы следует принять и типизировать:

```tsx
import React from 'react';

interface Props {
    brand: string;
    color: string;
}

function Car(props: Props): JSX.Element {
    const{brand, color} = props;
    return (
        <div style={{ backgroundColor: color }}>
            <h3>Карточка машины</h3>
            <p>Бренд машины: {brand} Цвет машины: {color}</p>
        </div>
    );
}

export default Car;
```

### Props в React

**Props** (сокращение от "properties") — это механизм передачи данных от родительских компонентов дочерним. Это одна из ключевых концепций React, позволяющая компонентам быть переиспользуемыми и гибкими.

___

### Основные аспекты работы с **props**:

#### 1\. **Передача данных через props**

Данные передаются от родительского компонента к дочернему в виде атрибутов JSX:

```tsx
<UserCard name={'Bilbo'} age={45} lastname={'Baggins'} />
```

Здесь:

-   `name`, `age`, `lastname` — это ключи объекта `props`, переданного в компонент `UserCard`.

___

#### 2\. **Деструктуризация props**

Дочерний компонент может получить объект `props`, но для удобства часто используют деструктуризацию. Вместо:

```tsx
function UserCard(props) {
  const name = props.name;
  const age = props.age;
  const lastname = props.lastname;
}
```

Пишется:

```tsx
function UserCard({name, age, lastname}) {
  // теперь переменные name, age, lastname доступны напрямую
}
```

___

#### 3\. **Рендеринг данных через props**

Компонент может отображать переданные данные в JSX:

```tsx
<p>Name: {name}</p>
<p>Age: {age}</p>
<p>Lastname: {lastname}</p>
```

___

#### 4\. **Использование props для передачи функций**

В примере `MyButton` через props передается функция, которая будет вызвана по событию:

```tsx
<MyButton func={handleClick} text={`Choose ${name} ${lastname}`} />
```

В компоненте `MyButton` функция назначается на обработчик события:

```tsx
<button onClick={func}>{text}</button>
```

___

### Пример кода с объяснением:

#### Родительский компонент

```tsx
function Lesson03() {
 return (
  <div>
   <h2>React Props children 👨👩👦</h2>
   <p>Props используются для передачи данных от родительских компонентов дочерним компонентам. Это один из основных механизмов передачи данных в React</p>

   {/* Передача данных в UserCard */}
   <UserCard name={'Bilbo'} age={45} lastname={'Baggins'} />
   <UserCard name={'Gandalf'} age={2000} lastname={'White'} />
   <UserCard name={'Gimli'} age={90} lastname={'Dwarfson'} />
  </div>
 );
}

export default Lesson03;
```

#### Компонент UserCard

```tsx
function UserCard({ name, age, lastname }) {
  // Функция-обработчик
  const handleClick = () => {
    alert(`Hello, ${name}!`);
  };

  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Lastname: {lastname}</p>
      {/* Использование компонента MyButton */}
      <MyButton func={handleClick} text={`Choose ${name} ${lastname}`} />
    </div>
  );
}

export default UserCard;
```

#### Компонент MyButton

```tsx
export default function MyButton({ func, text }) {
  return <button onClick={func}>{text}</button>;
}
```

___

### Повторим:

1.  **Props** позволяют передавать данные в дочерние компоненты, что делает React-компоненты гибкими.
2.  **Деструктуризация** упрощает доступ к значениям, переданным через props.
3.  **Передача функций через props** позволяет дочерним компонентам вызывать действия родителя.
