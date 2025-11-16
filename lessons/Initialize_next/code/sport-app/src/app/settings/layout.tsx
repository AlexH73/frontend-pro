import Link from "next/link";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className='flex justify-start gap-8'>
        <Link href={'/settings/user'}>User settings</Link>
        <Link href={'/settings/organization'}>User organization</Link>
      </nav>
      {children}
    </>
  );
}
