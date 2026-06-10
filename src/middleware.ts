// P707 — 어드민 보호. /admin · /api/admin 는 세션 쿠키 필수 (login 경로 제외).
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-session";

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? "";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 로그인 관련 경로는 통과
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const ok = await verifySession(req.cookies.get(ADMIN_COOKIE)?.value, SESSION_SECRET);
  if (ok) return NextResponse.next();

  // API 는 401 JSON, 페이지는 로그인으로 redirect
  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
