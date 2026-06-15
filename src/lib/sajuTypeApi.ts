// P281 — 사주 타입 백엔드 연동 (서버 전용: process.env 사용, route handler / server component 에서만 호출).
// 백엔드 POST /api/v1/saju/type (public, LLM 0). 핸드오버 계약 참조.
// - by-birth(mode A): 만세력 계산 필요 → 백엔드 필수. 미배포 시 dev mock(SAJULAB_TYPE_MOCK=1)만 허용, prod 는 에러.
// - by-code(mode B): nickname/traits enrich 용. 실패해도 fallbackResponse(코어 도출)로 안전 degrade.

import {
  OHANG_ORDER,
  ZODIAC,
  deriveCore,
  fallbackResponse,
  type SajuTypeResponse,
} from "./sajuType";

// api.sajulab.ai 커스텀 도메인은 아직 미연결(NXDOMAIN) — 실제 백엔드는 Cloud Run.
// 도메인 붙으면 BACKEND_BASE_URL env 한 줄로 전환(코드 수정 불필요).
const BACKEND_BASE =
  process.env.BACKEND_BASE_URL ??
  "https://sajulab-backend-qqjgnsi3ja-du.a.run.app";
const MOCK_ENABLED = process.env.SAJULAB_TYPE_MOCK === "1";

export interface BirthInput {
  year: number;
  month: number;
  day: number;
  hour?: number | null; // null = 모름
  calendar_type: "양력" | "음력";
  is_intercalation?: boolean;
}

async function postType(
  body: unknown,
  cacheable = false,
): Promise<SajuTypeResponse | null> {
  try {
    const res = await fetch(`${BACKEND_BASE}/api/v1/saju/type`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // by-code(mode B)는 60개 deterministic → 캐시 OK. by-birth(mode A)는 생일=PII → no-store.
      ...(cacheable ? { cache: "force-cache" as const } : { cache: "no-store" as const }),
    });
    if (!res.ok) return null;
    return (await res.json()) as SajuTypeResponse;
  } catch {
    return null;
  }
}

/** 생일 → 타입 (mode A). 백엔드 필수. 실패 시 dev mock 또는 null. */
export async function computeByBirth(
  input: BirthInput,
): Promise<SajuTypeResponse | null> {
  const real = await postType(input);
  if (real) return real;
  if (MOCK_ENABLED) return mockByBirth(input);
  return null; // prod + 백엔드 미배포 → 라우트가 503 처리
}

/** typeCode → enrich (mode B). 실패해도 코어 도출 fallback 으로 항상 응답. */
export async function fetchByCode(
  typeCode: string,
): Promise<SajuTypeResponse | null> {
  const core = deriveCore(typeCode);
  if (!core) return null; // 잘못된 코드 = 404
  // 백엔드엔 항상 지지 canonical 로 (동물약자 alias 흡수)
  const real = await postType({ type_code: core.typeCode }, true); // deterministic → cacheable
  return real ?? fallbackResponse(core.typeCode);
}

// --- dev mock (실제 만세력 아님 — 미배포 환경 UI 미리보기 전용) ---
function mockByBirth(input: BirthInput): SajuTypeResponse | null {
  const el = OHANG_ORDER[(input.year + input.month + input.day) % 5];
  // 근사 띠(절기 무시 — mock 미리보기 전용). 1984·1996·2008=쥐(子) → (year-4)%12.
  const zo = ZODIAC[(((input.year - 4) % 12) + 12) % 12];
  const code = `${el}${zo.abbr}`;
  const base = fallbackResponse(code);
  if (!base) return null;
  const known = input.hour != null;
  return {
    ...base,
    day_master_element: el,
    zodiac_animal: zo.animal,
    // 일간 오행(el)을 최댓값으로 → 카드 헤더(el)와 막대그래프 일치.
    five_elements: { 목: 1, 화: 1, 토: 1, 금: 1, 수: 1, [el]: known ? 3 : 2 },
    pillars: {
      year: { gan: "壬", ji: zo.ji },
      month: { gan: "壬", ji: "寅" },
      day: { gan: "丙", ji: "辰" },
      hour: known ? { gan: "甲", ji: "午" } : null,
    },
    traits: ["예시", "미리보기", "mock"],
  };
}
