'use client';
import React, { useState, useEffect } from 'react';
import EconomicMap from '../components/EconomicMap';
import AIAnalysisPanel from '../components/AIAnalysisPanel';
import { Terminal, Globe, Activity, TrendingUp, Newspaper, Zap } from 'lucide-react';
import Link from 'next/link';

export default function GlobalMacroCommandCenter() {
  const [showIntro, setShowIntro] = useState(true);
  const [isPreCaching, setIsPreCaching] = useState(true);
  
  // 🚀 Local state selector toggle
  const [activeToggle, setActiveToggle] = useState<'gdp' | 'macro' | 'inflation'>('gdp');

  useEffect(() => {
    // Cinematic Splash Entry Expiration Timer
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 2200);

    // Background caching simulator to mimic live endpoint hydration
    const cacheTimer = setTimeout(() => {
      setIsPreCaching(false);
    }, 3500);

    return () => {
      clearTimeout(introTimer);
      clearTimeout(cacheTimer);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans select-none">
      
      {/* 🌌 CINEMATIC INTRO OVERLAY */}
      {showIntro && (
        <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-6 animate-fade-out">
          <div className="max-w-md w-full border border-indigo-500/20 bg-slate-900/40 backdrop-blur p-6 rounded-2xl text-center space-y-3 shadow-2xl animate-scale-up">
            <div className="inline-flex p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400">
              <Terminal className="w-6 h-6 animate-pulse" />
            </div>
            <h2 className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">UNIVERSAL CLUSTER PORTAL</h2>
            <h1 className="text-lg font-black tracking-tight text-white uppercase">GLOBAL MACRO COMMAND CENTER</h1>
            <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden border border-slate-900 mt-2">
              <div className="bg-indigo-500 h-full w-full animate-loading-bar" />
            </div>
          </div>
        </div>
      )}

      {/* 🎛️ FLOATING OPERATION HUD CONTROL TERMINAL */}
      <header className="fixed top-4 left-4 right-4 z-40 flex flex-col md:flex-row bg-slate-950/85 backdrop-blur-md border border-slate-900 rounded-2xl p-4 gap-4 shadow-2xl max-w-7xl mx-auto transition-all">
        
        {/* Module Brand Section */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-[9px] font-mono font-bold tracking-widest text-indigo-400 uppercase leading-none mb-1">UNIVERSAL CLUSTER PORTAL</span>
            <h1 className="text-xs font-black tracking-tight uppercase leading-none text-slate-200">GLOBAL MACRO COMMAND CENTER</h1>
          </div>
        </div>

        {/* 🗺️ INTERACTIVE VIEW CONTROLLERS */}
        <nav className="grid grid-cols-1 sm:grid-cols-2 md:flex md:items-center flex-1 gap-2 md:justify-end w-full">
          
          <button 
            onClick={() => setActiveToggle('gdp')}
            className={`flex items-center space-x-2 px-3 py-2.5 md:py-2 rounded-xl border text-xs font-mono font-medium transition-all ${
              activeToggle === 'gdp'
                ? 'border-indigo-500/40 bg-indigo-500/10 text-indigo-400 font-bold shadow-inner'
                : 'border-slate-900 bg-slate-900/20 text-slate-400 hover:text-slate-200 hover:border-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Main Map</span>
          </button>

          <button 
            onClick={() => setActiveToggle('macro')}
            className={`flex items-center space-x-2 px-3 py-2.5 md:py-2 rounded-xl border text-xs font-mono font-medium transition-all ${
              activeToggle === 'macro'
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-bold shadow-inner'
                : 'border-slate-900 bg-slate-900/20 text-slate-400 hover:text-slate-200 hover:border-slate-800'
            }`}
          >
            <Activity className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Macro Health</span>
          </button>

          <button 
            onClick={() => setActiveToggle('inflation')}
            className={`flex items-center space-x-2 px-3 py-2.5 md:py-2 rounded-xl border text-xs font-mono font-medium transition-all ${
              activeToggle === 'inflation'
                ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400 font-bold shadow-inner'
                : 'border-slate-900 bg-slate-900/20 text-slate-400 hover:text-slate-200 hover:border-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Inflation Matrix</span>
          </button>

          {/* 🚀 THE FINANCIAL TERMINAL LINK */}
          <Link 
            href="/news"
            className="flex items-center space-x-2 px-3 py-2.5 md:py-2 rounded-xl border border-slate-900 bg-indigo-950/20 hover:bg-indigo-900/30 text-indigo-300 hover:text-indigo-200 hover:border-indigo-500/30 text-xs font-mono font-semibold transition-all shadow-md justify-center sm:justify-start"
          >
            <Newspaper className="w-3.5 h-3.5 shrink-0 text-indigo-400" />
            <span className="truncate">Financial Terminal</span>
          </Link>

        </nav>
      </header>

      {/* ⚡ PRE-CACHING HUD BADGE */}
      {isPreCaching && (
        <div className="fixed top-[260px] sm:top-24 left-4 z-30 animate-pulse">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-[9px] font-mono font-bold tracking-wide shadow-sm">
            <Zap className="w-2.5 h-2.5" />
            <span>Pre-caching global indicators...</span>
          </div>
        </div>
      )}

      {/* 🗺️ INTERACTIVE GEOGRAPHIC LAYER FRAME */}
      <main className="w-full min-h-screen pt-64 sm:pt-28 pb-6 flex items-center justify-center relative z-10 px-4">
        <div className="w-full max-w-7xl h-[50vh] sm:h-[70vh] flex items-center justify-center relative">
          
          {/* 🔌 🔌 FIXED: Passed the state toggle directly into the map wrapper component hook */}
          <EconomicMap currentMetric={activeToggle} />
          
        </div>
      </main>

      {/* 📢 COLLAPSIBLE LIVE NARRATIVE INTELLIGENCE DRAWERS */}
      <AIAnalysisPanel />

    </div>
  );
}