# 하이브리드 부동산 법률 Q&A 플랫폼 Design Guide

## 1. 무드
신뢰·전문성·접근성을 강조하는 차분하고 명확한 UI. 키워드: 신뢰감, 전문성, 접근성, 명확성, 혁신성.

## 2. 참조 서비스
- Toss 스타일 레퍼런스
- Primary: #0064FF, Secondary: #F5F7FA

## 3. 컬러
- Primary: #0064FF / Hover: #0040C0
- Secondary: #F5F7FA
- Success: #2DB47C, Danger: #FF4D4F
- Text: #1B1E27 / #666D7C

## 4. 타이포그래피
- Pretendard
- H1 32/Bold, H2 24/SemiBold, Body 16/Regular, Caption 12/Regular
- Line-height 1.5, 숫자 Tabular lining

## 5. 레이아웃
- 데스크톱 12-col(72px gutter, max 1280)
- 모바일 4-col(16px gutter)
- 중앙 8-col 집중, 수직 리듬 유지

## 6. 비주얼 스타일
- 아이콘: Feather, 2px, 16/20/24px, #666D7C
- 일러스트: 3-tone flat
- 이미지: PDF 썸네일 WebP 400px, 아바타 128×128 JPG≤100KB, 8px 라운드

## 7. UX 가이드
- 투명성: AI/변호사 답변 명확 구분
- 신뢰성: 출처 표기, 면책 고지 상시 노출
- 접근성: WCAG 2.1 AA
- 효율성: 3클릭 이내 목표 달성

## 8. UI 컴포넌트
- 버튼 Primary: 배경 #0064FF, 텍스트 #FFF, 라운드 8px, 호버 #0040C0, 12×24 패딩
- 버튼 Secondary: 투명, 1px #E5E7EB, 텍스트 #1B1E27, 12×24
- 입력: 배경 #F5F7FA, 1px #E5E7EB, 포커스 #0064FF, 12×16, 라벨 항상 표시
- 카드(AI): White, 0 2px 8px rgba(0,0,0,0.1), 24px, 라운드 12px
- 카드(변호사): White, 0 1px 4px rgba(0,0,0,0.05), 20px, 라운드 8px
- 네비게이션: 상단 64px, White, 0 1px 3px shadow, 검색창+질문하기 버튼
- 스텝퍼: 활성 #0064FF, 완료 #2DB47C, 대기 #E5E7EB
- 알림/경고: 면책 배너 Secondary 배경 + Danger 텍스트
- 모달/툴팁: 모달 White 16px 라운드, 툴팁 #1B1E27 배경/White 텍스트
- 인터랙션: 버튼 150ms, 전개 200ms, 스켈레톤, 키보드 포커스 2px Primary
- 광고 슬롯: 데스크톱 300×600, 모바일 320×100, Secondary 배경, 1px #E5E7EB
- 접근성: Primary 배경의 텍스트는 White로 대비 4.5:1 확보

## 9. 반응형
- BP 768px, 모바일/데스크톱 구분
- 모바일: 단일 컬럼, 44px 터치 영역
- 데스크톱: 멀티 컬럼, 호버 활용