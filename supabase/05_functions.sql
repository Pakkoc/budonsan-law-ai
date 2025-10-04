-- Helper predicates for RLS policies

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.users u
    where u.id = auth.uid()
      and u.role = 'admin'
  );
$$;

create or replace function public.is_approved_lawyer()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.lawyer_profiles lp
    where lp.user_id = auth.uid()
      and lp.verification_status = 'approved'
  );
$$;


