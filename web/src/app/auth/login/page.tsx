import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="mx-auto w-full max-w-md space-y-8">
      <header className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-primary-900">로그인</h1>
        <p className="text-sm text-muted">부동산법률Q 계정으로 로그인하여 질문을 등록하거나 답변을 확인하세요.</p>
      </header>

      <form className="space-y-5 rounded-2xl border border-divider bg-surface-elevated p-8 shadow-sm">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-primary-900">
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="law@yourdomain.com"
            className="w-full rounded-xl border border-divider bg-surface px-4 py-3 text-sm text-primary-900 placeholder:text-muted focus:border-primary-300 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-primary-900">
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full rounded-xl border border-divider bg-surface px-4 py-3 text-sm text-primary-900 placeholder:text-muted focus:border-primary-300 focus:outline-none"
          />
          <Link href="/auth/password-reset" className="text-xs text-primary-700 hover:underline">
            비밀번호를 잊으셨나요?
          </Link>
        </div>

        <button
          type="button"
          className="w-full rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
        >
          로그인
        </button>
      </form>

      <p className="text-center text-sm text-muted">
        아직 계정이 없으신가요? 
        <Link href="/auth/register" className="font-medium text-primary-700 hover:underline">
          회원가입 하기
        </Link>
      </p>
    </section>
  );
}
