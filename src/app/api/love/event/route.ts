// P291 v2 — 연애 테스트 퍼널 이벤트 수집(경량). 구조화 로그 → Vercel 로그에서 완주율/drop-off 집계.
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // 페이로드 작음 — 큰 본문 차단
    if (Number(req.headers.get("content-length") ?? 0) > 1024) {
      return new Response(null, { status: 413 });
    }
    const b = await req.json();
    if (b?.event) {
      // eslint-disable-next-line no-console
      console.log("LOVE_EVENT", JSON.stringify({ event: String(b.event).slice(0, 40), props: b.props ?? {}, t: b.t ?? Date.now() }));
    }
  } catch {
    /* ignore */
  }
  return new Response(null, { status: 204 });
}
