import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const NAV_LINKS = [
  { href: "/", label: "홈" },
  { href: "/questions/new", label: "질문 등록" },
  { href: "/lawyer", label: "변호사 영역" },
  { href: "/admin", label: "관리자" },
  { href: "/mypage", label: "마이페이지" },
];

export const metadata: Metadata = {
  title: "부동산법률Q | 부동산 법률 Q&A 플랫폼",
  description:
    "부동산 거래와 세금 관련 최신 법령 정보를 AI와 변호사 답변을 통해 신속하고 신뢰성 있게 제공하는 Q&A 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-surface text-primary-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-divider bg-surface-elevated/80 backdrop-blur">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
              <Link href="/" className="text-lg font-semibold tracking-tight text-primary-900">
                부동산법률Q
              </Link>
              <nav className="hidden items-center gap-6 text-sm font-medium text-muted lg:flex">
                {NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="transition-colors hover:text-primary-700 focus-visible:text-primary-700 focus-visible:outline-none"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="rounded-full border border-divider px-4 py-2 text-sm font-medium text-muted transition-all hover:border-primary-200 hover:text-primary-700"
                >
                  로그인
                </Link>
                <Link
                  href="/auth/register"
                  className="rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  질문 등록하기
                </Link>
              </div>
            </div>
          </header>

          <div className="border-b border-divider bg-surface-elevated px-4 py-3 text-sm text-muted lg:hidden">
            <div className="mx-auto flex w-full max-w-6xl flex-wrap gap-3">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-full border border-divider px-3 py-1 transition-colors hover:border-primary-200 hover:text-primary-700"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
            {children}
          </main>

          <footer className="border-t border-divider bg-surface-elevated">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
              <p className="font-medium text-primary-900">부동산법률Q</p>
              <p>AI와 변호사가 답변하는 부동산 법률 Q&A 플랫폼</p>
              <div className="flex gap-4">
                <Link href="/questions/new" className="hover:text-primary-700">
                  질문 등록
                </Link>
                <Link href="/lawyer" className="hover:text-primary-700">
                  변호사 영역
                </Link>
                <Link href="/admin" className="hover:text-primary-700">
                  관리자 페이지
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
