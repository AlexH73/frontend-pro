import { useState, type ReactNode } from 'react';
import ThemeContext from './ThemeContext';

//Интерфейс для пропсов провайдера:
interface ThemeProviderProps {
  children: ReactNode;
}

// ThemeProviderProps: Интерфейс для пропсов компонента ThemeProvider.
//  Он описывает, что компонент может принимать в качестве пропса children,
//  который может быть любым элементом React (например, компонентом или текстом).

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<string>('light');

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ThemeProvider — это компонент, который использует useState для управления состоянием текущей темы.
//  Начальная тема установлена как "light".
// toggleTheme — функция, которая переключает тему между "light" и "dark".
//  Это делается с помощью функции setTheme, которая обновляет состояние.
// Внутри компонента создается ThemeContext.
// Provider, который передает значения theme и toggleTheme через контекст всем дочерним компонентам.
// value={{ theme, toggleTheme }} — это объект, который передается всем компонентам, использующим контекст.
