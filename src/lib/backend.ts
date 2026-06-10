// P707 — 백엔드 어드민 API 서버사이드 프록시.
// route handler 에서만 호출(서버 전용). X-Admin-Token 을 서버 env 에서 부착 → 브라우저 노출 0.
// CORS 무관(서버-서버). 백엔드 모더레이션 엔드포인트는 SAJULAB_ENABLE_ADMIN_IDEA=true 필요.

import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-session";

const BACKEND_BASE = process.env.BACKEND_BASE_URL ?? "https://api.sajulab.ai";
const ADMIN_TOKEN = process.env.ADMIN_API_TOKEN ?? "";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? "";

/** route handler 진입 시 세션 쿠키 검증. 통과 못하면 false. */
export async function isAuthed(): Promise<boolean> {
  const jar = await cookies();
  return verifySession(jar.get(ADMIN_COOKIE)?.value, SESSION_SECRET);
}

/** 백엔드 /api/v1{path} 로 프록시. X-Admin-Token 서버사이드 부착. */
export async function backendFetch(path: string, init?: RequestInit): Promise<Response> {
  const headers = new Headers(init?.headers);
  headers.set("X-Admin-Token", ADMIN_TOKEN);
  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(`${BACKEND_BASE}/api/v1${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
}

/** 인증 + 프록시 + JSON 응답 래핑 (route handler 공통). */
export async function proxyJson(path: string, init?: RequestInit): Promise<Response> {
  if (!(await isAuthed())) {
    return Response.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }
  try {
    const res = await backendFetch(path, init);
    const text = await res.text();
    const body = text ? JSON.parse(text) : null;
    return Response.json(body ?? { ok: res.ok }, { status: res.status });
  } catch (e) {
    return Response.json(
      { error: "BACKEND_UNREACHABLE", detail: String(e) },
      { status: 502 },
    );
  }
}
