"use client";

// P291 — 사주×사랑의언어 연애 심리테스트 플로우. 생일 → /api/saju/type(타입) + 사랑의언어 12문항(클라 채점)
// → 결과코드로 /love/[resultCode] 이동(거기서 융합 결과 SSR). /t/TypeFlow 스텝 패턴 차용.
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deriveCore } from "@/lib/sajuType";
import { track } from "@/lib/track";
import {
  LOVE_QUESTIONS,
  scoreToArchetype,
  buildResultCode,
  type LoveLang,
} from "@/lib/loveLanguage";

type Step = "birth" | "quiz" | "loading";

export default function LoveQuizFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("birth");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [calendar, setCalendar] = useState<"양력" | "음력">("양력");
  const [qi, setQi] = useState(0);
  const [picks, setPicks] = useState<LoveLang[]>([]);
  const [error, setError] = useState<string | null>(null);

  const birthValid =
    Number(year) >= 1900 &&
    Number(year) <= 2100 &&
    Number(month) >= 1 &&
    Number(month) <= 12 &&
    Number(day) >= 1 &&
    Number(day) <= 31;

  async function finish(allPicks: LoveLang[]) {
    setStep("loading");
    setError(null);
    try {
      const res = await fetch("/api/saju/type", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year: Number(year),
          month: Number(month),
          day: Number(day),
          hour: null, // 타입(일간 오행+띠)은 시간 불필요
          calendar_type: calendar,
        }),
      });
      if (!res.ok) throw new Error("type");
      const data = (await res.json()) as { type_code?: string };
      const core = data.type_code ? deriveCore(data.type_code) : null;
      const typeCode = core?.typeCode || data.type_code;
      if (!typeCode) throw new Error("type");

      const { archetypeId, secondary } = scoreToArchetype(allPicks);
      track("quiz_complete", { archetype: archetypeId });
      const rc = buildResultCode(typeCode, archetypeId, secondary);
      router.push(`/love/${encodeURIComponent(rc)}`);
    } catch {
      setError("결과를 불러오지 못했어요. 잠시 후 다시 시도해줘.");
      setStep("quiz");
      setQi(LOVE_QUESTIONS.length - 1);
    }
  }

  function pick(ll: LoveLang) {
    const next = [...picks, ll];
    setPicks(next);
    track("q_answered", { n: qi + 1 }); // drop-off 측정
    if (qi + 1 >= LOVE_QUESTIONS.length) {
      void finish(next);
    } else {
      setQi(qi + 1);
    }
  }

  // ── 생일 입력 ──
  if (step === "birth") {
    return (
      <div className="flex flex-col gap-5">
        <p className="text-center text-rose-100/80">
          생일로 사주 타입을 보고,
          <br />
          12문항으로 너의 <b className="text-rose-300">연애 본능</b>을 찾아줄게
        </p>
        <div className="grid grid-cols-3 gap-2">
          <input inputMode="numeric" placeholder="년 (YYYY)" value={year}
            onChange={(e) => setYear(e.target.value.replace(/\D/g, "").slice(0, 4))}
            className="rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-center text-white placeholder:text-white/40" />
          <input inputMode="numeric" placeholder="월" value={month}
            onChange={(e) => setMonth(e.target.value.replace(/\D/g, "").slice(0, 2))}
            className="rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-center text-white placeholder:text-white/40" />
          <input inputMode="numeric" placeholder="일" value={day}
            onChange={(e) => setDay(e.target.value.replace(/\D/g, "").slice(0, 2))}
            className="rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-center text-white placeholder:text-white/40" />
        </div>
        <div className="flex justify-center gap-2">
          {(["양력", "음력"] as const).map((c) => (
            <button key={c} onClick={() => setCalendar(c)}
              className={`rounded-full px-5 py-2 text-sm transition-colors ${calendar === c ? "bg-rose-500 text-white" : "border border-white/20 text-white/70"}`}>
              {c}
            </button>
          ))}
        </div>
        <button disabled={!birthValid} onClick={() => { track("quiz_start"); setStep("quiz"); }}
          className="mt-1 w-full rounded-2xl bg-rose-500 px-8 py-4 text-lg font-semibold text-white transition-colors enabled:hover:bg-rose-600 disabled:opacity-40">
          시작하기
        </button>
        <p className="text-center text-xs text-white/40">시간은 안 받아요 · 재미로 보는 연애 성향</p>
      </div>
    );
  }

  // ── 로딩 ──
  if (step === "loading") {
    return (
      <div className="flex flex-col items-center gap-4 py-16">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-rose-400 border-t-transparent" />
        <p className="text-rose-100/80">너의 연애 본능을 읽는 중…</p>
      </div>
    );
  }

  // ── 퀴즈 ──
  const q = LOVE_QUESTIONS[qi];
  const progress = Math.round(((qi + 1) / LOVE_QUESTIONS.length) * 100);
  return (
    <div className="flex flex-col gap-6">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-rose-400 transition-all" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-center text-sm text-white/40">{qi + 1} / {LOVE_QUESTIONS.length}</p>
      <h2 className="text-center text-2xl font-bold leading-snug text-white">{q.q}</h2>
      <div className="flex flex-col gap-3">
        {[q.a, q.b].map((opt, i) => (
          <button key={i} onClick={() => pick(opt.ll)}
            className="w-full rounded-2xl border border-rose-300/30 bg-white/5 px-6 py-5 text-left text-lg text-white transition-colors hover:border-rose-400 hover:bg-rose-500/10">
            {opt.text}
          </button>
        ))}
      </div>
      {error && <p className="text-center text-sm text-rose-300">{error}</p>}
    </div>
  );
}
