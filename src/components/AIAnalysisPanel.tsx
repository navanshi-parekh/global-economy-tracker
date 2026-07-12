'use client';
import React from 'react';
import { useEconomyStore } from '../store/useEconomyStore';
import { generateMacroAIReport } from '../utils/aiAnalysisEngine';
import { X, ShieldAlert, Cpu, BarChart3, Radio, Landmark } from 'lucide-react';

const countryNameMap: Record<string, string> = {
  USA: "United States",
  IND: "India",
  EGY: "Egypt",
  DEU: "Germany",
  FRA: "France",
  ITA: "Italy",
  ESP: "Spain",
  GBR: "United Kingdom",
  JPN: "Japan",
  CHN: "China",
  RUS: "Russia",
  BRA: "Brazil",
  CAN: "Canada",
  AUS: "Australia",
  ZAF: "South Africa",
};

export default function AIAnalysisPanel() {
  const store = useEconomyStore() as any;
  const activeCountry = store.activeCountry;
  const globalDataCache = store.globalDataCache || {};

  // 🛡️ Guard 1: Panel stays hidden if no country is selected
  if (!activeCountry) return null;

  // 🚀 THE ULTIMATE FIX: Cast activeCountry to any to completely shut down the 'never' type-checking errors
  const dynamicCountry = activeCountry as any;
  
  let countryCode = "";
  if (typeof dynamicCountry === 'string') {
    countryCode = dynamicCountry;
  } else if (typeof dynamicCountry === 'object' && dynamicCountry !== null) {
    countryCode = dynamicCountry.code || dynamicCountry.id || dynamicCountry.iso3 || dynamicCountry.properties?.ISO_A3 || "";
  }

  // 🛡️ Guard 2: Make sure we have a valid code string to look up parameters
  if (!countryCode || countryCode.length < 2) return null;
  
  countryCode = countryCode.toUpperCase();
  const resolvedName = countryNameMap[countryCode] || dynamicCountry.name || dynamicCountry.properties?.NAME || `Nation Cluster (${countryCode})`;

  const report = generateMacroAIReport(countryCode, resolvedName, globalDataCache);

  const marketIndexes = report?.marketIndexes || {
    interestRate: "N/A",
    liveCurrencyRate: "N/A",
    liveStockIndex: "N/A",
    currencyTrend: "N/A",
    riskPremium: "N/A"
  };

  const stockIndexText = marketIndexes.liveStockIndex || "N/A";

  return (
    <div className="absolute top-0 right-0 z-50 h-screen w-96 bg-slate-900/95 border-l border-slate-800 shadow-2xl backdrop-blur-md flex flex-col justify-between animate-slide-in select-none">
      
      {/* HEADER CONTROLS */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/45">
        <div className="flex items-center space-x-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
          <Cpu className="w-4 h-4 text-indigo-500" />
          <span>Macro Narrative Intelligence</span>
        </div>
        <button 
          onClick={() => store.setActiveCountry(null)}
          className="text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* CORE REPORT WORKSPACE BODY */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin">
        
        {/* IDENTIFIER IDENTITY HEADER */}
        <div>
          <div className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase mb-0.5">Focus Node</div>
          <h2 className="text-xl font-black tracking-tight text-slate-100 flex items-center space-x-2">
            <span>{resolvedName}</span>
            <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded">
              {countryCode}
            </span>
          </h2>
          <span className="inline-block mt-2 text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 tracking-wider uppercase">
            ⚡ STATUS: {report?.status || "STABLE PROFILE AXIS"}
          </span>
        </div>

        {/* ACTIVE FINANCIAL INDEXES CARD */}
        <div className="bg-slate-950/60 border border-slate-850 p-3.5 rounded-xl space-y-2.5 shadow-inner">
          <div className="flex items-center space-x-1 text-[10px] font-mono font-bold tracking-wider text-amber-400 uppercase">
            <Landmark className="w-3.5 h-3.5" />
            <span>Active Financial Indexes</span>
          </div>
          
          <div className="grid grid-cols-1 gap-2 text-[11px] font-mono">
            <div className="flex justify-between items-center p-2 bg-slate-900 border border-slate-800/40 rounded">
              <span className="text-slate-500">Implied Central Bank Rate:</span>
              <span className="text-amber-400 font-bold">{marketIndexes.interestRate}</span>
            </div>
            
            <div className="flex justify-between items-center p-2 bg-slate-900 border border-slate-800/40 rounded">
              <span className="text-slate-500">Live Currency Rate:</span>
              <span className="text-emerald-400 font-bold tracking-wide">{marketIndexes.liveCurrencyRate}</span>
            </div>

            <div className="flex justify-between items-center p-2 bg-slate-900 border border-slate-800/40 rounded">
              <span className="text-slate-500">Live Stock Market Index:</span>
              <span className={`font-bold tracking-wide ${
                stockIndexText.includes('-') ? 'text-rose-400' : 'text-cyan-400'
              }`}>
                {stockIndexText}
              </span>
            </div>

            <div className="flex justify-between items-center p-2 bg-slate-900 border border-slate-800/40 rounded">
              <span className="text-slate-500">Local Currency Trend:</span>
              <span className="text-indigo-400 font-bold">{marketIndexes.currencyTrend}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-slate-900 border border-slate-800/40 rounded">
              <span className="text-slate-500">Sovereign Debt Risk Premium:</span>
              <span className="text-slate-300 font-bold">{marketIndexes.riskPremium}</span>
            </div>
          </div>
        </div>

        {/* NARRATIVE DATA SECTIONS */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="text-xs font-mono font-bold text-slate-400 flex items-center space-x-1">
              <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
              <span>1. Localized Situation Profile</span>
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{report?.situation}</p>
          </div>

          <div className="space-y-1">
            <h4 className="text-xs font-mono font-bold text-slate-400 flex items-center space-x-1">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span>2. Underlying Context Matrix</span>
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{report?.why}</p>
          </div>

          <div className="space-y-1">
            <h4 className="text-xs font-mono font-bold text-slate-400 flex items-center space-x-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>3. Primary Vulnerability Node</span>
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{report?.vulnerability}</p>
          </div>
        </div>

      </div>

      <div className="p-3 border-t border-slate-800 text-center font-mono text-[9px] text-slate-600 bg-slate-950/20 uppercase tracking-widest">
        Secured Financial Intelligence Node
      </div>

    </div>
  );
}