import './globals.css';
import Link from 'next/link';
import { Earth, Scale } from 'lucide-react';

export const metadata = {
  title: 'Global Macro Command Center',
  description: 'Real-time World Bank ingestion node',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 overflow-hidden w-screen h-screen antialiased">
        <header className="absolute top-6 left-6 right-6 z-40 flex justify-between items-center bg-slate-900/60 border border-slate-800/80 backdrop-blur-md p-4 rounded-xl shadow-xl">
          <div>
            <h1 className="text-sm font-bold tracking-wide flex items-center space-x-2">
              <Earth className="w-4 h-4 text-indigo-400 animate-spin-slow" />
              <span>GLOBAL MACRO COMMAND CENTER</span>
            </h1>
            <p className="text-[10px] font-mono text-slate-500">Universal Route Cluster Active</p>
          </div>
          
          <nav className="flex items-center space-x-3">
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-0.5 flex space-x-0.5 font-mono text-[10px]">
              <Link href="/" className="px-3 py-1 text-slate-400 hover:text-slate-200 transition-all rounded">
                🌐 Main Map
              </Link>
              <Link href="/macro" className="px-3 py-1 text-slate-400 hover:text-emerald-400 transition-all rounded">
                🏥 Macro Health
              </Link>
              <Link href="/inflation" className="px-3 py-1 text-slate-400 hover:text-cyan-400 transition-all rounded">
                💸 Inflation Matrix
              </Link>
              <Link href="/workforce" className="px-3 py-1 text-slate-400 hover:text-indigo-400 transition-all rounded">
                💼 Workforce
              </Link>
            </div>
          </nav>
        </header>

        <main className="w-full h-full">{children}</main>
      </body>
    </html>
  );
}