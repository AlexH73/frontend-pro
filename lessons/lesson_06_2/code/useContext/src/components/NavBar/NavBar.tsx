import { type JSX } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

export default function NavBar(): JSX.Element {
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${styles.navigation}`}>
      <div className='container'>
        {/* Brand/Logo */}
        <NavLink to='home' className='navbar-brand fw-bold'>
          <span className={styles.brand}>MyReact</span>
        </NavLink>

        {/* Burger button */}
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        {/* Navigation items */}
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <NavLink
                to='home'
                className={({ isActive }) =>
                  `nav-link ${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='alcohol'
                className={({ isActive }) =>
                  `nav-link ${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Alcohol
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='carshop'
                className={({ isActive }) =>
                  `nav-link ${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Car Shop
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='counter'
                className={({ isActive }) =>
                  `nav-link ${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Counter
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='playground'
                className={({ isActive }) =>
                  `nav-link ${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Playground
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='userspage'
                className={({ isActive }) =>
                  `nav-link ${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Users Page
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='randomdog'
                className={({ isActive }) =>
                  `nav-link ${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Random Dog
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='sandwich'
                className={({ isActive }) =>
                  `nav-link ${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Sandwich
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='products'
                className={({ isActive }) =>
                  `nav-link ${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Products
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
