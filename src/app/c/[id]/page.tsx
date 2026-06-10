import Image from "next/image";
import type { Metadata } from "next";

const PLAY_URL = "https://play.google.com/store/apps/details?id=com.han.sajulab";
const SITE = "https://sajulab-web.vercel.app";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "궁합 반쪽 카드 - 사주랩",
    description: "친구가 궁합 반쪽 카드를 보냈어요. 사주랩에서 두 사람의 궁합을 완성해 보세요.",
    openGraph: {
      title: "궁합 반쪽 카드가 도착했어요",
      description: "사주랩에서 카드를 열고 두 사람의 궁합을 완성해 보세요.",
      images: [`${SITE}/og-referral-default.png`],
    },
  };
}

export default async function CompatLandingPage({ params }: Props) {
  const { id } = await params;
  const safeId = encodeURIComponent(decodeURIComponent(id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-saju-dark to-gray-900 text-white">
      <main className="max-w-md mx-auto px-6 py-20 text-center">
        <div className="mb-6 flex justify-center">
          <Image src="/nyang_default.png" alt="냥도사" width={110} height={110} priority />
        </div>
        <h1 className="text-3xl font-bold mb-3">궁합 반쪽 카드가 도착했어요</h1>
        <p className="text-gray-300 mb-10">
          친구가 두 사람의 궁합을 궁금해해요.
          <br />
          사주랩 앱에서 카드를 열면 궁합이 완성돼요.
        </p>

        <a
          href={`sajulab://compat/half/${safeId}`}
          className="inline-block w-full bg-saju-primary hover:bg-purple-600 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-colors"
        >
          앱에서 카드 열기
        </a>
        <a
          href={PLAY_URL}
          className="mt-3 inline-block w-full border border-white/20 hover:border-white/40 text-white font-medium px-8 py-3 rounded-2xl transition-colors"
        >
          앱이 없다면 Google Play에서 설치
        </a>
        <p className="text-gray-500 text-sm mt-6">
          설치 후 이 페이지로 돌아와 &quot;앱에서 카드 열기&quot;를 누르면 돼요.
        </p>
      </main>
    </div>
  );
}
