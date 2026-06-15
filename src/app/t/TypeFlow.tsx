"use client";

// P281 — /t 입력 흐름. 생일(+시 optional "모름") → 백엔드 계산 → 결과 카드.
// 시 입력 시 결과에 4기둥/오행 정밀("자세함"). 모름이면 타입/best·worst 는 그대로.
import { useState } from "react";
import { deriveCore, type SajuTypeResponse } from "@/lib/sajuType";
import { SITE, PLAY_URL } from "@/lib/constants";
import TypeCardVisual from "./TypeCardVisual";
import ShareBar from "./ShareBar";

// 12시진 → 대표 시(hour). 백엔드 hour: int 0-23.
const SIJIN: { label: string; hanja: string; hour: number }[] = [
  { label: "자시", hanja: "子", hour: 0 },
  { label: "축시", hanja: "丑", hour: 2 },
  { label: "인시", hanja: "寅", hour: 4 },
  { label: "묘시", hanja: "卯", hour: 6 },
  { label: "진시", hanja: "辰", hour: 8 },
  { label: "사시", hanja: "巳", hour: 10 },
  { label: "오시", hanja: "午", hour: 12 },
  { label: "미시", hanja: "未", hour: 14 },
  { label: "신시", hanja: "申", hour: 16 },
  { label: "유시", hanja: "酉", hour: 18 },
  { label: "술시", hanja: "戌", hour: 20 },
  { label: "해시", hanja: "亥", hour: 22 },
];

const THIS_YEAR = 2026;
const YEARS = Array.from({ length: THIS_YEAR - 1940 + 1 }, (_, i) => THIS_YEAR - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

type Step = "input" | "loading" | "result" | "error";

export default function TypeFlow() {
  const [step, setStep] = useState<Step>("input");
  const [cal, setCal] = useState<"양력" | "음력">("양력");
  const [year, setYear] = useState(1995);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState<number | null>(null); // null = 모름
  const [leap, setLeap] = useState(false);
  const [result, setResult] = useState<SajuTypeResponse | null>(null);

  const submit = async () => {
    setStep("loading");
    try {
      const res = await fetch("/api/saju/type", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year,
          month,
          day,
          hour,
          calendar_type: cal,
          is_intercalation: cal === "음력" ? leap : false,
        }),
      });
      if (!res.ok) {
        setStep("error");
        return;
      }
      setResult((await res.json()) as SajuTypeResponse);
      setStep("result");
    } catch {
      setStep("error");
    }
  };

  if (step === "result" && result) {
    const core = deriveCore(result.type_code);
    if (!core) {
      setStep("error");
      return null;
    }
    const shareUrl = `${SITE}/t/${result.type_code}`;
    const caption = `나는 "${result.nickname}"(${result.type_code}) 사주야.\n나랑 잘 맞는 결은 ${core.best.label}(${core.best.hanja}), 조심할 결은 ${core.worst.label}(${core.worst.hanja}).\n너는 무슨 타입이야? 우리 맞춰보자 → 사주랩`;

    return (
      <div className="flex flex-col gap-5">
        <TypeCardVisual core={core} data={result} />
        <ShareBar url={shareUrl} caption={caption} />
        <a
          href={PLAY_URL}
          className="w-full rounded-2xl border border-white/20 px-8 py-3.5 text-center font-medium text-white transition-colors hover:border-white/40"
        >
          앱에서 더 깊게 보기 (대운·십신·궁합)
        </a>
        <button
          onClick={() => {
            setResult(null);
            setStep("input");
          }}
          className="text-sm text-gray-400 underline-offset-2 hover:underline"
        >
          다른 생일로 다시 해보기
        </button>
      </div>
    );
  }

  if (step === "loading") {
    return (
      <div className="py-20 text-center text-gray-300">사주를 풀어보는 중…</div>
    );
  }

  if (step === "error") {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-gray-300">지금은 타입을 불러올 수 없어요.</p>
        <button
          onClick={() => setStep("input")}
          className="rounded-2xl bg-saju-primary px-6 py-3 font-semibold text-white hover:bg-purple-600"
        >
          다시 시도
        </button>
      </div>
    );
  }

  // step === "input"
  return (
    <div className="flex flex-col gap-6">
      {/* 양/음력 */}
      <div className="flex gap-2">
        {(["양력", "음력"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCal(c)}
            className={`flex-1 rounded-xl py-2.5 text-sm font-medium transition-colors ${
              cal === c
                ? "bg-saju-primary text-white"
                : "border border-white/15 text-gray-300"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 생일 */}
      <div className="grid grid-cols-3 gap-2">
        <Select value={year} onChange={setYear} options={YEARS} suffix="년" />
        <Select value={month} onChange={setMonth} options={MONTHS} suffix="월" />
        <Select value={day} onChange={setDay} options={DAYS} suffix="일" />
      </div>

      {cal === "음력" && (
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={leap}
            onChange={(e) => setLeap(e.target.checked)}
            className="h-4 w-4 accent-saju-primary"
          />
          윤달
        </label>
      )}

      {/* 시(時) — 12시진 + 모름 */}
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-sm text-gray-300">태어난 시 (선택)</span>
          <span className="text-xs text-gray-500">시를 넣으면 더 자세해져요</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => setHour(null)}
            className={`rounded-xl py-2.5 text-sm transition-colors ${
              hour === null
                ? "bg-saju-primary text-white"
                : "border border-white/15 text-gray-300"
            }`}
          >
            모름
          </button>
          {SIJIN.map((s) => (
            <button
              key={s.hour}
              onClick={() => setHour(s.hour)}
              className={`rounded-xl py-2.5 text-sm transition-colors ${
                hour === s.hour
                  ? "bg-saju-primary text-white"
                  : "border border-white/15 text-gray-300"
              }`}
            >
              <span className="font-serif">{s.hanja}</span> {s.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={submit}
        className="mt-2 w-full rounded-2xl bg-saju-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-purple-600"
      >
        내 사주 타입 보기
      </button>
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  suffix,
}: {
  value: number;
  onChange: (v: number) => void;
  options: number[];
  suffix: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full appearance-none rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-center text-white focus:border-saju-primary focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-saju-dark text-white">
            {o}
            {suffix}
          </option>
        ))}
      </select>
    </div>
  );
}
