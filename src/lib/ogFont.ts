// P287 — 공유/OG 이미지용 Noto Sans KR 서브셋 폰트 로더 (satori = next/og).
// Google Fonts css2 + &text= 서브셋 → woff. 모던 UA 강제(Chrome UA 는 woff2 → satori 불가).
// 서버 전용(route handler / opengraph-image 에서만). 실패 시 null → 호출부가 라틴 fallback.
export async function loadNotoKR(
  text: string,
  weight: number,
): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@${weight}&text=${encodeURIComponent(
      text,
    )}`;
    const css = await (
      await fetch(url, {
        headers: {
          // 이 UA 가 woff(가변 서브셋) 을 반환 (Chrome UA 는 woff2 → satori 불가)
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        },
      })
    ).text();
    const m = css.match(
      /src:\s*url\(([^)]+)\)\s*format\('?(woff|truetype|opentype)'?\)/,
    );
    if (!m) return null;
    const res = await fetch(m[1]);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}
