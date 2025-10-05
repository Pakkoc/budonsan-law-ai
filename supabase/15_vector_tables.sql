-- Vector embeddings table for RAG (Retrieval-Augmented Generation)
-- Stores document chunks with their vector embeddings for semantic search

create table if not exists document_embeddings (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references documents(id) on delete cascade,
  chunk_index integer not null,
  content text not null,
  embedding vector(1536), -- OpenAI ada-002 embedding dimension
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  
  constraint unique_document_chunk unique (document_id, chunk_index)
);

-- Index for faster vector similarity search
create index if not exists idx_document_embeddings_vector 
  on document_embeddings 
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Index for document lookup
create index if not exists idx_document_embeddings_document_id 
  on document_embeddings(document_id);

-- Function to search similar document chunks
create or replace function match_document_chunks(
  query_embedding vector(1536),
  match_threshold float default 0.7,
  match_count int default 5
)
returns table (
  id uuid,
  document_id uuid,
  chunk_index integer,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    document_embeddings.id,
    document_embeddings.document_id,
    document_embeddings.chunk_index,
    document_embeddings.content,
    document_embeddings.metadata,
    1 - (document_embeddings.embedding <=> query_embedding) as similarity
  from document_embeddings
  where 1 - (document_embeddings.embedding <=> query_embedding) > match_threshold
  order by document_embeddings.embedding <=> query_embedding
  limit match_count;
end;
$$;
