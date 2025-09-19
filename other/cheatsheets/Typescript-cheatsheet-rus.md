# Шпаргалка по TypeScript

## Содержание
1. [Основы TypeScript](#основы-typescript)
2. [Типы данных](#типы-данных)
3. [Интерфейсы](#интерфейсы)
4. [Классы](#классы)
5. [Дженерики](#дженерики)
6. [Продвинутые типы](#продвинутые-типы)
7. [Декораторы](#декораторы)
8. [Модули и пространства имен](#модули-и-пространства-имен)
9. [Конфигурация TypeScript](#конфигурация-typescript)
10. [Работа с библиотеками](#работа-с-библиотеками)

## Основы TypeScript

### Что такое TypeScript?
TypeScript — это надмножество JavaScript, добавляющее статическую типизацию. Код TypeScript компилируется в обычный JavaScript.

### Установка и настройка
```bash
# Установка TypeScript
npm install -g typescript

# Создание конфигурационного файла
tsc --init

# Компиляция файла
tsc app.ts

# Компиляция с наблюдением за изменениями
tsc --watch
```

### Базовый синтаксис
```typescript
// Объявление переменной с типом
let message: string = "Привет, TypeScript!";

// Функция с типизированными параметрами и возвращаемым значением
function sum(a: number, b: number): number {
    return a + b;
}

// Вызов функции
const result = sum(5, 10);
```

## Типы данных

### Примитивные типы
```typescript
// Строка
let name: string = "Иван";

// Число
let age: number = 25;
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;

// Логический тип
let isActive: boolean = true;

// Null и Undefined
let n: null = null;
let u: undefined = undefined;

// Symbol
let sym: symbol = Symbol("уникальный");

// BigInt
let bigInt: bigint = 100n;
```

### Массивы
```typescript
// Два способа объявления массивов
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// Массив разных типов (кортеж)
let tuple: [string, number] = ["Иван", 25];
```

### Enum
```typescript
// Перечисление
enum Color {
    Red,     // 0
    Green,   // 1
    Blue     // 2
}

// Перечисление с заданными значениями
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
}

let c: Color = Color.Green;
let d: Direction = Direction.Up;
```

### Any, Unknown, Void, Never
```typescript
// Any - отключает проверку типов
let notSure: any = 4;
notSure = "строка";
notSure = false;

// Unknown - безопасная альтернатива any
let value: unknown = 4;
// value.toFixed(); // Ошибка: Object is of type 'unknown'
if (typeof value === "number") {
    value.toFixed(); // OK
}

// Void - отсутствие возвращаемого значения
function logMessage(message: string): void {
    console.log(message);
}

// Never - функция никогда не завершается нормально
function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {}
}
```

### Object
```typescript
// Тип объект
let user: object = { name: "Иван", age: 25 };

// Более точная типизация объекта
let person: { name: string; age: number } = { name: "Иван", age: 25 };
```

## Интерфейсы

### Базовый интерфейс
```typescript
interface User {
    name: string;
    age: number;
    email?: string; // Необязательное свойство
    readonly id: number; // Только для чтения
}

const user: User = {
    name: "Иван",
    age: 25,
    id: 1
};

// user.id = 2; // Ошибка: id только для чтения
```

### Интерфейсы функций
```typescript
interface SearchFunc {
    (source: string, subString: string): boolean;
}

const mySearch: SearchFunc = function(src, sub) {
    return src.search(sub) > -1;
};
```

### Индексные типы
```typescript
interface StringArray {
    [index: number]: string;
}

const myArray: StringArray = ["Яблоко", "Банан"];
const item: string = myArray[0]; // "Яблоко"

interface Dictionary {
    [key: string]: string | number;
}

const dict: Dictionary = {
    "one": 1,
    "two": "два"
};
```

### Расширение интерфейсов
```typescript
interface Person {
    name: string;
    age: number;
}

interface Employee extends Person {
    position: string;
    salary: number;
}

const employee: Employee = {
    name: "Иван",
    age: 30,
    position: "Разработчик",
    salary: 100000
};
```

### Гибридные интерфейсы
```typescript
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    const counter = function(start: number) {
        return `Счетчик начинается с ${start}`;
    } as Counter;
    
    counter.interval = 123;
    counter.reset = function() { console.log("Сброс счетчика"); };
    
    return counter;
}

const c = getCounter();
c(10);
c.reset();
c.interval = 5;
```

## Классы

### Базовый класс
```typescript
class Person {
    // Свойства класса
    name: string;
    private age: number;
    protected email: string;
    readonly id: number;
    
    // Конструктор
    constructor(name: string, age: number, email: string, id: number) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.id = id;
    }
    
    // Методы
    greet(): string {
        return `Привет, меня зовут ${this.name}!`;
    }
    
    // Геттер
    get personAge(): number {
        return this.age;
    }
    
    // Сеттер
    set personAge(age: number) {
        if (age > 0 && age < 120) {
            this.age = age;
        } else {
            throw new Error("Недопустимый возраст");
        }
    }
}

const person = new Person("Иван", 25, "ivan@example.com", 1);
console.log(person.greet()); // "Привет, меня зовут Иван!"
console.log(person.personAge); // 25
person.personAge = 30;
```

### Сокращенный синтаксис конструктора
```typescript
class Person {
    constructor(
        public name: string,
        private age: number,
        protected email: string,
        readonly id: number
    ) {}
    
    greet(): string {
        return `Привет, меня зовут ${this.name}!`;
    }
}
```

### Наследование
```typescript
class Employee extends Person {
    constructor(
        name: string,
        age: number,
        email: string,
        id: number,
        public position: string,
        public salary: number
    ) {
        super(name, age, email, id);
    }
    
    work(): string {
        return `${this.name} работает как ${this.position}`;
    }
    
    // Переопределение метода родителя
    greet(): string {
        return `${super.greet()} Я работаю как ${this.position}.`;
    }
}

const employee = new Employee("Иван", 30, "ivan@example.com", 1, "Разработчик", 100000);
console.log(employee.work()); // "Иван работает как Разработчик"
console.log(employee.greet()); // "Привет, меня зовут Иван! Я работаю как Разработчик."
```

### Абстрактные классы
```typescript
abstract class Animal {
    abstract makeSound(): void;
    
    move(): void {
        console.log("Животное двигается");
    }
}

class Dog extends Animal {
    makeSound(): void {
        console.log("Гав-гав!");
    }
}

// const animal = new Animal(); // Ошибка: нельзя создать экземпляр абстрактного класса
const dog = new Dog();
dog.makeSound(); // "Гав-гав!"
dog.move(); // "Животное двигается"
```

### Статические свойства и методы
```typescript
class MathUtils {
    static readonly PI: number = 3.14159;
    
    static add(x: number, y: number): number {
        return x + y;
    }
    
    static multiply(x: number, y: number): number {
        return x * y;
    }
}

console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.multiply(4, 2)); // 8
```

## Дженерики

### Базовые дженерики
```typescript
// Дженерик-функция
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("myString");
let output2 = identity(42); // Тип выводится автоматически

// Дженерик-интерфейс
interface GenericIdentityFn<T> {
    (arg: T): T;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

### Дженерики с классами
```typescript
class Box<T> {
    private value: T;
    
    constructor(value: T) {
        this.value = value;
    }
    
    getValue(): T {
        return this.value;
    }
    
    setValue(value: T): void {
        this.value = value;
    }
}

const stringBox = new Box<string>("Привет");
console.log(stringBox.getValue()); // "Привет"

const numberBox = new Box(42); // Тип выводится автоматически
console.log(numberBox.getValue()); // 42
```

### Ограничения дженериков
```typescript
interface Lengthwise {
    length: number;
}

// T должен иметь свойство length
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(`Длина: ${arg.length}`);
    return arg;
}

loggingIdentity("Привет"); // OK, строка имеет свойство length
loggingIdentity([1, 2, 3]); // OK, массив имеет свойство length
// loggingIdentity(3); // Ошибка: число не имеет свойства length
```

### Использование нескольких типов
```typescript
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

const merged = merge({ name: "Иван" }, { age: 25 });
console.log(merged); // { name: "Иван", age: 25 }
```

### Дженерики с ключами объекта
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const person = { name: "Иван", age: 25 };
console.log(getProperty(person, "name")); // "Иван"
// console.log(getProperty(person, "job")); // Ошибка: 'job' не существует в типе '{ name: string; age: number; }'
```

## Продвинутые типы

### Union и Intersection типы
```typescript
// Union тип (или)
function padLeft(value: string, padding: string | number): string {
    if (typeof padding === "number") {
        return " ".repeat(padding) + value;
    }
    return padding + value;
}

// Intersection тип (и)
interface BusinessPerson {
    name: string;
    business: string;
}

interface Developer {
    name: string;
    language: string;
}

type BusinessDeveloper = BusinessPerson & Developer;

const person: BusinessDeveloper = {
    name: "Иван",
    business: "IT консалтинг",
    language: "TypeScript"
};
```

### Type Guards (Защитники типов)
```typescript
// Защитники типов с typeof
function isString(value: any): value is string {
    return typeof value === "string";
}

function process(value: string | number): string {
    if (isString(value)) {
        return value.toUpperCase(); // value имеет тип string
    }
    return value.toString();
}

// Защитники типов с instanceof
class Dog {
    bark() { return "Гав!"; }
}

class Cat {
    meow() { return "Мяу!"; }
}

function makeSound(animal: Dog | Cat): string {
    if (animal instanceof Dog) {
        return animal.bark();
    }
    return animal.meow();
}
```

### Literal Types (Литеральные типы)
```typescript
// Строковые литералы
type Direction = "up" | "down" | "left" | "right";

function move(direction: Direction): void {
    console.log(`Движение ${direction}`);
}

move("up"); // OK
// move("forward"); // Ошибка

// Числовые литералы
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

function rollDice(): DiceRoll {
    return (Math.floor(Math.random() * 6) + 1) as DiceRoll;
}
```

### Discriminated Unions (Размеченные объединения)
```typescript
interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(shape: Shape): number {
    switch (shape.kind) {
        case "square":
            return shape.size * shape.size;
        case "rectangle":
            return shape.width * shape.height;
        case "circle":
            return Math.PI * shape.radius ** 2;
    }
}

const square: Square = { kind: "square", size: 5 };
console.log(area(square)); // 25
```

### Mapped Types (Отображаемые типы)
```typescript
// Создание типа, где все свойства необязательны
type Partial<T> = {
    [P in keyof T]?: T[P];
};

// Создание типа, где все свойства только для чтения
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

interface Person {
    name: string;
    age: number;
}

// Все свойства необязательны
const partialPerson: Partial<Person> = { name: "Иван" };

// Все свойства только для чтения
const readonlyPerson: Readonly<Person> = { name: "Иван", age: 25 };
// readonlyPerson.name = "Петр"; // Ошибка: свойство только для чтения
```

### Conditional Types (Условные типы)
```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// Извлечение типа возвращаемого значения функции
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function greeting(): string {
    return "Привет!";
}

type GreetingReturnType = ReturnType<typeof greeting>; // string
```

### Utility Types (Служебные типы)
```typescript
// Partial - делает все свойства необязательными
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {
    return { ...todo, ...fieldsToUpdate };
}

const todo = {
    title: "Изучить TypeScript",
    description: "Изучить основы TypeScript",
    completed: false
};

const updatedTodo = updateTodo(todo, { completed: true });

// Pick - выбирает подмножество свойств
type TodoPreview = Pick<Todo, "title" | "completed">;

const preview: TodoPreview = {
    title: "Изучить TypeScript",
    completed: false
};

// Omit - исключает свойства
type TodoWithoutDescription = Omit<Todo, "description">;

// Record - создает тип с заданными ключами и типом значений
type PageInfo = {
    title: string;
};

type Page = "home" | "about" | "contact";

const nav: Record<Page, PageInfo> = {
    home: { title: "Главная" },
    about: { title: "О нас" },
    contact: { title: "Контакты" }
};
```

## Декораторы

### Декораторы классов
```typescript
// Декоратор класса
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter {
    greeting: string;
    
    constructor(message: string) {
        this.greeting = message;
    }
    
    greet() {
        return `Привет, ${this.greeting}!`;
    }
}
```

### Декораторы методов
```typescript
// Декоратор метода
function enumerable(value: boolean) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}

class Greeter {
    greeting: string;
    
    constructor(message: string) {
        this.greeting = message;
    }
    
    @enumerable(false)
    greet() {
        return `Привет, ${this.greeting}!`;
    }
}
```

### Декораторы свойств
```typescript
// Декоратор свойства
function format(formatString: string) {
    return function(target: any, propertyKey: string) {
        let value: string;
        
        const getter = function() {
            return `${formatString} ${value}`;
        };
        
        const setter = function(newVal: string) {
            value = newVal;
        };
        
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    };
}

class Greeter {
    @format("Привет,")
    greeting: string;
}

const greeter = new Greeter();
greeter.greeting = "мир";
console.log(greeter.greeting); // "Привет, мир"
```

### Декораторы параметров
```typescript
// Декоратор параметра
function required(target: any, propertyKey: string, parameterIndex: number) {
    const existingRequiredParameters: number[] = Reflect.getOwnMetadata("required", target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata("required", existingRequiredParameters, target, propertyKey);
}

function validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
        const requiredParameters: number[] = Reflect.getOwnMetadata("required", target, propertyKey) || [];
        
        for (const index of requiredParameters) {
            if (args[index] === undefined) {
                throw new Error(`Параметр на позиции ${index} обязателен.`);
            }
        }
        
        return method.apply(this, args);
    };
}

class Greeter {
    @validate
    greet(@required name: string) {
        return `Привет, ${name}!`;
    }
}

const greeter = new Greeter();
console.log(greeter.greet("Иван")); // "Привет, Иван!"
// console.log(greeter.greet()); // Ошибка: Параметр на позиции 0 обязателен.
```

## Модули и пространства имен

### Экспорт и импорт
```typescript
// math.ts
export function add(x: number, y: number): number {
    return x + y;
}

export function subtract(x: number, y: number): number {
    return x - y;
}

export const PI = 3.14159;

// Экспорт по умолчанию
export default class Calculator {
    add(x: number, y: number): number {
        return x + y;
    }
}

// app.ts
import Calculator, { add, subtract, PI } from './math';

console.log(add(5, 3)); // 8
console.log(subtract(5, 3)); // 2
console.log(PI); // 3.14159

const calc = new Calculator();
console.log(calc.add(5, 3)); // 8

// Импорт всего модуля
import * as math from './math';
console.log(math.add(5, 3)); // 8
```

### Пространства имен (Namespaces)
```typescript
// validators.ts
namespace Validation {
    export interface StringValidator {
        isValid(s: string): boolean;
    }
    
    export class LettersOnlyValidator implements StringValidator {
        isValid(s: string): boolean {
            return /^[A-Za-z]+$/.test(s);
        }
    }
    
    export class ZipCodeValidator implements StringValidator {
        isValid(s: string): boolean {
            return /^\d{5}(-\d{4})?$/.test(s);
        }
    }
}

// app.ts
/// <reference path="validators.ts" />
let validators: { [s: string]: Validation.StringValidator } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

let strings = ["Hello", "12345", "123", "ZipCode"];

for (let s of strings) {
    for (let name in validators) {
        console.log(`"${s}" - ${validators[name].isValid(s) ? "соответствует" : "не соответствует"} "${name}"`);
    }
}
```

### Разделение пространств имен на файлы
```typescript
// validation.ts
namespace Validation {
    export interface StringValidator {
        isValid(s: string): boolean;
    }
}

// letters-validator.ts
/// <reference path="validation.ts" />
namespace Validation {
    export class LettersOnlyValidator implements StringValidator {
        isValid(s: string): boolean {
            return /^[A-Za-z]+$/.test(s);
        }
    }
}

// zip-validator.ts
/// <reference path="validation.ts" />
namespace Validation {
    export class ZipCodeValidator implements StringValidator {
        isValid(s: string): boolean {
            return /^\d{5}(-\d{4})?$/.test(s);
        }
    }
}

// app.ts
/// <reference path="letters-validator.ts" />
/// <reference path="zip-validator.ts" />

let validators: { [s: string]: Validation.StringValidator } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();
```

## Конфигурация TypeScript

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es2020",           // Целевая версия ECMAScript
    "module": "commonjs",         // Система модулей
    "strict": true,               // Включает все строгие проверки типов
    "esModuleInterop": true,      // Улучшенная совместимость с модулями
    "skipLibCheck": true,         // Пропуск проверки типов в файлах .d.ts
    "forceConsistentCasingInFileNames": true, // Проверка регистра в именах файлов
    "outDir": "./dist",           // Директория для скомпилированных файлов
    "rootDir": "./src",           // Корневая директория исходников
    "declaration": true,          // Генерация .d.ts файлов
    "sourceMap": true,            // Генерация source map файлов
    "removeComments": true,       // Удаление комментариев
    "noImplicitAny": true,        // Запрет неявного any
    "strictNullChecks": true,     // Строгая проверка null и undefined
    "strictFunctionTypes": true,  // Строгая проверка типов функций
    "noImplicitThis": true,       // Запрет неявного this
    "alwaysStrict": true,         // Всегда использовать строгий режим
    "noUnusedLocals": true,       // Проверка неиспользуемых локальных переменных
    "noUnusedParameters": true,   // Проверка неиспользуемых параметров
    "noImplicitReturns": true,    // Проверка всех путей возврата
    "noFallthroughCasesInSwitch": true, // Проверка проваливания в switch
    "lib": ["dom", "es2020"],     // Используемые библиотеки
    "jsx": "react",               // Поддержка JSX
    "baseUrl": ".",               // Базовый URL для импортов
    "paths": {                    // Настройка путей импорта
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],        // Включаемые файлы
  "exclude": ["node_modules", "dist"] // Исключаемые файлы
}
```

### Основные опции компилятора
- **target**: Версия ECMAScript для компиляции (es5, es6, es2016, es2020, etc.)
- **module**: Система модулей (commonjs, amd, es2015, esnext, etc.)
- **strict**: Включает все строгие проверки типов
- **outDir**: Директория для скомпилированных файлов
- **rootDir**: Корневая директория исходников
- **sourceMap**: Генерация source map файлов
- **lib**: Библиотеки, доступные во время компиляции
- **jsx**: Поддержка JSX (react, react-native, preserve)

## Работа с библиотеками

### Определения типов
```typescript
// Установка определений типов для библиотеки
npm install @types/library-name --save-dev

// Пример с lodash
npm install lodash --save
npm install @types/lodash --save-dev

// Использование
import * as _ from 'lodash';
const result = _.chunk([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
```

### Создание своих определений типов
```typescript
// my-module.d.ts
declare module 'my-module' {
    export function myFunction(param: string): number;
    export class MyClass {
        constructor(name: string);
        getName(): string;
    }
    export const MY_CONSTANT: number;
}

// Использование
import { myFunction, MyClass, MY_CONSTANT } from 'my-module';
```

### Глобальные типы
```typescript
// global.d.ts
declare global {
    interface Window {
        myGlobalFunction(): void;
    }
    
    interface Array<T> {
        customMethod(): T[];
    }
}

// Использование
window.myGlobalFunction();
[1, 2, 3].customMethod();
```

### Ambient Declarations (Внешние объявления)
```typescript
// jquery.d.ts
declare const $: {
    (selector: string): {
        text(content: string): void;
        on(event: string, handler: Function): void;
    };
    ajax(url: string, settings?: any): void;
};

// Использование
$("button").on("click", function() {
    $("p").text("Привет, мир!");
});

$.ajax("/api/data");
```