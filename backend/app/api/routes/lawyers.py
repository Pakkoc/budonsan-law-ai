from __future__ import annotations

from fastapi import APIRouter, Depends, status

from app.api import deps
from app.core.security import AuthenticatedUser
from app.schemas.lawyer import LawyerProfileResponse, LawyerVerificationRequest
from app.services.supabase import SupabaseService

router = APIRouter(prefix="/lawyers", tags=["lawyers"])


@router.post("/verify", response_model=LawyerProfileResponse, status_code=status.HTTP_201_CREATED)
async def submit_verification(
    payload: LawyerVerificationRequest,
    user: AuthenticatedUser = Depends(deps.lawyer_user),
    supabase: SupabaseService = Depends(deps.get_supabase_service),
) -> LawyerProfileResponse:
    profile_payload = {
        "name": payload.name,
        "verification_document_url": payload.verification_document_url,
        "verification_status": "pending",
    }
    profile = await supabase.upsert_lawyer_profile(user.id, profile_payload)
    return LawyerProfileResponse.model_validate(profile)
