/*
Создайте тип Astronaut (Космонавт), у которого есть следующие поля:

isInSpace — булево значение (находится ли в космосе)
experienceYears — число (сколько лет опыта)
assistantRobot — объект типа Robot
missions — массив строк, например: ["Moon Landing", "ISS Maintenance"]
Тип Robot должен быть объектом с ключом model (например, { model: "XR-12" }).

Затем создайте типизированные переменные, используя эти типы.
*/


// Определяем тип для моделей роботов
type RobotModel = "XR-12" | "T-800" | "C-3PO" | "R2-D2";

// Определяем тип для возможных миссий
type Mission = "Moon Landing" | "ISS Maintenance" | "Mars Expedition" | "Satellite Repair" | "Asteroid Mining";

// Определяем тип Robot с конкретными моделями
type Robot = {
    model: RobotModel;
};

// Определяем тип Astronaut
type Astronaut = {
    isInSpace: boolean;
    experienceYears: number;
    assistantRobot: Robot;
    missions: Mission[];
};

// Создаем пример переменной с типом Astronaut
const astronaut: Astronaut = {
    isInSpace: true,
    experienceYears: 5,
    assistantRobot: {
        model: "XR-12"
    },
    missions: ["Moon Landing", "ISS Maintenance"]
};

// Дополнительный пример
const marsExplorer: Astronaut = {
    isInSpace: true,
    experienceYears: 7,
    assistantRobot: {
        model: "T-800"
    },
    missions: ["Mars Expedition", "Asteroid Mining"]
};

// Этот код вызовет ошибку TypeScript:
// const invalidAstronaut: Astronaut = {
//     isInSpace: false,
//     experienceYears: 3,
//     assistantRobot: {
//         model: "XR-12"
//     },
//     missions: ["Unknown Mission"] // Ошибка: тип '"Unknown Mission"' не может быть назначен для типа 'Mission'
// };
