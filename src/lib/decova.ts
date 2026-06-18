// P289 — Decova(iOS "AI 텍스팅 코치", 운세 0) 웹 브랜드 상수.
// 사주랩과 완전 분리: 중립 도메인 연결 전까지는 /decova 경로로 서빙.
// 도메인 준비되면 NEXT_PUBLIC_DECOVA_URL 주입(+ 미들웨어 host rewrite) → 코드 수정 최소.
export const DECOVA_NAME = "Decova";

// canonical/OG 절대 URL 베이스. 도메인 연결 전 기본 = 기존 배포의 /decova 경로.
export const DECOVA_SITE =
  process.env.NEXT_PUBLIC_DECOVA_URL ??
  "https://sajulab-web.vercel.app/decova";

// App Store 링크 — 심사 중/미출시면 빈 값 → 랜딩이 "출시 준비 중"으로 degrade.
export const DECOVA_APPSTORE_URL =
  process.env.NEXT_PUBLIC_DECOVA_APPSTORE_URL ?? "";

// 고객지원 이메일(운세 신호 없는 중립 주소). 전용 주소 생기면 교체.
export const DECOVA_SUPPORT_EMAIL = "richramsang@gmail.com";

// 개인정보처리자(법적 표기 — 운영 주체). 브랜드와 무관한 법적 필수 항목.
export const DECOVA_OPERATOR = "한상덕";

// 만 나이 정책 (코칭 = 만 14세 이상).
export const DECOVA_MIN_AGE = 14;
