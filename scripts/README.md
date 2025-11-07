# Scripts

Utility scripts that support data preparation for the Kenya Address Widget.

## buildStages.mjs

Transforms the cleaned CSV (`bus_stages_arranged_by_subcounty_and_distance.csv`) into a JSON dataset consumed by the widget.

### Usage
```bash
npm run build:data
```

### What it does
- Normalises stage names.
- Deduplicates entries by stage + subcounty.
- Extracts coordinates and distance-from-CBD values.
- Produces `widget/stages.json` with summary metadata and subcounty lists.

### Notes
- The script assumes the CSV resides at the repository root.
- Distances currently rely on straight-line (haversine) calculations from the source data; contributions adding routing-aware distances are welcomed.
- If you add extra columns to the CSV or dataset, document them in `widget/address-widget.js` and the root `README.md`.

