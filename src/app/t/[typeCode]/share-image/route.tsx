// P287 — 인스타 스토리용 세로 공유 이미지 (1080×1920). next/og(satori) PNG.
// OG(가로 1200×630, 링크 프리뷰)와 별개 — 이건 다운로드 / Web Share files 로 IG·카톡 공유용.
// typeCode 파싱(코어) + 백엔드 enrich(nickname/traits, 실패 시 fallback) → 항상 렌더.
import { ImageResponse } from "next/og";
import { deriveCore } from "@/lib/sajuType";
import { fetchByCode } from "@/lib/sajuTypeApi";
import { loadNotoKR } from "@/lib/ogFont";

export const runtime = "nodejs";
const W = 1080;
const H = 1920;
const CACHE = "public, max-age=86400, s-maxage=604800";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ typeCode: string }> },
) {
  const { typeCode } = await params;
  let raw: string;
  try {
    raw = decodeURIComponent(typeCode);
  } catch {
    raw = typeCode;
  }
  const core = deriveCore(raw);
  if (!core) return latinFallback();

  const data = await fetchByCode(core.typeCode); // nickname/traits (실패해도 fallback)
  const nickname =
    data?.nickname?.trim() ||
    `${core.element.label} ${core.zodiac.animal}띠의 기운`;
  const traits = (data?.traits ?? []).slice(0, 3);

  const code = core.typeCode;
  const accent = core.element.color;
  // satori 서브셋 = 실제 렌더되는 모든 글자. 누락 시 tofu → 빠짐없이 포함.
  const glyphs =
    `사주랩 내 사주 타입 太極 壬 잘 맞는 결 조심할 결 기운 띠 60타입 중 하나 ( ) · , ? sajulab.ai 너의 타입은 에서 확인 ` +
    `${code}${core.typeHanja}${core.element.label}${core.element.hanja}${core.zodiac.animal}${core.zodiac.ji}` +
    `${core.best.label}${core.best.hanja}${core.worst.label}${core.worst.hanja}` +
    `${nickname}${traits.join("")}목화토금수木火土金水`;

  const [bold, regular] = await Promise.all([
    loadNotoKR(glyphs, 800),
    loadNotoKR(glyphs, 400),
  ]);
  if (!bold && !regular) return latinFallback();
  const fonts = [
    ...(bold
      ? [{ name: "NotoKR", data: bold, weight: 800 as const, style: "normal" as const }]
      : []),
    ...(regular
      ? [{ name: "NotoKR", data: regular, weight: 400 as const, style: "normal" as const }]
      : []),
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
          background: "linear-gradient(160deg, #16162A 0%, #0E0E18 100%)",
          color: "#F5F0E8",
          fontFamily: "NotoKR",
          position: "relative",
          padding: "130px 90px",
        }}
      >
        <div
          style={{ position: "absolute", inset: 0, background: core.element.soft, display: "flex" }}
        />

        {/* 헤더 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 46, color: `${accent}d9`, marginRight: 18, fontWeight: 800 }}>
              太極
            </span>
            <span style={{ fontSize: 44, fontWeight: 800 }}>사주랩</span>
          </div>
          <span style={{ fontSize: 36, color: "#A8A090", marginTop: 14 }}>내 사주 타입</span>
        </div>

        {/* 중앙 hero */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          {/* 지지 한자 halo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 240,
              height: 240,
              borderRadius: 120,
              background: core.element.soft,
              color: accent,
              fontSize: 130,
              fontWeight: 800,
            }}
          >
            {core.zodiac.ji}
          </div>

          {/* 타입 코드 + 한자 */}
          <div style={{ display: "flex", alignItems: "baseline", marginTop: 56 }}>
            <span style={{ fontSize: 240, fontWeight: 800, color: accent, lineHeight: 1 }}>
              {code}
            </span>
            <span style={{ fontSize: 104, fontWeight: 800, color: `${accent}99`, marginLeft: 28 }}>
              {core.typeHanja}
            </span>
          </div>

          <span style={{ fontSize: 44, color: "#C9C2B5", marginTop: 28 }}>
            {`${core.element.label}(${core.element.hanja}) · ${core.zodiac.animal}띠`}
          </span>

          {/* 닉네임 */}
          <span
            style={{
              fontSize: 70,
              fontWeight: 800,
              color: "#F5F0E8",
              marginTop: 40,
              textAlign: "center",
            }}
          >
            {nickname}
          </span>

          {/* traits 칩 */}
          {traits.length > 0 && (
            <div style={{ display: "flex", marginTop: 44, gap: 18 }}>
              {traits.map((tr) => (
                <span
                  key={tr}
                  style={{
                    display: "flex",
                    padding: "14px 30px",
                    borderRadius: 999,
                    border: `2px solid ${accent}66`,
                    background: core.element.soft,
                    color: "#F5F0E8",
                    fontSize: 36,
                  }}
                >
                  {tr}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 궁합 zone */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 70,
            zIndex: 1,
          }}
        >
          <Match
            label="잘 맞는 결"
            hanja={core.best.hanja}
            sub={`${core.best.label} 기운`}
            color={core.best.color}
          />
          <div style={{ width: 2, height: 110, background: "#F5F0E833", display: "flex" }} />
          <Match
            label="조심할 결"
            hanja={core.worst.hanja}
            sub={`${core.worst.label} 기운`}
            color={core.worst.color}
          />
        </div>

        {/* 푸터 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 80,
            zIndex: 1,
          }}
        >
          <span style={{ fontSize: 36, fontWeight: 800, color: "#F5F0E8" }}>사주랩</span>
          <span style={{ fontSize: 34, color: `${accent}d9` }}>너의 타입은? · sajulab.ai</span>
        </div>
      </div>
    ),
    {
      width: W,
      height: H,
      fonts: fonts.length ? fonts : undefined,
      headers: { "Cache-Control": CACHE },
    },
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <span style={{ fontSize: 30, color: "#A8A090" }}>{label}</span>
      <span style={{ fontSize: 96, fontWeight: 800, color, marginTop: 10 }}>{hanja}</span>
      <span style={{ fontSize: 34, color: "#C9C2B5", marginTop: 4 }}>{sub}</span>
    </div>
  );
}

// 잘못된 코드 / 폰트 로드 실패 → 라틴 브랜드 카드(폰트 불필요).
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
          background: "linear-gradient(160deg, #16162A 0%, #0E0E18 100%)",
          color: "#F5F0E8",
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: 2,
        }}
      >
        sajulab.ai
      </div>
    ),
    { width: W, height: H, headers: { "Cache-Control": CACHE } },
  );
}
