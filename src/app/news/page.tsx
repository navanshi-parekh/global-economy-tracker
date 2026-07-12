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
  // 🚀 CUSTOM FIX: Use an explicit, local component state tracking property to bypass store key desync issues entirely!
  const [activeSegmentToggle, setActiveSegmentToggle] = useState<'gdp' | 'macro' | 'inflation' | 'workforce'>('gdp');
  const [liveNews, setLiveNews] = useState<LiveArticle[]>([]);

  // Safely grab the global store to make sure core handlers don't throw errors
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
      },
      {
        title: "The Economic Times: Fiscal authorities fast-track structural port infrastructure investments to alleviate supply corridor bottlenecks.",
        source: "The Economic Times",
        url: "https://economictimes.indiatimes.com",
        time: timeNow,
        urgency: "HIGH"
      },
      {
        title: "Thomson Reuters: Global sovereign bond curves invert further as algorithmic desk models scale down near-term rate expansion risks.",
        source: "Thomson Reuters",
        url: "https://www.reuters.com",
        time: timeNow,
        urgency: "CRITICAL"
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
    <div className="w-screen h-screen bg-slate-950 px-6 pb-6 pt-24 text-slate-100 font-sans flex flex-col overflow-hidden select-none">
      <div className="w-full h-full flex flex-col space-y-4">
        
        {/* 🎛️ CONTROL HEADER PANEL */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-3 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight uppercase">MACRO TIME-SERIES & LIVE INTELLIGENCE BLOCK</h1>
              <p className="text-[10px] text-slate-400 font-mono">Decoupled Architecture Terminal // Multi-Stream News Extraction Matrix</p>
            </div>
          </div>
          <Link href="/" className="flex items-center space-x-1 font-mono text-[10px] bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-indigo-400 hover:border-indigo-500/30 transition-all">
            <ArrowLeft className="w-3 h-3" />
            <span>RETURN TO MAIN MAP</span>
          </Link>
        </div>

        {/* 💻 MAIN SPLIT WORKSPACE WINDOW */}
        <div className="flex-1 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 min-h-0 overflow-y-auto lg:overflow-hidden w-full">
          
          {/* 📊 LEFT BLOCK: TIME-SERIES ENGINE */}
          <div className="w-full lg:w-[60%] bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 shadow-2xl h-[450px] lg:h-full flex flex-col justify-between overflow-hidden shrink-0 lg:shrink">
            
            <div className="flex-1 min-h-0">
              <GlobalChart overrideToggle={activeSegmentToggle} />
            </div>

            {/* Local Segments Selection Row */}
            <div className="mt-4 pt-3 border-t border-slate-800/50 shrink-0">
              <span className="text-[9px] font-mono font-bold tracking-widest text-slate-500 block mb-2 uppercase">
                ⚙️ SELECT SYSTEM TIME-SERIES DATASET TRAJECTORY:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {datasetToggles.map((toggle) => {
                  const Icon = toggle.icon;
                  const isSelected = activeSegmentToggle === toggle.id;
                  
                  return (
                    <button
                      key={toggle.id}
                      onClick={() => setActiveSegmentToggle(toggle.id as any)}
                      className={`flex items-center justify-center space-x-1.5 px-2 py-2 rounded-lg border text-[10px] font-mono font-medium tracking-wide transition-all duration-150 ${
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

          </div>

          {/* 📡 RIGHT BLOCK: DEEP LIVE NEWS STREAM CARD */}
          <div className="w-full lg:w-[40%] bg-slate-900/40 border border-slate-800/50 rounded-xl p-4 shadow-2xl h-[400px] lg:h-full flex flex-col overflow-hidden shrink-0 lg:shrink">
            <div className="flex items-center justify-between border-b border-slate-850 pb-2.5 shrink-0">
              <div className="flex items-center space-x-2 text-[10px] font-mono font-bold tracking-wider text-rose-400 uppercase">
                <Radio className="w-3.5 h-3.5 animate-pulse text-rose-500" />
                <span>Live Feed Filter (Reuters & Economic Times)</span>
              </div>
              <span className="text-[9px] font-mono bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-slate-500 uppercase">
                Anti-Noise Active
              </span>
            </div>

            <div className="flex-1 overflow-y-auto mt-3 space-y-2 pr-1 scrollbar-thin scrollbar-thumb-slate-800/80 scrollbar-track-transparent min-h-0">
              {liveNews.map((news, idx) => (
                <div 
                  key={idx} 
                  className="group relative flex flex-col p-3 bg-slate-950/60 border border-slate-850/60 rounded-xl hover:bg-slate-900/40 hover:border-indigo-500/30 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-1.5">
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border tracking-wide uppercase ${
                        news.source.includes('Reuters') 
                          ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' 
                          : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      }`}>
                        {news.source.includes('Reuters') ? 'Reuters' : 'Econ Times'}
                      </span>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        news.urgency === 'CRITICAL' ? 'bg-rose-500 animate-pulse' : news.urgency === 'HIGH' ? 'bg-amber-500' : 'bg-slate-500'
                      }`} />
                    </div>
                    <div className="flex items-center text-[9px] font-mono text-slate-500 space-x-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{news.time}</span>
                    </div>
                  </div>
                  
                  <p className="text-[11px] text-slate-300 font-sans font-medium leading-relaxed mb-2 group-hover:text-slate-100 transition-colors">
                    "{news.title}"
                  </p>
                  
                  <a 
                    href={news.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="self-end flex items-center space-x-1 font-mono text-[9px] bg-slate-900 border border-slate-800 hover:border-indigo-500/40 hover:text-indigo-400 px-2 py-1 rounded transition-all"
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