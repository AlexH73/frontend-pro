import type { JSX } from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='min-h-screen flex flex-col bg-gray-100 '>
      <NavBar />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
}
