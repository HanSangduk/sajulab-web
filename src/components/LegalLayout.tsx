import Link from "next/link";

interface LegalLayoutProps {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
  lang?: "ko" | "en";
  altHref?: string;
}

const STRINGS = {
  ko: {
    brand: "사주랩",
    home: "/",
    terms: "이용약관",
    privacy: "개인정보처리방침",
    messenger: "두근 사주 이용약관",
    updated: "최종 수정일",
    footerLine: "사주랩 | 개인 개발자 한상덕",
    contact: "문의",
    toggle: "English",
    prefix: "",
  },
  en: {
    brand: "Sajulab",
    home: "/en",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    messenger: "Dugeun Saju Terms",
    updated: "Last updated",
    footerLine: "Sajulab | Independent developer Sangduk Han",
    contact: "Contact",
    toggle: "한국어",
    prefix: "/en",
  },
} as const;

export default function LegalLayout({
  title,
  updatedAt,
  children,
  lang = "ko",
  altHref,
}: LegalLayoutProps) {
  const t = STRINGS[lang];
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={t.home} className="text-lg font-bold text-saju-primary">
            {t.brand}
          </Link>
          <nav className="flex gap-4 text-sm text-gray-500">
            <Link href={`${t.prefix}/terms`} className="hover:text-gray-900">
              {t.terms}
            </Link>
            <Link href={`${t.prefix}/privacy`} className="hover:text-gray-900">
              {t.privacy}
            </Link>
            {altHref && (
              <Link href={altHref} className="hover:text-gray-900 font-medium">
                {t.toggle}
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-sm text-gray-400 mb-8">
          {t.updated}: {updatedAt}
        </p>
        <div className="legal-content">{children}</div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-3xl mx-auto px-6 py-8 text-sm text-gray-400">
          <p>{t.footerLine}</p>
          <p className="mt-1">{t.contact}: richramsang@gmail.com</p>
          <div className="mt-3 flex gap-4">
            <Link href={`${t.prefix}/terms`} className="hover:text-gray-600">
              {t.terms}
            </Link>
            <Link href={`${t.prefix}/privacy`} className="hover:text-gray-600">
              {t.privacy}
            </Link>
            <Link
              href={`${t.prefix}/messenger-terms`}
              className="hover:text-gray-600"
            >
              {t.messenger}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
