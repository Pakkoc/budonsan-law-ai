import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-primary-900">관리자 콘솔</h1>
        <p className="text-sm text-muted">법령 자료와 변호사 인증을 관리하여 플랫폼 품질을 유지하세요.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="space-y-4 rounded-2xl border border-divider bg-surface-elevated p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-primary-900">승인 대기 변호사</h2>
          <ul className="space-y-3 text-sm text-muted">
            <li className="rounded-lg border border-divider bg-surface p-4">
              김법률 · 자격증 확인 필요 · 업로드 파일 3개
            </li>
            <li className="rounded-lg border border-divider bg-surface p-4">
              이세금 · 신분증 재업로드 요청 · 제출 기한 D-2
            </li>
          </ul>
          <div className="flex gap-2">
            <button className="flex-1 rounded-full border border-divider px-4 py-2 text-sm font-medium text-muted hover:border-primary-200 hover:text-primary-700">
              일괄 승인
            </button>
            <button className="flex-1 rounded-full border border-divider px-4 py-2 text-sm font-medium text-muted hover:border-primary-200 hover:text-primary-700">
              보류 처리
            </button>
          </div>
        </article>

        <article className="space-y-4 rounded-2xl border border-divider bg-surface-elevated p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-primary-900">법령 PDF 관리</h2>
          <div className="space-y-3 text-sm text-muted">
            <div className="rounded-lg border border-divider bg-surface p-4">
              주택임대차보호법 · v2024.09 · 최근 업데이트: 2024-09-30
            </div>
            <div className="rounded-lg border border-divider bg-surface p-4">
              부동산거래신고법 · v2024.08 · 최근 업데이트: 2024-08-15
            </div>
          </div>
          <Link
            href="/admin/uploads"
            className="inline-flex w-full items-center justify-center rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            새 문서 업로드
          </Link>
        </article>
      </div>
    </section>
  );
}
