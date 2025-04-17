import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Footer from '@/components/Footer';
import NavBar from '@/components/Navbar';
import LandingPageBottomMenu from '@/components/LandingPageBottomMenu';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cooking Compass',
  description: 'Generated by ics-software-engineering.github.io',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const classString = `${inter.className} wrapper`;
  return (
    <html lang="en">
      <body className={classString}>
        <Providers>
          <NavBar />
          {children}
          <LandingPageBottomMenu />
        </Providers>
      </body>
    </html>
  );
}
