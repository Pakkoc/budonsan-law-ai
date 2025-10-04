export default function MyPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-primary-900">마이페이지</h1>
        <p className="text-sm text-muted">최근 질문, 변호사 답변, 북마크 활동을 한눈에 확인하세요.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="space-y-4 rounded-2xl border border-divider bg-surface-elevated p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-primary-900">내 질문 요약</h2>
          <ul className="space-y-3 text-sm text-muted">
            <li className="rounded-lg border border-divider bg-surface p-4">
              2024-10-03 · 전세 확정일자 절차 확인 (변호사 2명 답변)
            </li>
            <li className="rounded-lg border border-divider bg-surface p-4">
              2024-09-27 · 상가 임대차 계약해지 위약금 상담 (AI 답변 검토 중)
            </li>
          </ul>
        </article>

        <article className="space-y-4 rounded-2xl border border-divider bg-surface-elevated p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-primary-900">북마크 & 최근 활동</h2>
          <ul className="space-y-3 text-sm text-muted">
            <li className="rounded-lg border border-divider bg-surface p-4">
              북마크: 분양권 전매 제한 해제 Q&A (AI 만족도 4.7/5)
            </li>
            <li className="rounded-lg border border-divider bg-surface p-4">
              최근 조회: 상가 보증금 반환 소송 절차
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}
