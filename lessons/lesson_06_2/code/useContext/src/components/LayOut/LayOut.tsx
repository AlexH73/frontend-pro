import { useEffect, type JSX } from 'react';
import NavBar from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useTheme } from '../themeContext/useTheme';
import styles from './LayOut.module.css';

export default function LayOut(): JSX.Element {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={styles.layout}>
      <NavBar />
      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
