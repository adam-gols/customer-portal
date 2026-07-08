import type { Metadata } from 'next';
import { Orbitron, Oswald, Roboto } from 'next/font/google';
import '@/styles/brand.css';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-orbitron',
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-oswald',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'GOLS Connect',
  description: 'Customer portal for GOLS orders, items, and purchases.',
  icons: {
    icon: '/brand/logos/gols-logo-primary-red.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${oswald.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
