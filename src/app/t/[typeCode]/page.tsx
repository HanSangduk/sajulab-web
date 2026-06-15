// P281 — /t/[typeCode] 타입 랜딩 (SNS 공유 수신 표면). 동적 OG 는 opengraph-image.tsx 가 자동 연결.
// 코어(element/best·worst/희귀도)는 typeCode 파싱으로 항상 동작, nickname/traits 는 백엔드 enrich.
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { deriveCore } from "@/lib/sajuType";
import { fetchByCode } from "@/lib/sajuTypeApi";
import { SITE, PLAY_URL } from "@/lib/constants";
import TypeCardVisual from "../TypeCardVisual";
import ShareBar from "../ShareBar";

// mode B(type_code)는 60개 deterministic → 페이지 ISR 캐시(백엔드 호출 흡수).
export const revalidate = 86400;

type Props = { params: Promise<{ typeCode: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { typeCode } = await params;
  const code = decodeURIComponent(typeCode);
  const core = deriveCore(code);
  if (!core) return { title: "사주랩" };
  const title = `${code} — 내 사주 타입 | 사주랩`;
  const desc = `${core.element.label}(${core.element.hanja}) ${core.zodiac.animal}띠. 잘 맞는 결은 ${core.best.label}, 조심할 결은 ${core.worst.label}. 너는 무슨 타입이야?`;
  return {
    title,
    description: desc,
    openGraph: { title: `${code} 사주 타입`, description: desc, url: `${SITE}/t/${code}` },
    twitter: { card: "summary_large_image", title: `${code} 사주 타입`, description: desc },
  };
}

export default async function TypeLandingPage({ params }: Props) {
  const { typeCode } = await params;
  const code = decodeURIComponent(typeCode);
  const core = deriveCore(code);
  if (!core) notFound();
  // 동물약자("화룡") → 지지 canonical("화진") 리다이렉트 (앱이 공유한 링크 흡수).
  // Location 헤더는 ASCII만 → 한글 typeCode 인코딩 필수.
  if (core.typeCode !== code) redirect(`/t/${encodeURIComponent(core.typeCode)}`);

  const data = await fetchByCode(core.typeCode);
  const shareUrl = `${SITE}/t/${core.typeCode}`;
  const caption = `나랑 잘 맞는 결은 ${core.best.label}(${core.best.hanja}), 조심할 결은 ${core.worst.label}(${core.worst.hanja}).\n너는 무슨 타입이야? 우리 맞춰보자 → 사주랩`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-saju-dark to-gray-900 text-white">
      <main className="mx-auto flex max-w-md flex-col gap-5 px-6 py-14">
        <p className="text-center text-gray-300">
          친구가 자기 사주 타입을 공유했어요
        </p>
        <TypeCardVisual core={core} data={data} />

        {data?.love_pattern && (
          <p className="-mt-1 px-2 text-center text-sm leading-relaxed text-gray-300">
            <span className="text-gray-500">연애할 땐 </span>
            {data.love_pattern}
          </p>
        )}

        <a
          href="/t"
          className="w-full rounded-2xl bg-saju-primary px-8 py-4 text-center text-lg font-semibold text-white transition-colors hover:bg-purple-600"
        >
          내 사주 타입은? (생일만 입력)
        </a>

        <ShareBar url={shareUrl} caption={caption} />

        <div className="mt-2 flex flex-col gap-2">
          <a
            href={`sajulab://t/${encodeURIComponent(code)}`}
            className="w-full rounded-2xl border border-white/20 px-8 py-3.5 text-center font-medium text-white transition-colors hover:border-white/40"
          >
            앱에서 열기 (대운·십신·궁합까지)
          </a>
          <a
            href={PLAY_URL}
            className="text-center text-sm text-gray-400 underline-offset-2 hover:underline"
          >
            앱이 없다면 Google Play에서 설치
          </a>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500">
          타입·기운 풀이는 명리 이론을 바탕으로 한 경향성 안내예요.
        </p>
      </main>
    </div>
  );
}
