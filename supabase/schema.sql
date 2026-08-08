-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.
-- The public website can read only published content. Drafts and writes require login.

create table if not exists public.site_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_drafts (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;
alter table public.site_drafts enable row level security;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) between 5 and 254),
  subject text not null check (char_length(subject) between 3 and 160),
  message text not null check (char_length(message) between 10 and 5000),
  status text not null default 'unread' check (status in ('unread', 'read')),
  created_at timestamptz not null default now(),
  read_at timestamptz
);

alter table public.contact_messages enable row level security;
grant insert on public.contact_messages to anon, authenticated;
grant select, update, delete on public.contact_messages to authenticated;

drop policy if exists "Visitors can send contact messages" on public.contact_messages;
create policy "Visitors can send contact messages" on public.contact_messages
  for insert to anon, authenticated
  with check (status = 'unread' and read_at is null);

drop policy if exists "Owner can read contact messages" on public.contact_messages;
create policy "Owner can read contact messages" on public.contact_messages
  for select to authenticated using (true);

drop policy if exists "Owner can update contact messages" on public.contact_messages;
create policy "Owner can update contact messages" on public.contact_messages
  for update to authenticated using (true) with check (true);

drop policy if exists "Owner can delete contact messages" on public.contact_messages;
create policy "Owner can delete contact messages" on public.contact_messages
  for delete to authenticated using (true);

drop policy if exists "Published content is public" on public.site_content;
create policy "Published content is public" on public.site_content
  for select using (true);

drop policy if exists "Owner can publish" on public.site_content;
create policy "Owner can publish" on public.site_content
  for all to authenticated using (true) with check (true);

drop policy if exists "Owner can manage drafts" on public.site_drafts;
create policy "Owner can manage drafts" on public.site_drafts
  for all to authenticated using (true) with check (true);

insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do update set public = true;

drop policy if exists "Portfolio media is public" on storage.objects;
create policy "Portfolio media is public" on storage.objects
  for select using (bucket_id = 'portfolio-media');

drop policy if exists "Owner can upload portfolio media" on storage.objects;
create policy "Owner can upload portfolio media" on storage.objects
  for insert to authenticated with check (bucket_id = 'portfolio-media');

drop policy if exists "Owner can update portfolio media" on storage.objects;
create policy "Owner can update portfolio media" on storage.objects
  for update to authenticated using (bucket_id = 'portfolio-media') with check (bucket_id = 'portfolio-media');

drop policy if exists "Owner can delete portfolio media" on storage.objects;
create policy "Owner can delete portfolio media" on storage.objects
  for delete to authenticated using (bucket_id = 'portfolio-media');
