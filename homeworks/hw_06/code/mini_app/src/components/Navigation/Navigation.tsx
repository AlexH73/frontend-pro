import { Link } from "react-router-dom";
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
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useMobileMenu } from "../../hooks/useMobileMenu";
import "./Navigation.css";

interface NavigationProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  scrolled: boolean;
}

const Navigation = ({ isDark, setIsDark, scrolled }: NavigationProps) => {
  const { isMenuOpen, toggleMenu, closeMenu, menuRef, toggleRef } =
    useMobileMenu();

  const navbarVariant = isDark ? "light" : "dark";
  const navbarBg = isDark ? "light" : "dark";

  return (
    <>
      <Navbar
        bg={navbarBg}
        variant={navbarVariant}
        expand="lg"
        sticky="top"
        expanded={isMenuOpen}
        onToggle={toggleMenu}
        className={`navigation ${scrolled ? "scrolled" : ""}`}
        ref={menuRef}
      >
        <Container fluid="md">
          {/* Бренд */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="brand-container"
            onClick={closeMenu}
          >
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

          {/* Переключатель темы */}
          {/* <div>
            <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
          </div> */}

          {/* Кнопка бургера для мобильных */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            ref={toggleRef}
            className="navigation-toggle"
          >
            <span className="navbar-toggler-text">
              {isMenuOpen ? "Закрыть" : "Меню"}
            </span>
          </Navbar.Toggle>

          {/* Навигационное меню */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link
                as={Link}
                to="/"
                className="nav-link-custom"
                onClick={closeMenu}
              >
                <FaHome className="nav-icon" />
                Главная
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/users"
                className="nav-link-custom"
                onClick={closeMenu}
              >
                <FaUsers className="nav-icon" />
                Пользователи
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/posts"
                className="nav-link-custom"
                onClick={closeMenu}
              >
                <FaFileAlt className="nav-icon" />
                Посты
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/comments"
                className="nav-link-custom"
                onClick={closeMenu}
              >
                <FaComments className="nav-icon" />
                Комментарии
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/albums"
                className="nav-link-custom"
                onClick={closeMenu}
              >
                <FaImages className="nav-icon" />
                Альбомы
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/photos"
                className="nav-link-custom"
                onClick={closeMenu}
              >
                <FaPhotoVideo className="nav-icon" />
                Фото
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/todos"
                className="nav-link-custom"
                onClick={closeMenu}
              >
                <FaCheckSquare className="nav-icon" />
                Задачи
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
      </Navbar>

      {/* Оверлей для мобильного меню */}
      {isMenuOpen && <div className="navigation-overlay" onClick={closeMenu} />}
    </>
  );
};

export default Navigation;
