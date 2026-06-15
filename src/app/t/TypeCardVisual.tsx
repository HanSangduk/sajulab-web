// P281 — 사주 타입 카드 (순수 프레젠테이션, 클라/서버 양쪽 사용 가능 — 훅 없음).
// 결과 페이지(/t, pillars 포함)와 랜딩(/t/[code], 코어만) 모두 이 컴포넌트로 렌더.
import {
  OHANG,
  OHANG_ORDER,
  type SajuTypeResponse,
  type TypeCore,
} from "@/lib/sajuType";

interface Props {
  core: TypeCore;
  data?: SajuTypeResponse | null; // 백엔드 enrich (nickname/traits/pillars/five_elements)
}

export default function TypeCardVisual({ core, data }: Props) {
  const accent = core.element.color;
  const nickname = data?.nickname?.trim();
  const traits = data?.traits ?? [];
  const five = data?.five_elements ?? null;
  const pillars = data?.pillars ?? null;
  const maxFive = five ? Math.max(1, ...Object.values(five)) : 1;

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border"
      style={{
        borderColor: `${accent}55`,
        background:
          "linear-gradient(180deg, #16162A 0%, #0E0E18 100%)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{ background: core.element.soft, opacity: 0.5 }}
        aria-hidden
      />
      <div className="relative flex flex-col items-center px-7 py-8 text-center">
        {/* 헤더 */}
        <div className="flex w-full items-center">
          <span className="mr-3 font-serif text-sm" style={{ color: `${accent}d9` }}>
            太極
          </span>
          <div className="text-left leading-none">
            <div className="text-[15px] font-extrabold text-[#F5F0E8]">사주랩</div>
            <div className="text-[9px] text-[#A8A090]">내 사주 한 장</div>
          </div>
        </div>

        {/* 띠 한자 halo */}
        <div
          className="mt-7 flex h-28 w-28 items-center justify-center rounded-full font-serif text-5xl"
          style={{ background: core.element.soft, color: accent }}
        >
          {core.zodiac.ji}
        </div>

        {/* 타입 코드 */}
        <div
          className="mt-6 text-5xl font-black leading-none"
          style={{ color: accent }}
        >
          {core.typeCode}
        </div>
        {nickname && (
          <div className="mt-2 text-lg font-semibold text-[#F5F0E8]">{nickname}</div>
        )}
        <div className="mt-1.5 text-[11px] text-[#A8A090]">
          {core.element.label}({core.element.hanja}) · {core.zodiac.animal}띠 · 60타입 중 하나
        </div>

        {/* 오행 분포 (있을 때) */}
        {five && (
          <div className="mt-5 flex items-end gap-3">
            {OHANG_ORDER.map((k) => {
              const v = five[k] ?? 0;
              const h = 14 + (v / maxFive) * 40;
              return (
                <div key={k} className="flex flex-col items-center">
                  <div
                    className="w-8 rounded-sm"
                    style={{ height: `${h}px`, background: OHANG[k].color }}
                  />
                  <div
                    className="mt-1 text-[11px] font-bold font-serif"
                    style={{ color: OHANG[k].color }}
                  >
                    {OHANG[k].hanja}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* traits 칩 */}
        {traits.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {traits.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full px-3 py-1 text-[11px] font-medium text-[#F5F0E8]"
                style={{ background: core.element.soft, border: `1px solid ${accent}66` }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* 궁합 zone — 잘 맞는 결 / 조심할 결 */}
        <div className="mt-6 flex w-full items-center justify-evenly">
          <MatchCol label="잘 맞는 결" hanja={core.best.hanja} sub={`${core.best.label} 기운`} color={core.best.color} />
          <div className="h-10 w-px bg-[#F5F0E81f]" />
          <MatchCol label="조심할 결" hanja={core.worst.hanja} sub={`${core.worst.label} 기운`} color={`${core.worst.color}d9`} />
        </div>

        {/* 4기둥 (시 포함 결과에서만) */}
        {pillars && (
          <div className="mt-6 w-full">
            <div className="mb-1.5 text-[9px] text-[#A8A090]">사주팔자</div>
            <div className="flex justify-center gap-2.5">
              {[
                { l: "년", p: pillars.year },
                { l: "월", p: pillars.month },
                { l: "일", p: pillars.day },
                ...(pillars.hour ? [{ l: "시", p: pillars.hour }] : []),
              ].map(({ l, p }) => (
                <div
                  key={l}
                  className="flex flex-col items-center rounded-md px-2 py-1.5"
                  style={{ background: "#F5F0E80a" }}
                >
                  <span className="font-serif text-base text-[#F5F0E8]">{p.gan}</span>
                  <span className="font-serif text-base text-[#A8A090]">{p.ji}</span>
                  <span className="mt-0.5 text-[9px] text-[#A8A090]">{l}</span>
                </div>
              ))}
              {!pillars.hour && (
                <div className="flex items-center text-[10px] text-[#A8A090]">시 미상</div>
              )}
            </div>
          </div>
        )}

        {/* footer */}
        <div className="mt-7 w-full border-t border-[#F5F0E81f] pt-3.5">
          <div className="flex items-center">
            <span className="mr-3 font-serif text-[13px]" style={{ color: `${accent}b3` }}>
              壬
            </span>
            <div className="text-left leading-none">
              <div className="text-[11px] font-semibold text-[#F5F0E8]">사주랩</div>
              <div className="text-[8px] text-[#A8A090]">sajulab.ai</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MatchCol({
  label,
  hanja,
  sub,
  color,
}: {
  label: string;
  hanja: string;
  sub: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[9px] text-[#A8A090]">{label}</div>
      <div className="mt-1 font-serif text-2xl font-black" style={{ color }}>
        {hanja}
      </div>
      <div className="text-[10px] text-[#F5F0E8]">{sub}</div>
    </div>
  );
}
