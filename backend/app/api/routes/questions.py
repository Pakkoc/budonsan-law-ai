from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Path, status

from app.api import deps
from app.core.security import AuthenticatedUser
from app.schemas.answer import AnswerCreate, AnswerResponse
from app.schemas.question import QuestionCreate, QuestionResponse
from app.services.supabase import SupabaseService

router = APIRouter(prefix="/questions", tags=["questions"])


@router.post("", response_model=QuestionResponse, status_code=status.HTTP_201_CREATED)
async def create_question(
    payload: QuestionCreate,
    user: AuthenticatedUser = Depends(deps.current_user),
    supabase: SupabaseService = Depends(deps.get_supabase_service),
) -> QuestionResponse:
    record = await supabase.create_question(user.id, payload.model_dump())
    question = await supabase.fetch_question(str(record.get("id")))
    return QuestionResponse.model_validate(question)


@router.get("/{question_id}", response_model=QuestionResponse)
async def get_question(
    question_id: str = Path(..., description="Supabase UUID for the question"),
    user: AuthenticatedUser = Depends(deps.current_user),  # noqa: ARG001 - ensures auth
    supabase: SupabaseService = Depends(deps.get_supabase_service),
) -> QuestionResponse:
    question = await supabase.fetch_question(question_id)
    return QuestionResponse.model_validate(question)


@router.post("/{question_id}/answers", response_model=AnswerResponse, status_code=status.HTTP_201_CREATED)
async def create_answer(
    payload: AnswerCreate,
    question_id: str = Path(..., description="Question identifier"),
    user: AuthenticatedUser = Depends(deps.lawyer_user()),
    supabase: SupabaseService = Depends(deps.get_supabase_service),
) -> AnswerResponse:
    profile = await supabase.get_lawyer_profile(user.id)
    if profile is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Lawyer profile not found")

    if profile.get("verification_status") != "approved":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Lawyer is not approved")

    balance = int(profile.get("balance") or 0)
    if balance < 1000:
        raise HTTPException(status_code=status.HTTP_402_PAYMENT_REQUIRED, detail="Insufficient balance (1000 required)")

    # Deduct credits and create answer (two operations; Supabase function recommended for production)
    await supabase.deduct_lawyer_balance(user.id, balance - 1000)
    answer = await supabase.create_answer(question_id, user.id, payload.content)
    return AnswerResponse.model_validate(answer)
