# 하이브리드 부동산 법률 Q&A 플랫폼 정보 구조 (IA)

## 1. 사이트맵
```
├── 홈 (/)
├── 질문하기 (/ask)
│   ├── 카테고리 선택 (/ask/category)
│   ├── 상세 정보 입력 (/ask/details)
│   └── 제출 완료 (/ask/complete)
├── 질문 상세 (/questions/:id)
├── 검색 & 목록 (/search)
│   ├── 전체 질문 (/questions)
│   └── 카테고리별 (/category/:name)
├── 인증 (/auth)
│   ├── 로그인 (/auth/login)
│   ├── 회원가입 (/auth/signup)
│   └── 비밀번호 찾기 (/auth/reset)
├── 마이페이지 (/my)
│   ├── 내 질문 (/my/questions)
│   ├── 북마크 (/my/bookmarks)
│   ├── 활동 통계 (/my/stats)
│   └── 계정 설정 (/my/settings)
├── 변호사 대시보드 (/lawyer)
│   ├── 답변 대기 질문 (/lawyer/pending)
│   ├── 내 답변 관리 (/lawyer/answers)
│   ├── 잔액 관리 (/lawyer/billing)
│   └── 프로필 편집 (/lawyer/profile)
├── 관리자 (/admin)
│   ├── 변호사 인증 관리 (/admin/lawyers)
│   ├── 법령 PDF 관리 (/admin/documents)
│   ├── 신고 관리 (/admin/reports)
│   └── 통계 리포트 (/admin/analytics)
├── 온보딩 (/onboarding)
└── 오류 페이지 (/404, /500)
```

## 2. 사용자 흐름
- 일반인: 질문 등록 → AI 답변 확인 → 변호사 답변 알림 → 북마크/PDF
- 변호사: 가입/인증 → 관심 키워드 → 답변 작성(1,000원 차감)
- 관리자: PDF 업로드/버전 → 변호사 승인 → 신고 처리

## 3. 네비게이션
- GNB: 로고, 검색창, 질문하기, 로그인/프로필
- 메인: 홈(카테고리 탭), 질문하기(스테퍼), 검색/목록(필터+정렬)
- 사용자별: 마이페이지/변호사/관리자 섹션
- 푸터: 약관, 개인정보, 고객센터, 회사 정보

## 4. 페이지 계층
```
/ (1)
├── ask/ (1)
│   ├── category (2)
│   ├── details (2)
│   └── complete (2)
├── questions/ (1)
│   └── :id (2)
├── search (1)
├── category/ (1)
│   └── :name (2)
├── auth/ (1)
│   ├── login (2)
│   ├── signup (2)
│   └── reset (2)
├── my/ (1)
│   ├── questions (2)
│   ├── bookmarks (2)
│   ├── stats (2)
│   └── settings (2)
├── lawyer/ (1)
│   ├── pending (2)
│   ├── answers (2)
│   ├── billing (2)
│   └── profile (2)
├── admin/ (1)
│   ├── lawyers (2)
│   ├── documents (2)
│   ├── reports (2)
│   └── analytics (2)
├── onboarding (1)
├── 404 (1)
└── 500 (1)
```

## 5. 콘텐츠 구성(발췌)
- 홈: 히어로, 검색창, 카테고리 탭, 최신/인기 질문, 소개
- 질문 상세: 제목/내용, AI 답변 카드, 변호사 답변 리스트, 북마크, 유사 질문
- 변호사 대시보드: 대기 질문, 잔액, 통계, 프로필 편집

## 6. 인터랙션 패턴
- 모달: 로그인, 상세입력, 확인
- 툴팁: 법률 용어/버튼 안내
- 무한 스크롤: 목록/검색/답변
- 실시간: AI 생성 진행, 새 답변 알림, 북마크 즉시 반영
- 단계 진행: 질문 스테퍼, 변호사 인증 단계

## 7. URL 규칙
- 소문자, 하이픈, 복수형 사용, RESTful 패턴
- SEO: 의미 있는 슬러그, 카테고리 한→영 변환, 숫자 기반 ID

## 8. 컴포넌트 계층(요약)
- 글로벌: Header, Footer, Sidebar, Modal
- 질문: QuestionForm, AIAnswerCard, LawyerAnswerCard, RelatedQuestions
- 사용자: UserProfile, ActivityStats, BookmarkList, NotificationBell
- 변호사: LawyerDashboard, PendingQuestions, BalanceWidget, AnswerEditor
- 관리자: AdminPanel, ApprovalQueue, DocumentUpload, AnalyticsDashboard
- 공통: Button, Input, Card, Badge, Loading, Alert, Tooltip, Pagination
- 상태: AuthProvider, ThemeProvider, NotificationProvider, SearchProvider