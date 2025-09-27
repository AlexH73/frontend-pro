import { Link, Route, Routes } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
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
import { useScrollEffect } from "./hooks/useScrollEffect";
import { useState, useEffect } from "react";
import UserDetails from "./pages/Users/UserDetails";
import CommentDetails from "./pages/Comments/CommentDetails";
import PostDetails from "./pages/Posts/PostDetails";

function App() {
  const scrolled = useScrollEffect();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDark));
    document.body.classList.toggle("dark-theme", isDark);
    document.body.classList.toggle("light-theme", !isDark);
  }, [isDark]);

  const navbarVariant = isDark ? "light" : "dark";
  const navbarBg = isDark ? "light" : "dark";

  return (
    <div className={isDark ? "dark-mode" : "light-mode"}>
      <Navbar
        bg={navbarBg}
        variant={navbarVariant}
        expand="lg"
        sticky="top"
        className={`navbar-sticky ${scrolled ? "scrolled" : ""}`}
      >
        <Container fluid="md">
          <Navbar.Brand as={Link} to="/" className="brand-container">
            <img
              src="/logo.svg"
              alt="JSONPlaceholder Demo"
              height="30"
              className="me-2 brand-logo"
            />
            <span className="brand-text d-none d-xl-inline">
              JSONPlaceholder Demo
            </span>
            <span className="brand-text d-xl-none">JPDemo</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/" className="nav-link-custom">
                <FaHome className="me-1" />
                Главная
              </Nav.Link>
              <Nav.Link as={Link} to="/users" className="nav-link-custom">
                <FaUsers className="me-1" />
                Пользователи
              </Nav.Link>
              <Nav.Link as={Link} to="/posts" className="nav-link-custom">
                <FaFileAlt className="me-1" />
                Посты
              </Nav.Link>
              <Nav.Link as={Link} to="/comments" className="nav-link-custom">
                <FaComments className="me-1" />
                Комментарии
              </Nav.Link>
              <Nav.Link as={Link} to="/albums" className="nav-link-custom">
                <FaImages className="me-1" />
                Альбомы
              </Nav.Link>
              <Nav.Link as={Link} to="/photos" className="nav-link-custom">
                <FaPhotoVideo className="me-1" />
                Фото
              </Nav.Link>
              <Nav.Link as={Link} to="/todos" className="nav-link-custom">
                <FaCheckSquare className="me-1" />
                Задачи
              </Nav.Link>
            </Nav>

            {/* Переключатель темы в правом углу */}
            <div className="theme-toggle-container">
              <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/comments/:id" element={<CommentDetails />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
