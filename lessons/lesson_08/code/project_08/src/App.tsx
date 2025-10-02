import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import UserList from "./components/UserList/UserList";
import CommentList from "./components/CommentList/CommentList";
import UserDetails from "./components/UserDetails/UserDetails";
import CommentDetails from "./components/CommentDetails/CommentDetails";
import PostsList from "./components/PostsList/PostsList";
import PostDetails from "./components/PostDetails/PostDetails";
import { createContext, useContext, type Dispatch } from "react";

// 1. Типизация и создание контекста (данный этап мог быть реализован в отдельном файле)
export interface IThemeContext {
  theme: "light" | "dark";
  setTheme: Dispatch<React.SetStateAction<"light" | "dark">>;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: "light",
  setTheme: () => {},
});

// SPA - Single Page Application
function App() {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const newTheme = isDark ? "light" : "dark";

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Домашняя страница
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Пользователи
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/comments">
                Комментарии
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/posts">
                Посты
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-info"
                onClick={() => setTheme(newTheme)}
              >
                Сменить тему на: {newTheme}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<div>Добро пожаловать на сайт!</div>} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/comments" element={<CommentList />} />
        <Route path="/comment/:commentId" element={<CommentDetails />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
      </Routes>
      {/* <UserList /> */}
    </>
  );
}

export default App;
