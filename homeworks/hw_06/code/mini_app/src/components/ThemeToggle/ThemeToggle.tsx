import { FaSun, FaMoon } from "react-icons/fa";
import s from "./ThemeToggle.module.css";

interface ThemeToggleProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

const ThemeToggle = ({ isDark, setIsDark }: ThemeToggleProps) => {
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      className={`${s.theme_toggle_btn} ${isDark ? s.light : s.dark}`}
      onClick={toggleTheme}
      title={
        isDark ? "Переключить на светлую тему" : "Переключить на темную тему"
      }
      aria-label={
        isDark ? "Переключить на светлую тему" : "Переключить на темную тему"
      }
    >
      {isDark ? (
        <FaMoon className={s.theme_icon} />
      ) : (
        <FaSun className={s.theme_icon} />
      )}
      {/* <span
        className={`${s.theme_text} ${s.ms_2} ${s.d_none} ${s.d_md_inline}`}
      >
        {isDark ? "Тёмная" : "Светлая"}
      </span> */}
    </button>
  );
};

export default ThemeToggle;
