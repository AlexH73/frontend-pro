import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App, { ThemeContext } from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

const Root = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <StrictMode>
      {/* 0. Подключение маршрутизации */}
      <BrowserRouter>
        {/* 2. Передача контекста */}
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <App />
        </ThemeContext.Provider>
      </BrowserRouter>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
