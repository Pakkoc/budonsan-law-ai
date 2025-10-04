from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


class AnswerCreate(BaseModel):
    content: str = Field(..., min_length=10)


class AnswerResponse(BaseModel):
    id: UUID
    question_id: UUID
    lawyer_id: UUID
    content: str
    created_at: datetime | None = None

    class Config:
        from_attributes = True
