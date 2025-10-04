import Link from "next/link";

const categories = [
  "매매",
  "임대차",
  "취득/등기",
  "세금/절세",
  "대출/담보",
];

export default function QuestionNewPage() {
  return (
    <section className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-primary-900">질문 등록</h1>
        <p className="text-sm text-muted">
          부동산 거래나 세금에 관한 궁금한 점을 작성하면 AI가 실시간으로 답변을 제공합니다.
        </p>
      </header>

      <form className="grid gap-6 rounded-2xl border border-divider bg-surface-elevated p-8 shadow-sm">
        <div className="grid gap-2">
          <label htmlFor="category" className="text-sm font-medium text-primary-900">
            카테고리 선택
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className="rounded-full border border-divider px-4 py-2 text-sm text-muted transition-colors hover:border-primary-200 hover:text-primary-700"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-2">
          <label htmlFor="situation" className="text-sm font-medium text-primary-900">
            상황 설명
          </label>
          <textarea
            id="situation"
            name="situation"
            rows={4}
            placeholder="부동산 종류, 거래 예정 시기, 보유한 주택 수 등을 입력하세요."
            className="min-h-32 w-full resize-y rounded-xl border border-divider bg-surface p-4 text-sm text-primary-900 placeholder:text-muted focus:border-primary-300 focus:outline-none"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="question" className="text-sm font-medium text-primary-900">
            질문 내용
          </label>
          <textarea
            id="question"
            name="question"
            rows={6}
            placeholder="AI에게 물어보고 싶은 구체적인 질문을 입력하세요."
            className="min-h-40 w-full resize-y rounded-xl border border-divider bg-surface p-4 text-sm text-primary-900 placeholder:text-muted focus:border-primary-300 focus:outline-none"
          />
        </div>

        <div className="grid gap-2">
          <span className="text-sm font-medium text-primary-900">공개 설정</span>
          <div className="flex flex-col gap-2 text-sm text-muted sm:flex-row">
            <label className="flex flex-1 items-center gap-2 rounded-xl border border-divider bg-surface p-4">
              <input type="radio" name="visibility" defaultChecked />
              <span>
                전체 공개 <span className="text-xs text-muted">(모든 사람 열람 가능)</span>
              </span>
            </label>
            <label className="flex flex-1 items-center gap-2 rounded-xl border border-divider bg-surface p-4">
              <input type="radio" name="visibility" />
              <span>비공개 (나만 볼 수 있음)</span>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-divider px-5 py-3 text-sm font-medium text-muted hover:border-primary-200 hover:text-primary-700"
          >
            취소
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            질문 등록하기
          </button>
        </div>
      </form>
    </section>
  );
}
