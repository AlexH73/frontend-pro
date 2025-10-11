/*
Задание 1 *дополнительно

В отдельном файле ts создайте interface Airplane - самолет с полями:

    numberOfEngines - количество двигателей
    isJet - реактивный
    maxHeight - максимальная высота полета
    capacity - опциональное поле вместимость

Создайте несколько переменных типа Airplane.

*/ 

// Интерфейс Airplane
interface Airplane {
  numberOfEngines: number;
  isJet: boolean;
  maxHeight: number; 
  capacity?: number; // опциональное поле, количество пассажиров
}

// Создаем несколько переменных типа Airplane
const boeing737: Airplane = {
  numberOfEngines: 2,
  isJet: true,
  maxHeight: 12500,
  capacity: 215
};

const airbusA380: Airplane = {
  numberOfEngines: 4,
  isJet: true,
  maxHeight: 13100,
  capacity: 853
};

const cessna172: Airplane = {
  numberOfEngines: 1,
  isJet: false,
  maxHeight: 4200,
  capacity: 4
};

const antonovAn2: Airplane = {
  numberOfEngines: 1,
  isJet: false,
  maxHeight: 4500
  // capacity не указан - это допустимо, так как поле опциональное
};

const fighterJet: Airplane = {
  numberOfEngines: 1,
  isJet: true,
  maxHeight: 15000
  // capacity не указан, так как это военный самолет
};

// Массив самолетов
const airplanes: Airplane[] = [
  boeing737,
  airbusA380,
  cessna172,
  antonovAn2,
  fighterJet
];

// Функция для вывода информации о самолете
function printAirplaneInfo(airplane: Airplane): void {
  console.log(`Тип: ${airplane.isJet ? 'Реактивный' : 'Поршневой'}`);
  console.log(`Количество двигателей: ${airplane.numberOfEngines}`);
  console.log(`Максимальная высота: ${airplane.maxHeight} м`);
  
  if (airplane.capacity) {
    console.log(`Вместимость: ${airplane.capacity} пассажиров`);
  } else {
    console.log('Вместимость: не указана');
  }
  console.log('---');
}

// Вывод информации о всех самолетах
console.log('=== ИНФОРМАЦИЯ О САМОЛЕТАХ ===');
airplanes.forEach((airplane, index) => {
  console.log(`Самолет #${index + 1}:`);
  printAirplaneInfo(airplane);
});