import Link from "next/link";

const insightCards = [
  {
    title: "AI 실시간 답변",
    description: "LangChain 기반 RAG 파이프라인을 통해 최신 법령 정보를 즉시 제공합니다.",
  },
  {
    title: "변호사 추가 답변",
    description: "전문 변호사가 추가 답변을 제공해 신뢰성을 높입니다.",
  },
  {
    title: "전문가 인증 시스템",
    description: "변호사는 자격 증명을 통해 인증되어 신뢰할 수 있습니다.",
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="grid gap-10 rounded-2xl bg-surface-elevated p-10 shadow-sm lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
            부동산 법률 Q&A 플랫폼
          </span>
          <h1 className="text-3xl font-semibold leading-tight text-primary-900 sm:text-4xl">
            부동산 거래부터 세금까지 법률 전문가가 답변합니다
          </h1>
          <p className="max-w-xl text-base text-muted">
            AI로 즉시 정보를 얻고, 필요 시 변호사 추가 답변으로 더욱 신뢰성있는 정보를 제공받으세요.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/questions/new"
              className="inline-flex items-center justify-center rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              질문 등록하기
            </Link>
            <Link
              href="/lawyer"
              className="inline-flex items-center justify-center rounded-full border border-divider px-5 py-3 text-sm font-medium text-muted transition-colors hover:border-primary-200 hover:text-primary-700"
            >
              변호사 영역 바로가기
            </Link>
          </div>
        </div>
        <div className="space-y-4 rounded-xl border border-divider bg-surface p-6">
          <h2 className="text-lg font-semibold text-primary-900">MVP 핵심 지표</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-primary-50 p-4">
              <dt className="text-xs font-medium text-muted">월간 활성 질문자</dt>
              <dd className="mt-2 text-2xl font-semibold text-primary-700">1,000명+</dd>
            </div>
            <div className="rounded-lg bg-primary-50 p-4">
              <dt className="text-xs font-medium text-muted">AI 답변 만족도</dt>
              <dd className="mt-2 text-2xl font-semibold text-primary-700">80% 목표</dd>
            </div>
            <div className="rounded-lg bg-primary-50 p-4">
              <dt className="text-xs font-medium text-muted">변호사 답변 비율</dt>
              <dd className="mt-2 text-2xl font-semibold text-primary-700">30%+</dd>
            </div>
            <div className="rounded-lg bg-primary-50 p-4">
              <dt className="text-xs font-medium text-muted">질문 전환율</dt>
              <dd className="mt-2 text-2xl font-semibold text-primary-700">25% 목표</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary-900">플랫폼 핵심 기능</h2>
          <p className="max-w-2xl text-sm text-muted">
            부동산 법률 AI 질문과 변호사 답변을 통해 신뢰할 수 있는 정보를 빠르게 확인하세요.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {insightCards.map((card) => (
            <article key={card.title} className="flex flex-col gap-2 rounded-xl border border-divider bg-surface-elevated p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-primary-900">{card.title}</h3>
              <p className="text-sm text-muted">{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-2xl border border-divider bg-surface-elevated p-8 shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-primary-900">AI + 변호사 하이브리드 답변</h2>
          <ol className="space-y-3 text-sm text-muted">
            <li className="rounded-lg border border-primary-100 bg-primary-50 p-4 text-primary-700">
              1. 사용자는 카테고리를 선택하고 개인의 상황을 상세히 입력합니다.
            </li>
            <li className="rounded-lg border border-primary-100 bg-primary-50 p-4 text-primary-700">
              2. AI가 실시간 답변을 생성하고 출처를 명시합니다.
            </li>
            <li className="rounded-lg border border-primary-100 bg-primary-50 p-4 text-primary-700">
              3. 변호사가 추가 답변을 작성하고, 질문자는 여러 답변을 비교할 수 있습니다.
            </li>
          </ol>
        </div>
        <div className="space-y-4 rounded-xl border border-divider bg-surface p-6">
          <h3 className="text-base font-semibold text-primary-900">정보 구조</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li>홈: 검색과 질문 등록 CTA</li>
            <li>질문 상세: 카테고리별로 정렬 및 검색 가능</li>
            <li>답변 영역: AI/변호사 답변, 유사 질문 추천</li>
            <li>마이페이지: 내가 쓴 질문과 답변</li>
            <li>변호사/관리자 영역: 답변 및 승인 관리</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
