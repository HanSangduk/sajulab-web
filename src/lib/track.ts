// P291 v2 — 경량 퍼널 계측. sendBeacon → /api/love/event (Vercel 로그). 완주율·drop-off·공유·앱클릭.
// 무거운 SDK 없이 시작. 추후 GA/Vercel Analytics 로 교체 가능.
export function track(event: string, props?: Record<string, unknown>): void {
  try {
    const body = JSON.stringify({ event, props: props ?? {}, t: Date.now() });
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon("/api/love/event", new Blob([body], { type: "application/json" }));
    } else {
      void fetch("/api/love/event", {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      });
    }
  } catch {
    /* 계측 실패는 무시 */
  }
}
