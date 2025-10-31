# Использование Formik в React

## Что такое Formik?

Formik – это популярная библиотека для работы с формами в React, которая позволяет упростить управление состоянием формы, валидацией и обработкой отправки данных.

## Установка Formik

Перед началом работы установите библиотеку с помощью npm или yarn:

```bash
npm i formik
# или
yarn add formik
```

## Теория

### 1\. Создание `formik` через `useFormik()`

Функция `useFormik()` принимает объект с настройками, который содержит:

-   **initialValues** – начальные значения полей.
-   **onSubmit** – функцию, которая будет вызвана при отправке формы.

### 2\. Привязка формы к `formik`

-   В `<form>` передаем обработчик `formik.handleSubmit`, который вызовет `onSubmit`.
-   В `<input>` передаем обработчик `formik.handleChange`, который обновляет состояние формы.
-   В `value` каждого `<input>` передаем соответствующее значение из `formik.values`.

## 📝 Чек-лист: Что не забыть при работе с Formik

1.  📦 **Установить Formik**
    
2.  🏗 **Создать объект `formik` с `useFormik()`**
    
    -   Передать **`initialValues`** – начальные значения для полей формы
    -   Передать **`onSubmit`** – обработчик отправки формы
3.  📝 **Добавить `handleSubmit` в форму**

    ```tsx
    <form onSubmit={formik.handleSubmit}>
    ```
    
4.  🖊 **Добавить `handleChange` в инпуты**
    
    ```tsx
    <input onChange={formik.handleChange} name="firstname" />
    ```
    
5.  🔄 **Привязать `value` к `formik.values`**
    
    ```tsx
    <input value={formik.values.firstname} />
    ```
    
6.  🎯 **В `name` инпута указать ключ из `initialValues`**
    
    ```tsx
    name="firstname" // Должно совпадать с initialValues
    ```
    

✅ Если все пункты выполнены, форма будет работать корректно!
