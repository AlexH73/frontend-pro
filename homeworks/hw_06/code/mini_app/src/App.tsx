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
function App() {
  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className="navbar navbar-expand-lg navbar-dark bg-dark"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src="/logo.svg"
              alt="JSONPlaceholder Demo"
              height="30"
              className="me-2"
            />
            JSONPlaceholder Demo
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  <FaHome className="me-1" />
                  Главная
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  className="nav-link d-flex align-items-center"
                  to="/users"
                >
                  <FaUsers className="me-1" />
                  Пользователи
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  className="nav-link d-flex align-items-center"
                  to="/posts"
                >
                  <FaFileAlt className="me-1" />
                  Посты
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  className="nav-link d-flex align-items-center"
                  to="/comments"
                >
                  <FaComments className="me-1" />
                  Комментарии
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  className="nav-link d-flex align-items-center"
                  to="/albums"
                >
                  <FaImages className="me-1" />
                  Альбомы
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  className="nav-link d-flex align-items-center"
                  to="/photos"
                >
                  <FaPhotoVideo className="me-1" />
                  Фото
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  className="nav-link d-flex align-items-center"
                  to="/todos"
                >
                  <FaCheckSquare className="me-1" />
                  Задачи
                </Nav.Link>

                <ThemeToggle />
              </Nav>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Container>
      </Navbar>

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
