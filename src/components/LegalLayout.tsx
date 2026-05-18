import Link from "next/link";

interface LegalLayoutProps {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}

export default function LegalLayout({
  title,
  updatedAt,
  children,
}: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-saju-primary">
            사주랩
          </Link>
          <nav className="flex gap-4 text-sm text-gray-500">
            <Link href="/terms" className="hover:text-gray-900">
              이용약관
            </Link>
            <Link href="/privacy" className="hover:text-gray-900">
              개인정보처리방침
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-sm text-gray-400 mb-8">최종 수정일: {updatedAt}</p>
        <div className="legal-content">{children}</div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-3xl mx-auto px-6 py-8 text-sm text-gray-400">
          <p>주식회사 스트라 | 대표: 한상덕</p>
          <p className="mt-1">문의: support@sajulab.ai</p>
          <div className="mt-3 flex gap-4">
            <Link href="/terms" className="hover:text-gray-600">
              이용약관
            </Link>
            <Link href="/privacy" className="hover:text-gray-600">
              개인정보처리방침
            </Link>
            <Link href="/messenger-terms" className="hover:text-gray-600">
              메신저 도사 이용약관
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
