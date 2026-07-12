'use client';
import { useState, useEffect } from 'react';
import EconomicMap from '../components/EconomicMap';
import AIAnalysisPanel from '../components/AIAnalysisPanel';
import NavigationHeader from '../components/NavigationHeader'; // Ingest your top nav component
import { useEconomyStore } from '../store/useEconomyStore';

export default function HomeLandingPage() {
  const [showIntro, setShowIntro] = useState(true);
  const { setActiveGlobalToggle } = useEconomyStore();

  // ⏱️ Cinematic entry-point timer loop sequence
  useEffect(() => {
    setActiveGlobalToggle('macro');
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500); // Title stays for 2.5s before vanishing completely
    return () => clearTimeout(timer);
  }, [setActiveGlobalToggle]);

  return (
    <div className="relative w-screen h-screen bg-slate-950 overflow-hidden select-none">
      
      {/* 🌌 LAYER 3: CINEMATIC POP-UP TRANSITION SCREEN OVERLAY */}
      {showIntro && (
        <div className="absolute inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center transition-all duration-700 ease-in-out">
          <div className="border border-slate-800 bg-slate-900/40 p-8 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-xl animate-scale-up">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-indigo-400 block mb-2 uppercase">
              UNIVERSAL SYSTEM PORTAL
            </span>
            <h1 className="text-2xl font-black text-slate-100 tracking-tight font-sans">
              GLOBAL MACRO COMMAND CENTER
            </h1>
            <div className="mt-4 w-12 h-[2px] bg-indigo-500 mx-auto rounded animate-pulse" />
          </div>
        </div>
      )}

      {/* 🎛️ LAYER 2: FLOATING GLOBAL NAVIGATION CONTROL HEADER */}
      <NavigationHeader />

      {/* 🌍 LAYER 1: UNCOMPRESSED MAP FIELDS CLAIMING 100% VISIBLE SCREEN SPACE */}
      <div className="absolute inset-0 w-full h-full z-10 pt-20">
        <EconomicMap />
      </div>

      {/* 🔮 LAYER 2: AI SIDE DRAWER PROTOCOL */}
      <AIAnalysisPanel />
    </div>
  );
}