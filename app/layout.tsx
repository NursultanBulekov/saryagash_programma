import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Techservice — Компьютерная помощь в Сарыагаше',
  description: 'Установка Windows и Office, ускорение ПК и обслуживание компьютеров в Сарыагаше.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
