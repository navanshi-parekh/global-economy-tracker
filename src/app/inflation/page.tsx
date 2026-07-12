'use client';
import { useEffect } from 'react';
import { useEconomyStore } from '../../store/useEconomyStore';
import EconomicMap from '../../components/EconomicMap';
import AIAnalysisPanel from '../../components/AIAnalysisPanel';
import NavigationHeader from '../../components/NavigationHeader';

export default function InflationPage() {
  const { setActiveGlobalToggle } = useEconomyStore();

  useEffect(() => {
    setActiveGlobalToggle('inflation');
  }, [setActiveGlobalToggle]);

  return (
    <div className="relative w-screen h-screen bg-slate-950 overflow-hidden">
      <NavigationHeader />
      <div className="absolute inset-0 w-full h-full z-10 pt-20">
        <EconomicMap />
      </div>
      <AIAnalysisPanel />
    </div>
  );
}