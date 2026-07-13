'use client';
import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { useEconomyStore } from '../store/useEconomyStore';
import { fetchLiveCountryData, LiveCountryData } from '../utils/apiEngine';
import { convertNumericToIso3 } from '../utils/isoMapping';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  loading: boolean;
  activeId: string | null;
  data: LiveCountryData | null;
}

// 🚀 CORE FIX 1: Explicitly declare the prop interface signature to capture home layout values
interface EconomicMapProps {
  overrideToggle?: 'gdp' | 'macro' | 'inflation' | 'workforce';
}

export default function EconomicMap({ overrideToggle }: EconomicMapProps) {
  // Pull core state management hooks cleanly from the global store
  const { activeGlobalToggle, setActiveCountry, globalDataCache, initializeGlobalCache, isCacheLoading } = useEconomyStore();
  const [tooltip, setTooltip] = useState<TooltipState>({ 
    visible: false, x: 0, y: 0, loading: false, activeId: null, data: null 
  });

  // 🚀 CORE FIX 2: Compute the runtime configuration fallback token dynamically
  // If the parent page passes overrideToggle, use it. Otherwise, look for activeGlobalToggle.
  const activeLens = overrideToggle || activeGlobalToggle || 'gdp';

  useEffect(() => {
    initializeGlobalCache();
  }, [initializeGlobalCache]);

  const dynamicShadingColor = (iso3: string, isHovered: boolean) => {
    if (isHovered) return "#6366f1"; 
    
    const countryData = globalDataCache[iso3];
    if (!countryData || iso3 === 'WLD') return '#1e293b'; 

    // 🚀 CORE FIX 3: Update coloring conditional evaluations to match activeLens instead of a static store field
    if (activeLens === 'macro') {
      const score = countryData.healthScore;
      if (score > 65) return '#059669'; 
      if (score > 45) return '#d97706'; 
      return '#dc2626'; 
    }
    
    if (activeLens === 'inflation') {
      const inf = countryData.inflation;
      if (inf > 6.0) return '#b91c1c'; 
      if (inf > 3.0) return '#ea580c'; 
      return '#0891b2'; 
    }

    if (activeLens === 'workforce') {
      const unemp = countryData.unemployment;
      return unemp > 6.0 ? '#be123c' : '#10b981';
    }

    // Default: 'gdp' mode shading baseline style code coordinates
    return '#d97706'; 
  };

  const handleMouseEnter = async (e: React.MouseEvent, geo: any, bounds: DOMRect) => {
    const numericId = geo.id || '';
    const iso3 = convertNumericToIso3(numericId);
    
    setTooltip({ 
      visible: true, 
      x: e.clientX - bounds.left, 
      y: e.clientY - bounds.top, 
      loading: true, 
      activeId: numericId,
      data: null 
    });

    if (globalDataCache[iso3]) {
      setTooltip(prev => {
        if (prev.activeId !== numericId) return prev;
        return { ...prev, loading: false, data: globalDataCache[iso3] };
      });
    } else {
      const liveData = await fetchLiveCountryData(iso3);
      setTooltip(prev => {
        if (prev.activeId !== numericId) return prev;
        return { ...prev, loading: false, data: liveData };
      });
    }
  };

  return (
    <div id="map-frame-wrapper" className="relative w-full h-full bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
      
      {isCacheLoading && (
        <div className="absolute top-28 left-6 z-30 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-[10px] px-3 py-1.5 rounded-lg animate-pulse">
          ⚡ Pre-caching global indicators...
        </div>
      )}

      <div className="w-full h-full max-h-[85vh] px-4 flex items-center justify-center mt-12">
        <ComposableMap 
          projection="geoMercator"
          projectionConfig={{ scale: 140, center: [0, 25] }}
          width={800}
          height={380}
          className="w-full h-full object-contain select-none"
        >
          <ZoomableGroup zoom={1} minZoom={1} maxZoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const numericId = geo.id || '';
                  if (numericId === '010' || numericId === 'ATA') return null;
                  
                  const iso3 = convertNumericToIso3(numericId);
                  const isHovered = tooltip.activeId === numericId;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => tooltip.data && setActiveCountry(tooltip.data.code)}
                      onMouseEnter={(e) => {
                        const container = document.getElementById('map-frame-wrapper');
                        const bounds = container ? container.getBoundingClientRect() : new DOMRect();
                        handleMouseEnter(e, geo, bounds);
                      }}
                      onMouseMove={(e) => {
                        const container = document.getElementById('map-frame-wrapper');
                        const bounds = container ? container.getBoundingClientRect() : new DOMRect();
                        setTooltip(prev => ({ 
                          ...prev, 
                          x: e.clientX - bounds.left, 
                          y: e.clientY - bounds.top 
                        }));
                      }}
                      onMouseLeave={() => setTooltip({ visible: false, x: 0, y: 0, loading: false, activeId: null, data: null })}
                      style={{
                        default: { fill: dynamicShadingColor(iso3, isHovered), stroke: "#090d16", strokeWidth: 0.5, outline: "none", transition: "fill 300ms" },
                        hover: { fill: "#6366f1", stroke: "#fff", strokeWidth: 0.8, outline: "none", cursor: "pointer" },
                        pressed: { fill: "#4f46e5", outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {tooltip.visible && tooltip.data && (
        <div 
          className="absolute pointer-events-none z-50 bg-slate-900/95 border border-slate-700/80 backdrop-blur-md rounded-xl p-4 shadow-2xl w-64 text-xs font-sans text-slate-200"
          style={{ left: tooltip.x + 20, top: tooltip.y + 20 }}
        >
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
            <span className="font-bold text-sm text-slate-100 tracking-wide">
              {tooltip.data.name} ({tooltip.data.code})
            </span>
            <span className="text-[9px] bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded font-mono font-bold uppercase">{activeLens} lens</span>
          </div>
          
          <div className="space-y-2 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">GDP Growth:</span>
              <span className={tooltip.data.gdpGrowth >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {tooltip.data.gdpGrowth}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Inflation Rate:</span>
              <span className={tooltip.data.inflation > 4 ? 'text-rose-400 font-bold' : 'text-cyan-400 font-bold'}>
                {tooltip.data.inflation}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Unemployment:</span>
              <span className="text-slate-200 font-bold">{tooltip.data.unemployment}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}