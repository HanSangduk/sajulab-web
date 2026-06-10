// P707 — GET (차단 기기 목록) / POST (기기 차단) 프록시
import { NextRequest } from "next/server";
import { proxyJson } from "@/lib/backend";

export async function GET() {
  return proxyJson(`/admin/ideas/blocked-devices`);
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  return proxyJson(`/admin/ideas/block-device`, { method: "POST", body });
}
