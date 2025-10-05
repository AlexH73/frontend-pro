import { useContext } from "react";
import ThemeContext from "./themeContext";
import type { ThemeContextType } from "./themeContext";

// 1️⃣ Импорт зависимостей
// useContext — это хук React, который позволяет получать доступ к данным, хранящимся в контексте.
// ThemeContext — сам контекст, который был создан в файле themeContext.ts
//  (он был экспортирован там и теперь импортируется сюда).
// { ThemeContextType } — это тип, который описывает структуру данных,
//  хранящихся в контексте (например, { theme: string, toggleTheme: () => void }).

// 2️⃣ Создание кастомного хука
export function useTheme(): ThemeContextType {
  // Функция useTheme() — это кастомный хук, который возвращает данные из ThemeContext.
  // Он гарантирует, что внутри компонента будет доступ к контексту и автоматически выбрасывает ошибку,
  // если хук используется вне ThemeProvider.

  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("seTheme must be used whithin a ThemeProvider");
  }
  //Если context равен undefined, то выбрасывается ошибка.
  // Это защищает от ситуации, когда кто-то попытается использовать useTheme() в компоненте,
  //  который не обернут в ThemeProvider.
  return context;
}
