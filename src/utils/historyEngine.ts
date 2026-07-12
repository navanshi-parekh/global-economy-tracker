export interface HistoricalDataPoint {
  year: string;
  gdpValue: number;
  newsHeadline?: string;
  newsSnippet?: string;
}

const GLOBAL_FLASHPOINTS: Record<string, { headline: string; snippet: string }> = {
  "2020": {
    headline: "Global Supply Chains Freeze Amid Lockdowns",
    snippet: "Planetary lockdowns halt factories, creating historic maritime backlogs and shipping index spikes."
  },
  "2022": {
    headline: "Energy Shock Sparks Multi-Decade Inflation Spike",
    snippet: "Geopolitical conflict triggers a massive spike in crude oil and natural gas baseline commodity indexes."
  }
};

export async function fetchHistoricalGlobalData(): Promise<HistoricalDataPoint[]> {
  try {
    const res = await fetch('https://api.worldbank.org/v2/country/WLD/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=15');
    const rawData = await res.json();
    
    if (!rawData[1]) throw new Error("Invalid World Bank structure");

    return rawData[1]
      .filter((item: any) => item.value !== null && parseInt(item.date) >= 2012)
      .map((item: any) => {
        const yearStr = item.date;
        return {
          year: yearStr,
          gdpValue: parseFloat(item.value.toFixed(2)),
          newsHeadline: GLOBAL_FLASHPOINTS[yearStr]?.headline,
          newsSnippet: GLOBAL_FLASHPOINTS[yearStr]?.snippet
        };
      })
      .reverse();
  } catch (error) {
    console.error("Error aggregating timeline streams:", error);
    return [
      { year: "2018", gdpValue: 3.2 },
      { year: "2019", gdpValue: 2.6 },
      { year: "2020", gdpValue: -3.1, newsHeadline: "Global Supply Chains Freeze", newsSnippet: "Planetary lockdowns halt factories." },
      { year: "2021", gdpValue: 5.9 },
      { year: "2022", gdpValue: 3.0, newsHeadline: "Energy Shock Sparks Inflation", newsSnippet: "Geopolitical conflict triggers energy price surge." },
      { year: "2023", gdpValue: 2.6 },
      { year: "2024", gdpValue: 2.4 }
    ];
  }
}