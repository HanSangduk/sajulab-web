// P291 v2 — 연애 본능 결과(/love/[resultCode]). 아키타입 백본 + LLM '와닿는' + 사주 오버레이.
// resultCode = `{typeCode}-{archetypeId}-{secondary?}`. 백엔드(캐시) SSR. 동적 OG = share-image.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { deriveCore } from "@/lib/sajuType";
import { parseResultCode } from "@/lib/loveLanguage";
import { fetchLoveFusion, type LoveFusionResult } from "@/lib/loveApi";
import { SITE, PLAY_URL } from "@/lib/constants";
import ShareBar from "../../t/ShareBar";
import OpenInAppButton from "./OpenInAppButton";
import LoveResultTracker from "./LoveResultTracker";

export const revalidate = 86400;

type Props = { params: Promise<{ resultCode: string }> };

function decode(rc: string): string {
  try {
    return decodeURIComponent(rc);
  } catch {
    return rc;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { resultCode } = await params;
  const rc = decode(resultCode);
  const parsed = parseResultCode(rc);
  if (!parsed) return { title: "사주랩 연애 성향" };
  const data = await fetchLoveFusion({ archetypeId: parsed.archetypeId, secondary: parsed.secondary, typeCode: parsed.typeCode });
  const name = data?.archetype_name || "내 연애 본능";
  const title = `내 연애 본능: ${name} | 사주랩`;
  const desc = data?.headline || "사주로 보는 내 연애 본능. 30초 테스트 → 사주랩";
  const img = `${SITE}/love/${encodeURIComponent(rc)}/share-image`;
  return {
    title,
    description: desc,
    openGraph: { title, description: desc, url: `${SITE}/love/${rc}`, images: [img] },
    twitter: { card: "summary_large_image", title, description: desc, images: [img] },
  };
}

export default async function LoveResultPage({ params }: Props) {
  const { resultCode } = await params;
  const rc = decode(resultCode);
  const parsed = parseResultCode(rc);
  if (!parsed) notFound();
  const core = deriveCore(parsed.typeCode);
  if (!core) notFound();

  const data: LoveFusionResult | null = await fetchLoveFusion({
    archetypeId: parsed.archetypeId,
    secondary: parsed.secondary,
    typeCode: parsed.typeCode,
  });
  if (!data) notFound();

  const shareUrl = `${SITE}/love/${encodeURIComponent(rc)}`;
  const caption = `[내 연애 본능] ${data.archetype_name}\n${data.headline}\n사주 ${parsed.typeCode}${data.ohaeng ? ` · ${data.ohaeng}기운` : ""}\n너의 연애 본능은? 30초 → 사주랩`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1b0f1d] to-gray-900 text-white">
      <LoveResultTracker archetype={data.archetype_id} />
      <main className="mx-auto flex max-w-md flex-col gap-5 px-6 py-12">
        <p className="text-center text-sm text-rose-200/70">친구가 자기 연애 본능을 공유했어요</p>

        {/* 결과 카드 */}
        <div className="rounded-3xl border border-rose-300/20 bg-white/5 p-7 text-center">
          <span className="inline-block rounded-full bg-rose-500/20 px-4 py-1 text-sm text-rose-200">
            {data.archetype_name}
            {data.secondary_ll_label ? ` · ${data.secondary_ll_label}` : ""}
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-snug text-white">{data.headline}</h1>
          <p className="mt-2 text-sm text-rose-100/60">{data.identity}</p>
          {data.body && <p className="mt-5 whitespace-pre-line leading-relaxed text-rose-50/90">{data.body}</p>}

          {data.ohaeng_flavor && (
            <p className="mt-4 text-sm text-rose-100/70">
              <span className="text-rose-300">사주 {parsed.typeCode}</span> · {data.ohaeng_flavor}
            </p>
          )}
        </div>

        {/* 소름 디테일 */}
        {data.soreum?.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="mb-2 text-sm font-semibold text-rose-200">😳 어떻게 알았지</p>
            <ul className="flex flex-col gap-2">
              {data.soreum.map((s, i) => (
                <li key={i} className="text-sm leading-relaxed text-rose-50/85">· {s}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 코칭 + 궁합 */}
        <div className="rounded-2xl bg-rose-500/10 p-5 text-sm leading-relaxed text-rose-50/90">
          💡 {data.coaching}
        </div>
        <div className="flex gap-3 text-sm">
          <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-rose-300">잘 맞는 결</p>
            <p className="mt-1 text-rose-50/85">{data.match_good}</p>
          </div>
          <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-rose-300/80">조심할 결</p>
            <p className="mt-1 text-rose-50/85">{data.match_caution}</p>
          </div>
        </div>

        {/* 앱 full 미리보기 — 잠긴 섹션 제목 + 첫 줄 티저(블러) + 🔒. 다운/결제 유도 */}
        {data.teasers && data.teasers.length > 0 && (
          <div className="rounded-2xl border border-rose-300/20 bg-white/5 p-5">
            <p className="mb-1 text-sm font-semibold text-rose-100">
              앱에서 더 깊은 분석이 기다려요 🔒
            </p>
            <p className="mb-4 text-xs text-rose-100/50">
              {data.archetype_name}, 여기까지가 무료야 — 아래는 앱에서 풀려
            </p>
            <ul className="flex flex-col gap-2.5">
              {data.teasers.map((t) => (
                <li key={t.field} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-rose-50">{t.title}</span>
                    <span className="text-rose-300/70">🔒</span>
                  </div>
                  {t.hook_line && (
                    <p className="mt-1 select-none text-sm leading-relaxed text-rose-50/70 blur-[3px]">
                      {t.hook_line}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <a href="/love"
          className="w-full rounded-2xl border border-rose-300/30 px-8 py-4 text-center font-semibold text-rose-100 transition-colors hover:border-rose-400">
          내 연애 본능은? (30초 테스트)
        </a>

        <ShareBar
          url={shareUrl}
          caption={caption}
          imageUrl={`/love/${encodeURIComponent(rc)}/share-image`}
          code={rc}
          primaryClass="bg-rose-500 text-white hover:bg-rose-600"
          outlineClass="border-white/20 text-white hover:border-white/40"
        />

        <div className="mt-1 flex flex-col gap-2">
          <OpenInAppButton
            resultCode={rc}
            className="w-full rounded-2xl border border-rose-300/30 px-8 py-3.5 text-center font-medium text-white transition-colors hover:border-rose-400"
          >
            앱에서 전체 풀이 보기 (끌리는 상대·갈등 패턴·궁합)
          </OpenInAppButton>
          <a href={PLAY_URL}
            className="text-center text-sm text-white/40 underline-offset-2 hover:underline">
            앱이 없다면 Google Play에서 설치
          </a>
        </div>

        <p className="mt-3 text-center text-xs text-white/40">재미로 보는 연애 성향 안내예요.</p>
      </main>
    </div>
  );
}
