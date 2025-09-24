import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import Comments from "./pages/Comments/Comments";
import Posts from "./pages/Posts/Posts";
import Albums from "./pages/Albums/Albums";
import Photos from "./pages/Photos/Photos";
import Todos from "./pages/Todos/Todos";

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="/logo.svg"
              alt="JSONPlaceholder Demo"
              height="30"
              className="me-2"
            />
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
        <Route path="/posts" element={<Posts />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </>
  );
}

export default App;
