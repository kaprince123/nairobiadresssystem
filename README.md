# Kenya Address Collection Widget

An embeddable, Nairobi-focused delivery address form that your team can drop into any checkout or onboarding flow. It captures contact information, county/subcounty, and the nearest matatu/bus stage with instant suggestions powered by your cleaned CSV dataset. Every suggestion now includes the distance from the Nairobi CBD in kilometers, making it easy to estimate delivery fees or price tiers.

## Quick Start

### 1. Install dependencies
```bash
cd "/Users/brianndeto/Desktop/Nairobi adress"
npm install
```

### 2. Generate stage suggestions
Transforms the provided CSV into a lightweight JSON payload consumed by the widget.
```bash
npm run build:data
```
This writes `widget/stages.json` (ignored from git) with ~2.6k unique stages, coordinates, and distance-from-CBD metrics.

### 3. View the demo locally
Serve the repository root (exposes both the widget bundle and demo page):
```bash
npm run serve:demo
```
Then open `http://localhost:5500/demo/index.html`. You should see the widget along with a live JSON log of the `address-submit` event the component emits.

If you only want to serve the widget assets, run:
```bash
npm run serve:widget
# -> http://localhost:5000/address-widget.js
```

## Embedding in Production

1. Host `widget/address-widget.js` and the generated `widget/stages.json` on your CDN (place them in the same folder).
2. Embed the script and component anywhere in your site/app:

```html
<script src="https://cdn.yourdomain.com/address-widget.js" data-address-widget defer></script>

<kenya-address-widget></kenya-address-widget>

<script>
  document.addEventListener('address-submit', (event) => {
    // Persist the payload to your backend or Supabase
    console.log('Received address payload:', event.detail);
  });
</script>
```

### Stage-only or full form
- Default (`<kenya-address-widget>`): full checkout form that collects contact details plus stage. Nairobi customers receive autocomplete for officially mapped stages; other counties still capture subcounty (from curated lists) and allow free-text stage entry.
- Minimal stage picker (`<kenya-address-widget mode="stage-only"></kenya-address-widget>`): hides the contact section so you can reuse saved profiles or offer a quick “choose your stage” experience.

Both variants emit the same `address-submit` event; in stage-only mode the contact fields are omitted and `mode` is set to `"stage-only"` in the payload.

### Emitted Payload Shape
```json
{
  "mode": "full",
  "fullName": "Jane Doe",
  "phone": "+254700000000",
  "whatsappSameAsPhone": true,
  "whatsapp": "+254700000000",
  "email": "jane@example.com",
  "county": "Nairobi",
  "subcounty": "Westlands",
  "stage": "Kawangware 46",
  "geo": { "lat": -1.2962, "lon": 36.7628, "distanceFromCbdKm": 6.2 },
  "submittedAt": "2025-11-07T16:00:00.000Z"
}
```

Use `geo.distanceFromCbdKm` to drive delivery pricing logic directly in the browser or on the backend.

## Customisation Notes

- **Counties**: The dropdown includes all 47 Kenyan counties. Adjust the `KENYAN_COUNTIES` constant in `widget/address-widget.js` if you need a subset.
- **Subcounties**: Populated from the CSV. Users can still type a custom subcounty if they operate in another region.
- **Styling**: Override with `:host` styles or wrap the component; it uses Shadow DOM to avoid leaking styles.
- **Validation**: Phone, email, stage, and name are required in full mode. The WhatsApp field becomes required if the “same number” checkbox is unchecked. In stage-only mode, only the location fields are enforced.
- **Stage autocomplete:** Stage suggestions (with distance data) are available only when the selected county is Nairobi to reflect the source CSV coverage. Other counties still support manual stage input while subcounty lists are pre-filled.

## Backend SQL Blueprints

Use these SQL snippets to store submissions and (optionally) maintain a copy of the stage catalogue in your Supabase/PostgreSQL project.

- `sql/create_tables.sql` – `customer_addresses` table for captured payloads, with indexes on `stage_name` and `created_at`. Includes commented RLS policy scaffolding.
- `sql/stages_reference.sql` – Optional `nairobi_stages` reference table mirroring the JSON (handy for analytics or staff tools).

After creating the tables you can ingest the JSON with the Supabase CLI or a simple script, e.g.:

```sql
insert into public.nairobi_stages (stage_name, subcounty, latitude, longitude)
select stage->>'stage', stage->>'subcounty',
       (stage->>'lat')::double precision, (stage->>'lon')::double precision
from jsonb_array_elements(:stages_json::jsonb -> 'stages') as stage;
```

## Project Structure
```
├── bus_stages_arranged_by_subcounty_and_distance.csv   # Source-of-truth dataset
├── demo/                                               # Live demo page and listener
├── scripts/buildStages.mjs                             # CSV → JSON generator
├── sql/                                                # Database schema blueprints
└── widget/
    ├── address-widget.js                               # Web component
    └── stages.json                                     # Generated suggestions (git-ignored)
```

## Contributing
- Review the [CONTRIBUTING.md](CONTRIBUTING.md) guide for setup steps, coding guidelines, and pull request tips.
- File bugs or feature ideas via GitHub issues; templates live in `.github/ISSUE_TEMPLATE/`.
- We welcome county data corrections, routing/distance enhancements, accessibility tweaks, and translations.
- This project ships under the MIT License—fork, remix, and share improvements freely.

## Next Steps
- Hook the `address-submit` event to your Supabase function or REST endpoint.
- Add analytics (e.g., Google Tag Manager) by listening to the event.
- Schedule `npm run build:data` to regenerate the JSON whenever the CSV changes.
- Localise the labels if you serve a multilingual audience.
- Adjust pricing UX by reading `geo.distanceFromCbdKm` on the fly.
- Share your improvements via pull requests and star the repo if it helps your team!
