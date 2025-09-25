import { Link, Route, Routes } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaFileAlt,
  FaComments,
  FaImages,
  FaPhotoVideo,
  FaCheckSquare,
} from "react-icons/fa";
import "./App.css";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import Posts from "./pages/Posts/Posts";
import Comments from "./pages/Comments/Comments";
import Albums from "./pages/Albums/Albums";
import Photos from "./pages/Photos/Photos";
import Todos from "./pages/Todos/Todos";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import Footer from "./components/Footer/Footer";
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

          <ThemeToggle />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center" to="/">
                  <FaHome className="me-1" />
                  Главная
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center"
                  to="/users"
                >
                  <FaUsers className="me-1" />
                  Пользователи
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center"
                  to="/posts"
                >
                  <FaFileAlt className="me-1" />
                  Посты
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center"
                  to="/comments"
                >
                  <FaComments className="me-1" />
                  Комментарии
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center"
                  to="/albums"
                >
                  <FaImages className="me-1" />
                  Альбомы
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center"
                  to="/photos"
                >
                  <FaPhotoVideo className="me-1" />
                  Фото
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center"
                  to="/todos"
                >
                  <FaCheckSquare className="me-1" />
                  Задачи
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
