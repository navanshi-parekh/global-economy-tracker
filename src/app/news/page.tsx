'use client';
import React, { useState, useEffect } from 'react';
import GlobalChart from '../../components/GlobalChart';
import { useEconomyStore } from '../../store/useEconomyStore';
import { Radio, Terminal, ArrowLeft, Clock, Activity, TrendingUp, Users, BarChart3, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface LiveArticle {
  title: string;
  source: string;
  url: string;
  time: string;
  urgency: 'CRITICAL' | 'HIGH' | 'STABLE';
}

export default function GlobalHistoricalAndNewsTerminal() {
  const [activeSegmentToggle, setActiveSegmentToggle] = useState<'gdp' | 'macro' | 'inflation' | 'workforce'>('gdp');
  const [liveNews, setLiveNews] = useState<LiveArticle[]>([]);
  const store = useEconomyStore();

  useEffect(() => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLiveNews([
      {
        title: "Thomson Reuters: Global manufacturing indices face downward pressures as shipping lane container tariffs shift cross-border traffic.",
        source: "Thomson Reuters",
        url: "https://www.reuters.com/markets/macro",
        time: timeNow,
        urgency: "CRITICAL"
      },
      {
        title: "The Economic Times: Central bank considers strategic reserve policy tweaks as regional wholesale consumption indices print above expected bounds.",
        source: "The Economic Times",
        url: "https://economictimes.indiatimes.com/news/economy",
        time: timeNow,
        urgency: "HIGH"
      },
      {
        title: "Thomson Reuters: Institutional capital allocations accelerate toward safe-haven sovereign assets amid lingering commodity volatility metrics.",
        source: "Thomson Reuters",
        url: "https://www.reuters.com/markets",
        time: timeNow,
        urgency: "STABLE"
      }
    ]);
  }, []);

  const datasetToggles = [
    { id: 'gdp', label: 'Real GDP Output', icon: BarChart3, color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10' },
    { id: 'macro', label: 'Macro Health Index', icon: Activity, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { id: 'inflation', label: 'Inflation Risk (CPI)', icon: TrendingUp, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
    { id: 'workforce', label: 'Workforce Squeezes', icon: Users, color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10' }
  ];

  return (
    /* 🔓 FIX: Swapped out rigid viewport lock flags for min-h-screen and enabled dynamic overflow-y-auto to restore native phone scrolling instantly! */
    <div className="min-h-screen w-full bg-[#05070c] text-slate-100 font-mono p-4 md:p-6 lg:p-8 flex flex-col space-y-4 overflow-x-hidden overflow-y-auto">
      
      {/* 🎛️ CONTROL HEADER PANEL */}
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between border border-slate-800 bg-slate-950/60 rounded-xl p-4 gap-4 backdrop-blur-md">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 font-bold tracking-widest text-sm uppercase">
            <Radio className="w-4 h-4 animate-pulse text-rose-500" />
            <span>Global Macro Command Center</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black mt-1 text-white tracking-tight">
            MACRO TIME-SERIES & LIVE INTELLIGENCE
          </h1>
        </div>
        <Link 
          href="/"
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:text-white rounded-lg transition-all text-xs text-slate-400"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO MAIN MAP</span>
        </Link>
      </div>

      {/* 💻 MAIN RESPONSIVE WORKSPACE MATRIX */}
      <div className="w-full flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* 📊 LEFT COLUMN: TIME-SERIES GRAPH LAYER */}
        <div className="w-full lg:w-[60%] flex flex-col border border-slate-800 bg-slate-950/40 rounded-xl p-4 space-y-4">
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 tracking-wider uppercase flex items-center space-x-1">
              <span>⚙️ Select System Time-Series Dataset Trajectory:</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {datasetToggles.map((toggle) => {
                const Icon = toggle.icon;
                const isSelected = activeSegmentToggle === toggle.id;
                return (
                  <button
                    key={toggle.id}
                    onClick={() => setActiveSegmentToggle(toggle.id as any)}
                    className={`flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-lg border text-[11px] font-mono font-medium tracking-wide transition-all duration-150 ${
                      isSelected
                        ? toggle.color + ' font-bold shadow-inner border-current'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{toggle.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chart View Container */}
          <div className="w-full bg-slate-950/80 rounded-xl border border-slate-900/60 relative overflow-hidden h-[340px] sm:h-[420px] lg:h-[500px]">
            <GlobalChart overrideToggle={activeSegmentToggle} />
          </div>

          <div className="w-full p-3 rounded-lg bg-slate-950 border border-slate-900 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Benchmark Year Parameters:</span>
            <span className="text-indigo-400 font-bold bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">2020 Fixed Baseline</span>
          </div>
        </div>

        {/* 📰 RIGHT COLUMN: REAL-TIME STREAMING TERMINAL FEED */}
        <div className="w-full lg:w-[40%] flex flex-col border border-slate-800 bg-slate-950/40 rounded-xl p-4 space-y-4 min-h-[400px]">
          <div className="flex items-center justify-between border-b border-slate-900 pb-3">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-white tracking-wider uppercase">Live Feed Filter</h2>
            </div>
            <div className="flex items-center space-x-1 text-[10px] text-slate-500">
              <Clock className="w-3 h-3" />
              <span>Real-Time Ingestion Active</span>
            </div>
          </div>

          {/* Scrolling News Grid Box */}
          <div className="space-y-3 custom-scrollbar">
            {liveNews.map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3.5 bg-slate-950 border border-slate-900 hover:border-slate-800 rounded-xl transition-all group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                    {article.source}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono text-slate-500">{article.time}</span>
                    <span className={`text-[9px] font-black px-1.5 py-0.2 rounded ${
                      article.urgency === 'CRITICAL' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {article.urgency}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed group-hover:text-white transition-colors pr-4">
                  {article.title}
                </p>
                <ArrowUpRight className="absolute right-3 bottom-3 w-3 h-3 text-slate-600 group-hover:text-indigo-400 transition-colors" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}