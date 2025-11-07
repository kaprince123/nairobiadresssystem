# Demo

The demo showcases both modes of the `<kenya-address-widget>` for quick testing and validation.

## Files

- `index.html` – Renders two widget instances (full checkout + stage-only) and logs their emitted payloads in real time.

## Running locally

```bash
npm run serve:demo
# open http://localhost:5500/demo/index.html
```

The page pulls `widget/address-widget.js` and `widget/stages.json` from the repository root. Ensure you’ve generated the dataset via `npm run build:data` beforehand.

## Tips

- Interact with each widget to inspect the JSON payloads in the on-page log or the browser console.
- Adjust CSS or copy/paste markup snippets from this page when integrating the widget into other sites.
- Feel free to add more examples (e.g., prefilled forms, different themes) to help contributors and merchants understand the capabilities.

