// 📌 Основные особенности TypeScript
// Статическая типизация
// В TS типы переменных, функций, аргументов и возвращаемых значений можно задавать явно.
// Ошибки в типах выявляются ещё на этапе компиляции, а не во время выполнения кода.
// Это повышает надежность и снижает количество багов.
// Совместимость с JavaScript
// Любой корректный JS-код — это уже корректный TS-код.
// Можно добавлять типы постепенно.
// Поддержка современных возможностей JS
// Поддержка ES6+ и будущих стандартов.
// TS компилирует их в более старый JS для совместимости с браузерами.
// Поддержка ООП (объектно-ориентированного программирования)
// Классы, интерфейсы, модификаторы доступа (public, private, protected), абстрактные классы.
// Интерфейсы и собственные типы
// Возможность описывать форму объектов, сигнатуры функций, структуры данных.
// Поддержка type и interface для создания собственных типов.
// Автодополнение и рефакторинг
// Благодаря типам редакторы (например, VS Code) лучше понимают ваш код, подсказывают методы, предупреждают об ошибках.
console.log("Hello TS!");
let x = 10;
// x = "Hello";
console.log(x);
// Как типизировать?
// Явно vs Неявно
// При объявлении переменной мы указываем тип данных:
let y = 100; // пример явной типизации
let p;
p = "Hello";
let myAge = 29;
let k = 10;
k = "Hello";
//console.log(k);
let qwerty;
let petOfAlex = "dog";
petOfAlex = "cat";
let petOfAlex2 = "cat";
// Как типизировать массив стринговых значений
let fruits = ["orange", "banana", "mango"];
// особенно важно указывать тип при создании пустого массива
let vegetables = [];
vegetables.push("potato");
console.log(vegetables);
const user1 = {
    firstName: "Vladimir",
    isAdmin: false,
};
// Создали объект указанного типа
const frankenstein = {
    name: "Dracula",
    height: 1.7,
    isAlive: true,
    isEvil: false,
};
const dracula = {
    isFlying: true,
    name: "Dracula",
    height: 1.7,
    isAlive: false,
    isEvil: false,
};
const pancate = {
    title: "Pancakes",
    isSweet: true,
};
const carrot = { title: "Carrot" };
// не  ругается, что не указали поле
// isSweet, поскольку оно является опциональным
// Типизация функций
// Нужно типизировать параметры и возвращаемое значение
function sum(a, b) {
    return a + b;
}
const dev = (a, b) => a / b;
console.log(sum(10, 12));
console.log(dev(20, 2));
function toUpper(str) {
    return str.toUpperCase();
}
console.log(toUpper("cat"));
const nine = Number("9");
const nineStr = String(9);
console.log(nine);
console.log(nineStr);
// interface чаще используется для описания структур классов, API-ответов и объектов,
//  потому что они могут автоматически расширяться при объединении объявлений:
// interface User {
//   name: string;
// }
// interface User {
//   age: number;
// }
// // Результат:
// const user: User = {
//   name: 'John',
//   age: 30,
// };
// создайте interface Airplane - самолет с полями:
// numberOfEngines - количество двигателей
// isJet - реактивный
// maxHeight - максимальная высота полета
// capacity - опциональное поле вместимость
// Создайте несколько переменных типа Airplane.
// interface Airplane {
//   numberOfEngines: number;
//   isJet: boolean;
//   maxHeight: number;
//   capacity?: number;
// }
// const airbus310: Airplane = {
//   numberOfEngines: 4,
//   isJet: false,
//   maxHeight: 11_000,
//   capacity: 100
// }
// npm install -g typescript
// npm install -g ts-node
// tsc -v
// | Ситуация                          | Рекомендация            |          |
// | --------------------------------- | ----------------------- | -------- |
// | Описание формы объекта            | `interface` ✅           |          |
// | Объединения (\`                   | `, `&\`, условные типы) | `type` ✅ |
// | Расширение нескольких интерфейсов | `interface` ✅           |          |
// | Комбинирование разных типов       | `type` ✅                |          |
// `npx tsc --init` - (только один раз при создании)подключает typescript
// `npx tsc` - запускает транспиляцию - создает js
// `npm i` - заново скачать все библиотеки
// `npm run dev` - запустит скрипт
