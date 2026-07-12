'use client';
import React, { useEffect, useState } from 'react';
import { fetchLiveCountryData, type LiveCountryData } from '../utils/apiEngine';
import { TrendingUp, Activity, Landmark, Users } from 'lucide-react';

export default function CountryComparisonCard({ countryCode }: { countryCode: string }) {
  const [data, setData] = useState<LiveCountryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchLiveCountryData(countryCode).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [countryCode]);

  if (loading) {
    return (
      <div className="bg-slate-900/40 border border-slate-850 rounded-xl p-6 h-[340px] flex items-center justify-center animate-pulse">
        <span className="text-xs text-slate-500 font-mono">Streaming live metric packet [{countryCode}]...</span>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-5 backdrop-blur-sm transition-all duration-300 hover:border-slate-700">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-slate-100">{data.name}</h3>
          <span className="text-xs font-mono text-indigo-400">Node Target: {data.code}</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">Health Index</span>
          <span className="text-xl font-black font-mono text-emerald-400">{data.healthScore}<span className="text-xs text-slate-600">/100</span></span>
        </div>
      </div>

      {/* Sub-Indicator Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Pillar A: Growth */}
        <div className="bg-slate-950/40 border border-slate-850 rounded-lg p-3 space-y-1">
          <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] uppercase font-mono">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
            <span>GDP Growth</span>
          </div>
          <p className={`text-base font-bold font-mono ${data.gdpGrowth >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {data.gdpGrowth > 0 ? '+' : ''}{data.gdpGrowth}%
          </p>
        </div>

        {/* Pillar B: Inflation */}
        <div className="bg-slate-950/40 border border-slate-850 rounded-lg p-3 space-y-1">
          <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] uppercase font-mono">
            <Landmark className="w-3.5 h-3.5 text-cyan-400" />
            <span>Inflation (CPI)</span>
          </div>
          <p className={`text-base font-bold font-mono ${data.inflation > 4 ? 'text-rose-400' : 'text-cyan-400'}`}>
            {data.inflation}%
          </p>
        </div>

        {/* Pillar C: Employment */}
        <div className="bg-slate-950/40 border border-slate-850 rounded-lg p-3 space-y-1">
          <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] uppercase font-mono">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Unemployment</span>
          </div>
          <p className="text-base font-bold font-mono text-slate-200">
            {data.unemployment}%
          </p>
        </div>

        {/* Pillar D: Real-Wage Yield Calculus */}
        <div className="bg-slate-950/40 border border-slate-850 rounded-lg p-3 space-y-1">
          <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] uppercase font-mono">
            <Activity className="w-3.5 h-3.5 text-purple-400" />
            <span>Macro Stress</span>
          </div>
          <p className="text-base font-bold font-mono text-purple-400">
            {Math.round(data.inflation + data.unemployment)}%
          </p>
        </div>
      </div>
    </div>
  );
}