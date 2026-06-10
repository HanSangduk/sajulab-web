// P707 — GET (전체 list) / POST (운영 생성) 프록시 → 백엔드 /admin/ideas
import { NextRequest } from "next/server";
import { proxyJson } from "@/lib/backend";

export async function GET(req: NextRequest) {
  const qs = req.nextUrl.searchParams.toString();
  return proxyJson(`/admin/ideas${qs ? `?${qs}` : ""}`);
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  return proxyJson(`/admin/ideas`, { method: "POST", body });
}
