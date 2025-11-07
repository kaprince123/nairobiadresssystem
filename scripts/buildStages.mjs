import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const CSV_PATH = path.join(ROOT_DIR, 'bus_stages_arranged_by_subcounty_and_distance.csv');
const OUTPUT_PATH = path.join(ROOT_DIR, 'widget', 'stages.json');

function normalizeName(name) {
  return name
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\b(\w)/g, (m) => m.toUpperCase());
}

async function main() {
  const csvBuffer = await fs.readFile(CSV_PATH);
  const raw = parse(csvBuffer, {
    columns: (header) => header.map((col) => {
      const cleaned = col.replace(/^"|"$/g, '').trim();
      const [name] = cleaned.split(',');
      return name.toLowerCase();
    }),
    skip_empty_lines: true,
    trim: true,
  });

  const uniqueStageMap = new Map();
  const subcounties = new Set();

  for (const row of raw) {
    const name = normalizeName(row['stop_name']);
    const subcounty = row['subcounty']?.trim() ?? 'Unknown';
    const lat = Number(row['stop_lat']);
    const lon = Number(row['stop_lon']);
    const distanceFromCbd = row['distance_from_cbd_km']
      ? Number(row['distance_from_cbd_km'])
      : null;

    if (!Number.isFinite(lat) || !Number.isFinite(lon)) continue;

    const key = `${name.toLowerCase()}|${subcounty.toLowerCase()}`;
    if (!uniqueStageMap.has(key)) {
      uniqueStageMap.set(key, {
        stage: name,
        subcounty,
        lat,
        lon,
        distance_from_cbd: Number.isFinite(distanceFromCbd) ? distanceFromCbd : null,
      });
    }

    if (subcounty) {
      subcounties.add(subcounty);
    }
  }

  const stages = Array.from(uniqueStageMap.values()).sort((a, b) => a.stage.localeCompare(b.stage));
  const subcountyList = Array.from(subcounties).sort((a, b) => a.localeCompare(b));

  const payload = {
    generatedAt: new Date().toISOString(),
    totalStages: stages.length,
    stages,
    subcounties: subcountyList,
  };

  await fs.writeFile(OUTPUT_PATH, JSON.stringify(payload, null, 2));
  console.log(`Generated ${stages.length} unique stages to ${path.relative(ROOT_DIR, OUTPUT_PATH)}`);
}

main().catch((error) => {
  console.error('Failed to build stages dataset:', error);
  process.exit(1);
});

