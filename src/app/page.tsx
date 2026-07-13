'use client';
import React, { useState } from 'react';
// Import only existing things (like lucide icons and Next.js links)
import { Map, Activity, TrendingUp, Terminal, Radio } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  // 1. Create a simple local view switcher state
  const [activeView, setActiveView] = useState<'map' | 'macro' | 'inflation'>('map');

  return (
    <div className="min-h-screen w-full bg-[#05070c] text-slate-100 font-mono p-4 flex flex-col space-y-6 overflow-y-auto overflow-x-hidden">
      
      {/* 🎛️ CONTROL PANEL HEADER */}
      <div className="w-full border border-slate-800 bg-slate-950/60 rounded-xl p-4">
        <h1 className="text-xl font-black text-white">GLOBAL MACRO COMMAND CENTER</h1>
      </div>

      {/* 🧭 NAVIGATION BUTTONS MAPPER */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* BUTTON 1: MAP VIEW */}
        <button
          onClick={() => setActiveView('map')}
          className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border text-xs font-bold transition-all ${
            activeView === 'map' ? 'text-blue-400 border-blue-500/30 bg-blue-500/10' : 'border-slate-800 text-slate-400'
          }`}
        >
          <Map className="w-4 h-4" />
          <span>Main Map</span>
        </button>

        {/* BUTTON 2: MACRO HEALTH VIEW */}
        <button
          onClick={() => setActiveView('macro')}
          className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border text-xs font-bold transition-all ${
            activeView === 'macro' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' : 'border-slate-800 text-slate-400'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Macro Health</span>
        </button>

        {/* BUTTON 3: INFLATION MATRIX VIEW */}
        <button
          onClick={() => setActiveView('inflation')}
          className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border text-xs font-bold transition-all ${
            activeView === 'inflation' ? 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' : 'border-slate-800 text-slate-400'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Inflation Matrix</span>
        </button>

        {/* LINK 4: ROUTE TO SEPARATE NEWS TERMINAL */}
        <Link
          href="/news"
          className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 hover:text-white transition-all text-xs font-bold"
        >
          <Terminal className="w-4 h-4" />
          <span>Financial Terminal</span>
        </Link>
      </div>

      {/* 🗺️ CONDITIONAL DISPLAY PANEL */}
      <div className="w-full flex-grow border border-slate-800 bg-slate-950/20 rounded-xl p-4">
        {activeView === 'map' && (
          <div>
            {/* ⚠️ PASTE YOUR EXISTING WORLD MAP SVG / MAP CODE HERE */}
            {/* This keeps your current map rendering exactly as it is now */}
            <p className="text-xs text-slate-500">World Map Active View Layer...</p>
          </div>
        )}

        {activeView === 'macro' && (
          <div>
            {/* ⚠️ PASTE YOUR EXISTING GRAPH / CHART SVG CODE HERE */}
            {/* This displays your time-series tracking stats when macro is clicked */}
            <p className="text-xs text-slate-500">Macro Health Time-Series Dataset...</p>
          </div>
        )}

        {activeView === 'inflation' && (
          <div>
            {/* ⚠️ PASTE YOUR INFLATION DETAILS OR DATA GRID HERE */}
            <p className="text-xs text-slate-500">Inflation Matrix Telemetry Stream...</p>
          </div>
        )}
      </div>

    </div>
  );
}