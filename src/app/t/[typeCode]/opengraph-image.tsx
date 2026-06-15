// P281 — 타입별 동적 OG 이미지 (SNS 링크 프리뷰). next/og(satori).
// 폰트: Google Fonts css2 &text= 서브셋 → woff (loadNotoKR 공용 유틸). 실패 시 라틴 fallback.
// 코어(typeCode 파싱)만 사용 — 백엔드 비의존(빠르고 안정, Vercel 이 타입별 캐시).
import { ImageResponse } from "next/og";
import { deriveCore } from "@/lib/sajuType";
import { loadNotoKR } from "@/lib/ogFont";

export const runtime = "nodejs";
export const alt = "사주랩 — 내 사주 타입";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ typeCode: string }>;
}) {
  const { typeCode } = await params;
  let code: string;
  try {
    code = decodeURIComponent(typeCode);
  } catch {
    code = typeCode; // 잘못된 % 인코딩 → 그대로 (deriveCore 가 null 처리, 500 방지)
  }
  const core = deriveCore(code);

  if (!core) return latinFallback();

  const accent = core.element.color;
  // satori 서브셋 = 실제 렌더되는 모든 글자(괄호 포함). 누락 시 tofu → 빠짐없이.
  const glyphs =
    `사주랩 내 사주 타입 太極 壬 잘 맞는 결 조심할 결 기운 띠 60타입 중 하나 ( ) · sajulab.ai ` +
    `${code}${core.typeHanja}${core.element.label}${core.element.hanja}${core.zodiac.animal}` +
    `${core.best.label}${core.best.hanja}${core.worst.label}${core.worst.hanja}` +
    `목화토금수木火土金水`;

  const [bold, regular] = await Promise.all([
    loadNotoKR(glyphs, 800),
    loadNotoKR(glyphs, 400),
  ]);
  // 폰트 둘 다 실패 → 한글 tofu 대신 라틴 브랜드 카드로 degrade (1년 immutable 캐시에 tofu 가 박히는 것 회피).
  if (!bold && !regular) {
    console.warn("[og] NotoKR font load failed; latin fallback for", code);
    return latinFallback();
  }
  const fonts = [
    ...(bold ? [{ name: "NotoKR", data: bold, weight: 800 as const, style: "normal" as const }] : []),
    ...(regular ? [{ name: "NotoKR", data: regular, weight: 400 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #16162A 0%, #0E0E18 100%)",
          color: "#F5F0E8",
          fontFamily: "NotoKR",
          position: "relative",
          padding: "56px 64px",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: core.element.soft, display: "flex" }} />

        {/* 헤더 */}
        <div style={{ display: "flex", alignItems: "center", zIndex: 1 }}>
          <span style={{ fontSize: 34, color: `${accent}d9`, marginRight: 16, fontWeight: 800 }}>太極</span>
          <span style={{ fontSize: 30, fontWeight: 800 }}>사주랩</span>
        </div>

        {/* 중앙 hero */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ fontSize: 180, fontWeight: 800, color: accent, lineHeight: 1 }}>{code}</span>
            <span style={{ fontSize: 80, fontWeight: 800, color: `${accent}99`, marginLeft: 28 }}>
              {core.typeHanja}
            </span>
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#C9C2B5", marginTop: 18 }}>
            {`${core.element.label}(${core.element.hanja}) · ${core.zodiac.animal}띠 · 60타입 중 하나`}
          </div>
        </div>

        {/* 하단 궁합 + 브랜드 */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", zIndex: 1 }}>
          <div style={{ display: "flex", gap: 48 }}>
            <Match label="잘 맞는 결" hanja={core.best.hanja} sub={`${core.best.label} 기운`} color={core.best.color} />
            <Match label="조심할 결" hanja={core.worst.hanja} sub={`${core.worst.label} 기운`} color={core.worst.color} />
          </div>
          <span style={{ fontSize: 26, color: "#A8A090" }}>sajulab.ai</span>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}

function Match({
  label,
  hanja,
  sub,
  color,
}: {
  label: string;
  hanja: string;
  sub: string;
  color: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ fontSize: 22, color: "#A8A090" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "baseline", marginTop: 6 }}>
        <span style={{ fontSize: 56, fontWeight: 800, color }}>{hanja}</span>
        <span style={{ fontSize: 24, color: "#C9C2B5", marginLeft: 12 }}>{sub}</span>
      </div>
    </div>
  );
}

// 잘못된 코드 / 폰트 로드 실패 시 — 한글 tofu 대신 라틴 브랜드 카드(폰트 불필요).
function latinFallback() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #16162A 0%, #0E0E18 100%)",
          color: "#F5F0E8",
          fontSize: 72,
          fontWeight: 800,
          letterSpacing: 2,
        }}
      >
        sajulab.ai
      </div>
    ),
    { ...size },
  );
}
