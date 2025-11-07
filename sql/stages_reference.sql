-- Optional staging table for referencing Nairobi PSV stages in your backend
create table if not exists public.nairobi_stages (
    id uuid primary key default gen_random_uuid(),
    stage_name text not null,
    subcounty text not null,
    latitude double precision not null,
    longitude double precision not null,
    metadata jsonb,
    created_at timestamptz not null default now()
);

create unique index if not exists nairobi_stages_stage_unique
    on public.nairobi_stages (lower(stage_name));

create index if not exists nairobi_stages_subcounty_idx
    on public.nairobi_stages (subcounty);

