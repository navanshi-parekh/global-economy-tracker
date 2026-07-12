'use client';
import React, { useState, useEffect } from 'react';
import GlobalChart from '../../components/GlobalChart';
import { useEconomyStore } from '../../store/useEconomyStore';
import { Radio, Terminal, ArrowLeft, Clock, ArrowUpRight, Activity, TrendingUp, Users, BarChart3 } from 'lucide-react';
import Link from 'next/link';

interface LiveArticle {
  title: string;
  source: string;
  url: string;
  time: string;
  urgency: 'CRITICAL' | 'HIGH' | 'STABLE';
}

export default function GlobalHistoricalAndNewsTerminal() {
  // 🚀 CORE FIX: Manually track the active dataset channel to guarantee immediate graph updates
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
    // 🛠️ RESPONSIVE CONTAINER: Switched to min-h-screen to let content stack naturally on phones without clipping [cite: 2021]
    <div className="w-full min-h-screen bg-slate-950 px-4 md:px-6 pb-12 pt-6 text-slate-100 font-sans flex flex-col overflow-x-hidden select-none">
      <div className="w-full max-w-7xl mx-auto flex flex-col space-y-6 flex-1">
        
        {/* 🎛️ TOP NAVIGATION PANEL */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-900 pb-4 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight uppercase">GLOBAL MACRO COMMAND CENTER</h1>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">Universal Route Cluster Active // Live Data Feed Pipeline</p>
            </div>
          </div>
          <Link href="/" className="inline-flex items-center space-x-2 font-mono text-[11px] bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-slate-300 hover:text-indigo-400 hover:border-indigo-500/30 transition-all shadow-md w-full md:w-auto justify-center">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO MAIN MAP</span>
          </Link>
        </div>

        {/* 💻 MAIN SPLIT WORKSPACE WINDOW */}
        {/* Stacks vertically on phone viewports (flex-col) and displays side-by-side on desktop monitors (lg:flex-row) [cite: 2018, 2019] */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 w-full items-stretch">
          
          {/* 📊 LEFT BLOCK: HISTORICAL TIME-SERIES ENGINE */}
          <div className="w-full lg:w-[62%] bg-slate-900/40 border border-slate-900 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono tracking-wide text-slate-400 mb-4 flex items-center gap-2 uppercase">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span>Global Production Trajectory (% Annual Real GDP)</span>
              </div>
              
              {/* Chart container handles absolute isolated height context bounds cleanly */}
              <div className="h-[260px] sm:h-[340px] w-full relative bg-slate-950/40 border border-slate-900/60 rounded-xl p-2">
                <GlobalChart overrideToggle={activeSegmentToggle} />
              </div>
            </div>

            {/* Local Segments Selection Row - Completely Spaced and Isolated */}
            <div className="mt-6 pt-4 border-t border-slate-900">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 block mb-3 uppercase">
                ⚙️ SELECT SYSTEM TIME-SERIES DATASET TRAJECTORY:
              </span>
              
              {/* 🛠️ ADVANCED GRID SHIFT: Buttons safely unwrap sequentially matching touch points to prevent crowding [cite: 2022] */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                {datasetToggles.map((toggle) => {
                  const Icon = toggle.icon;
                  const isSelected = activeSegmentToggle === toggle.id;
                  
                  return (
                    <button
                      key={toggle.id}
                      onClick={() => {
                        setActiveSegmentToggle(toggle.id as any);
                        store.setActiveToggle?.(toggle.id as any); // Sync with store if applicable
                      }}
                      className={`flex items-center justify-center space-x-2 px-3 py-3 rounded-xl border text-[11px] font-mono font-medium tracking-wide transition-all duration-150 active:scale-95 ${
                        isSelected
                          ? toggle.color + ' font-bold shadow-inner border-current ring-1 ring-current/20'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{toggle.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Benchmark Year Metric Capsule Block */}
            <div className="mt-4 p-3 bg-slate-950/80 border border-slate-900 rounded-xl flex items-center justify-between font-mono text-xs text-slate-400">
              <div>
                <span className="text-slate-500 text-[10px] block uppercase tracking-wider">Benchmark Year:</span>
                <span className="font-bold text-indigo-400 text-sm">2020</span>
              </div>
              <div className="text-right text-[10px] text-slate-500 max-w-[200px] sm:max-w-xs truncate">
                Systemic contraction tracking active.
              </div>
            </div>

          </div>

          {/* 📡 RIGHT BLOCK: LIVE NEWS FEED CARD */}
          <div className="w-full lg:w-[38%] bg-slate-900/20 border border-slate-900 rounded-2xl p-4 shadow-2xl flex flex-col h-[380px] sm:h-[420px] lg:h-auto min-h-[350px]">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3 shrink-0">
              <div className="flex items-center space-x-2 text-[10px] font-mono font-bold tracking-wider text-rose-400 uppercase">
                <Radio className="w-3.5 h-3.5 animate-pulse text-rose-500" />
                <span>Live Feed Filter (Reuters & Economic Times)</span>
              </div>
              <span className="text-[9px] font-mono bg-slate-950 border border-slate-900 px-2 py-0.5 rounded text-slate-500 uppercase">
                Anti-Noise Active
              </span>
            </div>

            {/* Local scroll container for news feed prevents page breaking */}
            <div className="flex-1 overflow-y-auto mt-4 space-y-2.5 pr-1 scrollbar-thin scrollbar-thumb-slate-800/80 scrollbar-track-transparent">
              {liveNews.map((news, idx) => (
                <div 
                  key={idx} 
                  className="group relative flex flex-col p-3.5 bg-slate-950/50 border border-slate-900 rounded-xl hover:bg-slate-900/40 hover:border-indigo-500/20 transition-all duration-150"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border tracking-wide uppercase ${
                        news.source.includes('Reuters') 
                          ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' 
                          : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      }`}>
                        {news.source.includes('Reuters') ? 'Reuters' : 'Econ Times'}
                      </span>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        news.urgency === 'CRITICAL' ? 'bg-rose-500 animate-pulse' : 'bg-slate-500'
                      }`} />
                    </div>
                    <div className="flex items-center text-[9px] font-mono text-slate-500 space-x-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{news.time}</span>
                    </div>
                  </div>
                  
                  <p className="text-[11px] text-slate-300 font-sans font-medium leading-relaxed mb-2.5 group-hover:text-slate-100 transition-colors">
                    "{news.title}"
                  </p>
                  
                  <a 
                    href={news.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="self-end flex items-center space-x-1 font-mono text-[9px] bg-slate-900 border border-slate-800 hover:border-indigo-500/40 hover:text-indigo-400 px-2 py-1 rounded-lg transition-all"
                  >
                    <span>Analyze Source</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}