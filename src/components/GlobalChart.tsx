'use client';
import React, { useState, useEffect } from 'react';
import { useEconomyStore } from '../store/useEconomyStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import { Calendar } from 'lucide-react';

const gdpTimelineData = [
  { year: 2012, value: 2.9, event: "Post-Crisis Expansion", details: "Global trade flows re-stabilize, driven by steady baseline growth profiles." },
  { year: 2015, value: 3.2, event: "Emerging Market Velocity", details: "Strong manufacturing output and expansion across emerging economies." },
  { year: 2018, value: 3.5, event: "Tech Investment Wave", details: "High-tech corporate expenditures drive strong industrial throughput." },
  { year: 2020, value: -2.89, event: "Supply Chain Freeze", details: "Planetary lockdowns halt factories, creating historic maritime backlogs." },
  { year: 2021, value: 6.5, event: "Post-Lockdown Bounce", details: "A massive release of pent-up demand triggers a rapid, sharp economic rebound." },
  { year: 2022, value: 3.5, event: "Central Bank Tightening", details: "Aggressive interest rate hikes introduce friction to cool historic inflation." },
  { year: 2025, value: 3.0, event: "New Baseline Growth", details: "Global production vectors stabilize into a steady multi-year trajectory." }
];

const macroHealthTimelineData = [
  { year: 2012, value: 55, event: "Baseline Stability", details: "Global health metrics resting at comfortable multi-year averages." },
  { year: 2015, value: 58, event: "Industrial Boom", details: "Widespread manufacturing expansion across emerging Asian markets boosts indices." },
  { year: 2018, value: 56, event: "Trade Tensions", details: "Tariff adjustments cause a minor contraction in export-dependent nations." },
  { year: 2020, value: 28, event: "Systemic Shock", details: "Pandemic lockdowns drag global health scores down to a historic low." },
  { year: 2022, value: 48, event: "Volatile Rebound", details: "Supply chains reopen but face heavy structural friction and labor shortages." },
  { year: 2025, value: 52, event: "Stabilizing Node", details: "Systems plateau as industries adjust to new baseline operational costs." }
];

const inflationTimelineData = [
  { year: 2012, value: 1.8, event: "Target Stability", details: "Developed central banks maintain steady inflation near target bounds." },
  { year: 2016, value: 1.5, event: "Muted Pricing", details: "Subdued energy markets keep consumer price indexes historically low." },
  { year: 2019, value: 2.1, event: "Pre-Shock Baseline", details: "Stable distribution patterns across major economic clusters." },
  { year: 2020, value: 0.8, event: "Demand Collapse", details: "Initial lockdown shocks cause energy prices to plummet, risking deflation." },
  { year: 2022, value: 8.7, event: "Inflation Peak", details: "Aggressive fiscal stimulus meets severe supply chain freezes, spiking prices." },
  { year: 2025, value: 3.2, event: "Hawkish Softening", details: "Sustained high interest rates successfully cool global pricing curves." }
];

const workforceTimelineData = [
  { year: 2012, value: 6.1, event: "Post-Recession Slack Recovery", details: "Labor market integration recovers slowly as firms rebuild capital reserves." },
  { year: 2016, value: 5.7, event: "Steady Corporate Payroll Ingest", details: "Consistent corporate hiring cycles compress the global unemployment mean." },
  { year: 2019, value: 5.4, event: "Optimal Employment Bound", details: "Tight labor markets recorded across major developed manufacturing hubs." },
  { year: 2020, value: 6.6, event: "Sudden Furlough Squeeze", details: "Lockdowns trigger sudden structural job losses and unprecedented operational freezes." },
  { year: 2022, value: 5.8, event: "The Great Labor Realignment", details: "Severe labor shortages emerge as hiring velocity spikes during supply chain normalization." },
  { year: 2025, value: 5.5, event: "Payroll Stabilization Curve", details: "Labor supply and business payroll models settle back into balanced limits." }
];

export default function GlobalChart() {
  // 🚀 CRITICAL PATCH: Listen directly to store token switches rather than router location paths!
  const { activeGlobalToggle } = useEconomyStore();
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  // Set universal default parameters targeting 'gdp'
  let chartData = gdpTimelineData;
  let unit = "%";
  let title = "Global Production Trajectory (% Annual Real GDP)";
  let domain = [-4, 9];
  let lineColor = "#6366f1"; 

  // 🔄 Map dataset values based directly on state changes
  if (activeGlobalToggle === 'inflation') {
    chartData = inflationTimelineData;
    title = "Global CPI Inflation Trend Trajectory";
    domain = [0, 10];
    lineColor = "#22d3ee"; 
  } else if (activeGlobalToggle === 'macro') {
    chartData = macroHealthTimelineData;
    title = "Global Macroeconomic Health Index Average";
    unit = " pts";
    domain = [0, 100];
    lineColor = "#10b981"; 
  } else if (activeGlobalToggle === 'workforce') {
    chartData = workforceTimelineData;
    title = "Global Unemployment & Labor Force Stress Index";
    domain = [4, 8];
    lineColor = "#818cf8"; 
  }

  useEffect(() => {
    const defaultPoint = chartData.find(p => p.year === 2020) || chartData[0];
    setSelectedPoint(defaultPoint);
  }, [activeGlobalToggle, chartData]);

  const alertPoints = chartData.filter(p => p.year === 2020 || p.year === 2022);

  return (
    <div className="w-full h-full flex space-x-6 text-slate-100 font-sans">
      
      {/* 📊 LEFT: GRAPH CANVAS */}
      <div className="flex-1 flex flex-col justify-between h-[300px]">
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            {title}
          </h4>
          <div className="flex space-x-3 text-[9px] font-mono text-slate-400">
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-rose-500 mr-1 animate-pulse"></span> Shock Node</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-indigo-400 mr-1"></span> Trend</span>
          </div>
        </div>

        <div className="w-full h-[260px] bg-slate-950/40 border border-slate-850 p-2 rounded-lg">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData} margin={{ top: 15, right: 20, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
              <XAxis dataKey="year" stroke="#475569" fontSize={10} fontFamily="monospace" tickLine={false} />
              <YAxis stroke="#475569" fontSize={10} fontFamily="monospace" domain={domain} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                labelStyle={{ fontFamily: 'monospace', color: '#818cf8', fontWeight: 'bold' }}
                itemStyle={{ fontSize: '11px', fontFamily: 'mono' }}
              />
              <Line type="monotone" dataKey="value" stroke={lineColor} strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              {alertPoints.map(pt => (
                <ReferenceDot key={pt.year} x={pt.year} y={pt.value} r={6} fill="#f43f5e" stroke="#fda4af" strokeWidth={1.5} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 📑 RIGHT: SUMMARY HIGHLIGHT CARD */}
      <div className="w-80 bg-slate-950/50 border border-slate-850 p-4 rounded-xl flex flex-col justify-between h-[300px]">
        <div>
          <div className="flex items-center space-x-1 text-[10px] font-mono font-bold tracking-widest text-slate-400 mb-1 uppercase">
            <Calendar className="w-3.5 h-3.5" />
            <span>Historical Anchor</span>
          </div>
          <h3 className="text-sm font-black text-slate-200 mb-2 border-b border-slate-850 pb-1.5 flex justify-between">
            <span>Benchmark Year:</span>
            <span className="text-indigo-400 font-mono">{selectedPoint?.year || 2020}</span>
          </h3>
          <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg mb-2">
            <h4 className="text-xs font-bold text-slate-300">📌 {selectedPoint?.event || "Trend Stability"}</h4>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
            {selectedPoint?.details || "Select a timeline point to map historical variables."}
          </p>
        </div>

        <div className="border-t border-slate-850 pt-2 flex justify-between items-center text-[10px] font-mono text-slate-500">
          <span>Agg Target Index:</span>
          <span className="text-slate-200 font-bold">{selectedPoint ? `${selectedPoint.value}${unit}` : `--`}</span>
        </div>
      </div>

    </div>
  );
}