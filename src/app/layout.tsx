import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google'; // 🔓 FIXED: Changed from 'next/font-family' to 'next/font/google'

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Global Macro Command Center',
  description: 'Planetary Macroeconomic Telemetry System Engine Layout',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-auto min-h-screen bg-[#05070c]">
      <body className={`${inter.className} h-auto min-h-screen bg-[#05070c] antialiased text-slate-100 overflow-x-hidden overflow-y-auto`}>
        <main className="w-full h-auto min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}