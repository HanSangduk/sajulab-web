import Image from "next/image";
import type { Metadata } from "next";
import CopyCodeButton from "./CopyCodeButton";

const PLAY_URL = "https://play.google.com/store/apps/details?id=com.han.sajulab";
const SITE = "https://sajulab-web.vercel.app";

type Props = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  return {
    title: "사주랩 초대 - 냥도사가 기다린다냥",
    description: `초대 코드 ${code} — 사주랩에서 AI 사주·관상·궁합을 무료로 시작해 보세요.`,
    openGraph: {
      title: "사주랩 초대장이 도착했어요",
      description: "냥도사가 너의 사주를 기다린다냥! 코드 입력하고 보너스 받기.",
      images: [`${SITE}/og-referral.png`],
    },
  };
}

export default async function ReferralLandingPage({ params }: Props) {
  const { code } = await params;
  const safeCode = decodeURIComponent(code);

  return (
    <div className="min-h-screen bg-gradient-to-b from-saju-dark to-gray-900 text-white">
      <main className="max-w-md mx-auto px-6 py-20 text-center">
        <div className="mb-6 flex justify-center">
          <Image src="/nyang_default.png" alt="냥도사" width={110} height={110} priority />
        </div>
        <h1 className="text-3xl font-bold mb-3">친구가 사주랩에 초대했어요</h1>
        <p className="text-gray-300 mb-10">
          앱 설치 후 아래 초대 코드를 입력하면
          <br />
          두 사람 모두 보너스를 받아요.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
          <p className="text-sm text-gray-400 mb-2">초대 코드</p>
          <p className="text-2xl font-bold tracking-widest break-all">{safeCode}</p>
        </div>
        <CopyCodeButton code={safeCode} />

        <a
          href={PLAY_URL}
          className="mt-4 inline-block w-full bg-saju-primary hover:bg-purple-600 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-colors"
        >
          Google Play에서 사주랩 설치
        </a>
        <p className="text-gray-500 text-sm mt-6">
          코드를 복사해 두면 앱 첫 실행 시 자동으로 인식돼요.
        </p>
      </main>
    </div>
  );
}
