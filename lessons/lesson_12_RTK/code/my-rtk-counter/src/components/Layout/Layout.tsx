import { useEffect, type JSX } from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { selectTheme } from '../../features/theme/themeSlice';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  const theme = useSelector(selectTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300
      ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <Header />
      <NavBar />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
}
