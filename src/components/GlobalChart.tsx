'use client';
import React, { useState, useEffect } from 'react';
import { useEconomyStore } from '../store/useEconomyStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import { Calendar } from 'lucide-react';

// Hardcoded historical baseline timelines tracking metrics
const gdpTimelineData = [
  { year: 2018, value: 3.2, details: "Steady operational growth across manufacturing sectors." },
  { year: 2019, value: 2.8, details: "Mild slowdown inside cross-border logistics lanes." },
  { year: 2020, value: -3.1, details: "Systemic contraction due to global supply corridor freezes." },
  { year: 2021, value: 5.9, details: "V-shaped demand expansion fueled by liquidity injections." },
  { year: 2022, value: 3.1, details: "Energy price spirals introduce corporate cost containment." },
  { year: 2023, value: 2.6, details: "Central banks implement hawkish rate tightening corridors." },
  { year: 2024, value: 2.4, details: "Stabilizing trendline across mature industrial nations." }
];

const inflationTimelineData = [
  { year: 2018, value: 2.1, details: "Price velocity stays neatly bound inside targeted zones." },
  { year: 2019, value: 1.8, details: "Disinflationary pressures visible in technology lines." },
  { year: 2020, value: 1.2, details: "Consumer spending freeze drops baseline asset demand." },
  { year: 2021, value: 4.7, details: "Supply logjams meet heavy stimulus cash tracking loops." },
  { year: 2022, value: 8.7, details: "Multi-decade high prints force emergency policy resets." },
  { year: 2023, value: 5.5, details: "Hawkish central bank paths trim near-term velocity." },
  { year: 2024, value: 3.2, details: "CPI metrics gradually float toward standard targets." }
];

const macroHealthTimelineData = [
  { year: 2018, value: 72, details: "System debt limits and liquidity buffers operate cleanly." },
  { year: 2019, value: 68, details: "Corporate balance sheets report normal buffer reserves." },
  { year: 2020, value: 41, details: "Acute liquidity distress demands immediate intervention." },
  { year: 2021, value: 65, details: "Refinancing windows reopen cleanly under global easing." },
  { year: 2022, value: 52, details: "Sovereign risk premiums widen over asset price drops." },
  { year: 2023, value: 58, details: "Structural adjustments buffer fiscal spending stress." },
  { year: 2024, value: 63, details: "Operational health scales back into equilibrium zones." }
];

const workforceTimelineData = [
  { year: 2018, value: 5.1, details: "Labor utilization rates reflect balanced tracking levels." },
  { year: 2019, value: 4.9, details: "Corporate staffing tracks steady hiring trajectories." },
  { year: 2020, value: 7.8, details: "Service industries shed positions rapidly over freezes." },
  { year: 2021, value: 5.4, details: "Talent shortages emerge inside digital industrial spaces." },
  { year: 2022, value: 4.8, details: "Wage inflation quickens as corporate openings scale." },
  { year: 2023, value: 4.6, details: "Labor markets remain tight despite central bank pushes." },
  { year: 2024, value: 4.5, details: "Workforce aggregates show full-employment resilience." }
];

// 🚀 EXPLICIT TYPING: Clear interface declaration guarantees the news page bindings pass type checks
interface GlobalChartProps {
  overrideToggle?: 'gdp' | 'macro' | 'inflation' | 'workforce';
}

export default function GlobalChart({ overrideToggle }: GlobalChartProps) {
  const store = useEconomyStore();
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  // Fallback pattern reads from the local prop state or default keys safely
  let currentSelection = overrideToggle;
  if (!currentSelection) {
    currentSelection = (store as any).activeToggle || (store as any).activeGlobalToggle || 'gdp';
  }

  let chartData = gdpTimelineData;
  let unit = "%";
  let title = "Global Production Trajectory (% Annual Real GDP)";
  let domain = [-4, 9];
  let lineColor = "#6366f1"; 

  if (currentSelection === 'inflation') {
    chartData = inflationTimelineData;
    title = "Global CPI Inflation Trend Trajectory";
    domain = [0, 10];
    lineColor = "#22d3ee"; 
  } else if (currentSelection === 'macro') {
    chartData = macroHealthTimelineData;
    title = "Global Macroeconomic Health Index Average";
    unit = " pts";
    domain = [0, 100];
    lineColor = "#10b981"; 
  } else if (currentSelection === 'workforce') {
    chartData = workforceTimelineData;
    title = "Global Unemployment & Labor Force Stress Index";
    domain = [4, 8];
    lineColor = "#818cf8"; 
  }

  useEffect(() => {
    const defaultPoint = chartData.find(p => p.year === 2020) || chartData[0];
    setSelectedPoint(defaultPoint);
  }, [currentSelection, chartData]);

  const alertPoints = chartData.filter(p => p.year === 2020 || p.year === 2022);

  return (
    <div className="w-full h-full flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-slate-100 font-sans">
      <div className="flex-1 flex flex-col justify-between h-[300px]">
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">{title}</h4>
        </div>
        <div className="w-full h-[260px] bg-slate-950/40 border border-slate-850 p-2 rounded-lg">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData} margin={{ top: 15, right: 20, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
              <XAxis dataKey="year" stroke="#475569" fontSize={10} tickLine={false} />
              <YAxis stroke="#475569" fontSize={10} domain={domain} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
              <Line type="monotone" dataKey="value" stroke={lineColor} strokeWidth={2.5} dot={{ r: 4 }} />
              {alertPoints.map(pt => (
                <ReferenceDot key={pt.year} x={pt.year} y={pt.value} r={6} fill="#f43f5e" />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="w-full md:w-80 bg-slate-950/50 border border-slate-850 p-4 rounded-xl flex flex-col justify-between h-[300px]">
        <div>
          <h3 className="text-sm font-black text-slate-200 mb-2 border-b border-slate-850 pb-1.5 flex justify-between">
            <span>Benchmark Year:</span>
            <span className="text-indigo-400 font-mono">{selectedPoint?.year || 2020}</span>
          </h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">{selectedPoint?.details}</p>
        </div>
        <div className="border-t border-slate-850 pt-2 flex justify-between items-center text-[10px] font-mono text-slate-500">
          <span>Agg Target Index:</span>
          <span className="text-slate-200 font-bold">{selectedPoint ? `${selectedPoint.value}${unit}` : `--`}</span>
        </div>
      </div>
    </div>
  );
}