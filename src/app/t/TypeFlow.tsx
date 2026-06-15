"use client";

// P281 — /t 입력 흐름. 생일(+시 optional) → 백엔드 계산 → 결과 카드.
// 시(時)는 12시진 한자 대신 "시계 시각"으로 입력받는다(일반 사용자는 자/축/인…을 모름).
// 시각을 고르면 백엔드가 시주를 계산 → 4기둥/오행 정밀("자세함"). 모르면 타입/best·worst 는 그대로.
// theme: "violet"(=/t 단독 페이지, 기본) / "ember"(=홈 임베드, 웜톤). 카드(TypeCardVisual)는 테마 무관.
import { useState } from "react";
import { deriveCore, type SajuTypeResponse } from "@/lib/sajuType";
import { SITE, PLAY_URL } from "@/lib/constants";
import TypeCardVisual from "./TypeCardVisual";
import ShareBar from "./ShareBar";

// 태어난 시각(0-23시) → 친숙한 한국어 라벨. 백엔드 hour: int 0-23 그대로 전달(시주 계산은 백엔드).
function hourLabel(h: number): string {
  if (h === 0) return "밤 12시 · 자정";
  if (h === 12) return "낮 12시 · 정오";
  const twelve = h % 12;
  const period =
    h < 6 ? "새벽" : h < 12 ? "오전" : h < 18 ? "오후" : h < 21 ? "저녁" : "밤";
  return `${period} ${twelve}시`;
}
const HOUR_OPTIONS = Array.from({ length: 24 }, (_, h) => ({
  hour: h,
  label: hourLabel(h),
}));

const THIS_YEAR = 2026;
const YEARS = Array.from({ length: THIS_YEAR - 1940 + 1 }, (_, i) => THIS_YEAR - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

type Step = "input" | "loading" | "result" | "error";
type Theme = "violet" | "ember";

interface ThemeClasses {
  active: string; // 선택된 토글
  idle: string; // 미선택 토글
  submit: string; // 1차 CTA
  field: string; // select 필드
  option: string; // <option>
  ctaOutline: string; // "앱에서 더 깊게" 외곽 버튼
  reset: string; // "다시 해보기"
  label: string; // 섹션 라벨
  hint: string; // 보조 설명
  loading: string; // 로딩 텍스트
  chevron: string; // 드롭다운 화살표
  checkbox: string; // 윤달 체크박스 accent
}

const THEME: Record<Theme, ThemeClasses> = {
  violet: {
    active: "bg-saju-primary text-white",
    idle: "border border-white/15 text-gray-300",
    submit: "bg-saju-primary text-white hover:bg-purple-600",
    field: "border-white/15 bg-white/5 text-white focus:border-saju-primary",
    option: "bg-saju-dark text-white",
    ctaOutline: "border-white/20 text-white hover:border-white/40",
    reset: "text-gray-400",
    label: "text-gray-300",
    hint: "text-gray-500",
    loading: "text-gray-300",
    chevron: "text-gray-400",
    checkbox: "accent-saju-primary",
  },
  ember: {
    active: "bg-[#E2553A] text-[#161310]",
    idle: "border border-[#EDE5D4]/15 text-[#B5AB97]",
    submit: "bg-[#E2553A] text-[#161310] hover:bg-[#C8442B] hover:text-[#EDE5D4]",
    field: "border-[#EDE5D4]/15 bg-[#EDE5D4]/5 text-[#EDE5D4] focus:border-[#E2553A]",
    option: "bg-[#1B1712] text-[#EDE5D4]",
    ctaOutline: "border-[#EDE5D4]/25 text-[#EDE5D4] hover:border-[#EDE5D4]/50",
    reset: "text-[#B5AB97]",
    label: "text-[#B5AB97]",
    hint: "text-[#B5AB97]/70",
    loading: "text-[#B5AB97]",
    chevron: "text-[#B5AB97]",
    checkbox: "accent-[#E2553A]",
  },
};

export default function TypeFlow({ theme = "violet" }: { theme?: Theme }) {
  const t = THEME[theme];
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
        <ShareBar
          url={shareUrl}
          caption={caption}
          imageUrl={`/t/${encodeURIComponent(result.type_code)}/share-image`}
          code={result.type_code}
          primaryClass={t.submit}
          outlineClass={t.ctaOutline}
        />
        <a
          href={PLAY_URL}
          className={`w-full rounded-2xl border px-8 py-3.5 text-center font-medium transition-colors ${t.ctaOutline}`}
        >
          앱에서 더 깊게 보기 (대운·십신·궁합)
        </a>
        <button
          onClick={() => {
            setResult(null);
            setStep("input");
          }}
          className={`text-sm underline-offset-2 hover:underline ${t.reset}`}
        >
          다른 생일로 다시 해보기
        </button>
      </div>
    );
  }

  if (step === "loading") {
    return (
      <div className={`py-20 text-center ${t.loading}`}>사주를 풀어보는 중…</div>
    );
  }

  if (step === "error") {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className={t.loading}>지금은 타입을 불러올 수 없어요.</p>
        <button
          onClick={() => setStep("input")}
          className={`rounded-2xl px-6 py-3 font-semibold ${t.submit}`}
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
              cal === c ? t.active : t.idle
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 생일 */}
      <div className="grid grid-cols-3 gap-2">
        <Select value={year} onChange={setYear} options={YEARS} suffix="년" theme={t} />
        <Select value={month} onChange={setMonth} options={MONTHS} suffix="월" theme={t} />
        <Select value={day} onChange={setDay} options={DAYS} suffix="일" theme={t} />
      </div>

      {cal === "음력" && (
        <label className={`flex items-center gap-2 text-sm ${t.label}`}>
          <input
            type="checkbox"
            checked={leap}
            onChange={(e) => setLeap(e.target.checked)}
            className={`h-4 w-4 ${t.checkbox}`}
          />
          윤달
        </label>
      )}

      {/* 태어난 시각 — 시계 시각(0~23시) + 모름. 자/축/인… 한자는 몰라도 됨. */}
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <span className={`text-sm ${t.label}`}>태어난 시각 (선택)</span>
          <span className={`text-xs ${t.hint}`}>시각을 넣으면 더 자세해져요</span>
        </div>
        <div className="relative">
          <select
            value={hour === null ? "" : String(hour)}
            onChange={(e) =>
              setHour(e.target.value === "" ? null : Number(e.target.value))
            }
            className={`w-full appearance-none rounded-xl border px-4 py-3 pr-10 text-left focus:outline-none ${t.field}`}
          >
            <option value="" className={t.option}>
              태어난 시각을 몰라요
            </option>
            {HOUR_OPTIONS.map((o) => (
              <option key={o.hour} value={o.hour} className={t.option}>
                {o.label}
              </option>
            ))}
          </select>
          <span
            aria-hidden
            className={`pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs ${t.chevron}`}
          >
            ▾
          </span>
        </div>
        <p className={`mt-2 text-xs leading-relaxed ${t.hint}`}>
          정확한 시(時)를 몰라도 괜찮아요. 태어난 시각을 고르면 사주팔자
          ‘시주(時柱)’까지 더 정밀하게 봐드려요.
        </p>
      </div>

      <button
        onClick={submit}
        className={`mt-2 w-full rounded-2xl px-8 py-4 text-lg font-semibold transition-colors ${t.submit}`}
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
  theme,
}: {
  value: number;
  onChange: (v: number) => void;
  options: number[];
  suffix: string;
  theme: ThemeClasses;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full appearance-none rounded-xl border px-3 py-3 text-center focus:outline-none ${theme.field}`}
      >
        {options.map((o) => (
          <option key={o} value={o} className={theme.option}>
            {o}
            {suffix}
          </option>
        ))}
      </select>
    </div>
  );
}
