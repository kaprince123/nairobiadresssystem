-- Example insert that an API endpoint could execute after receiving the widget payload
insert into public.customer_addresses (
    full_name,
    phone_number,
    whatsapp_number,
    email,
    county,
    subcounty,
    stage_name,
    stage_lat,
    stage_lon,
    additional_payload
)
values (
    :full_name,
    :phone_number,
    :whatsapp_number,
    :email,
    :county,
    :subcounty,
    :stage_name,
    :stage_lat,
    :stage_lon,
    to_jsonb(:raw_payload::json)
)
returning id, created_at;

