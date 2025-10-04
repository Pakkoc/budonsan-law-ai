-- Domain enum types

do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type user_role as enum ('user','lawyer','admin');
  end if;
end
$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'verification_status') then
    create type verification_status as enum ('pending','approved','rejected');
  end if;
end
$$;


