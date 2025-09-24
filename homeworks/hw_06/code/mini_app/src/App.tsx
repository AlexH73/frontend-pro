import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            JSONPlaceholder Demo
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Главная
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Пользователи
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/posts">
                  Посты
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/comments">
                  Комментарии
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/albums">
                  Альбомы
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/photos">
                  Фото
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/todos">
                  Задачи
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
