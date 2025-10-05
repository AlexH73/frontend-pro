//Интерфейс для контекста:

import { createContext } from "react";

export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// ThemeContextType: Описание типа контекста. Это интерфейс,
//  который будет использоваться для типизации значений, передаваемых в контекст:
// theme: строка, которая будет содержать текущую тему (например, "light" или "dark").
// toggleTheme: функция без аргументов,
//  которая будет изменять тему с "light" на "dark" или наоборот.

//Создание контекста:
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
//ThemeContext: Создается контекст, который может хранить значение типа ThemeContextType или undefined
//  (в случае, если контекст еще не инициализирован).
// Начальное значение контекста установлено как undefined,
//  что означает, что пока мы не предоставим данные в контексте (при помощи Provider), контекст будет пустым.

export default ThemeContext

//✅ ThemeContext.ts – только контекст.
//✅ ThemeProvider.tsx – провайдер.
//✅ useTheme.ts – хук для удобного использования контекста.