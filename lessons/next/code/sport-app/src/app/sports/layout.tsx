import Link from "next/link";

export default function SportsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className='flex justify-start gap-8 px-50'>
        <Link href={'/sports/football'} className='hover:text-amber-300'>
          Football
        </Link>
        <Link href={'/sports/tennis'} className='hover:text-amber-300'>
          Tennis
        </Link>
        <Link href={'/sports/swimming'} className='hover:text-amber-300'>
          Swimming
        </Link>
      </nav>
      {children}
    </>
  );
}