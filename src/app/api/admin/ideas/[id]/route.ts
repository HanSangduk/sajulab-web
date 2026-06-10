// P707 — PATCH (수정/숨김) / DELETE (강제삭제) 프록시 → 백엔드 /admin/ideas/{id}
import { NextRequest } from "next/server";
import { proxyJson } from "@/lib/backend";

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await req.text();
  return proxyJson(`/admin/ideas/${encodeURIComponent(id)}`, { method: "PATCH", body });
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  return proxyJson(`/admin/ideas/${encodeURIComponent(id)}`, { method: "DELETE" });
}
