import Link from "next/link";
import { DECOVA_NAME, DECOVA_SUPPORT_EMAIL } from "@/lib/decova";

// P289 — Decova 법적/지원 페이지 공용 레이아웃. 사주랩과 분리: 자체 네비/푸터,
// 사주랩(/, /privacy 등)으로 가는 링크 0. lang 으로 KR/EN nav 라벨만 분기.
interface DecovaLayoutProps {
  title: string;
  updatedAt: string;
  lang?: "ko" | "en";
  children: React.ReactNode;
}

const T = {
  ko: {
    home: "Decova",
    privacy: "개인정보처리방침",
    terms: "이용약관",
    support: "고객지원",
    deletion: "계정 삭제",
    updated: "최종 수정일",
    operator: "Decova · 문의",
  },
  en: {
    home: "Decova",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    support: "Support",
    deletion: "Delete Account",
    updated: "Last updated",
    operator: "Decova · Contact",
  },
};

export default function DecovaLayout({
  title,
  updatedAt,
  lang = "ko",
  children,
}: DecovaLayoutProps) {
  const t = T[lang];
  const base = lang === "en" ? "/decova/en" : "/decova";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href={base} className="text-lg font-bold tracking-tight text-gray-900">
            {t.home}
          </Link>
          <nav className="flex gap-4 text-sm text-gray-500">
            <Link href={`${base}/privacy`} className="hover:text-gray-900">
              {t.privacy}
            </Link>
            <Link href={`${base}/terms`} className="hover:text-gray-900">
              {t.terms}
            </Link>
            <Link href={`${base}/support`} className="hover:text-gray-900">
              {t.support}
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">{title}</h1>
        <p className="mb-8 text-sm text-gray-400">
          {t.updated}: {updatedAt}
        </p>
        <div className="legal-content">{children}</div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200">
        <div className="mx-auto max-w-3xl px-6 py-8 text-sm text-gray-400">
          <p className="font-semibold text-gray-600">{DECOVA_NAME}</p>
          <p className="mt-1">
            {t.operator}: {DECOVA_SUPPORT_EMAIL}
          </p>
          <div className="mt-3 flex flex-wrap gap-4">
            <Link href={`${base}/terms`} className="hover:text-gray-600">
              {t.terms}
            </Link>
            <Link href={`${base}/privacy`} className="hover:text-gray-600">
              {t.privacy}
            </Link>
            <Link href={`${base}/support`} className="hover:text-gray-600">
              {t.support}
            </Link>
            <Link href={`${base}/account-deletion`} className="hover:text-gray-600">
              {t.deletion}
            </Link>
            <Link
              href={lang === "en" ? "/decova" : "/decova/en"}
              className="hover:text-gray-600"
            >
              {lang === "en" ? "한국어" : "English"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
