import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Sport App',
  description: 'Cohort 59 crated this app to understand the concept of next js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className='flex justify-center items-center gap-6 min-h-12 sticky top-0 '>
          <Link href={'/'} className='hover:text-amber-300'>
            Home
          </Link>
          <Link href={'/about'} className='hover:text-amber-300'>
            About
          </Link>
          <Link href={'/settings'} className='hover:text-amber-300'>
            Settings
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
