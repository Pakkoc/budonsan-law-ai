from __future__ import annotations

from dataclasses import dataclass
from typing import Literal

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.config import Settings, get_settings

http_bearer = HTTPBearer(auto_error=False)


@dataclass(slots=True)
class AuthenticatedUser:
    id: str
    email: str | None
    role: Literal["user", "lawyer", "admin"]


class TokenVerifier:
    def __init__(self, settings: Settings):
        self._secret = settings.supabase_jwt_secret

    def decode(self, token: str) -> dict:
        try:
            return jwt.decode(
                token,
                self._secret,
                algorithms=["HS256"],
                options={"verify_aud": False},
            )
        except jwt.InvalidTokenError as exc:  # type: ignore[attr-defined]
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired access token",
            ) from exc


async def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(http_bearer),
    settings: Settings = Depends(get_settings),
) -> AuthenticatedUser:
    if credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing Authorization header")

    verifier = TokenVerifier(settings)
    payload = verifier.decode(credentials.credentials)

    role = payload.get("role") or payload.get("app_metadata", {}).get("role")
    if role not in {"user", "lawyer", "admin"}:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Unsupported role")

    return AuthenticatedUser(
        id=str(payload.get("sub")),
        email=payload.get("email"),
        role=role,
    )


def require_role(*allowed_roles: Literal["user", "lawyer", "admin"]):
    async def dependency(user: AuthenticatedUser = Depends(get_current_user)) -> AuthenticatedUser:
        if user.role not in allowed_roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient role permissions")
        return user

    return dependency
