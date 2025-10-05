from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    environment: str = "local"
    supabase_url: str
    supabase_service_role_key: str
    supabase_jwt_secret: str
    supabase_storage_bucket: str | None = None
    openai_api_key: str
    openai_chat_model: str = "gpt-4o-mini"
    openai_embedding_model: str = "text-embedding-ada-002"
    supabase_vector_table: str = "document_embeddings"
    supabase_vector_query_name: str = "match_document_chunks"
    rag_chunk_size: int = 1000
    rag_chunk_overlap: int = 200

    model_config = SettingsConfigDict(
        env_file=(".env", "../.env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
