import type { Metadata } from "next";
import { DECOVA_NAME, DECOVA_APPSTORE_URL } from "@/lib/decova";
import CopyCodeButton from "./CopyCodeButton";

// P738 — Decova referral 랜딩. 백엔드 referral_cta_meta.share_url(=`{coach_web_base_url}/r/{DCV-code}`,
//   coach_web_base_url=https://sajulab-web.vercel.app/decova) 가 가리키는 페이지.
//   사주랩 /r/[code] 의 Decova 판 — 운세/사주 0(4.3b 분리), App Store(iOS), 코드 carry(앱 첫 실행 clipboard 인식).
//   부모 /decova/layout.tsx 가 saju OG 차단 → 여기서 invite OG 로 override.

type Props = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const safeCode = decodeURIComponent(code);
  return {
    title: `${DECOVA_NAME} 초대 — 친구가 보냈어요`,
    description: `초대 코드 ${safeCode} — ${DECOVA_NAME}에서 AI 텍스팅 코치를 무료로 시작해 보세요.`,
    openGraph: {
      title: `${DECOVA_NAME} 초대장이 도착했어요`,
      description:
        "대화를 붙여넣으면 상대의 마음과 다음 한 마디를 코칭받는 AI 텍스팅 코치. 코드 입력하고 보너스 받기.",
      siteName: DECOVA_NAME,
      type: "website",
      images: [],
    },
    twitter: { card: "summary", images: [] },
  };
}

export default async function DecovaReferralLandingPage({ params }: Props) {
  const { code } = await params;
  const safeCode = decodeURIComponent(code);
  const hasStore = DECOVA_APPSTORE_URL.length > 0;

  return (
    <div className="min-h-screen bg-[#0E0F1A] text-[#ECEDF5]">
      <main className="mx-auto max-w-md px-6 py-20 text-center">
        <p className="mb-5 inline-block rounded-full border border-[#6C72FF]/50 px-3 py-1 text-xs tracking-widest text-[#A9ADFF]">
          AI TEXTING COACH
        </p>
        <h1 className="mb-3 text-3xl font-bold leading-snug">
          친구가 {DECOVA_NAME}에<br />초대했어요
        </h1>
        <p className="mb-10 leading-relaxed text-[#A6A9C2]">
          앱 설치 후 아래 초대 코드를 입력하면
          <br />두 사람 모두 보너스를 받아요.
        </p>

        <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="mb-2 text-sm text-[#A6A9C2]">초대 코드</p>
          <p className="break-all text-2xl font-bold tracking-widest">{safeCode}</p>
        </div>
        <CopyCodeButton code={safeCode} />

        {hasStore ? (
          <a
            href={DECOVA_APPSTORE_URL}
            className="mt-4 inline-block w-full rounded-full bg-[#6C72FF] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#565CEB]"
          >
            App Store에서 {DECOVA_NAME} 설치
          </a>
        ) : (
          <span className="mt-4 inline-block w-full rounded-full border border-[#6C72FF]/40 px-8 py-4 text-lg font-semibold text-[#A9ADFF]">
            App Store 출시 준비 중
          </span>
        )}

        <p className="mt-6 text-sm text-[#A6A9C2]/70">
          코드를 복사해 두면 앱 첫 실행 시 자동으로 인식돼요.
        </p>
      </main>
    </div>
  );
}
