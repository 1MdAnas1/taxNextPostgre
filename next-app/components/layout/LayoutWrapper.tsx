'use client';

import { usePathname } from 'next/navigation';
import TopBar from './TopBar';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout = ['/login'].includes(pathname);
  
  if (hideLayout) {
    return <>
    {/* <TopBar/> */}
    {children}
    {/* <Footer/> */}
    </>;
  }

  return (
    <>
      <TopBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}