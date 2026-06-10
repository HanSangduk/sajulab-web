// P707 — 어드민 로그인. 비밀번호(서버 env) 검증 → 서명 세션 쿠키 발급.
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, signSession } from "@/lib/admin-session";

const PANEL_PASSWORD = process.env.ADMIN_PANEL_PASSWORD ?? "";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? "";

export async function POST(req: NextRequest) {
  if (!PANEL_PASSWORD || !SESSION_SECRET) {
    return NextResponse.json(
      { error: "ADMIN_NOT_CONFIGURED", detail: "ADMIN_PANEL_PASSWORD / ADMIN_SESSION_SECRET 미설정" },
      { status: 503 },
    );
  }
  let password = "";
  try {
    const body = await req.json();
    password = String(body?.password ?? "");
  } catch {
    return NextResponse.json({ error: "BAD_REQUEST" }, { status: 400 });
  }
  if (password !== PANEL_PASSWORD) {
    return NextResponse.json({ error: "INVALID_PASSWORD" }, { status: 401 });
  }
  const token = await signSession(SESSION_SECRET);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return res;
}
