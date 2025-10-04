import Link from "next/link";

export default function LawyerPortalPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-primary-900">변호사 센터</h1>
        <p className="text-sm text-muted">잠재 고객을 만나고 답변 건마다 보상을 받을 수 있도록 프로필과 답변 현황을 관리하세요.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="space-y-4 rounded-2xl border border-divider bg-surface-elevated p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-primary-900">승인 상태</h2>
          <div className="rounded-xl border border-divider bg-surface p-5 text-sm text-muted">
            자격증 및 신분증 서류 검토가 진행 중입니다. 승인 완료 후 질문에 답변할 수 있습니다.
          </div>
          <Link
            href="/mypage"
            className="inline-flex w-full items-center justify-center rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            내 프로필 관리하기
          </Link>
        </article>

        <aside className="space-y-4 rounded-2xl border border-divider bg-surface-elevated p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-primary-900">알림</h2>
          <ul className="space-y-3 text-sm text-muted">
            <li className="rounded-lg border border-divider bg-surface p-4">
              신규 키워드 매칭 질문 2건 · 답변 마감 6시간 전
            </li>
            <li className="rounded-lg border border-divider bg-surface p-4">
              잔액 부족 · 5,000원 미만일 경우 답변이 제한됩니다.
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
