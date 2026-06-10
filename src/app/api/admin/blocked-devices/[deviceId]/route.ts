// P707 — DELETE (기기 차단 해제) 프록시 → 백엔드 /admin/ideas/block-device/{id}
import { NextRequest } from "next/server";
import { proxyJson } from "@/lib/backend";

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ deviceId: string }> }) {
  const { deviceId } = await ctx.params;
  return proxyJson(`/admin/ideas/block-device/${encodeURIComponent(deviceId)}`, {
    method: "DELETE",
  });
}
