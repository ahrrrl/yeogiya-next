import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'YEOGIYA',
  description:
    '프로포즈, 웨딩, 돌잔치 등 특별한 순간을 위한 공간 예약 및 문화생활 공간 제공 플랫폼',
  keywords: '프로포즈, 웨딩, 돌잔치, 공간 예약, 문화생활',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
