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

console.log('Hello ts!');

// Как типизировать?
// Явно vs Неявно
// При объявлении переменной мы указываем тип данных:

let x: number = 10;
// x = '2'; // Ошибка компиляции

console.log(x);

let isDrunk: boolean = true;

// Ключевое слово type
// мы можем объявлять типы отдельно

type Age = number;
let myAge: Age = 35;

let k: number | string = 10;
k = 'hello';

let qwerty: any;

// Пример Union type

type Pet = 'cat' | 'dog';
let petOfAlex: Pet;
petOfAlex = 'dog';
petOfAlex = 'cat';

// Можно расширить Union type

type ExtendedPet = Pet | 'bird';
let petOfAlex2: ExtendedPet = 'dog';

type Gender = 'male' | 'female';
type ExtendedGender = Gender | 'not binary person';

// Как типизировать массив стринговых значений

let fruits: string[] = ['apple', 'orange', 'banana'];
// особенно важно указать тип при создании пустого массива
let vegetables: string[] = [];
vegetables.push('tomato');
console.log(vegetables);

// Как типизировать объекты

type User = {
  firstName: string;
  isAdmin: boolean;
};

const user1: User = {
  firstName: 'Vova',
  isAdmin: false,
};

interface Monster {
  name: string;
  height: number;
  isAlive: boolean;
  isEvil: boolean;
}

const frankentein: Monster = {
  name: 'Frankenstein',
  height: 180,
  isAlive: true,
  isEvil: true,
};

interface ExtendedMonster extends Monster {
  isFlying: boolean;
}

const dracula: ExtendedMonster = {
  isFlying: true,
  name: 'Dracula',
  height: 175,
  isAlive: true,
  isEvil: true,
};

// Опциональные поля

interface Food {
  title: string;
  isSweet?: boolean;
}

const pancake: Food = {
  title: 'Pancakes',
  isSweet: true,
};

const carrot: Food = {
  title: 'Carrot',
};

// Создать интерфейс город City
// со следующими свойствами:
// name
// population
// riversName - опциональное поле названия реки
// isCapital -  опциональное поле является ли поле столицей
// isTouristic - опциональное поле является ли город туристическим

// Создайте объектов для этого интерфейса

// Дополнительно сделайте интерфейс расширяющий город
// со следующими свойствами: добавить дату основания

// Базовый интерфейс City
interface City {
  name: string;
  population: number;
  riversName?: string;
  isCapital?: boolean;
  isTouristic?: boolean;
}

type FoundationDate = string | Date | number;

// Расширенный интерфейс с датой основания
interface CityWithFoundation extends City {
  foundationDate: FoundationDate;
}

// Примеры объектов для City
const moscow: City = {
  name: 'Москва',
  population: 12678079,
  riversName: 'Москва-река',
  isCapital: true,
  isTouristic: true,
};

const voronezh: City = {
  name: 'Воронеж',
  population: 1057686,
  riversName: 'Воронеж',
  isTouristic: false,
};

const sochi: City = {
  name: 'Сочи',
  population: 466078,
  isTouristic: true,
};

// Пример объекта для расширенного интерфейса
const novosibirsk: CityWithFoundation = {
  name: 'Новосибирск',
  population: 1625631,
  riversName: 'Обь',
  isTouristic: false,
  foundationDate: formatFoundationDate(new Date(1893, 3, 30)), // 30 апреля 1893 года
};

const oldCity: CityWithFoundation = {
  name: 'Дербент',
  population: 123720,
  riversName: 'Дербентка',
  isTouristic: true,
  foundationDate: 'VI век до н.э.', // Примерная дата основания
};

// Функция для красивого вывода даты
function formatFoundationDate(date: FoundationDate): string {
  if (date instanceof Date) {
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  return date.toString();
}

console.log(moscow);
console.log(voronezh);
console.log(sochi);
console.log(novosibirsk);
console.log(oldCity);

// Типизация функций
// Нужно типизировать параметры и возвращаемое значение

function sum(a: number, b: number): number {
  return a + b;
}

const dev = (a: number, b: number) => a / b;

console.log(sum(10, 12));
console.log(dev(20, 2));

// | Ситуация                          | Рекомендация            |          |
// | --------------------------------- | ----------------------- | -------- |
// | Описание формы объекта            | `interface` ✅           |          |
// | Объединения (\`                   | `, `&\`, условные типы) | `type` ✅ |
// | Расширение нескольких интерфейсов | `interface` ✅           |          |
// | Комбинирование разных типов       | `type` ✅                |          |