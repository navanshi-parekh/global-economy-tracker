'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Activity, TrendingUp, Users, Newspaper } from 'lucide-react';

export default function NavigationHeader() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Main Map', path: '/', icon: Globe },
    { name: 'Macro Health', path: '/macro', icon: Activity },
    { name: 'Inflation Matrix', path: '/inflation', icon: TrendingUp },
    { name: 'Workforce', path: '/workforce', icon: Users },
    { name: 'Financial Terminal', path: '/news', icon: Newspaper },
  ];

  return (
    <header className="absolute top-6 left-6 right-6 z-40 bg-slate-900/80 border border-slate-800 backdrop-blur-md px-6 py-3 rounded-xl flex items-center justify-between shadow-2xl">
      <div className="flex flex-col">
        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-indigo-400 uppercase">Universal Cluster Portal</span>
        <h1 className="text-sm font-black text-slate-100 tracking-tight">GLOBAL MACRO COMMAND CENTER</h1>
      </div>

      <nav className="flex items-center space-x-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 font-bold shadow-inner' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}