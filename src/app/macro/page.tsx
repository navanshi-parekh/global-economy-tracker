'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// 🔓 FIXED: Swapped out broken relative paths for ironclad absolute root path alias
import EconomicMap from '../../components/EconomicMap';
import { useEconomyStore } from '../../store/useEconomyStore';
import { Map, Activity, TrendingUp, Terminal, Radio } from 'lucide-react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeMetric, setActiveMetric] = useState<string>('macro');

  // Prevent server-side hydration time desync errors
  useEffect(() => {
    setMounted(true);
  }, []);

  // Broadcast store transitions onto the Document node element 
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-macro-metric', activeMetric || 'gdp');
      window.dispatchEvent(new CustomEvent('macroMetricChange', { detail: activeMetric }));
    }
  }, [activeMetric, mounted]);

  const navigationButtons = [
    { 
      id: 'gdp', 
      label: 'Main Map', 
      icon: Map, 
      color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' 
    },
    { 
      id: 'macro', 
      label: 'Macro Health', 
      icon: Activity, 
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' 
    },
    { 
      id: 'inflation', 
      label: 'Inflation Matrix', 
      icon: TrendingUp, 
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' 
    }
  ];

  if (!mounted) {
    return <div className="min-h-screen w-full bg-[#05070c]" />;
  }

  return (
    <div className="h-auto min-h-screen w-full bg-[#05070c] text-slate-100 font-mono p-4 md:p-6 lg:p-8 flex flex-col space-y-6 overflow-y-auto overflow-x-hidden">
      
      {/* 🎛️ COMMAND PANEL */}
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between border border-slate-800 bg-slate-950/60 rounded-xl p-4 gap-4 backdrop-blur-md">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 font-bold tracking-widest text-sm uppercase">
            <Radio className="w-4 h-4 animate-pulse text-indigo-500" />
            <span>Universal Cluster Portal</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black mt-1 text-white tracking-tight">
            GLOBAL MACRO COMMAND CENTER
          </h1>
        </div>
      </div>

      {/* 🧭 NAVIGATION INTERACTION MENU */}
      <div className="w-full border border-slate-800 bg-slate-950/40 rounded-xl p-4 space-y-3">
        <label className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
          🚀 Select Active Telemetry Layer:
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {navigationButtons.map((btn) => {
            const Icon = btn.icon;
            const isSelected = activeMetric === btn.id;
            
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => setActiveMetric(btn.id as any)}
                className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border text-xs font-bold font-mono tracking-wide transition-all duration-150 ${
                  isSelected
                    ? btn.color + ' border-current shadow-md scale-[1.02]'
                    : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{btn.label}</span>
              </button>
            );
          })}

          <Link
            href="/news"
            className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 hover:bg-indigo-500/10 hover:text-white hover:border-indigo-500/60 transition-all font-bold text-xs shadow-sm group"
          >
            <Terminal className="w-4 h-4 text-indigo-500 group-hover:animate-pulse" />
            <span>Financial Terminal</span>
          </Link>
        </div>
      </div>

      {/* 🗺️ INTERACTIVE MAP ENGINE MATRIX */}
      <div className="w-full flex-grow border border-slate-800 bg-slate-950/20 rounded-xl p-4 flex items-center justify-center min-h-[450px] lg:min-h-[600px] relative overflow-hidden">
        <EconomicMap />
      </div>

    </div>
  );
}