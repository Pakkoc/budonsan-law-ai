## Supabase 스키마 및 RLS 적용 가이드

이 디렉터리는 Supabase 데이터베이스 스키마, 헬퍼 함수, RLS 정책을 SQL로 관리합니다. 파일 적용 순서는 다음과 같습니다.

1) `00_extensions.sql`
2) `01_types.sql`
3) `05_functions.sql`
4) `10_tables.sql`
5) `20_rls.sql`

### 준비 사항
- Supabase 프로젝트 (대시보드에서 생성)
- 데이터베이스 접속 정보 (호스트, DB명, 사용자, 비밀번호)
- 선택: `psql` 또는 Supabase SQL Editor, 혹은 Supabase CLI

### 방법 A: Supabase 대시보드 SQL Editor에서 순서대로 실행
1. Supabase 대시보드 → 프로젝트 → SQL Editor 이동
2. 위 순서대로 각 파일 내용을 붙여넣고 실행
3. 오류가 없는지 확인 (이미 존재하는 객체는 안전하게 건너뜁니다)

### 방법 B: Windows CMD에서 `psql`로 일괄 실행 (권장) [[memory:5114094]]
1. Windows CMD를 열어 프로젝트 루트로 이동: `cd C:\dev\budongsan-law-ai`
2. `supabase\\apply_sql_example.cmd` 파일의 환경변수를 실제 값으로 수정
3. 같은 CMD 창에서 `supabase\\apply_sql_example.cmd` 실행

### 방법 C: Supabase CLI 사용 (선택)
1. CMD에서 CLI 설치: `npm i -g supabase`
2. 로그인: `supabase login`
3. 원격 DB에는 SQL Editor/psql 사용을 권장합니다. (CLI `db push`는 로컬 마이그레이션 워크플로우에 적합)

### 역할별 RLS 요약
- users: 본인 행만 읽기/수정 가능, 관리자는 전체 권한
- lawyer_profiles: 본인 소유만 읽기/작성/수정, 관리자는 전체
- questions: 모두 조회 가능, 작성자는 본인 행 수정/삭제 가능, 관리자는 전체
- answers: 모두 조회 가능, 승인된 변호사만 본인 계정으로 작성/수정/삭제
- documents: 활성 문서만 조회, 생성/수정/삭제는 관리자만

### 테스트 시나리오
- 일반 사용자: `questions` 생성/조회 가능, 타인의 `questions` 수정 불가
- 승인되지 않은 변호사: `answers` 작성 거부 확인
- 승인된 변호사: 자신의 `answers` 작성/수정 가능
- 관리자: 모든 테이블에 대해 CRUD 확인

### 주의사항
- 실제 크레딧 차감(1,000원)은 애플리케이션 레이어의 트랜잭션으로 처리하세요. RLS는 역할과 소유권만 검증합니다.
- `public.users`는 `auth.users`와 1:1 매핑 보조 테이블입니다. 회원가입 후 최초 로그인 시 본인 `id`로 insert 하세요.


