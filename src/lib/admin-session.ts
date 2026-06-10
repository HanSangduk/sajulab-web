// P707 — 어드민 세션 쿠키 (HMAC 서명, Edge/Node 공용 Web Crypto).
// 비밀번호 로그인 성공 시 서명 토큰을 httpOnly 쿠키로 발급. middleware/route 가 검증.
// 백엔드 X-Admin-Token 은 절대 클라로 안 내려감 — 서버 전용 env 로만 사용.

export const ADMIN_COOKIE = "saju_admin";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7일

function b64urlFromBytes(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlFromString(s: string): string {
  return b64urlFromBytes(new TextEncoder().encode(s));
}

function bytesFromB64url(s: string): Uint8Array {
  let t = s.replace(/-/g, "+").replace(/_/g, "/");
  while (t.length % 4) t += "=";
  const bin = atob(t);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmacSha256(secret: string, msg: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(msg));
  return new Uint8Array(sig);
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function signSession(secret: string): Promise<string> {
  const payload = { role: "admin", exp: Date.now() + SESSION_TTL_MS };
  const body = b64urlFromString(JSON.stringify(payload));
  const sig = b64urlFromBytes(await hmacSha256(secret, body));
  return `${body}.${sig}`;
}

export async function verifySession(token: string | undefined, secret: string): Promise<boolean> {
  if (!token || !secret) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [body, sig] = parts;
  try {
    const expected = await hmacSha256(secret, body);
    if (!timingSafeEqual(bytesFromB64url(sig), expected)) return false;
    const payload = JSON.parse(new TextDecoder().decode(bytesFromB64url(body)));
    if (payload.role !== "admin") return false;
    if (typeof payload.exp !== "number" || Date.now() > payload.exp) return false;
    return true;
  } catch {
    return false;
  }
}
