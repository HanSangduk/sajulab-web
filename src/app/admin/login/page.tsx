"use client";

// P707 — 어드민 로그인. 비밀번호 → /api/admin/login → 쿠키 발급 → /admin.
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  // useSearchParams 는 Suspense 경계 필요 (Next 15 CSR bailout)
  return (
    <Suspense fallback={<div className="min-h-screen bg-saju-bg" />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        // open-redirect 방어 — same-origin 상대경로만 허용 ("//host" 프로토콜상대 차단)
        const next = params.get("next") || "/admin";
        const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/admin";
        router.replace(safeNext);
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(
        res.status === 401
          ? "비밀번호가 틀렸습니다."
          : data?.detail || data?.error || "로그인 실패",
      );
    } catch {
      setError("네트워크 오류");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-saju-bg px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 space-y-5"
      >
        <div className="text-center">
          <h1 className="text-xl font-bold text-saju-dark">사주랩 어드민</h1>
          <p className="text-sm text-gray-500 mt-1">함께 만들기 운영</p>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="관리자 비밀번호"
          autoFocus
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-saju-primary"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full bg-saju-primary text-white rounded-lg py-3 font-semibold disabled:opacity-50"
        >
          {loading ? "확인 중…" : "로그인"}
        </button>
      </form>
    </div>
  );
}
