// Создать интерфейс город City
//  со следующими свойствами:
//  name
//  population
// riversName - опциональное поле названия реки
// isCapital - опциональное поле является ли город столицей
// isTouristic - опциональное поле является ли город туристическим

// Создайте  объктов для этого интерфейса

// Дополнительно сделайте интерфейс расширяющий город
//  со следующими свойствами: добавить дату основания

// Базовый интерфейс City
interface City {
    name: string;
    population: number;
    riversName?: string; // опциональное поле
    isCapital?: boolean; // опциональное поле
    isTouristic?: boolean; // опциональное поле
}

// Расширенный интерфейс с датой основания
interface CityWithFoundation extends City {
    foundationDate: Date;
}

// Создаем объекты для базового интерфейса City
const moscow: City = {
    name: "Москва",
    population: 12600000,
    riversName: "Москва-река",
    isCapital: true,
    isTouristic: true
};

const paris: City = {
    name: "Париж",
    population: 2148000,
    riversName: "Сена",
    isCapital: true,
    isTouristic: true
};

const london: City = {
    name: "Лондон",
    population: 8982000,
    riversName: "Темза",
    isCapital: true,
    isTouristic: true
};

// Создаем объекты для расширенного интерфейса CityWithFoundation
const rome: CityWithFoundation = {
    name: "Рим",
    population: 2873000,
    riversName: "Тибр",
    isTouristic: true,
    foundationDate: new Date("753-04-21") // Примерная дата основания Рима
};

const athens: CityWithFoundation = {
    name: "Афины",
    population: 664000,
    riversName: "Илисос",
    isCapital: true,
    isTouristic: true,
    foundationDate: new Date("1400-01-01") // Примерная дата основания Афин
};

// Вывод информации о городах
console.log(moscow);
console.log(paris);
console.log(london);
console.log(rome);
console.log(athens);