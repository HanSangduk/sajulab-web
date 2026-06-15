// P281 — /t 사주 타입 입력 페이지 (웹 라이트 진입).
import type { Metadata } from "next";
import TypeFlow from "./TypeFlow";

export const metadata: Metadata = {
  title: "내 사주 타입 — 사주랩",
  description:
    "생일만 넣으면 60가지 사주 타입 중 내 타입과 잘 맞는 결·조심할 결까지. 깊은 풀이는 사주랩 앱에서.",
  openGraph: {
    title: "내 사주 타입은? — 사주랩",
    description: "생일만 넣으면 1초 만에 내 오행 타입 카드.",
    images: ["/og-default.png"],
  },
};

export default function TypeInputPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-saju-dark to-gray-900 text-white">
      <main className="mx-auto max-w-md px-6 py-16">
        <h1 className="mb-2 text-center text-3xl font-bold">내 사주 타입은?</h1>
        <p className="mb-10 text-center text-gray-300">
          생일만 넣으면 60타입 중 내 타입과
          <br />
          잘 맞는 결·조심할 결을 알려줄게.
        </p>
        <TypeFlow />
      </main>
    </div>
  );
}
