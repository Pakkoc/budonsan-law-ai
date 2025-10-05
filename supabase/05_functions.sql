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


create or replace function public.match_legal_documents(
  query_embedding vector(1536),
  match_count integer default 5,
  metadata_filter jsonb default '{}'::jsonb
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity double precision
)
language plpgsql
stable
as $$
begin
  return query
  select
    ld.id,
    ld.content,
    ld.metadata,
    1 - (ld.embedding <=> query_embedding) as similarity
  from public.legal_documents ld
  where metadata_filter = '{}'::jsonb or ld.metadata @> metadata_filter
  order by ld.embedding <=> query_embedding
  limit match_count;
end;
$$;

