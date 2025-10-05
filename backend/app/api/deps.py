from fastapi import Depends

from app.core.config import Settings, get_settings
from app.core.security import AuthenticatedUser, get_current_user, require_role
from app.services.supabase import SupabaseService


def get_supabase_service(settings: Settings = Depends(get_settings)) -> SupabaseService:
    return SupabaseService(settings)


CurrentUser = AuthenticatedUser
current_user = get_current_user
lawyer_user = require_role("lawyer")
admin_user = require_role("admin")


# 🧪 개발용: 인증 없이 테스트하기 위한 더미 사용자
def dev_user() -> AuthenticatedUser:
    """개발 환경에서만 사용! 프로덕션에서는 절대 사용 금지"""
    return AuthenticatedUser(
        id="00000000-0000-0000-0000-000000000000",  # 더미 UUID
        email="test@dev.local",
        role="user",
    )


def dev_admin_user() -> AuthenticatedUser:
    """개발 환경에서만 사용! 관리자 권한 테스트"""
    return AuthenticatedUser(
        id="00000000-0000-0000-0000-000000000001",  # 더미 UUID
        email="admin@dev.local",
        role="admin",
    )