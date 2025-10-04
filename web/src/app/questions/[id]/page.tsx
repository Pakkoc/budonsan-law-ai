import Link from "next/link";

type QuestionDetailPageProps = {
  params: { id: string };
};

const lawyerResponses = [
  {
    name: "김법률 변호사",
    status: "승인 완료",
    summary: "계약 체결 전 중도금 납부 절차와 위약금 조항을 점검하세요.",
  },
  {
    name: "박부동 변호사",
    status: "승인 대기",
    summary: "전월세 계약에서 확정일자와 전입신고는 동일 날짜에 진행해야 안전합니다.",
  },
];

export default function QuestionDetailPage({ params }: QuestionDetailPageProps) {
  return (
    <section className="space-y-10">
      <header className="flex flex-col gap-3">
        <Link href="/" className="text-sm text-muted hover:text-primary-700">
          ← 질문 목록으로 돌아가기
        </Link>
        <div className="space-y-2">
          <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
            질문 번호 #{params.id}
          </span>
          <h1 className="text-2xl font-semibold text-primary-900">
            3억 원 전세 계약에서 확정일자와 전입신고는 언제 해야 할까요?
          </h1>
          <p className="text-sm text-muted">
            계약 예정인 아파트 전세에 대해 중도금, 확정일자, 전입신고 순서가 궁금합니다. 세입자 보호를 위해 준비해야 할 점을 알려주세요.
          </p>
        </div>
      </header>

      <article className="space-y-6 rounded-2xl border border-divider bg-surface-elevated p-8 shadow-sm">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-primary-900">AI 답변</h2>
          <p className="text-sm text-muted">
            다음 순서를 권장합니다: (1) 계약금 납부 후 즉시 확정일자를 예약, (2) 입주 당일 전입신고, (3) 전입 직후 주민센터에서 확정일자 부여를 확인하세요. 주택임대차보호법 제3조 및 시행령 제3조에 근거합니다.
          </p>
        </div>
        <aside className="rounded-xl border border-primary-100 bg-primary-50 p-4 text-xs text-primary-700">
          AI 답변은 최신 법령을 기반으로 제공되지만 법률 행위는 변호사와 최종 확인 후 진행하세요.
        </aside>
      </article>

      <section className="space-y-4">
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-primary-900">변호사 답변</h2>
          <Link
            href="/lawyer"
            className="text-sm font-medium text-primary-700 hover:underline"
          >
            변호사 센터 이동
          </Link>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          {lawyerResponses.map((response) => (
            <article key={response.name} className="space-y-3 rounded-xl border border-divider bg-surface-elevated p-6 shadow-sm">
              <div>
                <p className="text-sm font-semibold text-primary-900">{response.name}</p>
                <p className="text-xs text-muted">상태: {response.status}</p>
              </div>
              <p className="text-sm text-muted">{response.summary}</p>
              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-full border border-divider px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-primary-200 hover:text-primary-700"
              >
                답변 전문 보기
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-divider bg-surface-elevated p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-primary-900">유사 질문 추천</h2>
        <ul className="space-y-2 text-sm text-muted">
          <li className="rounded-lg border border-divider bg-surface p-4">
            전세 계약 중 집주인이 바뀌면 이미 낸 보증금은 어떻게 보호되나요?
          </li>
          <li className="rounded-lg border border-divider bg-surface p-4">
            전세 만기 3개월 전 집주인이 인상을 요구하는 경우 대응 방법이 궁금합니다.
          </li>
          <li className="rounded-lg border border-divider bg-surface p-4">
            전입신고 전 계약 파기가 발생했을 때 위약금은 어떻게 되나요?
          </li>
        </ul>
      </section>
    </section>
  );
}
