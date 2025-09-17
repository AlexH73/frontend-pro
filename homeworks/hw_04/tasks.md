## 🧩 **Задание: Определения пола по имени**

## **Цель:** Создать компонент, который по введённому имени определяет пол с помощью API. [API documentation](https://www.genderapi.io/?gad_source=1&gad_campaignid=21873257227&gbraid=0AAAAAD3lqBWyeLX6KouwwkgbSL5EXdo1x&gclid=EAIaIQobChMIqqSTrdGvjgMVVYf9BR3O-gvyEAAYAyAAEgI7RfD_BwE)

### 📌 Условия задания:

1.  Создать инпут для ввода имени и кнопку.
    
2.  При нажатии кнопки — сделать запрос к API: (Обратите внимание! Это похожая апишка, но другая. Не совпадает с занятием)
    
    ```
    https://api.genderapi.io/api/?name=ВВЕДЁННОЕ_ИМЯ
    ```
    
3.  Получить ответ в формате:
    
    ```ts
    {
      name: "emily",
      gender: "female",
      country: "US",
      probability: 100,
      remaining_credits: 5
    }
    ```
    
4.  Отобразить на экране следующую информацию:
    
    -   Имя
    -   Пол (в переводе: male — мужской, female — женский)
    -   Страна
    -   Вероятность
    -   Остаток запросов (credits)
5.  Обработать состояния:
    
    -   Загрузка данных
    -   Ошибка при запросе
    -   Пустой ввод

___

### 💡 Дополнительно (по желанию):

-   Добавь валидацию формы.

Используйте VPN - если кончились запросы. Или зарегистрируйся в приложении как студент. Как альтернатива, можете сделать похожее приложения для любой другой api.

## [Решение Deployment](https://project-01-theta-rose.vercel.app/)
## [Решение Code](https://github.com/AlexH73/project-01/blob/main/src/components/GenderPredictor)