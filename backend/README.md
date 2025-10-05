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
| `OPENAI_API_KEY` | OpenAI API key for embeddings and chat completions (RAG) |

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
- `POST /questions` – 질문 등록 및 AI RAG 답변 자동 생성
- `GET /questions/{id}` – 질문 + AI/변호사 답변 조회
- `POST /questions/{id}/answers` – 변호사 답변 등록 (잔액 차감)
- `POST /lawyers/verify` – 변호사 인증 서류 제출
- `POST /admin/documents` – 관리자 PDF 업로드 메타데이터 등록
- `POST /admin/documents/ingest` – PDF 벡터화 및 임베딩 저장 (RAG)
- `PUT /admin/lawyers/{user_id}/status` – 변호사 승인/거절 처리

각 엔드포인트는 Supabase JWT 인증을 요구하며, 역할 기반 접근 제어를 수행합니다.

## RAG (Retrieval-Augmented Generation)

질문이 생성되면 자동으로 다음 프로세스가 실행됩니다:
1. 질문 텍스트를 벡터로 임베딩
2. Supabase pgvector에서 유사한 법령 문서 검색
3. 검색된 문서를 컨텍스트로 LLM(gpt-4o-mini)에 전달
4. AI가 법령 정보 기반 답변 생성 (출처 포함)
