from __future__ import annotations

from fastapi import APIRouter, Depends, Path, status

from app.api import deps
from app.core.security import AuthenticatedUser
from app.schemas.document import DocumentCreate, DocumentResponse
from app.schemas.lawyer import LawyerProfileResponse, LawyerStatusUpdate
from app.services.supabase import SupabaseService

router = APIRouter(prefix="/admin", tags=["admin"])


@router.post("/documents", response_model=DocumentResponse, status_code=status.HTTP_201_CREATED)
async def create_document(
    payload: DocumentCreate,
    user: AuthenticatedUser = Depends(deps.admin_user),
    supabase: SupabaseService = Depends(deps.get_supabase_service),
) -> DocumentResponse:
    document = await supabase.create_document({**payload.model_dump(), "uploaded_by": user.id})
    return DocumentResponse.model_validate(document)


@router.put("/lawyers/{user_id}/status", response_model=LawyerProfileResponse)
async def update_lawyer_status(
    payload: LawyerStatusUpdate,
    user_id: str = Path(..., description="Target lawyer user_id"),
    admin: AuthenticatedUser = Depends(deps.admin_user),  # noqa: ARG001 ensures admin auth
    supabase: SupabaseService = Depends(deps.get_supabase_service),
) -> LawyerProfileResponse:
    updated = await supabase.update_lawyer_status(
        user_id,
        status_value=payload.status,
        balance_override=payload.reset_balance,
    )
    return LawyerProfileResponse.model_validate(updated)
