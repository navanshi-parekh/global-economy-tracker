import React from 'react';
import './globals.css';
import { Inter } from 'next/font-family'; // Or your baseline font config

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
      {/* 🔓 REMOVED h-screen LOCKS: Allowed body framework to naturally stretch h-auto */}
      <body className="h-auto min-h-screen bg-[#05070c] antialiased text-slate-100 overflow-x-hidden overflow-y-auto selection:bg-indigo-500/30">
        <main className="w-full h-auto min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}