// P291 v2 — 연애 본능 인스타 스토리 카드 (1080×1920) next/og PNG. 아키타입 + headline + 사주.
// headline/archetype 가변 → glyph 서브셋에 실제 렌더 텍스트 전부 포함(tofu 방지).
import { ImageResponse } from "next/og";
import { deriveCore } from "@/lib/sajuType";
import { parseResultCode } from "@/lib/loveLanguage";
import { fetchLoveFusion } from "@/lib/loveApi";
import { loadNotoKR } from "@/lib/ogFont";

export const runtime = "nodejs";
const W = 1080;
const H = 1920;
const CACHE = "public, max-age=86400, s-maxage=604800";
const ACCENT = "#FB7185";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ resultCode: string }> },
) {
  const { resultCode } = await params;
  let rc: string;
  try {
    rc = decodeURIComponent(resultCode);
  } catch {
    rc = resultCode;
  }
  const parsed = parseResultCode(rc);
  if (!parsed) return latinFallback();
  const core = deriveCore(parsed.typeCode);
  if (!core) return latinFallback();

  const data = await fetchLoveFusion({ archetypeId: parsed.archetypeId, secondary: parsed.secondary, typeCode: parsed.typeCode });
  const name = data?.archetype_name || "내 연애 본능";
  const headline = (data?.headline || data?.identity || "").slice(0, 30);
  const ohaeng = data?.ohaeng || core.element.label;
  const combo = `사주 ${parsed.typeCode} · ${ohaeng}기운`;

  const glyphs =
    `사주랩 내 연애 본능 너의 은 에서 확인 사주 기운 · ( ) ! ? sajulab.ai/love ` +
    `${name}${headline}${combo}${parsed.typeCode}${ohaeng}${core.element.label}${core.zodiac.animal}`;
  const [bold, regular] = await Promise.all([loadNotoKR(glyphs, 800), loadNotoKR(glyphs, 400)]);
  if (!bold && !regular) return latinFallback();
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
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(160deg, #2A1020 0%, #120B14 100%)",
          color: "#FCEEF2",
          fontFamily: "NotoKR",
          padding: "140px 90px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: 44, fontWeight: 800 }}>사주랩</span>
          <span style={{ fontSize: 36, color: ACCENT, marginTop: 14, fontWeight: 800 }}>내 연애 본능</span>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span
            style={{
              display: "flex",
              padding: "16px 44px",
              borderRadius: 999,
              border: `2px solid ${ACCENT}66`,
              background: `${ACCENT}1f`,
              color: "#FFFFFF",
              fontSize: 56,
              fontWeight: 800,
            }}
          >
            {name}
          </span>
          <span style={{ fontSize: 84, fontWeight: 800, color: "#FFFFFF", marginTop: 56, textAlign: "center", lineHeight: 1.25 }}>
            {headline}
          </span>
          <span style={{ fontSize: 42, color: "#E7C9D4", marginTop: 44 }}>{combo}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <span style={{ fontSize: 34, fontWeight: 800, color: "#FCEEF2" }}>사주랩</span>
          <span style={{ fontSize: 32, color: ACCENT }}>너의 연애 본능은? · sajulab.ai/love</span>
        </div>
      </div>
    ),
    { width: W, height: H, fonts: fonts.length ? fonts : undefined, headers: { "Cache-Control": CACHE } },
  );
}

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
          background: "linear-gradient(160deg, #2A1020 0%, #120B14 100%)",
          color: "#FCEEF2",
          fontSize: 92,
          fontWeight: 800,
        }}
      >
        sajulab.ai/love
      </div>
    ),
    { width: W, height: H, headers: { "Cache-Control": CACHE } },
  );
}
