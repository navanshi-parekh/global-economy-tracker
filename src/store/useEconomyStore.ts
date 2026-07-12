'use client';
import { create } from 'zustand';
import { fetchLiveCountryData, LiveCountryData } from '../utils/apiEngine';
import { numericToIso3 } from '../utils/isoMapping';

interface EconomyState {
  activeCountry: string | null;
  activeGlobalToggle: 'macro' | 'inflation' | 'workforce';
  compareMode: boolean;
  selectedCompareCountries: string[];
  globalDataCache: Record<string, LiveCountryData>;
  isCacheLoading: boolean;
  setActiveCountry: (country: string | null) => void;
  setActiveGlobalToggle: (toggle: 'macro' | 'inflation' | 'workforce') => void;
  toggleCompareMode: () => void;
  clearCompare: () => void;
  initializeGlobalCache: () => Promise<void>;
}

// Utility helper to insert a time delay between API batches
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useEconomyStore = create<EconomyState>((set, get) => ({
  activeCountry: null,
  activeGlobalToggle: 'macro',
  compareMode: false,
  selectedCompareCountries: [],
  globalDataCache: {},
  isCacheLoading: false,

  setActiveCountry: (country) => set((state) => {
    if (state.compareMode && country) {
      const current = state.selectedCompareCountries;
      const updated = current.includes(country) 
        ? current.filter(c => c !== country)
        : [...current, country].slice(-2);
      return { selectedCompareCountries: updated };
    }
    return { activeCountry: country };
  }),

  setActiveGlobalToggle: (toggle) => set({ activeGlobalToggle: toggle }),
  
  toggleCompareMode: () => set((state) => ({ 
    compareMode: !state.compareMode, 
    activeCountry: null, 
    selectedCompareCountries: [] 
  })),
  
  clearCompare: () => set({ selectedCompareCountries: [], compareMode: false, activeCountry: null }),

  initializeGlobalCache: async () => {
    // If cache is already built, skip fetching entirely
    if (Object.keys(get().globalDataCache).length > 0) return;
    set({ isCacheLoading: true });
    
    const cache: Record<string, LiveCountryData> = {};
    const targetCodes = Array.from(new Set(Object.values(numericToIso3))).filter(code => code !== "WLD");
    
    const BATCH_SIZE = 5; // Fetch only 5 countries at a time
    
    for (let i = 0; i < targetCodes.length; i += BATCH_SIZE) {
      const batch = targetCodes.slice(i, i + BATCH_SIZE);
      
      // Execute this batch of 5 items in parallel safely
      await Promise.all(
        batch.map(async (code) => {
          try {
            const data = await fetchLiveCountryData(code);
            // Verify we got valid structural content back before storing it
            if (data && data.code !== "WLD") {
              cache[code] = data;
            }
          } catch (err) {
            console.warn(`Skipping throttled node: ${code}`);
          }
        })
      );
      
      // Real-time progressive hydration updates to keep the map filling up dynamically
      set({ globalDataCache: { ...cache } });
      
      // Rest for 300ms before processing the next batch to stay under rate limits
      await delay(300);
    }
    
    set({ isCacheLoading: false });
  }
}));