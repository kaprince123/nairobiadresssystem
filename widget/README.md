# Widget

This directory contains the source for the `<kenya-address-widget>` web component and the generated stage dataset.

## Files

- `address-widget.js` – Shadow DOM web component that renders the address form. Supports `mode="full"` (default) and `mode="stage-only"`.
- `stages.json` – Auto-generated dataset (git ignored) containing unique Nairobi stages, coordinates, and distance-from-CBD values. Regenerate via `npm run build:data`.

## Development tips

- When editing the widget, run `npm run serve:demo` and open `http://localhost:5500/demo/index.html` to see full + stage-only variations side-by-side.
- Stage autocomplete only activates when the selected county is Nairobi; other counties use the curated subcounty list in `COUNTY_SUBCOUNTIES`.
- Keep the component framework-agnostic and accessible (semantic HTML, keyboard navigation, focus handling).

## Extending

- Add new attributes or events cautiously—document changes in the root `README.md`.
- If you introduce new assets, ensure the CDN path structure remains `address-widget.js` + `stages.json` in the same folder so the widget resolves the dataset correctly.

