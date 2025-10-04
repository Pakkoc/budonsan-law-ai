from __future__ import annotations

from typing import Literal
from uuid import UUID

from pydantic import BaseModel, Field


class LawyerVerificationRequest(BaseModel):
    name: str
    verification_document_url: str


class LawyerProfileResponse(BaseModel):
    id: UUID
    user_id: UUID
    name: str
    verification_status: Literal["pending", "approved", "rejected"]
    verification_document_url: str | None = None
    balance: int

    class Config:
        from_attributes = True


class LawyerStatusUpdate(BaseModel):
    status: Literal["approved", "pending", "rejected"]
    reset_balance: int | None = Field(default=None, ge=0)
