# FastAPI Backend (budongsan-law-backend)

## Quick start

1. Install dependencies (using uv):
   ```bash
   cd backend
   uv pip install -r <(uv pip compile pyproject.toml)
   ```
   Or with pip:
   ```bash
   pip install -e .
   ```
2. Set the required environment variables (see `app/core/config.py`).
3. Run the development server:
   ```bash
   uvicorn app.main:app --reload
   ```

## Required environment variables

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Base URL of your Supabase project (`https://xxxx.supabase.co`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service-role API key for privileged database access |
| `SUPABASE_JWT_SECRET` | JWT secret used to verify Supabase access tokens |
| `SUPABASE_STORAGE_BUCKET` | (Optional) Default storage bucket name for legal documents |

## Project layout

```
backend/
├─ app/
│  ├─ api/            # FastAPI routers & dependencies
│  ├─ core/           # Configuration and security helpers
│  ├─ schemas/        # Pydantic models
│  ├─ services/       # Supabase data access layer
│  └─ main.py         # ASGI entry point
└─ pyproject.toml
```

## API surface (MVP)
- `POST /questions` – 질문 등록 및 AI 처리 트리거
- `GET /questions/{id}` – 질문 + AI/변호사 답변 조회
- `POST /questions/{id}/answers` – 변호사 답변 등록 (잔액 차감)
- `POST /lawyers/verify` – 변호사 인증 서류 제출
- `POST /admin/documents` – 관리자 PDF 업로드 메타데이터 등록
- `PUT /admin/lawyers/{user_id}/status` – 변호사 승인/거절 처리

각 엔드포인트는 Supabase JWT 인증을 요구하며, 역할 기반 접근 제어를 수행합니다.
