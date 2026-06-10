// P707 — 신고 큐 프록시 → 백엔드 /admin/ideas/reported
import { NextRequest } from "next/server";
import { proxyJson } from "@/lib/backend";

export async function GET(req: NextRequest) {
  const qs = req.nextUrl.searchParams.toString();
  return proxyJson(`/admin/ideas/reported${qs ? `?${qs}` : ""}`);
}
