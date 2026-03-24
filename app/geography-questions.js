// Geography questions frozen to the 2026-03-23 top-50 population snapshot.
const GEOGRAPHY_SNAPSHOT_DATE = "2026-03-23";

const GEOGRAPHY_QUESTIONS = (() => {
  const GEOGRAPHY_CONTINENTS = [
    "North America",
    "South America",
    "Europe",
    "Africa",
    "Asia",
    "Australia",
    "Antarctica",
  ];

  const GEOGRAPHY_CAPITAL_COUNTRIES = [
    { country: "India", capital: "New Delhi", region: "South Asia", rank: 1 },
    { country: "China", capital: "Beijing", region: "East Asia", rank: 2 },
    { country: "United States", capital: "Washington, D.C.", region: "North America", rank: 3 },
    { country: "Indonesia", capital: "Jakarta", region: "Southeast Asia", rank: 4 },
    { country: "Pakistan", capital: "Islamabad", region: "South Asia", rank: 5 },
    { country: "Nigeria", capital: "Abuja", region: "Africa", rank: 6 },
    { country: "Brazil", capital: "Brasilia", region: "South America", rank: 7 },
    { country: "Bangladesh", capital: "Dhaka", region: "South Asia", rank: 8 },
    { country: "Russia", capital: "Moscow", region: "Europe", rank: 9 },
    { country: "Ethiopia", capital: "Addis Ababa", region: "Africa", rank: 10 },
    { country: "Mexico", capital: "Mexico City", region: "North America", rank: 11 },
    { country: "Japan", capital: "Tokyo", region: "East Asia", rank: 12 },
    { country: "Egypt", capital: "Cairo", region: "Africa", rank: 13 },
    { country: "Philippines", capital: "Manila", region: "Southeast Asia", rank: 14 },
    { country: "DR Congo", capital: "Kinshasa", region: "Africa", rank: 15 },
    { country: "Vietnam", capital: "Hanoi", region: "Southeast Asia", rank: 16 },
    { country: "Iran", capital: "Tehran", region: "Middle East", rank: 17 },
    { country: "Turkey", capital: "Ankara", region: "Middle East", rank: 18 },
    { country: "Germany", capital: "Berlin", region: "Europe", rank: 19 },
    { country: "Thailand", capital: "Bangkok", region: "Southeast Asia", rank: 20 },
    { country: "United Kingdom", capital: "London", region: "Europe", rank: 21 },
    { country: "Tanzania", capital: "Dodoma", region: "Africa", rank: 22 },
    { country: "France", capital: "Paris", region: "Europe", rank: 23 },
    { country: "South Africa", capital: "Pretoria", region: "Africa", rank: 24 },
    { country: "Italy", capital: "Rome", region: "Europe", rank: 25 },
    { country: "Kenya", capital: "Nairobi", region: "Africa", rank: 26 },
    { country: "Myanmar", capital: "Naypyidaw", region: "Southeast Asia", rank: 27 },
    { country: "Colombia", capital: "Bogota", region: "South America", rank: 28 },
    { country: "South Korea", capital: "Seoul", region: "East Asia", rank: 29 },
    { country: "Sudan", capital: "Khartoum", region: "Africa", rank: 30 },
    { country: "Uganda", capital: "Kampala", region: "Africa", rank: 31 },
    { country: "Spain", capital: "Madrid", region: "Europe", rank: 32 },
    { country: "Algeria", capital: "Algiers", region: "Africa", rank: 33 },
    { country: "Iraq", capital: "Baghdad", region: "Middle East", rank: 34 },
    { country: "Argentina", capital: "Buenos Aires", region: "South America", rank: 35 },
    { country: "Afghanistan", capital: "Kabul", region: "South Asia", rank: 36 },
    { country: "Yemen", capital: "Sana'a", region: "Middle East", rank: 37 },
    { country: "Canada", capital: "Ottawa", region: "North America", rank: 38 },
    { country: "Poland", capital: "Warsaw", region: "Europe", rank: 39 },
    { country: "Morocco", capital: "Rabat", region: "Africa", rank: 40 },
    { country: "Angola", capital: "Luanda", region: "Africa", rank: 41 },
    { country: "Ukraine", capital: "Kyiv", region: "Europe", rank: 42 },
    { country: "Uzbekistan", capital: "Tashkent", region: "Central Asia", rank: 43 },
    { country: "Malaysia", capital: "Kuala Lumpur", region: "Southeast Asia", rank: 44 },
    { country: "Mozambique", capital: "Maputo", region: "Africa", rank: 45 },
    { country: "Ghana", capital: "Accra", region: "Africa", rank: 46 },
    { country: "Peru", capital: "Lima", region: "South America", rank: 47 },
    { country: "Saudi Arabia", capital: "Riyadh", region: "Middle East", rank: 48 },
    { country: "Madagascar", capital: "Antananarivo", region: "Africa", rank: 49 },
    { country: "Cote d'Ivoire", capital: "Yamoussoukro", region: "Africa", rank: 50 },
  ];

  const CONTINENT_SHAPES = [
    {
      name: "North America",
      shape: '<polygon points="56,92 84,52 136,38 186,44 220,70 213,102 184,116 155,146 110,138 70,122 52,106" />',
    },
    {
      name: "South America",
      shape: '<polygon points="156,154 184,146 205,168 196,199 212,242 192,295 164,326 146,286 153,238 136,206" />',
    },
    {
      name: "Europe",
      shape: '<polygon points="290,72 330,58 360,66 372,86 345,101 318,100 289,90 280,78" />',
    },
    {
      name: "Africa",
      shape: '<polygon points="320,110 360,114 391,152 384,205 356,281 324,238 312,174" />',
    },
    {
      name: "Asia",
      shape: '<polygon points="362,58 438,42 520,54 600,82 631,118 613,154 566,162 520,182 476,166 430,142 390,115 364,92" />',
    },
    {
      name: "Australia",
      shape: '<polygon points="520,230 562,232 592,255 586,292 548,304 514,284 506,252" />',
    },
    {
      name: "Antarctica",
      shape: '<polygon points="102,334 208,320 332,332 464,322 588,336 620,348 90,348" />',
    },
  ];

  const COUNTRY_MAP_TEMPLATES = [
    {
      name: "North America",
      title: "North America map",
      viewBox: "0 0 340 240",
      countries: [
        { name: "Canada", shapes: ['<polygon points="30,26 124,18 184,32 214,56 206,86 130,96 74,84 34,64" />'] },
        { name: "United States", shapes: ['<polygon points="54,96 132,92 194,104 212,126 172,154 98,152 50,130" />'] },
        { name: "Mexico", shapes: ['<polygon points="128,154 178,152 206,170 196,194 156,204 126,186 114,168" />'] },
      ],
    },
    {
      name: "South America",
      title: "South America map",
      viewBox: "0 0 320 260",
      countries: [
        { name: "Colombia", shapes: ['<polygon points="74,38 116,30 136,48 124,78 90,82 64,62" />'] },
        { name: "Peru", shapes: ['<polygon points="82,86 126,82 138,112 124,150 92,154 72,122" />'] },
        { name: "Brazil", shapes: ['<polygon points="136,60 220,54 250,102 226,166 162,180 122,132 126,92" />'] },
        { name: "Argentina", shapes: ['<polygon points="124,156 164,160 174,206 154,248 132,240 118,196" />'] },
      ],
    },
    {
      name: "Europe",
      title: "Europe map",
      viewBox: "0 0 360 240",
      countries: [
        { name: "United Kingdom", shapes: ['<polygon points="52,48 72,40 84,58 74,84 56,88 44,68" />'] },
        { name: "Spain", shapes: ['<polygon points="88,138 142,132 152,156 104,170 82,154" />'] },
        { name: "France", shapes: ['<polygon points="118,92 160,84 176,112 154,142 114,132 102,108" />'] },
        { name: "Germany", shapes: ['<polygon points="176,72 210,66 222,102 210,132 178,126 166,98" />'] },
        { name: "Italy", shapes: ['<polygon points="202,136 228,140 238,170 232,198 220,182 212,156" />'] },
        { name: "Poland", shapes: ['<polygon points="222,72 266,70 278,102 236,110 214,92" />'] },
        { name: "Ukraine", shapes: ['<polygon points="266,82 322,84 332,116 276,126 252,108" />'] },
      ],
    },
    {
      name: "North and West Africa",
      title: "Africa map",
      viewBox: "0 0 360 280",
      countries: [
        { name: "Morocco", shapes: ['<polygon points="48,46 84,42 94,68 66,80 44,66" />'] },
        { name: "Algeria", shapes: ['<polygon points="92,54 154,48 172,96 108,110 82,84" />'] },
        { name: "Ghana", shapes: ['<polygon points="132,144 156,142 162,174 138,184 124,164" />'] },
        { name: "Cote d'Ivoire", shapes: ['<polygon points="106,146 130,144 134,176 112,178 96,162" />'] },
        { name: "Nigeria", shapes: ['<polygon points="164,144 222,142 232,170 176,182 154,162" />'] },
        { name: "Egypt", shapes: ['<polygon points="226,78 274,76 286,108 238,114 218,96" />'] },
        { name: "Sudan", shapes: ['<polygon points="224,114 274,112 286,160 236,176 212,142" />'] },
      ],
    },
    {
      name: "East and Southern Africa",
      title: "Africa map",
      viewBox: "0 0 360 300",
      countries: [
        { name: "Ethiopia", shapes: ['<polygon points="178,62 222,60 236,88 206,104 170,90" />'] },
        { name: "Uganda", shapes: ['<polygon points="178,108 202,108 206,136 182,136" />'] },
        { name: "Kenya", shapes: ['<polygon points="206,104 236,108 238,156 210,154" />'] },
        { name: "Tanzania", shapes: ['<polygon points="190,156 246,156 252,206 202,214 178,184" />'] },
        { name: "DR Congo", shapes: ['<polygon points="118,128 182,126 192,182 130,188 102,160" />'] },
        { name: "Angola", shapes: ['<polygon points="118,188 176,188 188,230 130,236 108,210" />'] },
        { name: "Mozambique", shapes: ['<polygon points="252,168 274,174 282,236 264,262 246,234 244,194" />'] },
        { name: "South Africa", shapes: ['<polygon points="152,236 224,236 244,264 198,284 144,270 132,248" />'] },
        { name: "Madagascar", shapes: ['<polygon points="300,202 318,214 322,254 308,282 292,248" />'] },
      ],
    },
    {
      name: "Middle East and Central Asia",
      title: "Middle East map",
      viewBox: "0 0 360 240",
      countries: [
        { name: "Turkey", shapes: ['<polygon points="42,64 112,54 142,72 126,92 56,94 34,80" />'] },
        { name: "Iraq", shapes: ['<polygon points="136,90 176,88 182,126 146,134 130,110" />'] },
        { name: "Iran", shapes: ['<polygon points="180,76 248,74 266,124 206,142 174,114" />'] },
        { name: "Saudi Arabia", shapes: ['<polygon points="118,128 186,128 202,186 142,206 102,164" />'] },
        { name: "Yemen", shapes: ['<polygon points="146,190 186,188 194,208 160,216 136,206" />'] },
        { name: "Uzbekistan", shapes: ['<polygon points="218,44 286,46 300,72 242,84 208,68" />'] },
      ],
    },
    {
      name: "South Asia",
      title: "South Asia map",
      viewBox: "0 0 320 240",
      countries: [
        { name: "Afghanistan", shapes: ['<polygon points="44,52 96,46 112,72 72,92 38,74" />'] },
        { name: "Pakistan", shapes: ['<polygon points="78,84 116,78 132,132 110,176 84,160 72,122" />'] },
        { name: "India", shapes: ['<polygon points="126,92 194,96 210,132 176,204 136,176 118,136" />'] },
        { name: "Bangladesh", shapes: ['<polygon points="196,112 214,112 220,138 198,142 188,126" />'] },
      ],
    },
    {
      name: "East Asia",
      title: "East Asia map",
      viewBox: "0 0 360 240",
      countries: [
        { name: "Russia", shapes: ['<polygon points="28,34 164,24 252,38 310,52 286,82 186,88 90,78 38,56" />'] },
        { name: "China", shapes: ['<polygon points="102,92 202,86 244,118 224,158 148,168 92,136" />'] },
        { name: "South Korea", shapes: ['<polygon points="246,104 264,102 268,130 250,136" />'] },
        {
          name: "Japan",
          shapes: [
            '<polygon points="286,102 300,112 296,132 284,122" />',
            '<polygon points="302,138 314,148 308,166 298,154" />',
          ],
        },
      ],
    },
    {
      name: "Southeast Asia",
      title: "Southeast Asia map",
      viewBox: "0 0 360 260",
      countries: [
        { name: "Myanmar", shapes: ['<polygon points="88,54 126,50 136,108 110,142 82,108" />'] },
        { name: "Thailand", shapes: ['<polygon points="128,82 162,80 168,126 150,158 126,132" />'] },
        { name: "Vietnam", shapes: ['<polygon points="176,76 198,80 206,144 188,182 176,152 182,110" />'] },
        { name: "Malaysia", shapes: ['<polygon points="150,160 172,162 176,194 158,202 144,184" />'] },
        {
          name: "Indonesia",
          shapes: [
            '<polygon points="158,212 196,210 214,218 178,224 150,220" />',
            '<polygon points="220,218 258,216 278,224 236,230 214,226" />',
          ],
        },
        {
          name: "Philippines",
          shapes: [
            '<polygon points="234,108 246,116 242,132 230,126" />',
            '<polygon points="248,138 258,146 254,162 244,154" />',
          ],
        },
      ],
    },
  ];

  const EASY_COUNTRY_MAPS = COUNTRY_MAP_TEMPLATES.filter((template) =>
    ["North America", "South America", "South Asia", "East Asia"].includes(template.name)
  );

  const HARD_COUNTRY_MAPS = COUNTRY_MAP_TEMPLATES.filter((template) =>
    [
      "Europe",
      "North and West Africa",
      "East and Southern Africa",
      "Middle East and Central Asia",
      "Southeast Asia",
    ].includes(template.name)
  );

  const COUNTRY_NAMES = COUNTRY_MAP_TEMPLATES.flatMap((template) =>
    template.countries.map((country) => country.name)
  );

  function clampDifficulty(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) {
      return 3;
    }
    return Math.max(1, Math.min(5, Math.round(numeric)));
  }

  function randomChoice(values) {
    return values[Math.floor(Math.random() * values.length)];
  }

  function shuffle(values) {
    const copy = values.slice();
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      const current = copy[index];
      copy[index] = copy[swapIndex];
      copy[swapIndex] = current;
    }
    return copy;
  }

  function unique(values) {
    return Array.from(new Set(values));
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function buildVisualCard(title, subtitle, svgHtml) {
    return `
      <div style="max-width:460px;margin:0 auto;border:2px solid #23496f;border-radius:18px;background:#ffffff;box-shadow:0 10px 24px rgba(35,73,111,0.12);overflow:hidden">
        <div style="padding:12px 16px 4px 16px;font-weight:700;color:#16324f;font-size:1rem">${escapeHtml(title)}</div>
        <div style="padding:0 16px 8px 16px;color:#486581;font-size:0.92rem">${escapeHtml(subtitle)}</div>
        <div style="padding:0 12px 12px 12px">${svgHtml}</div>
      </div>
    `;
  }

  function addShapePaint(shape, fill, strokeWidth) {
    return shape.replace(
      "/>",
      ` fill="${fill}" stroke="#23496f" stroke-width="${strokeWidth}" stroke-linejoin="round" />`
    );
  }

  function buildOptions(answer, preferredPool, fallbackPool) {
    const distractors = unique([...(preferredPool || []), ...(fallbackPool || [])].map(String)).filter(
      (option) => option && option !== answer
    );
    const chosen = shuffle(distractors).slice(0, 3);
    return shuffle([answer, ...chosen]);
  }

  function buildContinentSvg(targetName) {
    const mutedFill = "#dbe9f7";
    const targetFill = "#ffb347";
    const strokeWidth = 3;
    const continents = CONTINENT_SHAPES.map((continent) => {
      const fill = continent.name === targetName ? targetFill : mutedFill;
      return addShapePaint(continent.shape, fill, strokeWidth);
    }).join("");

    return `
      <svg viewBox="0 0 720 380" role="img" aria-label="${escapeHtml(
        `World map with ${targetName} shaded`
      )}" style="width:100%;height:auto;display:block">
        <defs>
          <linearGradient id="geoOcean" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f5fbff"></stop>
            <stop offset="100%" stop-color="#eaf4ff"></stop>
          </linearGradient>
        </defs>
        <rect x="10" y="10" width="700" height="360" rx="22" fill="url(#geoOcean)" stroke="#23496f" stroke-width="2"></rect>
        <ellipse cx="360" cy="186" rx="310" ry="126" fill="none" stroke="#b8d4eb" stroke-width="2" stroke-dasharray="8 10"></ellipse>
        <path d="M80 132 C 180 88, 260 78, 360 84 S 540 100, 650 140" fill="none" stroke="#c9def0" stroke-width="2"></path>
        <path d="M88 246 C 200 206, 282 196, 360 200 S 520 218, 636 254" fill="none" stroke="#c9def0" stroke-width="2"></path>
        ${continents}
      </svg>
    `;
  }

  function buildCountryMapSvg(mapTemplate, targetName) {
    const mutedFill = "#dbe9f7";
    const targetFill = "#ffb347";
    const strokeWidth = 2.5;
    const width = viewBoxWidth(mapTemplate.viewBox) - 16;
    const height = viewBoxHeight(mapTemplate.viewBox) - 16;
    const countryShapes = mapTemplate.countries
      .map((country) => {
        const fill = country.name === targetName ? targetFill : mutedFill;
        return country.shapes
          .map((shape) => addShapePaint(shape, fill, strokeWidth))
          .join("");
      })
      .join("");

    return `
      <svg viewBox="${mapTemplate.viewBox}" role="img" aria-label="${escapeHtml(
        `${mapTemplate.name} map with ${targetName} shaded`
      )}" style="width:100%;height:auto;display:block">
        <rect x="8" y="8" width="${width}" height="${height}" rx="18" fill="#f5fbff" stroke="#23496f" stroke-width="2"></rect>
        <ellipse cx="${Math.round(width / 2) + 8}" cy="${Math.round(height / 2) + 8}" rx="${
      Math.max(60, Math.round(width * 0.35))
    }" ry="${Math.max(40, Math.round(height * 0.26))}" fill="none" stroke="#c8dfef" stroke-width="2" stroke-dasharray="8 10"></ellipse>
        ${countryShapes}
      </svg>
    `;
  }

  function viewBoxWidth(viewBox) {
    return Number(viewBox.split(" ")[2]);
  }

  function viewBoxHeight(viewBox) {
    return Number(viewBox.split(" ")[3]);
  }

  function pickContinentName(difficulty) {
    const easyContinents = GEOGRAPHY_CONTINENTS.filter((name) => name !== "Antarctica");
    const hardContinents = GEOGRAPHY_CONTINENTS.slice();
    const pool = difficulty <= 2 ? easyContinents : hardContinents;
    return randomChoice(pool);
  }

  function pickCountryMapTemplate(difficulty) {
    if (difficulty <= 2) {
      return randomChoice(EASY_COUNTRY_MAPS);
    }
    if (difficulty === 3) {
      return randomChoice(COUNTRY_MAP_TEMPLATES);
    }
    return randomChoice(HARD_COUNTRY_MAPS.concat(EASY_COUNTRY_MAPS));
  }

  function findCountryMapTemplate(countryName) {
    return COUNTRY_MAP_TEMPLATES.find((template) =>
      template.countries.some((country) => country.name === countryName)
    );
  }

  function pickCapitalDirection(difficulty) {
    if (difficulty <= 2) {
      return "forward";
    }
    if (difficulty === 3) {
      return randomChoice(["forward", "reverse"]);
    }
    return randomChoice(["reverse", "reverse", "forward"]);
  }

  function pickCapitalEntry(difficulty, direction) {
    const easyEntries = GEOGRAPHY_CAPITAL_COUNTRIES.filter((entry) => entry.rank <= 20);
    const mediumEntries = GEOGRAPHY_CAPITAL_COUNTRIES.filter(
      (entry) => entry.rank > 20 && entry.rank <= 35
    );
    const hardEntries = GEOGRAPHY_CAPITAL_COUNTRIES.filter((entry) => entry.rank > 35);

    if (direction === "forward") {
      if (difficulty <= 2) {
        return randomChoice(easyEntries);
      }
      if (difficulty === 3) {
        return randomChoice(easyEntries.concat(mediumEntries));
      }
      return randomChoice(mediumEntries.concat(hardEntries, easyEntries));
    }

    if (difficulty <= 2) {
      return randomChoice(easyEntries);
    }
    if (difficulty === 3) {
      return randomChoice(easyEntries.concat(mediumEntries));
    }
    return randomChoice(mediumEntries.concat(hardEntries, easyEntries));
  }

  function buildContinentQuestion(difficulty, targetName) {
    const level = clampDifficulty(difficulty);
    const answer = targetName || pickContinentName(level);
    const options = buildOptions(
      answer,
      GEOGRAPHY_CONTINENTS.filter((name) => name !== answer),
      GEOGRAPHY_CONTINENTS
    );

    return {
      type: "geography-choice",
      difficulty: level,
      mode: "choice",
      question: "Which continent is shaded on the world map?",
      options,
      answer,
      visualHtml: buildVisualCard(
        "World map",
        "One continent is shaded.",
        buildContinentSvg(answer)
      ),
      visualSummary: `A world map with ${answer} shaded.`,
    };
  }

  function buildCountryQuestion(difficulty, targetCountry, templateName) {
    const level = clampDifficulty(difficulty);
    const template =
      (templateName && COUNTRY_MAP_TEMPLATES.find((item) => item.name === templateName)) ||
      (targetCountry ? findCountryMapTemplate(targetCountry) : null) ||
      pickCountryMapTemplate(level);

    const target =
      (targetCountry && template.countries.find((country) => country.name === targetCountry)) ||
      randomChoice(template.countries);

    const answer = target.name;
    const options = buildOptions(
      answer,
      template.countries.map((country) => country.name),
      COUNTRY_NAMES
    );

    return {
      type: "geography-choice",
      difficulty: level,
      mode: "choice",
      question: "Which country is shaded on this map?",
      options,
      answer,
      visualHtml: buildVisualCard(
        template.title,
        `A simplified map of ${template.name} shows one country shaded.`,
        buildCountryMapSvg(template, answer)
      ),
      visualSummary: `A simplified ${template.name} map with ${answer} shaded.`,
    };
  }

  function buildCapitalQuestion(difficulty, forcedEntry, forcedDirection) {
    const level = clampDifficulty(difficulty);
    const direction = forcedDirection || pickCapitalDirection(level);
    const entry = forcedEntry || pickCapitalEntry(level, direction);
    const answer = direction === "forward" ? entry.capital : entry.country;
    const question =
      direction === "forward"
        ? `What is the capital city of ${entry.country}?`
        : `${entry.capital} is the capital city of which country?`;
    const preferredPool =
      direction === "forward"
        ? GEOGRAPHY_CAPITAL_COUNTRIES.filter(
            (item) => item.capital !== entry.capital && item.region === entry.region
          ).map((item) => item.capital)
        : GEOGRAPHY_CAPITAL_COUNTRIES.filter(
            (item) => item.country !== entry.country && item.region === entry.region
          ).map((item) => item.country);
    const fallbackPool =
      direction === "forward"
        ? GEOGRAPHY_CAPITAL_COUNTRIES.filter((item) => item.capital !== entry.capital).map(
            (item) => item.capital
          )
        : GEOGRAPHY_CAPITAL_COUNTRIES.filter((item) => item.country !== entry.country).map(
            (item) => item.country
          );

    return {
      type: "geography-choice",
      difficulty: level,
      mode: "choice",
      question,
      options: buildOptions(answer, preferredPool, fallbackPool),
      answer,
      extraText: `Snapshot date: ${GEOGRAPHY_SNAPSHOT_DATE}.`,
    };
  }

  function createContinentQuestion(question, answer, options, difficulty) {
    return {
      type: "geography-choice",
      difficulty,
      mode: "choice",
      question,
      options,
      answer,
      visualHtml: buildVisualCard(
        "World map",
        "One continent is shaded.",
        buildContinentSvg(answer)
      ),
      visualSummary: `A world map with ${answer} shaded.`,
    };
  }

  function createCountryQuestion(question, answer, options, difficulty, templateName) {
    const template = COUNTRY_MAP_TEMPLATES.find((item) => item.name === templateName);
    return {
      type: "geography-choice",
      difficulty,
      mode: "choice",
      question,
      options,
      answer,
      visualHtml: buildVisualCard(
        template.title,
        `A simplified map of ${template.name} shows one country shaded.`,
        buildCountryMapSvg(template, answer)
      ),
      visualSummary: `A simplified ${template.name} map with ${answer} shaded.`,
    };
  }

  function createCapitalQuestion(question, answer, options, difficulty) {
    return {
      type: "geography-choice",
      difficulty,
      mode: "choice",
      question,
      options,
      answer,
      extraText: `Snapshot date: ${GEOGRAPHY_SNAPSHOT_DATE}.`,
    };
  }

  function makeStaticContinent(question, answer, options, difficulty) {
    return createContinentQuestion(question, answer, options, difficulty);
  }

  function makeStaticCountry(question, answer, options, difficulty, templateName) {
    return createCountryQuestion(question, answer, options, difficulty, templateName);
  }

  function makeStaticCapital(question, answer, options, difficulty) {
    return createCapitalQuestion(question, answer, options, difficulty);
  }

  function generateQuestion(level) {
    return buildCapitalQuestion(level);
  }

  function buildGeneratedEntry(difficulty) {
    const level = clampDifficulty(difficulty);
    return generateQuestion(level);
  }

  globalThis.createGeographyGeneratedEntry = buildGeneratedEntry;

  return [
    makeStaticCapital(
      "What is the capital city of Japan?",
      "Tokyo",
      ["Tokyo", "Beijing", "Seoul", "Bangkok"],
      1
    ),
    makeStaticCapital(
      "What is the capital city of Canada?",
      "Ottawa",
      ["Ottawa", "Washington, D.C.", "Mexico City", "London"],
      1
    ),
    makeStaticCapital(
      "What is the capital city of Brazil?",
      "Brasilia",
      ["Brasilia", "Bogota", "Buenos Aires", "Lima"],
      2
    ),
    makeStaticCapital(
      "What is the capital city of India?",
      "New Delhi",
      ["New Delhi", "Dhaka", "Islamabad", "Bangkok"],
      2
    ),
    makeStaticCapital(
      "Jakarta is the capital city of which country?",
      "Indonesia",
      ["Indonesia", "Malaysia", "Thailand", "Philippines"],
      3
    ),
    makeStaticCapital(
      "Berlin is the capital city of which country?",
      "Germany",
      ["Germany", "Poland", "France", "Italy"],
      3
    ),
    makeStaticCapital(
      "Cairo is the capital city of which country?",
      "Egypt",
      ["Egypt", "Sudan", "Morocco", "Algeria"],
      4
    ),
    makeStaticCapital(
      "Ankara is the capital city of which country?",
      "Turkey",
      ["Turkey", "Iraq", "Iran", "Saudi Arabia"],
      4
    ),
    makeStaticCapital(
      "What is the capital city of Mexico?",
      "Mexico City",
      ["Mexico City", "Ottawa", "Washington, D.C.", "London"],
      4
    ),
    makeStaticCapital(
      "London is the capital city of which country?",
      "United Kingdom",
      ["United Kingdom", "Canada", "France", "Germany"],
      5
    ),
    makeStaticCapital(
      "What is the capital city of Nigeria?",
      "Abuja",
      ["Abuja", "Accra", "Nairobi", "Addis Ababa"],
      5
    ),
    makeStaticCapital(
      "Seoul is the capital city of which country?",
      "South Korea",
      ["South Korea", "Japan", "China", "Vietnam"],
      5
    ),
  ];
})();

globalThis.GEOGRAPHY_QUESTIONS = GEOGRAPHY_QUESTIONS;

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    GEOGRAPHY_QUESTIONS,
    createGeographyGeneratedEntry: globalThis.createGeographyGeneratedEntry,
  };
}
