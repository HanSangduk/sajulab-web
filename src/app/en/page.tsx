import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Sajulab - AI Saju · Face Reading · Compatibility",
  description:
    "Saju, face reading, and compatibility interpreted by AI. Discover your fate with Nyang Dosa.",
};

export default function HomeEn() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-saju-dark to-gray-900 text-white">
      {/* Hero */}
      <main className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="mb-6 flex justify-center">
          <Image
            src="/nyang_default.png"
            alt="Nyang Dosa"
            width={120}
            height={120}
            priority
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">Sajulab</h1>
        <p className="text-xl text-gray-300 mb-2">
          Saju · Face Reading · Compatibility, interpreted by AI
        </p>
        <p className="text-gray-400 mb-12">
          Discover your fate with Nyang Dosa
        </p>

        {/* CTA */}
        <a
          href="https://play.google.com/store/apps/details?id=com.han.sajulab"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-saju-primary hover:bg-purple-600 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-colors"
        >
          Download on Google Play
        </a>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-left">
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <p className="text-2xl mb-3">🔮</p>
            <h3 className="font-semibold text-lg mb-2">AI Saju Analysis</h3>
            <p className="text-gray-400 text-sm">
              Korean Four Pillars astrology, interpreted by AI for today —
              from your daily fortune to the flow of your decade-long luck
              cycles.
            </p>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <p className="text-2xl mb-3">👤</p>
            <h3 className="font-semibold text-lg mb-2">AI Face Reading</h3>
            <p className="text-gray-400 text-sm">
              A face reading from a single selfie, based on the traditional
              three-zones-and-five-features framework.
            </p>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <p className="text-2xl mb-3">💬</p>
            <h3 className="font-semibold text-lg mb-2">Dugeun Saju</h3>
            <p className="text-gray-400 text-sm">
              One chat screenshot is all it takes — Nyang Dosa reads the
              conversation through your saju and tells you your next move.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-4xl mx-auto px-6 py-8 text-sm text-gray-500">
          <p>Sajulab | Independent developer Sangduk Han</p>
          <p className="mt-1">Contact: richramsang@gmail.com</p>
          <div className="mt-3 flex gap-4">
            <Link href="/en/terms" className="hover:text-gray-300">
              Terms of Service
            </Link>
            <Link href="/en/privacy" className="hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link href="/en/messenger-terms" className="hover:text-gray-300">
              Dugeun Saju Terms
            </Link>
            <Link href="/" className="hover:text-gray-300">
              한국어
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
