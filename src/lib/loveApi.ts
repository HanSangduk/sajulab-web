// P291 v2 — 연애 아키타입 fusion 백엔드 연동 (서버 전용). 백엔드 POST /api/v1/love/fusion (캐시).
import type { LoveLang } from "./loveLanguage";

const BACKEND_BASE =
  process.env.BACKEND_BASE_URL ??
  "https://sajulab-backend-qqjgnsi3ja-du.a.run.app";
// P294: 신뢰 웹 서버 per-IP 면제 토큰(서버 전용). 백엔드 SAJULAB_WEB_TRUSTED_TOKEN 과 동일 값.
const WEB_TOKEN = process.env.WEB_TRUSTED_TOKEN;
const WEB_TOKEN_HEADER: Record<string, string> = WEB_TOKEN ? { "X-Web-Token": WEB_TOKEN } : {};

export interface LoveFusionResult {
  archetype_id: string;
  archetype_name: string;
  identity: string;
  traits: string[];
  soreum: string[];
  wants: string;
  coaching: string;
  match_good: string;
  match_caution: string;
  primary_ll: string;
  primary_ll_label: string;
  secondary_ll?: string | null;
  secondary_ll_label?: string | null;
  headline: string;
  body: string;
  // 사주 오버레이(sajulab) — saju_free 면 없음
  type_code?: string | null;
  type_nickname?: string | null;
  ohaeng?: string | null;
  ohaeng_flavor?: string | null;
  // 업셀 미리보기(lite 응답) — 잠긴 full 섹션 제목 + 첫 줄 hook(본문 미포함)
  teasers?: { field: string; title: string; hook_line: string }[] | null;
  tier: string;
  cached?: boolean;
}

export async function fetchLoveFusion(args: {
  archetypeId: string;
  secondary: LoveLang | null;
  typeCode?: string | null;
  sajuFree?: boolean;
  lang?: "ko" | "en";
  tier?: "lite" | "full";
}): Promise<LoveFusionResult | null> {
  try {
    const res = await fetch(`${BACKEND_BASE}/api/v1/love/fusion`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...WEB_TOKEN_HEADER },
      body: JSON.stringify({
        archetype_id: args.archetypeId,
        secondary_ll: args.secondary,
        type_code: args.typeCode ?? null,
        saju_free: Boolean(args.sajuFree),
        lang: args.lang ?? "ko",
        tier: args.tier ?? "lite",
      }),
      cache: "force-cache", // 결정적(백엔드 캐시) — result/share-image 재요청 흡수
    });
    if (!res.ok) return null;
    return (await res.json()) as LoveFusionResult;
  } catch {
    return null;
  }
}
