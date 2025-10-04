# Hybrid Legal Q&A Platform: Official Code Guideline

## 1. Project Overview
프론트는 Next.js(App Router, Tailwind, Vercel), 백엔드는 FastAPI(Fly.io), BaaS는 Supabase(Postgres+pgvector, Auth, Storage)를 사용합니다. 클라이언트는 프레젠테이션과 사용자 상태를, 서버는 비즈니스 로직과 데이터 무결성을 책임집니다.

## 2. Core Principles
1. 명료함 우선, 과도한 요령 금지
2. 보안을 기본값으로 설계
3. 도메인 소유권 분리(프런트/백 분리)
4. 타입 안정성(Typescript/Pydantic) 필수

## 3. Next.js (TypeScript)
- 기능 기반 디렉토리, App Router 구조
- `@/*` 절대 경로 import, 합리적 import 정렬
- 서버 액션·API 핸들러에서 `try/catch` 필수, 오류 경계 사용

## 4. FastAPI (Python)
- 책임 기반 디렉토리(`/api`, `/models`, `/services` 등)
- 의존성은 requirements.txt 또는 Poetry로 핀 고정
- 커스텀 예외 핸들러로 표준화된 에러 응답

```python
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse

class InsufficientBalanceError(Exception):
    pass

app = FastAPI()

@app.exception_handler(InsufficientBalanceError)
async def insufficient_balance_exception_handler(request: Request, exc: InsufficientBalanceError):
    return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"message": "Insufficient balance to perform this action."})
```

## 5. Style Rules
- 자동 린팅/포매팅(ESLint/Prettier, Ruff/Black) 통과 필수
- 네이밍: TS camelCase/파스칼, Py snake_case/파스칼
- 클라이언트 공개 환경변수는 `NEXT_PUBLIC_` 접두사 필수

## 6. Architecture Patterns
- 서버 컴포넌트 우선, 클라이언트 컴포넌트는 최소화
- 단순 CRUD는 Supabase RLS로, 복잡 로직은 FastAPI로
- 전역 상태는 기본 훅으로 시작, 라이브러리는 MVP에 도입하지 않음

## 7. API 계약
- 모든 요청/응답은 Pydantic 모델로 타입 안전성 보장

```python
from pydantic import BaseModel
from uuid import UUID

class QuestionCreate(BaseModel):
    title: str
    body: dict
    category: str

class QuestionResponse(BaseModel):
    id: UUID
    title: str
    ai_answer: dict
```
