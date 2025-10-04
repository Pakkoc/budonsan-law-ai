-- Enable RLS and define policies

-- users
alter table if exists public.users enable row level security;
alter table if exists public.users force row level security;

drop policy if exists users_select on public.users;
create policy users_select on public.users
  for select using (
    id = auth.uid() or public.is_admin()
  );

drop policy if exists users_insert on public.users;
create policy users_insert on public.users
  for insert with check (
    id = auth.uid() or public.is_admin()
  );

drop policy if exists users_update on public.users;
create policy users_update on public.users
  for update using (
    id = auth.uid() or public.is_admin()
  ) with check (
    id = auth.uid() or public.is_admin()
  );

drop policy if exists users_delete on public.users;
create policy users_delete on public.users
  for delete using (public.is_admin());


-- lawyer_profiles
alter table if exists public.lawyer_profiles enable row level security;
alter table if exists public.lawyer_profiles force row level security;

drop policy if exists lawyer_profiles_select on public.lawyer_profiles;
create policy lawyer_profiles_select on public.lawyer_profiles
  for select using (
    user_id = auth.uid() or public.is_admin()
  );

drop policy if exists lawyer_profiles_insert on public.lawyer_profiles;
create policy lawyer_profiles_insert on public.lawyer_profiles
  for insert with check (
    user_id = auth.uid() or public.is_admin()
  );

drop policy if exists lawyer_profiles_update on public.lawyer_profiles;
create policy lawyer_profiles_update on public.lawyer_profiles
  for update using (
    user_id = auth.uid() or public.is_admin()
  ) with check (
    user_id = auth.uid() or public.is_admin()
  );

drop policy if exists lawyer_profiles_delete on public.lawyer_profiles;
create policy lawyer_profiles_delete on public.lawyer_profiles
  for delete using (public.is_admin());


-- questions
alter table if exists public.questions enable row level security;
alter table if exists public.questions force row level security;

drop policy if exists questions_select on public.questions;
create policy questions_select on public.questions
  for select using (true);

drop policy if exists questions_insert on public.questions;
create policy questions_insert on public.questions
  for insert with check (
    user_id = auth.uid()
  );

drop policy if exists questions_update on public.questions;
create policy questions_update on public.questions
  for update using (
    user_id = auth.uid() or public.is_admin()
  ) with check (
    user_id = auth.uid() or public.is_admin()
  );

drop policy if exists questions_delete on public.questions;
create policy questions_delete on public.questions
  for delete using (
    user_id = auth.uid() or public.is_admin()
  );


-- answers
alter table if exists public.answers enable row level security;
alter table if exists public.answers force row level security;

drop policy if exists answers_select on public.answers;
create policy answers_select on public.answers
  for select using (true);

drop policy if exists answers_insert on public.answers;
create policy answers_insert on public.answers
  for insert with check (
    public.is_approved_lawyer() and lawyer_id = auth.uid()
  );

drop policy if exists answers_update on public.answers;
create policy answers_update on public.answers
  for update using (
    lawyer_id = auth.uid() or public.is_admin()
  ) with check (
    lawyer_id = auth.uid() or public.is_admin()
  );

drop policy if exists answers_delete on public.answers;
create policy answers_delete on public.answers
  for delete using (
    lawyer_id = auth.uid() or public.is_admin()
  );


-- documents
alter table if exists public.documents enable row level security;
alter table if exists public.documents force row level security;

drop policy if exists documents_select on public.documents;
create policy documents_select on public.documents
  for select using (
    is_active = true or public.is_admin()
  );

drop policy if exists documents_insert on public.documents;
create policy documents_insert on public.documents
  for insert with check (public.is_admin());

drop policy if exists documents_update on public.documents;
create policy documents_update on public.documents
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists documents_delete on public.documents;
create policy documents_delete on public.documents
  for delete using (public.is_admin());


