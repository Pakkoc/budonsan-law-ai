from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import admin, lawyers, questions
from app.core.config import get_settings

settings = get_settings()

app = FastAPI(title="부동산법률Q API", version="0.1.0")

# CORS 설정: Next.js 프론트엔드와 통신
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js 개발 서버
        "http://127.0.0.1:3000",
        # 프로덕션 도메인은 환경 변수로 관리 권장
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(questions.router)
app.include_router(lawyers.router)
app.include_router(admin.router)


@app.get("/health", tags=["system"], summary="Health check")
def health_check() -> dict[str, str]:
    """Return simple service heartbeat."""
    return {"status": "ok"}
