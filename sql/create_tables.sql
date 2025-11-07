-- Customer address submissions table
create table if not exists public.customer_addresses (
    id uuid primary key default gen_random_uuid(),
    full_name text not null,
    phone_number text not null,
    whatsapp_number text not null,
    email text not null,
    county text not null,
    subcounty text not null,
    stage_name text not null,
    stage_lat double precision,
    stage_lon double precision,
    additional_payload jsonb,
    created_at timestamptz not null default now()
);

create index if not exists customer_addresses_stage_idx on public.customer_addresses (stage_name);
create index if not exists customer_addresses_created_idx on public.customer_addresses (created_at);

-- Optional: Role-based policies example (enable RLS first)
-- alter table public.customer_addresses enable row level security;
-- create policy "Service role full access" on public.customer_addresses
-- using (auth.role() = 'service_role')
-- with check (auth.role() = 'service_role');

