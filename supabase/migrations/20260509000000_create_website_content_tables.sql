-- Website content tables for lightweight CRM-managed public-site settings.
-- These tables are designed for simple admin CRUD in the CRM and public read access
-- from the marketing website via Supabase anon credentials.

create extension if not exists pgcrypto;

create table if not exists public.website_settings (
  id uuid primary key default gen_random_uuid(),
  singleton_key text not null default 'default' check (singleton_key = 'default'),
  phone_display text not null,
  phone_uri text not null check (phone_uri ~ '^\\+[1-9][0-9]{7,14}$'),
  email text not null check (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$'),
  hero_headline text not null,
  hero_subheadline text not null,
  primary_cta_label text not null,
  primary_cta_path text not null,
  availability_text text,
  seo_title text,
  seo_description text,
  social_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint website_settings_singleton unique (singleton_key)
);

create table if not exists public.website_promotions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null,
  placement text not null default 'site_banner',
  cta_label text,
  cta_url text,
  starts_at timestamptz,
  ends_at timestamptz,
  priority integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint website_promotions_date_window check (ends_at is null or starts_at is null or ends_at > starts_at)
);

create table if not exists public.website_service_highlights (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  icon_key text not null,
  cta_label text,
  cta_path text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_website_settings_updated_at
before update on public.website_settings
for each row execute function public.set_updated_at();

create trigger set_website_promotions_updated_at
before update on public.website_promotions
for each row execute function public.set_updated_at();

create trigger set_website_service_highlights_updated_at
before update on public.website_service_highlights
for each row execute function public.set_updated_at();

alter table public.website_settings enable row level security;
alter table public.website_promotions enable row level security;
alter table public.website_service_highlights enable row level security;

create policy "Allow public read access to website settings"
on public.website_settings
for select
using (true);

create policy "Allow public read access to active website promotions"
on public.website_promotions
for select
using (
  is_active
  and (starts_at is null or starts_at <= now())
  and (ends_at is null or ends_at >= now())
);

create policy "Allow public read access to active website service highlights"
on public.website_service_highlights
for select
using (is_active);
