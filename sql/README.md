# SQL Blueprints

Reference SQL for teams that want to persist widget submissions and maintain a stage catalogue in Postgres/Supabase.

## Files

- `create_tables.sql` – Creates `public.customer_addresses`, including indexes and optional RLS policy scaffolding.
- `stages_reference.sql` – Optional `public.nairobi_stages` table for analytics or staff tooling.
- `insert_example.sql` – Sample insert statement for an API endpoint receiving the widget payload.

## Usage

1. Run the scripts via Supabase SQL editor or `psql`:
   ```sql
   \i sql/create_tables.sql
   \i sql/stages_reference.sql
   ```
2. When the widget fires an `address-submit` event, POST the payload to your backend and execute `insert_example.sql` with the appropriate parameters.
3. If you mirror the stage dataset, you can bulk import `widget/stages.json` using `jsonb_array_elements`.

## Contributions welcome

- Add migrations for other databases, stored procedures, or integrations.
- Suggest field additions (e.g., delivery pricing tiers, metadata) based on real-world needs.
- Document any custom workflows in the root `README.md` so others can benefit.

