import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Navbar from '@/components/shared/Navbar';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Practica01 — Guía Frontend + Backend',
  description: 'Proyecto guía CRUD con Next.js y NestJS',
};

/**
 * Layout raíz: se aplica a TODAS las páginas.
 * Es el lugar correcto para poner elementos globales como la Navbar.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
