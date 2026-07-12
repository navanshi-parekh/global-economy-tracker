export const numericToIso3: Record<string, string> = {
  // --- NORTH AMERICA & CARIBBEAN ---
  "840": "USA", "124": "CAN", "484": "MEX", "136": "CYM", "192": "CUB", 
  "214": "DOM", "320": "GTM", "332": "HTI", "222": "SLV", "188": "CRI", 
  "591": "PAN", "442": "LUX", "044": "BHS", "052": "BRB", "308": "GRD",
  "388": "JAM", "659": "KNA", "662": "LCA", "670": "VCT", "780": "TTO",
  "558": "NIC", "340": "HND", "084": "BLZ", "254": "GRL",

  // --- SOUTH AMERICA ---
  "076": "BRA", "032": "ARG", "152": "CHL", "170": "COL", "604": "PER", 
  "858": "URY", "862": "VEN", "068": "BOL", "218": "ECU", "600": "PRY",
  "328": "GUY", "540": "SUR",

  // --- WESTERN & NORTHERN EUROPE ---
  "276": "DEU", "250": "FRA", "826": "GBR", "380": "ITA", "724": "ESP", 
  "528": "NLD", "056": "BEL", "756": "CHE", "040": "AUT", "752": "SWE", 
  "578": "NOR", "208": "DNK", "372": "IRL", "620": "PRT", "246": "FIN",
  "352": "ISL", "446": "MAC", "492": "MCO", "474": "SMR", "292": "GIB",

  // --- EASTERN EUROPE & BALKANS ---
  "643": "RUS", "616": "POL", "203": "CZE", "348": "HUN", "688": "SRB", 
  "703": "SVK", "705": "SVN", "100": "BGR", "642": "ROU", "804": "UKR", 
  "112": "BLR", "008": "ALB", "130": "BIH", "191": "HRV", "300": "GRC",
  "428": "LVA", "440": "LTU", "233": "EST", "498": "MDA", "807": "MKD",
  "499": "MNE",

  // --- ASIA & EAST ASIA ---
  "156": "CHN", "392": "JPN", "410": "KOR", "702": "SGP", "764": "THA", 
  "704": "VNM", "360": "IDN", "458": "MYS", "608": "PHL", "158": "TWN",
  "116": "KHM", "104": "MMR", "418": "LAO", "496": "MNG", "408": "PRK",
  "096": "BRN", "626": "TLS",

  // --- SOUTH & CENTRAL ASIA ---
  "356": "IND", "144": "LKA", "050": "BGD", "586": "PAK", "004": "AFG", 
  "762": "TJK", "860": "UZB", "398": "KAZ", "417": "KGZ", "795": "TKM",
  "064": "BTN", "524": "NPL", "462": "MDV",

  // --- MIDDLE EAST ---
  "682": "SAU", "784": "ARE", "364": "IRN", "368": "IRQ", "760": "SYR", 
  "376": "ISR", "400": "JOR", "422": "LBN", "414": "KWT", "634": "QAT", 
  "512": "OMN", "048": "BHR", "792": "TUR", "051": "ARM", "031": "AZE",
  "268": "GEO", "275": "PSE",

  // --- NORTH & EAST AFRICA ---
  "818": "EGY", "788": "TUN", "012": "DZA", "504": "MAR", "434": "LBY",
  "706": "SOM", "232": "ERI", "231": "ETH", "404": "KEN", "834": "TZA", 
  "800": "UGA", "646": "RWA", "108": "BDI", "262": "DJI", "728": "SSD",

  // --- WEST & CENTRAL AFRICA ---
  "566": "NGA", "242": "COG", "180": "COD", "288": "GHA", "384": "CIV", 
  "120": "CMR", "204": "BEN", "226": "GNQ", "266": "GAB", "270": "GMB", 
  "324": "GIN", "624": "GNB", "430": "LBR", "466": "MLI", "478": "MRT", 
  "562": "NER", "686": "SEN", "694": "SLE", "768": "TGO", "854": "BFA", 
  "140": "CAF", "148": "TCD",

  // --- SOUTHERN AFRICA ---
  "710": "ZAF", "508": "MOZ", "024": "AGO", "748": "SWZ", "516": "NAM", 
  "072": "BWA", "450": "MDG", "480": "MUS", "690": "SYC", "454": "MWI", 
  "894": "ZMB", "716": "ZWE", "426": "LSO",

  // --- OCEANIA ---
  // --- OCEANIA ---
  "036": "AUS", 
  "554": "NZL",  
  "598": "PNG", 
  "090": "SLB",
  "548": "VUT", 
  "882": "WSM", 
  "776": "TON", 
  "296": "KIR", 
  "584": "MHL",
  "583": "FSM", 
  "585": "PLW", 
  "258": "PYF"

};

export function convertNumericToIso3(numericId: string | number | undefined): string {
  if (!numericId) return "WLD";
  
  // Clean parsing engine: strips decimals, checks loose formats, pads strings up to a standard 3 digit code cleanly
  const intId = parseInt(String(numericId), 10);
  if (isNaN(intId)) return "WLD";
  
  const paddedId = String(intId).padStart(3, '0');
  return numericToIso3[paddedId] || "WLD";
}