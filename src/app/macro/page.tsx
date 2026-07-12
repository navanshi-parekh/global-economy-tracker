'use client';
import React from 'react';
import { useEconomyStore } from '../../store/useEconomyStore'; // 🚀 PATH FIX: Direct relative navigation out of app/macro into store
import EconomicMap from '../../components/EconomicMap';
import AIAnalysisPanel from '../../components/AIAnalysisPanel';
import Link from 'next/link';
import { ArrowLeft, Landmark, Globe } from 'lucide-react';

export default function MacroHealthPage() {
  const store = useEconomyStore() as any; 
  
  const activeCountry = store.activeCountry;
  const globalDataCache = store.globalDataCache || {};

  let currentScore = 60;
  if (activeCountry) {
    const codeKey = typeof activeCountry === 'string' 
      ? activeCountry.toUpperCase() 
      : (activeCountry.code || activeCountry.id || "").toUpperCase();

    if (codeKey && globalDataCache[codeKey]) {
      const cachedEntry = globalDataCache[codeKey];
      currentScore = cachedEntry.healthScore ?? cachedEntry.score ?? 60;
    }
  }

  return (
    <div className="w-screen h-screen bg-slate-950 text-slate-100 font-sans flex flex-col overflow-hidden relative select-none">
      
      {/* HEADER BAR TRACK */}
      <div className="w-full bg-slate-900/40 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex justify-between items-center absolute top-0 left-0 z-40">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight uppercase flex items-center space-x-2">
              <span>MACROECONOMIC HEALTH ANALYTICS PLATFORM</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">Sovereign Debt Metrics // Structural Imbalance Aggregations</p>
          </div>
        </div>

        <Link href="/" className="flex items-center space-x-1.5 font-mono text-xs bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-slate-300 hover:text-indigo-400 hover:border-indigo-500/30 transition-all">
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO PORTAL</span>
        </Link>
      </div>

      {/* HEATMAP LENS CANVAS ENVIRONMENT */}
      <div className="flex-1 w-full h-full pt-20 relative z-10 bg-slate-950 flex items-center justify-center">
        <div className="w-[90vw] h-[75vh] bg-slate-900/20 border border-slate-800/40 rounded-2xl shadow-3xl p-4 overflow-hidden flex items-center justify-center">
          <EconomicMap />
        </div>
      </div>

      {/* SLIDING CONTEXT INTEL DRAWER PANEL CONTAINER */}
      <AIAnalysisPanel />

      {/* LOWER NOTIFICATION BAR WIDGET */}
      <div className="absolute bottom-4 left-6 z-40 bg-slate-900/80 border border-slate-800 backdrop-blur-md px-4 py-2.5 rounded-xl max-w-sm shadow-xl flex items-center space-x-3 text-[11px] font-mono font-medium text-slate-400">
        <Globe className="w-4 h-4 text-emerald-400 animate-spin-slow shrink-0" />
        <span>Click on any country element to view localized economic health indices.</span>
      </div>

    </div>
  );
}