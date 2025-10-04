import Link from "next/link";

export default function RegisterPage() {
  return (
    <section className="mx-auto w-full max-w-md space-y-8">
      <header className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-primary-900">회원가입</h1>
        <p className="text-sm text-muted">AI 답변과 변호사 상담을 연결하는 부동산법률Q 계정을 만들어보세요.</p>
      </header>

      <form className="space-y-5 rounded-2xl border border-divider bg-surface-elevated p-8 shadow-sm">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium text-primary-900">
            이름
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="홍길동"
            className="w-full rounded-xl border border-divider bg-surface px-4 py-3 text-sm text-primary-900 placeholder:text-muted focus:border-primary-300 focus:outline-none"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium text-primary-900">
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="user@example.com"
            className="w-full rounded-xl border border-divider bg-surface px-4 py-3 text-sm text-primary-900 placeholder:text-muted focus:border-primary-300 focus:outline-none"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm font-medium text-primary-900">
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full rounded-xl border border-divider bg-surface px-4 py-3 text-sm text-primary-900 placeholder:text-muted focus:border-primary-300 focus:outline-none"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="role" className="text-sm font-medium text-primary-900">
            역할 선택
          </label>
          <select
            id="role"
            name="role"
            className="w-full rounded-xl border border-divider bg-surface px-4 py-3 text-sm text-primary-900 focus:border-primary-300 focus:outline-none"
          >
            <option value="user">일반 사용자</option>
            <option value="lawyer">변호사</option>
            <option value="admin">관리자</option>
          </select>
        </div>

        <button
          type="button"
          className="w-full rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
        >
          계정 생성하기
        </button>
      </form>

      <p className="text-center text-sm text-muted">
        이미 계정이 있으신가요?{' '}
        <Link href="/auth/login" className="font-medium text-primary-700 hover:underline">
          로그인 하기
        </Link>
      </p>
    </section>
  );
}
