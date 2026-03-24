const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const APP_DIR = path.join(ROOT, "app");
const ASSETS_DIR = path.join(APP_DIR, "assets");
const OUTPUT_DIR = path.join(ASSETS_DIR, "geography-maps");
const OUTPUT_DATA_FILE = path.join(APP_DIR, "geography-map-data.js");
const OUTPUT_GALLERY_FILE = path.join(ASSETS_DIR, "geography-map-gallery.html");
const SNAPSHOT_DATE = "2026-03-24";

const BLUE = "#2f80ff";
const GREY = "#c0c0c0";
const WHITE = "#ffffff";
const OCEAN = "#eef7ff";

const SOURCE_FILES = {
  europe: path.join(ASSETS_DIR, "europe-blank-map.svg"),
  americas: path.join(ASSETS_DIR, "geography-base-americas.svg"),
  africa: path.join(ASSETS_DIR, "geography-base-africa-blankmap.svg"),
  asia: path.join(ASSETS_DIR, "geography-base-asia-world.svg"),
  "oceania-australia": path.join(ASSETS_DIR, "geography-australia-in-oceania.svg"),
  "oceania-png": path.join(ASSETS_DIR, "geography-papua-new-guinea-in-oceania.svg"),
};

const ASIA_WORLD_ID_OVERRIDES = {
  India: ["in"],
  China: ["cn"],
  Indonesia: ["id"],
  Pakistan: ["pk"],
  Bangladesh: ["bd"],
  Russia: ["ru"],
  Japan: ["jp"],
  Philippines: ["ph"],
  Vietnam: ["vn"],
  Iran: ["ir"],
  Turkey: ["tr"],
  Thailand: ["th"],
  Myanmar: ["mm"],
  "South Korea": ["kr"],
  Iraq: ["iq"],
  Afghanistan: ["af"],
  Yemen: ["ye"],
  Uzbekistan: ["uz"],
  Malaysia: ["my"],
  "Saudi Arabia": ["sa"],
  Nepal: ["np"],
  "North Korea": ["kp"],
  Syria: ["sy"],
  "Sri Lanka": ["lk"],
  Taiwan: ["tw"],
  Kazakhstan: ["kz"],
  Cambodia: ["kh"],
  Jordan: ["jo"],
  "United Arab Emirates": ["ae"],
  Tajikistan: ["tj"],
  Azerbaijan: ["az"],
  Israel: ["il"],
};

const TOP_COUNTRY_ENTRIES = [
  { country: "India", rank: 1 },
  { country: "China", rank: 2 },
  { country: "United States", rank: 3 },
  { country: "Indonesia", rank: 4 },
  { country: "Pakistan", rank: 5 },
  { country: "Nigeria", rank: 6 },
  { country: "Brazil", rank: 7 },
  { country: "Bangladesh", rank: 8 },
  { country: "Russia", rank: 9 },
  { country: "Ethiopia", rank: 10 },
  { country: "Mexico", rank: 11 },
  { country: "Japan", rank: 12 },
  { country: "Egypt", rank: 13 },
  { country: "Philippines", rank: 14 },
  { country: "DR Congo", rank: 15 },
  { country: "Vietnam", rank: 16 },
  { country: "Iran", rank: 17 },
  { country: "Turkey", rank: 18 },
  { country: "Germany", rank: 19 },
  { country: "Tanzania", rank: 20 },
  { country: "Thailand", rank: 21 },
  { country: "United Kingdom", rank: 22 },
  { country: "France", rank: 23 },
  { country: "South Africa", rank: 24 },
  { country: "Italy", rank: 25 },
  { country: "Kenya", rank: 26 },
  { country: "Myanmar", rank: 27 },
  { country: "Colombia", rank: 28 },
  { country: "Sudan", rank: 29 },
  { country: "Uganda", rank: 30 },
  { country: "South Korea", rank: 31 },
  { country: "Algeria", rank: 32 },
  { country: "Iraq", rank: 33 },
  { country: "Spain", rank: 34 },
  { country: "Argentina", rank: 35 },
  { country: "Afghanistan", rank: 36 },
  { country: "Yemen", rank: 37 },
  { country: "Canada", rank: 38 },
  { country: "Angola", rank: 39 },
  { country: "Ukraine", rank: 40 },
  { country: "Morocco", rank: 41 },
  { country: "Poland", rank: 42 },
  { country: "Uzbekistan", rank: 43 },
  { country: "Mozambique", rank: 44 },
  { country: "Malaysia", rank: 45 },
  { country: "Ghana", rank: 46 },
  { country: "Saudi Arabia", rank: 47 },
  { country: "Peru", rank: 48 },
  { country: "Madagascar", rank: 49 },
  { country: "Cote d'Ivoire", rank: 50 },
  { country: "Cameroon", rank: 51 },
  { country: "Nepal", rank: 52 },
  { country: "Niger", rank: 53 },
  { country: "Venezuela", rank: 54 },
  { country: "Australia", rank: 55 },
  { country: "North Korea", rank: 56 },
  { country: "Syria", rank: 57 },
  { country: "Mali", rank: 58 },
  { country: "Burkina Faso", rank: 59 },
  { country: "Sri Lanka", rank: 60 },
  { country: "Taiwan", rank: 61 },
  { country: "Malawi", rank: 62 },
  { country: "Zambia", rank: 63 },
  { country: "Chad", rank: 64 },
  { country: "Kazakhstan", rank: 65 },
  { country: "Somalia", rank: 66 },
  { country: "Chile", rank: 67 },
  { country: "Senegal", rank: 68 },
  { country: "Guatemala", rank: 69 },
  { country: "Romania", rank: 70 },
  { country: "Netherlands", rank: 71 },
  { country: "Ecuador", rank: 72 },
  { country: "Cambodia", rank: 73 },
  { country: "Zimbabwe", rank: 74 },
  { country: "Guinea", rank: 75 },
  { country: "Benin", rank: 76 },
  { country: "Rwanda", rank: 77 },
  { country: "Burundi", rank: 78 },
  { country: "Bolivia", rank: 79 },
  { country: "South Sudan", rank: 80 },
  { country: "Tunisia", rank: 81 },
  { country: "Haiti", rank: 82 },
  { country: "Belgium", rank: 83 },
  { country: "Dominican Republic", rank: 84 },
  { country: "Jordan", rank: 85 },
  { country: "United Arab Emirates", rank: 86 },
  { country: "Honduras", rank: 87 },
  { country: "Tajikistan", rank: 88 },
  { country: "Papua New Guinea", rank: 89 },
  { country: "Cuba", rank: 90 },
  { country: "Sweden", rank: 91 },
  { country: "Czechia", rank: 92 },
  { country: "Azerbaijan", rank: 93 },
  { country: "Portugal", rank: 94 },
  { country: "Togo", rank: 95 },
  { country: "Greece", rank: 96 },
  { country: "Israel", rank: 97 },
  { country: "Hungary", rank: 98 },
  { country: "Austria", rank: 99 },
  { country: "Switzerland", rank: 100 },
  { country: "Libya", rank: 101 },
];

const COUNTRY_SPECS = {
  India: {
    slug: "india",
    source: "asia",
    ids: ["India"],
    continent: "Asia",
    choiceGroup: "South Asia",
    minDifficulty: 1,
  },
  China: {
    slug: "china",
    source: "asia",
    ids: ["China"],
    continent: "Asia",
    choiceGroup: "East Asia",
    minDifficulty: 1,
  },
  "United States": {
    slug: "united-states",
    source: "americas",
    ids: ["us"],
    continent: "North America",
    choiceGroup: "North America",
    minDifficulty: 1,
  },
  Indonesia: {
    slug: "indonesia",
    source: "asia",
    ids: ["Indonesia"],
    continent: "Asia",
    choiceGroup: "Southeast Asia",
    minDifficulty: 1,
  },
  Pakistan: {
    slug: "pakistan",
    source: "asia",
    ids: ["Pakistan"],
    continent: "Asia",
    choiceGroup: "South Asia",
    minDifficulty: 1,
  },
  Nigeria: {
    slug: "nigeria",
    source: "africa",
    ids: ["ng"],
    continent: "Africa",
    choiceGroup: "West Africa",
    minDifficulty: 1,
  },
  Brazil: {
    slug: "brazil",
    source: "americas",
    ids: ["br"],
    continent: "South America",
    choiceGroup: "South America",
    minDifficulty: 1,
  },
  Bangladesh: {
    slug: "bangladesh",
    source: "asia",
    ids: ["Bangladesh"],
    continent: "Asia",
    choiceGroup: "South Asia",
    minDifficulty: 1,
  },
  Russia: {
    slug: "russia",
    source: "asia",
    ids: ["Russia", "Kaliningrad-Russia"],
    continent: "Europe / Asia",
    choiceGroup: "Eurasia",
    minDifficulty: 1,
  },
  Ethiopia: {
    slug: "ethiopia",
    source: "africa",
    ids: ["et"],
    continent: "Africa",
    choiceGroup: "East Africa",
    minDifficulty: 1,
  },
  Mexico: {
    slug: "mexico",
    source: "americas",
    ids: ["mx"],
    continent: "North America",
    choiceGroup: "North America",
    minDifficulty: 1,
  },
  Japan: {
    slug: "japan",
    source: "asia",
    ids: ["Japan"],
    continent: "Asia",
    choiceGroup: "East Asia",
    minDifficulty: 1,
  },
  Egypt: {
    slug: "egypt",
    source: "africa",
    ids: ["eg"],
    continent: "Africa",
    choiceGroup: "North Africa",
    minDifficulty: 1,
  },
  Philippines: {
    slug: "philippines",
    source: "asia",
    ids: ["Philippines"],
    continent: "Asia",
    choiceGroup: "Southeast Asia",
    minDifficulty: 1,
  },
  "DR Congo": {
    slug: "dr-congo",
    source: "africa",
    ids: ["cd"],
    continent: "Africa",
    choiceGroup: "Central Africa",
    minDifficulty: 2,
  },
  Vietnam: {
    slug: "vietnam",
    source: "asia",
    ids: ["Viet_Nam"],
    continent: "Asia",
    choiceGroup: "Southeast Asia",
    minDifficulty: 1,
  },
  Iran: {
    slug: "iran",
    source: "asia",
    ids: ["Iran"],
    continent: "Asia",
    choiceGroup: "Middle East",
    minDifficulty: 2,
  },
  Turkey: {
    slug: "turkey",
    source: "asia",
    ids: ["Turkey"],
    continent: "Europe / Asia",
    choiceGroup: "Middle East",
    minDifficulty: 2,
  },
  Germany: {
    slug: "germany",
    source: "europe",
    ids: ["de"],
    continent: "Europe",
    choiceGroup: "Europe",
    minDifficulty: 1,
  },
  Tanzania: {
    slug: "tanzania",
    source: "africa",
    ids: ["tz"],
    continent: "Africa",
    choiceGroup: "East Africa",
    minDifficulty: 1,
  },
  Thailand: {
    slug: "thailand",
    source: "asia",
    ids: ["Thailand"],
    continent: "Asia",
    choiceGroup: "Southeast Asia",
    minDifficulty: 1,
  },
  "United Kingdom": {
    slug: "united-kingdom",
    source: "europe",
    ids: ["gb"],
    continent: "Europe",
    choiceGroup: "Europe",
    minDifficulty: 1,
  },
  France: {
    slug: "france",
    source: "europe",
    ids: ["fr"],
    continent: "Europe",
    choiceGroup: "Europe",
    minDifficulty: 1,
  },
  "South Africa": {
    slug: "south-africa",
    source: "africa",
    ids: ["za"],
    continent: "Africa",
    choiceGroup: "Southern Africa",
    minDifficulty: 1,
  },
  Italy: {
    slug: "italy",
    source: "europe",
    ids: ["it"],
    continent: "Europe",
    choiceGroup: "Europe",
    minDifficulty: 1,
  },
  Kenya: {
    slug: "kenya",
    source: "africa",
    ids: ["ke"],
    continent: "Africa",
    choiceGroup: "East Africa",
    minDifficulty: 1,
  },
  Myanmar: {
    slug: "myanmar",
    source: "asia",
    ids: ["Myanmar"],
    continent: "Asia",
    choiceGroup: "Southeast Asia",
    minDifficulty: 2,
  },
  Colombia: {
    slug: "colombia",
    source: "americas",
    ids: ["co"],
    continent: "South America",
    choiceGroup: "South America",
    minDifficulty: 1,
  },
  Sudan: {
    slug: "sudan",
    source: "africa",
    ids: ["sd"],
    continent: "Africa",
    choiceGroup: "East Africa",
    minDifficulty: 2,
  },
  Uganda: {
    slug: "uganda",
    source: "africa",
    ids: ["ug"],
    continent: "Africa",
    choiceGroup: "East Africa",
    minDifficulty: 2,
  },
  "South Korea": {
    slug: "south-korea",
    source: "asia",
    ids: ["South_Korea"],
    continent: "Asia",
    choiceGroup: "East Asia",
    minDifficulty: 1,
  },
  Algeria: {
    slug: "algeria",
    source: "africa",
    ids: ["dz"],
    continent: "Africa",
    choiceGroup: "North Africa",
    minDifficulty: 1,
  },
  Iraq: {
    slug: "iraq",
    source: "asia",
    ids: ["Iraq"],
    continent: "Asia",
    choiceGroup: "Middle East",
    minDifficulty: 2,
  },
  Spain: {
    slug: "spain",
    source: "europe",
    ids: ["es"],
    continent: "Europe",
    choiceGroup: "Europe",
    minDifficulty: 1,
  },
  Argentina: {
    slug: "argentina",
    source: "americas",
    ids: ["ar"],
    continent: "South America",
    choiceGroup: "South America",
    minDifficulty: 1,
  },
  Afghanistan: {
    slug: "afghanistan",
    source: "asia",
    ids: ["Afghanistan"],
    continent: "Asia",
    choiceGroup: "South Asia",
    minDifficulty: 2,
  },
  Yemen: {
    slug: "yemen",
    source: "asia",
    ids: ["Yemen"],
    continent: "Asia",
    choiceGroup: "Middle East",
    minDifficulty: 3,
  },
  Canada: {
    slug: "canada",
    source: "americas",
    ids: ["ca"],
    continent: "North America",
    choiceGroup: "North America",
    minDifficulty: 1,
  },
  Angola: {
    slug: "angola",
    source: "africa",
    ids: ["ao"],
    continent: "Africa",
    choiceGroup: "Southern Africa",
    minDifficulty: 2,
  },
  Ukraine: {
    slug: "ukraine",
    source: "europe",
    ids: ["ua"],
    continent: "Europe",
    choiceGroup: "Europe",
    minDifficulty: 2,
  },
  Morocco: {
    slug: "morocco",
    source: "africa",
    ids: ["ma"],
    continent: "Africa",
    choiceGroup: "North Africa",
    minDifficulty: 2,
  },
  Poland: {
    slug: "poland",
    source: "europe",
    ids: ["pl"],
    continent: "Europe",
    choiceGroup: "Europe",
    minDifficulty: 2,
  },
  Uzbekistan: {
    slug: "uzbekistan",
    source: "asia",
    ids: ["Uzbekistan"],
    continent: "Asia",
    choiceGroup: "Central Asia",
    minDifficulty: 2,
  },
  Mozambique: {
    slug: "mozambique",
    source: "africa",
    ids: ["mz"],
    continent: "Africa",
    choiceGroup: "Southern Africa",
    minDifficulty: 2,
  },
  Malaysia: {
    slug: "malaysia",
    source: "asia",
    ids: ["Malaysia"],
    continent: "Asia",
    choiceGroup: "Southeast Asia",
    minDifficulty: 2,
  },
  Ghana: {
    slug: "ghana",
    source: "africa",
    ids: ["gh"],
    continent: "Africa",
    choiceGroup: "West Africa",
    minDifficulty: 2,
  },
  "Saudi Arabia": {
    slug: "saudi-arabia",
    source: "asia",
    ids: ["Saudi_Arabia"],
    continent: "Asia",
    choiceGroup: "Middle East",
    minDifficulty: 1,
  },
  Peru: {
    slug: "peru",
    source: "americas",
    ids: ["pe"],
    continent: "South America",
    choiceGroup: "South America",
    minDifficulty: 2,
  },
  Madagascar: {
    slug: "madagascar",
    source: "africa",
    ids: ["mg"],
    continent: "Africa",
    choiceGroup: "Southern Africa",
    minDifficulty: 3,
  },
  "Cote d'Ivoire": {
    slug: "cote-d-ivoire",
    source: "africa",
    ids: ["ci"],
    continent: "Africa",
    choiceGroup: "West Africa",
    minDifficulty: 3,
  },
  Cameroon: {
    slug: "cameroon",
    source: "africa",
    ids: ["cm"],
    continent: "Africa",
    choiceGroup: "Central Africa",
    minDifficulty: 2,
  },
  Nepal: {
    slug: "nepal",
    source: "asia",
    ids: ["Nepal"],
    continent: "Asia",
    choiceGroup: "South Asia",
    minDifficulty: 3,
  },
  Niger: {
    slug: "niger",
    source: "africa",
    ids: ["ne"],
    continent: "Africa",
    choiceGroup: "West Africa",
    minDifficulty: 2,
  },
  Venezuela: {
    slug: "venezuela",
    source: "americas",
    ids: ["ve"],
    continent: "South America",
    choiceGroup: "South America",
    minDifficulty: 2,
  },
  Australia: {
    slug: "australia",
    source: "oceania-australia",
    ids: ["Australia_1_"],
    continent: "Oceania",
    choiceGroup: "Oceania",
    minDifficulty: 1,
  },
  "North Korea": {
    slug: "north-korea",
    source: "asia",
    ids: ["North_Korea"],
    continent: "Asia",
    choiceGroup: "East Asia",
    minDifficulty: 2,
  },
  Syria: {
    slug: "syria",
    source: "asia",
    ids: ["Syria"],
    continent: "Asia",
    choiceGroup: "Middle East",
    minDifficulty: 3,
  },
  Mali: {
    slug: "mali",
    source: "africa",
    ids: ["ml"],
    continent: "Africa",
    choiceGroup: "West Africa",
    minDifficulty: 2,
  },
  "Burkina Faso": {
    slug: "burkina-faso",
    source: "africa",
    ids: ["bf"],
    continent: "Africa",
    choiceGroup: "West Africa",
    minDifficulty: 3,
  },
  "Sri Lanka": {
    slug: "sri-lanka",
    source: "asia",
    ids: ["Sri_Lanka"],
    continent: "Asia",
    choiceGroup: "South Asia",
    minDifficulty: 3,
  },
  Taiwan: {
    slug: "taiwan",
    source: "asia",
    ids: ["Taiwan"],
    continent: "Asia",
    choiceGroup: "East Asia",
    minDifficulty: 3,
  },
  Malawi: {
    slug: "malawi",
    source: "africa",
    ids: ["mw"],
    continent: "Africa",
    choiceGroup: "East Africa",
    minDifficulty: 3,
  },
  Zambia: {
    slug: "zambia",
    source: "africa",
    ids: ["zm"],
    continent: "Africa",
    choiceGroup: "Southern Africa",
    minDifficulty: 2,
  },
  Chad: {
    slug: "chad",
    source: "africa",
    ids: ["td"],
    continent: "Africa",
    choiceGroup: "Central Africa",
    minDifficulty: 2,
  },
  Kazakhstan: {
    slug: "kazakhstan",
    source: "asia",
    ids: ["Kazakhstan"],
    continent: "Asia",
    choiceGroup: "Central Asia",
    minDifficulty: 2,
  },
  Somalia: {
    slug: "somalia",
    source: "africa",
    ids: ["so"],
    continent: "Africa",
    choiceGroup: "East Africa",
    minDifficulty: 2,
  },
  Chile: {
    slug: "chile",
    source: "americas",
    ids: ["cl"],
    continent: "South America",
    choiceGroup: "South America",
    minDifficulty: 2,
  },
  Senegal: {
    slug: "senegal",
    source: "africa",
    ids: ["sn"],
    continent: "Africa",
    choiceGroup: "West Africa",
    minDifficulty: 3,
  },
  Guatemala: {
    slug: "guatemala",
    source: "americas",
    ids: ["gt"],
    continent: "North America",
    choiceGroup: "Central America",
    minDifficulty: 2,
  },
  Romania: {
    slug: "romania",
    source: "europe",
    ids: ["ro"],
    continent: "Europe",
    choiceGroup: "Europe",
    minDifficulty: 2,
  },
  Netherlands: {
    slug: "netherlands",
    source: "europe",
    ids: ["nl"],
    continent: "Europe",
    choiceGroup: "Europe",
    minDifficulty: 3,
  },
  Ecuador: {
    slug: "ecuador",
    source: "americas",
    ids: ["ec"],
    continent: "South America",
    choiceGroup: "South America",
    minDifficulty: 2,
  },
  Cambodia: {
    slug: "cambodia",
    source: "asia",
    ids: ["Cambodia"],
    continent: "Asia",
    choiceGroup: "Southeast Asia",
    minDifficulty: 3,
  },
  Zimbabwe: {
    slug: "zimbabwe",
    source: "africa",
    ids: ["zw"],
    continent: "Africa",
    choiceGroup: "Southern Africa",
    minDifficulty: 3,
  },
  Guinea: {
    slug: "guinea",
    source: "africa",
    ids: ["gn"],
    continent: "Africa",
    choiceGroup: "West Africa",
    minDifficulty: 3,
  },
  Benin: {
    slug: "benin",
    source: "africa",
    ids: ["bj"],
    continent: "Africa",
    choiceGroup: "West Africa",
    minDifficulty: 3,
  },
  Rwanda: {
    slug: "rwanda",
    source: "africa",
    ids: ["rw"],
    continent: "Africa",
    choiceGroup: "East Africa",
    minDifficulty: 4,
  },
  Burundi: {
    slug: "burundi",
    source: "africa",
    ids: ["bi"],
    continent: "Africa",
    choiceGroup: "East Africa",
    minDifficulty: 4,
  },
  Bolivia: {
    slug: "bolivia",
    source: "americas",
    ids: ["bo"],
    continent: "South America",
    choiceGroup: "South America",
    minDifficulty: 2,
  },
  "South Sudan": {
    slug: "south-sudan",
    source: "africa",
    ids: ["ss"],
    continent: "Africa",
    choiceGroup: "East Africa",
    minDifficulty: 3,
  },
  Tunisia: {
    slug: "tunisia",
    source: "africa",
    ids: ["tn"],
    continent: "Africa",
    choiceGroup: "North Africa",
    minDifficulty: 2,
  },
  Libya: {
    slug: "libya",
    source: "africa",
    ids: ["ly"],
    continent: "Africa",
    choiceGroup: "North Africa",
    minDifficulty: 3,
  },
  Haiti: {
    slug: "haiti",
    source: "americas",
    ids: ["ht"],
    continent: "North America",
    choiceGroup: "Caribbean",
    minDifficulty: 3,
  },
  Belgium: {
    slug: "belgium",
    source: "europe",
    ids: ["be"],
    continent: "Europe",
    choiceGroup: "Europe",
    minDifficulty: 3,
  },
  "Dominican Republic": {
    slug: "dominican-republic",
    source: "americas",
    ids: ["do"],
    continent: "North America",
    choiceGroup: "Caribbean",
    minDifficulty: 3,
  },
  Jordan: {
    slug: "jordan",
    source: "asia",
    ids: ["Jordan"],
    continent: "Asia",
    choiceGroup: "Middle East",
    minDifficulty: 4,
  },
  "United Arab Emirates": {
    slug: "united-arab-emirates",
    source: "asia",
    ids: ["United_Arab_Emirates"],
    continent: "Asia",
    choiceGroup: "Middle East",
    minDifficulty: 4,
  },
  Honduras: {
    slug: "honduras",
    source: "americas",
    ids: ["hn"],
    continent: "North America",
    choiceGroup: "Central America",
    minDifficulty: 3,
  },
  Tajikistan: {
    slug: "tajikistan",
    source: "asia",
    ids: ["Tajikistan"],
    continent: "Asia",
    choiceGroup: "Central Asia",
    minDifficulty: 4,
  },
  "Papua New Guinea": {
    slug: "papua-new-guinea",
    source: "oceania-png",
    ids: ["Papua_1_"],
    continent: "Oceania",
    choiceGroup: "Oceania",
    minDifficulty: 3,
  },
  Cuba: {
    slug: "cuba",
    source: "americas",
    ids: ["cu"],
    continent: "North America",
    choiceGroup: "Caribbean",
    minDifficulty: 2,
  },
  Sweden: {
    slug: "sweden",
    source: "europe",
    ids: ["se"],
    continent: "Europe",
    choiceGroup: "Europe",
    minDifficulty: 2,
  },
  Czechia: {
    slug: "czechia",
    source: "europe",
    ids: ["cz"],
    continent: "Europe",
    choiceGroup: "Europe",
    minDifficulty: 4,
  },
  Azerbaijan: {
    slug: "azerbaijan",
    source: "asia",
    ids: ["Azerbaijan"],
    continent: "Asia",
    choiceGroup: "Central Asia",
    minDifficulty: 4,
  },
  Portugal: {
    slug: "portugal",
    source: "europe",
    ids: ["pt"],
    continent: "Europe",
    choiceGroup: "Europe",
    minDifficulty: 3,
  },
  Togo: {
    slug: "togo",
    source: "africa",
    ids: ["tg"],
    continent: "Africa",
    choiceGroup: "West Africa",
    minDifficulty: 4,
  },
  Greece: {
    slug: "greece",
    source: "europe",
    ids: ["gr"],
    continent: "Europe",
    choiceGroup: "Europe",
    minDifficulty: 3,
  },
  Israel: {
    slug: "israel",
    source: "asia",
    ids: ["Israel"],
    continent: "Asia",
    choiceGroup: "Middle East",
    minDifficulty: 5,
  },
  Hungary: {
    slug: "hungary",
    source: "europe",
    ids: ["hu"],
    continent: "Europe",
    choiceGroup: "Europe",
    minDifficulty: 4,
  },
  Austria: {
    slug: "austria",
    source: "europe",
    ids: ["at"],
    continent: "Europe",
    choiceGroup: "Europe",
    minDifficulty: 4,
  },
  Switzerland: {
    slug: "switzerland",
    source: "europe",
    ids: ["ch"],
    continent: "Europe",
    choiceGroup: "Europe",
    minDifficulty: 4,
  },
};

function main() {
  const sourceSvgs = Object.fromEntries(
    Object.entries(SOURCE_FILES).map(([key, filePath]) => [key, fs.readFileSync(filePath, "utf8")])
  );
  const sourceIds = {
    europe: collectIds(sourceSvgs.europe),
    americas: collectIds(sourceSvgs.americas),
    africa: collectIds(sourceSvgs.africa),
    asia: collectIds(sourceSvgs.asia),
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const manifest = TOP_COUNTRY_ENTRIES.map((entry) => {
    const spec = resolveCountrySpec(entry.country);
    if (!spec) {
      throw new Error(`Missing country spec for ${entry.country}`);
    }

    if (sourceIds[spec.source]) {
      spec.ids.forEach((id) => {
        if (!sourceIds[spec.source].has(id)) {
          throw new Error(`Missing id "${id}" in ${spec.source} map for ${entry.country}`);
        }
      });
    }

    const svg = buildCountrySvg(sourceSvgs[spec.source], spec);
    const outputPath = path.join(OUTPUT_DIR, `${spec.slug}.svg`);
    fs.writeFileSync(outputPath, svg);

    return {
      country: entry.country,
      rank: entry.rank,
      slug: spec.slug,
      continent: spec.continent,
      choiceGroup: spec.choiceGroup,
      minDifficulty: spec.minDifficulty,
      assetPath: `app/assets/geography-maps/${spec.slug}.svg`,
    };
  });

  const fileContents = [
    "// Generated by app/scripts/build_geography_map_assets.js",
    `const GEOGRAPHY_MAP_SNAPSHOT_DATE = "${SNAPSHOT_DATE}";`,
    `const GEOGRAPHY_MAP_COUNTRIES = ${JSON.stringify(manifest, null, 2)};`,
    "",
    "globalThis.GEOGRAPHY_MAP_SNAPSHOT_DATE = GEOGRAPHY_MAP_SNAPSHOT_DATE;",
    "globalThis.GEOGRAPHY_MAP_COUNTRIES = GEOGRAPHY_MAP_COUNTRIES;",
    "",
    'if (typeof module !== "undefined" && module.exports) {',
    "  module.exports = {",
    "    GEOGRAPHY_MAP_SNAPSHOT_DATE,",
    "    GEOGRAPHY_MAP_COUNTRIES,",
    "  };",
    "}",
    "",
  ].join("\n");

  fs.writeFileSync(OUTPUT_DATA_FILE, fileContents);
  fs.writeFileSync(OUTPUT_GALLERY_FILE, buildGalleryHtml(manifest));

  console.log(`Generated ${manifest.length} geography map SVG files.`);
  console.log(`Wrote ${OUTPUT_DATA_FILE}`);
  console.log(`Wrote ${OUTPUT_GALLERY_FILE}`);
}

function resolveCountrySpec(country) {
  const spec = COUNTRY_SPECS[country];
  if (!spec) {
    return null;
  }

  if (spec.source === "asia" && ASIA_WORLD_ID_OVERRIDES[country]) {
    return {
      ...spec,
      ids: ASIA_WORLD_ID_OVERRIDES[country],
    };
  }

  return spec;
}

function collectIds(svg) {
  const ids = new Set();
  const pattern = /id="([^"]+)"/g;
  let match = pattern.exec(svg);

  while (match) {
    ids.add(match[1]);
    match = pattern.exec(svg);
  }

  return ids;
}

function buildCountrySvg(baseSvg, spec) {
  switch (spec.source) {
    case "europe":
      return injectSvgStyle(
        baseSvg,
        `${selectorsForIds(spec.ids)}{fill:${BLUE} !important;stroke:${WHITE};stroke-width:0.4}`
      );
    case "americas":
      return injectSvgStyle(
        baseSvg,
        [
          `.land{fill:${GREY} !important;stroke:${WHITE} !important;stroke-width:0.8 !important}`,
          `.coast{fill:${GREY} !important}`,
          `.ocean,#ocean{fill:${OCEAN} !important}`,
          `${selectorsForIds(spec.ids)}{fill:${BLUE} !important}`,
        ].join("\n")
      );
    case "africa":
      return injectSvgStyle(
        baseSvg,
        [
          `.land{fill:${GREY} !important;stroke:${WHITE} !important;stroke-width:0.8 !important}`,
          `.coast{fill:${GREY} !important}`,
          `${selectorsForIds(spec.ids)}{fill:${BLUE} !important}`,
        ].join("\n")
      );
    case "asia":
      return injectSvgStyle(
        baseSvg,
        [
          `.landxx{fill:${GREY} !important;stroke:${WHITE} !important;stroke-width:0.5 !important}`,
          `.coastxx{fill:${GREY} !important}`,
          `.oceanxx,#ocean{fill:${OCEAN} !important;stroke:none !important}`,
          `.circlexx,.subxx,.antxx,.noxx,.limitxx,.unxx{opacity:0 !important}`,
          `${selectorsForIds(spec.ids)}{fill:${BLUE} !important;stroke:${WHITE} !important;stroke-width:0.5 !important}`,
        ].join("\n")
      );
    case "oceania-australia":
    case "oceania-png":
      return injectSvgStyle(
        baseSvg,
        [
          `[fill="#FEFEE4"]{fill:${GREY} !important;stroke:${WHITE} !important;stroke-width:0.8 !important}`,
          `[fill="#C12737"]{fill:${BLUE} !important;stroke:${WHITE} !important;stroke-width:0.8 !important}`,
          `#ocean,[fill="#C8EBFF"]{fill:${OCEAN} !important}`,
        ].join("\n")
      );
    default:
      throw new Error(`Unknown source: ${spec.source}`);
  }
}

function selectorsForIds(ids) {
  return ids.map((id) => `#${escapeCssId(id)},#${escapeCssId(id)} *`).join(",");
}

function escapeCssId(value) {
  return value.replaceAll(".", "\\.").replaceAll(":", "\\:");
}

function injectSvgStyle(svg, styleText) {
  const styleTag = `\n<style id="homework-country-highlight">\n${styleText}\n</style>\n`;

  if (svg.includes("</defs>")) {
    return svg.replace("</defs>", `</defs>${styleTag}`);
  }

  return svg.replace(/<svg\b[^>]*>/, (match) => `${match}${styleTag}`);
}

function buildGalleryHtml(manifest) {
  const cards = manifest
    .map(
      (entry) => `
        <article class="card">
          <img src="geography-maps/${entry.slug}.svg" alt="${escapeHtml(
            `${entry.country} shaded blue on a regional map`
          )}">
          <div class="meta">
            <div class="rank">#${entry.rank}</div>
            <h2>${escapeHtml(entry.country)}</h2>
            <p>${escapeHtml(entry.continent)} · ${escapeHtml(entry.choiceGroup)} · level ${entry.minDifficulty}+</p>
          </div>
        </article>
      `
    )
    .join("\n");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Geography Map Gallery</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f6efe2;
        --card: #ffffff;
        --ink: #22314a;
        --muted: #5f6f84;
        --line: rgba(34, 49, 74, 0.12);
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: "Trebuchet MS", "Segoe UI", sans-serif;
        color: var(--ink);
        background:
          radial-gradient(circle at top, rgba(47, 128, 255, 0.12), transparent 28%),
          linear-gradient(180deg, #f8f3e8, var(--bg));
      }

      main {
        max-width: 1500px;
        margin: 0 auto;
        padding: 28px 20px 48px;
      }

      h1 {
        margin: 0 0 8px;
        font-size: clamp(2rem, 4vw, 3rem);
      }

      .intro {
        margin: 0 0 24px;
        color: var(--muted);
        font-size: 1.05rem;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 18px;
      }

      .card {
        margin: 0;
        background: rgba(255, 255, 255, 0.92);
        border: 1px solid var(--line);
        border-radius: 22px;
        overflow: hidden;
        box-shadow: 0 14px 30px rgba(34, 49, 74, 0.08);
      }

      .card img {
        display: block;
        width: 100%;
        height: 240px;
        object-fit: contain;
        background: linear-gradient(180deg, #f9fcff, #ffffff);
      }

      .meta {
        padding: 14px 16px 18px;
      }

      .rank {
        color: #2f80ff;
        font-weight: 800;
        letter-spacing: 0.03em;
      }

      .meta h2 {
        margin: 6px 0 6px;
        font-size: 1.2rem;
      }

      .meta p {
        margin: 0;
        color: var(--muted);
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Geography Map Gallery</h1>
      <p class="intro">Generated map set for the top 100 countries by population, frozen to the ${SNAPSHOT_DATE} snapshot. Every country is shaded in the same blue used for the Italy sample.</p>
      <section class="grid">
        ${cards}
      </section>
    </main>
  </body>
</html>
`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

main();
