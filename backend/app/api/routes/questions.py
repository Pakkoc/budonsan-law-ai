from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Path, status

from app.api import deps
from app.core.config import Settings, get_settings
from app.core.security import AuthenticatedUser
from app.schemas.answer import AnswerCreate, AnswerResponse
from app.schemas.question import QuestionCreate, QuestionResponse
from app.services.rag import RAGService
from app.services.supabase import SupabaseService

router = APIRouter(prefix="/questions", tags=["questions"])


@router.post("", response_model=QuestionResponse, status_code=status.HTTP_201_CREATED)
async def create_question(
    payload: QuestionCreate,
    user: AuthenticatedUser = Depends(deps.dev_user),  # 🧪 개발용: 인증 생략
    supabase: SupabaseService = Depends(deps.get_supabase_service),
    settings: Settings = Depends(get_settings),
) -> QuestionResponse:
    # Create question in database
    record = await supabase.create_question(user.id, payload.model_dump())
    question_id = str(record.get("id"))
    
    # Generate AI answer using RAG
    try:
        rag_service = RAGService(settings)
        ai_answer = await rag_service.answer_question(payload.title)
        
        # Update question with AI answer
        await supabase.update_question_ai_answer(question_id, ai_answer)
    except Exception as e:
        # Log error but don't fail the request
        print(f"Failed to generate AI answer: {e}")
        ai_answer = {
            "content": "AI 답변 생성에 실패했습니다. 변호사 답변을 기다려주세요.",
            "sources": [],
            "error": str(e),
        }
    
    # Fetch complete question with AI answer
    question = await supabase.fetch_question(question_id)
    return QuestionResponse.model_validate(question)


@router.get("/{question_id}", response_model=QuestionResponse)
async def get_question(
    question_id: str = Path(..., description="Supabase UUID for the question"),
    user: AuthenticatedUser = Depends(deps.dev_user),  # 🧪 개발용: 인증 생략
    supabase: SupabaseService = Depends(deps.get_supabase_service),
) -> QuestionResponse:
    question = await supabase.fetch_question(question_id)
    return QuestionResponse.model_validate(question)


@router.post("/{question_id}/answers", response_model=AnswerResponse, status_code=status.HTTP_201_CREATED)
async def create_answer(
    payload: AnswerCreate,
    question_id: str = Path(..., description="Question identifier"),
    user: AuthenticatedUser = Depends(deps.lawyer_user),
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
