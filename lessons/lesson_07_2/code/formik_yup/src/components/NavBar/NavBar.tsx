import { type JSX, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../hooks/themeContext/useTheme';
import styles from './NavBar.module.css';

export default function NavBar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const mainLinks = [
    { to: 'home', label: '🏠 Home' },
    { to: 'products', label: '🛍️ Products' },
    { to: 'carshop', label: '🚗 Car Shop' },
  ];

  const demoLinks = [
    { to: 'alcohol', label: '🥂 Alcohol' },
    { to: 'counter', label: '💸 Counter' },
    { to: 'playground', label: '⏲ Playground' },
    { to: 'userspage', label: '👨🏻‍💼 Users Page' },
    { to: 'randomdog', label: '🐕‍🦺 Random Dog' },
    { to: 'sandwich', label: '🥪 Sandwich' },
    { to: 'forms-demo', label: '📋 Forms Demo' },
    { to: 'todo', label: '✅ Todo List' },
    { to: 'products-manager', label: '🛠️ Products Manager' },
  ];

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark ${styles.navigation} ${
        theme === 'dark' ? styles.dark : ''
      }`}
    >
      <div className='container'>
        {/* Brand/Logo */}
        <NavLink to='home' className='navbar-brand fw-bold' onClick={closeMenu}>
          <span className={styles.brand}>MyReact</span>
        </NavLink>

        {/* Burger button */}
        <button
          className={`navbar-toggler ${isMenuOpen ? '' : 'collapsed'}`}
          type='button'
          onClick={toggleMenu}
          aria-controls='navbarNav'
          aria-expanded={isMenuOpen}
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        {/* Navigation items */}
        <div
          className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}
          id='navbarNav'
        >
          <ul className='navbar-nav me-auto'>
            {/* Основные ссылки */}
            {mainLinks.map((item) => (
              <li key={item.to} className='nav-item'>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-link ${styles.link} ${isActive ? styles.active : ''}`
                  }
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}

            {/* Выпадающее меню Demos */}
            <li className='nav-item dropdown'>
              <a
                className={`nav-link dropdown-toggle ${styles.link}`}
                href='#'
                id='navbarDropdown'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                🎮 Demos
              </a>
              <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                {demoLinks.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className='dropdown-item'
                      onClick={closeMenu}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          {/* Theme Toggle Switch */}
          <div className='d-flex align-items-center'>
            <div className={`form-check form-switch ${styles.themeSwitch}`}>
              <input
                className='form-check-input'
                type='checkbox'
                id='themeSwitch'
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <label className='form-check-label' htmlFor='themeSwitch'>
                <i
                  className={`bi ${
                    theme === 'dark' ? 'bi-moon-fill' : 'bi-sun-fill'
                  } ${styles.themeIcon}`}
                ></i>
                <span className={styles.themeText}>
                  {theme === 'dark' ? 'Dark' : 'Light'}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
