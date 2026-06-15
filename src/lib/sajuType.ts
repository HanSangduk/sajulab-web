// P281 — 사주 타입(60타입) 도메인 모듈.
// 핵심: typeCode 가 self-describing(오행1자 + 띠약자1자, 예 "화룡" = 火+룡).
// → element/띠/best·worst(상생상극)/희귀도/오행색/한자를 백엔드 없이 파싱만으로 도출.
//   nickname/traits/love/career 만 백엔드 /saju/type 가 enrich.
// 백엔드 핸드오버: sajulab-backend/docs/web-saju-type-card-handover.md 와 계약 일치.

export type OhangKey = "목" | "화" | "토" | "금" | "수";

export interface OhangMeta {
  label: OhangKey;
  hanja: string; // 木火土金水
  color: string; // hero accent (앱 오행색과 동일)
  soft: string; // rgba 배경용
}

export const OHANG: Record<OhangKey, OhangMeta> = {
  목: { label: "목", hanja: "木", color: "#5B9E6F", soft: "rgba(91,158,111,0.16)" },
  화: { label: "화", hanja: "火", color: "#E85A4F", soft: "rgba(232,90,79,0.16)" },
  토: { label: "토", hanja: "土", color: "#D4A843", soft: "rgba(212,168,67,0.16)" },
  금: { label: "금", hanja: "金", color: "#B8C4D0", soft: "rgba(184,196,208,0.16)" },
  수: { label: "수", hanja: "水", color: "#5BA8C8", soft: "rgba(91,168,200,0.16)" },
};

export const OHANG_ORDER: OhangKey[] = ["목", "화", "토", "금", "수"];

// 띠: typeCode 2번째 글자 = 지지(地支) 한글 1자. 백엔드 P723 SSOT 와 동일
// (동물명 약자 쥐/소/호/룡 ❌ — 자/축/인/묘/진/사/오/미/신/유/술/해 ✅).
export interface ZodiacMeta {
  abbr: string; // 자 축 인 묘 진 사 오 미 신 유 술 해 (= 지지 한글)
  ji: string; // 子丑寅卯辰巳午未申酉戌亥
  animal: string; // 쥐 소 호랑이 토끼 용 뱀 말 양 원숭이 닭 개 돼지
}

export const ZODIAC: ZodiacMeta[] = [
  { abbr: "자", ji: "子", animal: "쥐" },
  { abbr: "축", ji: "丑", animal: "소" },
  { abbr: "인", ji: "寅", animal: "호랑이" },
  { abbr: "묘", ji: "卯", animal: "토끼" },
  { abbr: "진", ji: "辰", animal: "용" },
  { abbr: "사", ji: "巳", animal: "뱀" },
  { abbr: "오", ji: "午", animal: "말" },
  { abbr: "미", ji: "未", animal: "양" },
  { abbr: "신", ji: "申", animal: "원숭이" },
  { abbr: "유", ji: "酉", animal: "닭" },
  { abbr: "술", ji: "戌", animal: "개" },
  { abbr: "해", ji: "亥", animal: "돼지" },
];

const ZODIAC_BY_ABBR: Record<string, ZodiacMeta> = Object.fromEntries(
  ZODIAC.map((z) => [z.abbr, z]),
);

// 앱(SajuTypeMapper)의 동물약자 → 지지 alias. 앱이 공유한 "화룡" 링크도 받아
// 지지 canonical("화진")으로 정규화(랜딩은 301 리다이렉트). 묘·사·신·유·해는 지지와 동일.
const ANIMAL_ABBR_TO_JI: Record<string, string> = {
  쥐: "자", 소: "축", 호: "인", 룡: "진", 마: "오", 양: "미", 견: "술",
};

// 오행 상생상극 (전통 명리, 앱 P279 SajuShareCard GENERATED_BY/CONTROLLED_BY 와 동일).
// 잘 맞는 결 = 생아자(나를 생함): 수생목·목생화·화생토·토생금·금생수
const BEST_OF: Record<OhangKey, OhangKey> = {
  목: "수",
  화: "목",
  토: "화",
  금: "토",
  수: "금",
};
// 조심할 결 = 극아자(나를 극함): 금극목·수극화·목극토·화극금·토극수
const WORST_OF: Record<OhangKey, OhangKey> = {
  목: "금",
  화: "수",
  토: "목",
  금: "화",
  수: "토",
};

/** 백엔드 /saju/type 응답 계약 (P723 SSOT 와 일치). 일부는 mode A(생일)에서만.
 *  rarity_percent 는 백엔드가 제외(현재 placeholder = 실통계 아님 → 숨김). 옵셔널로만 둠. */
export interface SajuTypeResponse {
  type_code: string;
  type_hanja: string;
  nickname: string;
  traits: string[];
  shadow_traits?: string[];
  day_master_element?: OhangKey | null;
  zodiac_animal?: string | null;
  five_elements?: Record<string, number> | null;
  pillars?: SajuPillars | null;
  best_match: { label: OhangKey; hanja: string };
  worst_match: { label: OhangKey; hanja: string };
  love_pattern?: string | null;
  career_fit?: string | null;
  communication_style?: string | null;
  rarity_percent?: number; // 백엔드 현재 미반환 — 표시 안 함
}

export interface Pillar {
  gan: string;
  ji: string;
}
export interface SajuPillars {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour?: Pillar | null;
}

/** typeCode 파싱만으로 도출 가능한 코어. 백엔드 없이 OG/랜딩이 동작하는 근거. */
export interface TypeCore {
  typeCode: string;
  element: OhangMeta;
  zodiac: ZodiacMeta;
  typeHanja: string; // 火辰
  best: OhangMeta;
  worst: OhangMeta;
}

/** "화진"(지지) 또는 "화룡"(동물약자) → 코어. typeCode 는 항상 지지 canonical 로 정규화. 무효면 null. */
export function deriveCore(typeCode: string): TypeCore | null {
  if (!typeCode || typeCode.length < 2) return null;
  const elKey = typeCode[0] as OhangKey;
  const abbr = typeCode.slice(1);
  const element = OHANG[elKey];
  if (!element) return null;
  // 지지 우선, 없으면 동물약자 alias → 지지
  const zodiac = ZODIAC_BY_ABBR[abbr] ?? ZODIAC_BY_ABBR[ANIMAL_ABBR_TO_JI[abbr]];
  if (!zodiac) return null;
  const best = OHANG[BEST_OF[elKey]];
  const worst = OHANG[WORST_OF[elKey]];
  return {
    typeCode: `${elKey}${zodiac.abbr}`, // canonical = 오행 + 지지
    element,
    zodiac,
    typeHanja: `${element.hanja}${zodiac.ji}`,
    best,
    worst,
  };
}

export function isValidTypeCode(typeCode: string): boolean {
  return deriveCore(typeCode) !== null;
}

/** 백엔드 미배포/실패 시에도 랜딩이 동작하도록 코어로 응답 합성(nickname/traits 는 일반 카피). */
export function fallbackResponse(typeCode: string): SajuTypeResponse | null {
  const core = deriveCore(typeCode);
  if (!core) return null;
  return {
    type_code: core.typeCode,
    type_hanja: core.typeHanja,
    nickname: `${core.element.label} ${core.zodiac.animal}띠의 기운`,
    traits: [],
    best_match: { label: core.best.label, hanja: core.best.hanja },
    worst_match: { label: core.worst.label, hanja: core.worst.hanja },
  };
}
