const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const APP_DIR = path.join(ROOT, "app");
const ASSETS_DIR = path.join(APP_DIR, "assets");
const OUTPUT_DATA_FILE = path.join(APP_DIR, "questions", "geography", "geography-map-data.js");
const OUTPUT_GALLERY_FILE = path.join(ASSETS_DIR, "geography-map-gallery.html");

const SNAPSHOT_DATE = "2026-04-13";
const RENDER_MODE = "shared-base";
const SOURCE_VIEWBOXES = {};
const COUNTRY_VIEWBOX_OVERRIDES = {
  Canada: "0 -300 2752.766 1837.631",
};

const {
  SOURCE_FILES,
  TOP_COUNTRY_ENTRIES,
  resolveCountrySpec,
  collectIds,
} = require("./build_geography_map_assets.js");

function cleanSvgForInlineUse(svg) {
  return svg
    .replace(/<\?xml[\s\S]*?\?>\s*/g, "")
    .replace(/<!--[\s\S]*?-->\s*/g, "")
    .replace(/<metadata[\s\S]*?<\/metadata>\s*/g, "")
    .replace(/<sodipodi:namedview[\s\S]*?\/>\s*/g, "")
    .replace(/>\s+</g, "><")
    .trim();
}

function ensureViewBox(svg) {
  if (/viewBox=/.test(svg)) {
    return svg;
  }

  const widthMatch = svg.match(/\bwidth="([0-9.]+)"/);
  const heightMatch = svg.match(/\bheight="([0-9.]+)"/);
  if (!widthMatch || !heightMatch) {
    return svg;
  }

  const width = Number.parseFloat(widthMatch[1]);
  const height = Number.parseFloat(heightMatch[1]);
  if (!Number.isFinite(width) || !Number.isFinite(height)) {
    return svg;
  }

  return svg.replace(
    /<svg\b/,
    `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet"`
  );
}

function buildManifest(sourceIds) {
  return TOP_COUNTRY_ENTRIES.map((entry) => {
    const spec = resolveCountrySpec(entry.country);
    if (!spec) {
      throw new Error(`Missing country spec for ${entry.country}`);
    }

    const ids = Array.isArray(spec.ids) ? spec.ids.slice() : [];
    if (sourceIds[spec.source]) {
      ids.forEach((id) => {
        if (!sourceIds[spec.source].has(id)) {
          throw new Error(`Missing id "${id}" in ${spec.source} map for ${entry.country}`);
        }
      });
    }

    const manifestEntry = {
      country: entry.country,
      rank: entry.rank,
      slug: spec.slug,
      continent: spec.continent,
      choiceGroup: spec.choiceGroup,
      minDifficulty: spec.minDifficulty,
      source: spec.source,
      ids,
    };

    if (COUNTRY_VIEWBOX_OVERRIDES[entry.country]) {
      manifestEntry.viewBoxOverride = COUNTRY_VIEWBOX_OVERRIDES[entry.country];
    }

    return manifestEntry;
  });
}

function buildGalleryHtml() {
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
        background: radial-gradient(circle at top, #fffaf0, var(--bg));
        color: var(--ink);
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      }

      main {
        max-width: 1360px;
        margin: 0 auto;
        padding: 32px 20px 48px;
      }

      h1 {
        margin: 0 0 10px;
        font-size: clamp(1.9rem, 3vw, 2.5rem);
      }

      .intro {
        margin: 0 0 28px;
        max-width: 860px;
        color: var(--muted);
        line-height: 1.6;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 18px;
      }

      .card {
        border: 1px solid var(--line);
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.9);
        padding: 18px;
        box-shadow: 0 16px 40px rgba(34, 49, 74, 0.08);
      }

      .card h2 {
        margin: 8px 0 6px;
        font-size: 1.2rem;
      }

      .rank {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 999px;
        background: #e9f1fb;
        color: #24507a;
        font-size: 0.85rem;
        font-weight: 700;
      }

      .meta {
        margin: 10px 0 0;
        color: var(--muted);
        font-size: 0.95rem;
      }

      .card .visual-card {
        margin-top: 14px;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Geography Map Gallery</h1>
      <p class="intro">Shared-base geography map rendering for the top 101 countries by population, frozen to the ${SNAPSHOT_DATE} snapshot.</p>
      <section class="grid" id="gallery"></section>
    </main>
    <script src="../questions/geography/geography-map-data.js"></script>
    <script src="../questions/geography/geography-map.js"></script>
    <script>
      const gallery = document.getElementById("gallery");
      const entries = Array.isArray(window.GEOGRAPHY_MAP_COUNTRIES) ? window.GEOGRAPHY_MAP_COUNTRIES : [];
      const renderVisual = typeof window.renderGeographyMapVisualHtml === "function"
        ? window.renderGeographyMapVisualHtml
        : () => "<p>Renderer unavailable.</p>";

      entries.forEach((entry) => {
        const card = document.createElement("article");
        card.className = "card";
        card.innerHTML = \`
          <div class="rank">#\${entry.rank}</div>
          <h2></h2>
          \${renderVisual(entry)}
          <p class="meta"></p>
        \`;
        card.querySelector("h2").textContent = entry.country;
        card.querySelector(".meta").textContent = \`\${entry.continent} · \${entry.choiceGroup} · level \${entry.minDifficulty}+\`;
        gallery.appendChild(card);
      });
    </script>
  </body>
</html>
`;
}

function main() {
  const sourceSvgs = Object.fromEntries(
    Object.entries(SOURCE_FILES).map(([key, filePath]) => [
      key,
      ensureViewBox(cleanSvgForInlineUse(fs.readFileSync(filePath, "utf8"))),
    ])
  );
  const sourceIds = Object.fromEntries(
    Object.entries(sourceSvgs).map(([key, svg]) => [key, collectIds(svg)])
  );
  const manifest = buildManifest(sourceIds);

  const fileContents = [
    "// Generated by app/scripts/build_geography_map_data.js",
    `const GEOGRAPHY_MAP_SNAPSHOT_DATE = "${SNAPSHOT_DATE}";`,
    `const GEOGRAPHY_MAP_RENDER_MODE = "${RENDER_MODE}";`,
    `const GEOGRAPHY_MAP_SVG_SOURCES = ${JSON.stringify(sourceSvgs)};`,
    `const GEOGRAPHY_MAP_SVG_VIEWBOXES = ${JSON.stringify(SOURCE_VIEWBOXES)};`,
    `const GEOGRAPHY_MAP_COUNTRIES = ${JSON.stringify(manifest, null, 2)};`,
    "",
    "globalThis.GEOGRAPHY_MAP_SNAPSHOT_DATE = GEOGRAPHY_MAP_SNAPSHOT_DATE;",
    "globalThis.GEOGRAPHY_MAP_RENDER_MODE = GEOGRAPHY_MAP_RENDER_MODE;",
    "globalThis.GEOGRAPHY_MAP_SVG_SOURCES = GEOGRAPHY_MAP_SVG_SOURCES;",
    "globalThis.GEOGRAPHY_MAP_SVG_VIEWBOXES = GEOGRAPHY_MAP_SVG_VIEWBOXES;",
    "globalThis.GEOGRAPHY_MAP_COUNTRIES = GEOGRAPHY_MAP_COUNTRIES;",
    "",
    'if (typeof module !== "undefined" && module.exports) {',
    "  module.exports = {",
    "    GEOGRAPHY_MAP_SNAPSHOT_DATE,",
    "    GEOGRAPHY_MAP_RENDER_MODE,",
    "    GEOGRAPHY_MAP_SVG_SOURCES,",
    "    GEOGRAPHY_MAP_SVG_VIEWBOXES,",
    "    GEOGRAPHY_MAP_COUNTRIES,",
    "  };",
    "}",
    "",
  ].join("\n");

  fs.writeFileSync(OUTPUT_DATA_FILE, fileContents);
  fs.writeFileSync(OUTPUT_GALLERY_FILE, buildGalleryHtml());

  console.log(`Generated shared-base data for ${manifest.length} geography maps.`);
  console.log(`Wrote ${OUTPUT_DATA_FILE}`);
  console.log(`Wrote ${OUTPUT_GALLERY_FILE}`);
}

main();
