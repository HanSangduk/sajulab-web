import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-saju-dark to-gray-900 text-white">
      {/* Hero */}
      <main className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="mb-6 flex justify-center">
          <Image
            src="/nyang_default.png"
            alt="냥도사"
            width={120}
            height={120}
            priority
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">사주랩</h1>
        <p className="text-xl text-gray-300 mb-2">
          AI가 풀어주는 사주 · 관상 · 궁합
        </p>
        <p className="text-gray-400 mb-12">
          냥도사와 함께하는 운명 해석
        </p>

        {/* CTA */}
        <a
          href="https://play.google.com/store/apps/details?id=com.han.sajulab"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-saju-primary hover:bg-purple-600 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-colors"
        >
          Google Play에서 다운로드
        </a>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-left">
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <p className="text-2xl mb-3">🔮</p>
            <h3 className="font-semibold text-lg mb-2">AI 사주 분석</h3>
            <p className="text-gray-400 text-sm">
              사주팔자를 AI가 현대적으로 해석. 오늘의 운세부터 대운 흐름까지.
            </p>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <p className="text-2xl mb-3">👤</p>
            <h3 className="font-semibold text-lg mb-2">AI 관상</h3>
            <p className="text-gray-400 text-sm">
              셀카 한 장으로 보는 관상 풀이. 삼정오관 분석.
            </p>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <p className="text-2xl mb-3">💬</p>
            <h3 className="font-semibold text-lg mb-2">두근 사주</h3>
            <p className="text-gray-400 text-sm">
              카톡 캡처 한 장이면 냥도사가 내 사주로 대화를 해석하고 다음 수를 알려줌.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-4xl mx-auto px-6 py-8 text-sm text-gray-500">
          <p>사주랩 | 개인 개발자 한상덕</p>
          <p className="mt-1">문의: richramsang@gmail.com</p>
          <div className="mt-3 flex gap-4">
            <Link href="/terms" className="hover:text-gray-300">
              이용약관
            </Link>
            <Link href="/privacy" className="hover:text-gray-300">
              개인정보처리방침
            </Link>
            <Link href="/messenger-terms" className="hover:text-gray-300">
              두근 사주 이용약관
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
