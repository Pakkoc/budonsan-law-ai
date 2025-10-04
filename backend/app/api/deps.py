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
