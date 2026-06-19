// P291 — 연애 심리테스트 랜딩(/love). 사주 타입 × 사랑의 언어. 콘텐츠(인스타/틱톡) → 바이오 링크 진입점.
import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import LoveQuizFlow from "./LoveQuizFlow";

export const metadata: Metadata = {
  title: "사주로 보는 내 연애 본능 — 사주랩",
  description:
    "생일 + 12문항으로 보는 나의 연애 스타일. 사주 타입 × 사랑의 언어(인정·시간·선물·봉사·스킨십) 조합. 너는 어떤 연애 본능이야?",
  openGraph: {
    title: "사주로 보는 내 연애 본능",
    description: "사주 타입 × 사랑의 언어. 30초 테스트로 너의 연애 본능 찾기 → 사주랩",
    url: `${SITE}/love`,
  },
  twitter: { card: "summary_large_image", title: "사주로 보는 내 연애 본능" },
};

export default function LoveLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1b0f1d] to-gray-900 text-white">
      <main className="mx-auto flex max-w-md flex-col gap-6 px-6 py-14">
        <header className="text-center">
          <p className="mb-3 inline-block rounded-full border border-rose-300/40 px-3 py-1 text-xs tracking-widest text-rose-200">
            사주 × 사랑의 언어
          </p>
          <h1 className="text-3xl font-bold leading-snug">
            사주로 보는
            <br />내 <span className="text-rose-300">연애 본능</span>
          </h1>
        </header>
        <LoveQuizFlow />
      </main>
    </div>
  );
}
