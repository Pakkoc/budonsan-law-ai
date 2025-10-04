-- Core tables

-- Users: supplement to auth.users (1:1)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  role user_role not null default 'user',
  created_at timestamptz not null default now()
);

-- Lawyer profiles
create table if not exists public.lawyer_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  verification_status verification_status not null default 'pending',
  verification_document_url text,
  balance integer not null default 0 check (balance >= 0),
  created_at timestamptz not null default now(),
  unique (user_id)
);

-- Questions
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  body jsonb not null,
  category text not null,
  ai_answer jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_questions_user_created_at on public.questions (user_id, created_at desc);

-- Answers (lawyer answers)
create table if not exists public.answers (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  lawyer_id uuid not null references public.users(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_answers_question_created_at on public.answers (question_id, created_at);

-- Documents (legal PDFs for RAG)
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  storage_url text not null,
  version integer not null default 1 check (version >= 1),
  is_active boolean not null default true,
  uploaded_by uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now()
);


