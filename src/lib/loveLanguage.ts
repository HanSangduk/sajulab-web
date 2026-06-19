// P291 v2 — 연애 성향 테스트. 사랑의 언어 5축 → 명명 아키타입 6(+올라운더). 채점=결정론(클라).
// 결과코드 = {typeCode}-{archetypeId}-{secondary?} (사주) → 백엔드 /love/fusion(archetype_id) round-trip.
// 상표 회피: 우리 용어("사랑의 언어/연애 성향 유형") — 브랜드명 미사용.

export type LoveLang = "words" | "time" | "gifts" | "acts" | "touch";

export const LOVE_LANGS: LoveLang[] = ["words", "time", "gifts", "acts", "touch"];

export const LOVE_LANG_LABEL: Record<LoveLang, string> = {
  words: "인정",
  time: "시간",
  gifts: "선물",
  acts: "봉사",
  touch: "스킨십",
};

// LL → 아키타입 id (백엔드 love_archetype.LL_TO_ARCHETYPE 와 동일).
export const LL_TO_ARCHETYPE: Record<LoveLang, string> = {
  time: "beside",
  words: "express",
  touch: "warmth",
  acts: "devote",
  gifts: "token",
};
export const ARCHETYPE_IDS = ["beside", "express", "warmth", "devote", "token", "allround"];

export interface LoveQuestion {
  id: string;
  q: string;
  a: { text: string; ll: LoveLang };
  b: { text: string; ll: LoveLang };
}

// 12 forced-choice (각 선택지=사랑의언어 1개). Gen-Z 반말.
export const LOVE_QUESTIONS: LoveQuestion[] = [
  { id: "q1", q: "연인이 해주면 제일 설레는 거?", a: { text: '"너밖에 없어" 진심 어린 말', ll: "words" }, b: { text: "손 꼭 잡고 걷기", ll: "touch" } },
  { id: "q2", q: "기념일에 더 감동인 쪽?", a: { text: "정성껏 고른 선물", ll: "gifts" }, b: { text: "하루 종일 같이 보내기", ll: "time" } },
  { id: "q3", q: "힘든 날 연인이 해주면 좋은 거?", a: { text: "말없이 꼭 안아주기", ll: "touch" }, b: { text: "내 일 대신 처리해주기", ll: "acts" } },
  { id: "q4", q: "연락에서 더 중요한 거?", a: { text: "다정한 말 자주", ll: "words" }, b: { text: "자주 못 봐도 만나면 온전히", ll: "time" } },
  { id: "q5", q: "더 서운한 순간은?", a: { text: "고맙다·사랑한다 표현이 없을 때", ll: "words" }, b: { text: "바빠서 같이 못 있을 때", ll: "time" } },
  { id: "q6", q: "더 끌리는 데이트?", a: { text: "깜짝 선물 이벤트", ll: "gifts" }, b: { text: "종일 붙어서 스킨십 많은 날", ll: "touch" } },
  { id: "q7", q: "연인한테 녹는 순간?", a: { text: "아플 때 챙겨주고 다 해줄 때", ll: "acts" }, b: { text: '"잘하고 있어" 응원의 말', ll: "words" } },
  { id: "q8", q: "더 받고 싶은 사랑?", a: { text: "작아도 자주 주는 선물", ll: "gifts" }, b: { text: "말보다 행동으로 챙김", ll: "acts" } },
  { id: "q9", q: "같이 있을 때 더 좋은 거?", a: { text: "어깨 기대고 붙어있기", ll: "touch" }, b: { text: "딴거 안 해도 그냥 옆에 오래", ll: "time" } },
  { id: "q10", q: "둘 중 하나면?", a: { text: "진심 담은 칭찬 한마디", ll: "words" }, b: { text: "센스 있는 선물", ll: "gifts" } },
  { id: "q11", q: "피곤한 날 연인이?", a: { text: "안아주며 토닥토닥", ll: "touch" }, b: { text: "집안일 다 해놓음", ll: "acts" } },
  { id: "q12", q: '"사랑받는다" 느낄 때?', a: { text: "함께한 시간이 쌓일 때", ll: "time" }, b: { text: "챙겨주는 행동이 쌓일 때", ll: "acts" } },
];

export interface LoveResult {
  archetypeId: string;
  primary: LoveLang | null;
  secondary: LoveLang | null;
  balanced: boolean;
  counts: Record<LoveLang, number>;
}

/** 선택 배열 → 아키타입 결과. 균형(뚜렷한 1위 없음)=올라운더. 동점은 LOVE_LANGS 순서 안정. */
export function scoreToArchetype(picks: LoveLang[]): LoveResult {
  const counts: Record<LoveLang, number> = { words: 0, time: 0, gifts: 0, acts: 0, touch: 0 };
  for (const p of picks) if (p in counts) counts[p] += 1;
  const ranked = [...LOVE_LANGS].sort((x, y) => counts[y] - counts[x]);
  const max = counts[ranked[0]];
  const gap = max - counts[ranked[1]];
  // 균형형: 뚜렷한 1위 없음(최댓값 낮고 격차 작음) → 올라운더
  const balanced = max <= 3 && gap <= 1;
  if (balanced) return { archetypeId: "allround", primary: null, secondary: null, balanced: true, counts };
  const primary = ranked[0];
  const secondary = counts[ranked[1]] > 0 && ranked[1] !== primary ? ranked[1] : null;
  return { archetypeId: LL_TO_ARCHETYPE[primary], primary, secondary, balanced: false, counts };
}

// 결과코드 = `{typeCode}-{archetypeId}-{secondary?}` (typeCode 한글, 나머지 영문 → '-' 안전).
export function buildResultCode(typeCode: string, archetypeId: string, secondary: LoveLang | null): string {
  const base = `${typeCode}-${archetypeId}`;
  return secondary ? `${base}-${secondary}` : base;
}

export interface ParsedResult {
  typeCode: string;
  archetypeId: string;
  secondary: LoveLang | null;
}

export function parseResultCode(code: string): ParsedResult | null {
  const parts = (code || "").split("-");
  if (parts.length < 2) return null;
  const [typeCode, archetypeId, secondary] = parts;
  if (!typeCode || !ARCHETYPE_IDS.includes(archetypeId)) return null;
  const sec = secondary && LOVE_LANGS.includes(secondary as LoveLang) ? (secondary as LoveLang) : null;
  return { typeCode, archetypeId, secondary: sec };
}
