-- Run this in Supabase: SQL Editor -> New query -> paste -> Run.
-- Safe to run again after updates. Public visitors can read published content,
-- while every draft/write operation requires an active portfolio administrator.

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

create table if not exists public.portfolio_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null default 'editor' check (role in ('owner', 'editor')),
  active boolean not null default true,
  invited_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.site_content enable row level security;
alter table public.site_drafts enable row level security;
alter table public.contact_messages enable row level security;
alter table public.portfolio_admins enable row level security;

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

create or replace function private.is_portfolio_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.portfolio_admins
    where user_id = (select auth.uid()) and active = true
  );
$$;

create or replace function private.is_portfolio_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.portfolio_admins
    where user_id = (select auth.uid()) and role = 'owner' and active = true
  );
$$;

revoke all on function private.is_portfolio_admin() from public;
revoke all on function private.is_portfolio_owner() from public;
grant execute on function private.is_portfolio_admin() to authenticated;
grant execute on function private.is_portfolio_owner() to authenticated;

grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;
grant select, insert, update, delete on public.site_drafts to authenticated;
grant insert on public.contact_messages to anon, authenticated;
grant select, update, delete on public.contact_messages to authenticated;
grant select on public.portfolio_admins to authenticated;

drop policy if exists "Published content is public" on public.site_content;
create policy "Published content is public" on public.site_content
  for select to anon, authenticated using (true);

drop policy if exists "Owner can publish" on public.site_content;
drop policy if exists "Authorized admins can publish" on public.site_content;
create policy "Authorized admins can publish" on public.site_content
  for all to authenticated
  using ((select private.is_portfolio_admin()))
  with check ((select private.is_portfolio_admin()));

drop policy if exists "Owner can manage drafts" on public.site_drafts;
drop policy if exists "Authorized admins can manage drafts" on public.site_drafts;
create policy "Authorized admins can manage drafts" on public.site_drafts
  for all to authenticated
  using ((select private.is_portfolio_admin()))
  with check ((select private.is_portfolio_admin()));

drop policy if exists "Visitors can send contact messages" on public.contact_messages;
create policy "Visitors can send contact messages" on public.contact_messages
  for insert to anon, authenticated
  with check (status = 'unread' and read_at is null);

drop policy if exists "Owner can read contact messages" on public.contact_messages;
drop policy if exists "Owner can update contact messages" on public.contact_messages;
drop policy if exists "Owner can delete contact messages" on public.contact_messages;
drop policy if exists "Authorized admins can read contact messages" on public.contact_messages;
drop policy if exists "Authorized admins can update contact messages" on public.contact_messages;
drop policy if exists "Authorized admins can delete contact messages" on public.contact_messages;
create policy "Authorized admins can read contact messages" on public.contact_messages
  for select to authenticated using ((select private.is_portfolio_admin()));
create policy "Authorized admins can update contact messages" on public.contact_messages
  for update to authenticated
  using ((select private.is_portfolio_admin()))
  with check ((select private.is_portfolio_admin()));
create policy "Authorized admins can delete contact messages" on public.contact_messages
  for delete to authenticated using ((select private.is_portfolio_admin()));

drop policy if exists "Admins can view access list" on public.portfolio_admins;
create policy "Admins can view access list" on public.portfolio_admins
  for select to authenticated
  using ((select private.is_portfolio_owner()) or user_id = (select auth.uid()));

-- Owner-only RPC: authorize an existing Supabase Auth user by email.
create or replace function public.authorize_portfolio_admin(target_email text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  target_id uuid;
  normalized_email text;
begin
  if not private.is_portfolio_owner() then
    raise exception 'Only the portfolio owner can grant administrator access.' using errcode = '42501';
  end if;

  select id, lower(email) into target_id, normalized_email
  from auth.users
  where lower(email) = lower(trim(target_email))
  limit 1;

  if target_id is null then
    raise exception 'Create this email in Authentication > Users first, then retry.' using errcode = 'P0002';
  end if;

  insert into public.portfolio_admins (user_id, email, role, active, invited_by)
  values (target_id, normalized_email, 'editor', true, (select auth.uid()))
  on conflict (user_id) do update set email = excluded.email, active = true;
end;
$$;

-- Owner-only RPC: disable or restore an editor. The owner row cannot be disabled here.
create or replace function public.set_portfolio_admin_access(target_user_id uuid, target_active boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.is_portfolio_owner() then
    raise exception 'Only the portfolio owner can change administrator access.' using errcode = '42501';
  end if;

  if exists (select 1 from public.portfolio_admins where user_id = target_user_id and role = 'owner') then
    raise exception 'The owner account cannot be disabled from the website.' using errcode = '42501';
  end if;

  update public.portfolio_admins set active = target_active where user_id = target_user_id;
end;
$$;

revoke all on function public.authorize_portfolio_admin(text) from public, anon;
revoke all on function public.set_portfolio_admin_access(uuid, boolean) from public, anon;
grant execute on function public.authorize_portfolio_admin(text) to authenticated;
grant execute on function public.set_portfolio_admin_access(uuid, boolean) to authenticated;

insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do update set public = true;

drop policy if exists "Portfolio media is public" on storage.objects;
create policy "Portfolio media is public" on storage.objects
  for select to anon, authenticated using (bucket_id = 'portfolio-media');

drop policy if exists "Owner can upload portfolio media" on storage.objects;
drop policy if exists "Owner can update portfolio media" on storage.objects;
drop policy if exists "Owner can delete portfolio media" on storage.objects;
drop policy if exists "Authorized admins can upload portfolio media" on storage.objects;
drop policy if exists "Authorized admins can update portfolio media" on storage.objects;
drop policy if exists "Authorized admins can delete portfolio media" on storage.objects;
create policy "Authorized admins can upload portfolio media" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'portfolio-media' and (select private.is_portfolio_admin()));
create policy "Authorized admins can update portfolio media" on storage.objects
  for update to authenticated
  using (bucket_id = 'portfolio-media' and (select private.is_portfolio_admin()))
  with check (bucket_id = 'portfolio-media' and (select private.is_portfolio_admin()));
create policy "Authorized admins can delete portfolio media" on storage.objects
  for delete to authenticated
  using (bucket_id = 'portfolio-media' and (select private.is_portfolio_admin()));

-- REQUIRED ONE-TIME OWNER BOOTSTRAP
-- 1. Create your owner account in Authentication -> Users.
-- 2. Replace the email below and run this statement once in the SQL Editor:
--
-- insert into public.portfolio_admins (user_id, email, role, active)
-- select id, lower(email), 'owner', true from auth.users
-- where lower(email) = lower('your-admin-email@example.com')
-- on conflict (user_id) do update set role = 'owner', active = true;
