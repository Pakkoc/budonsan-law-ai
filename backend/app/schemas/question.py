from __future__ import annotations

from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, Field

from app.schemas.answer import AnswerResponse


class QuestionBase(BaseModel):
    title: str = Field(..., examples=["전세 확정일자 순서가 궁금합니다"])
    body: dict[str, Any] = Field(default_factory=dict)
    category: str


class QuestionCreate(QuestionBase):
    pass


class QuestionResponse(QuestionBase):
    id: UUID
    user_id: UUID
    ai_answer: dict[str, Any] | None = None
    created_at: datetime
    answers: list[AnswerResponse] = Field(default_factory=list)

    class Config:
        from_attributes = True
