from __future__ import annotations

from uuid import UUID

from pydantic import BaseModel, Field


class DocumentCreate(BaseModel):
    file_name: str
    storage_url: str
    version: int = Field(default=1, ge=1)
    is_active: bool = True


class DocumentResponse(DocumentCreate):
    id: UUID
    uploaded_by: UUID

    class Config:
        from_attributes = True
