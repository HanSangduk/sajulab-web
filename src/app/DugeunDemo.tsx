"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const TOTAL_STEPS = 8;
const DELAYS = [200, 1100, 2100, 3100, 4300, 5600, 6100, 6600];
const PICK_AT = 7600;
const RESET_AT = 10600;

export default function DugeunDemo() {
  const [step, setStep] = useState(0);
  const [pick, setPick] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(TOTAL_STEPS);
      setPick(true);
      return;
    }
    const timers: number[] = [];
    let started = false;
    const run = () => {
      DELAYS.forEach((d, i) =>
        timers.push(window.setTimeout(() => setStep(i + 1), d)),
      );
      timers.push(window.setTimeout(() => setPick(true), PICK_AT));
      timers.push(
        window.setTimeout(() => {
          setStep(0);
          setPick(false);
          timers.push(window.setTimeout(run, 800));
        }, RESET_AT),
      );
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const cls = (i: number) =>
    `transition-all duration-500 ${
      step >= i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
    }`;

  return (
    <div ref={ref} className="mx-auto w-full max-w-[300px]">
      <div className="rounded-[28px] border border-[#A8A090]/25 bg-[#14110D] p-3">
        <div className="rounded-[18px] bg-[#171310] px-4 pb-5 pt-3">
          <div className="mb-4 flex items-center gap-2 border-b border-[#A8A090]/15 pb-3">
            <Image
              src="/kakao-share.png"
              alt=""
              width={26}
              height={26}
              className="rounded-full object-cover"
            />
            <span className="text-xs font-medium text-[#EDE5D4]">두근사주</span>
            <span className="ml-auto text-[10px] text-[#B5AB97]/60">
              분석 데모
            </span>
          </div>

          <div className="space-y-2.5 text-[13px]">
            <div className={`flex justify-start ${cls(1)}`}>
              <span className="max-w-[80%] bg-[#2A241C] px-3 py-2 text-[#EDE5D4]">
                어제 꿈에 너 나왔어ㅋㅋ
                <span className="ml-1.5 text-[9px] text-[#B5AB97]/60">
                  오전 12:47
                </span>
              </span>
            </div>
            <div className={`flex justify-end ${cls(2)}`}>
              <span className="max-w-[80%] bg-[#E2553A]/90 px-3 py-2 text-[#161310]">
                뭐야 무슨 꿈인데
              </span>
            </div>
            <div className={`flex justify-start ${cls(3)}`}>
              <span className="max-w-[80%] bg-[#2A241C] px-3 py-2 text-[#EDE5D4]">
                비밀ㅎ
                <span className="ml-1.5 text-[9px] text-[#B5AB97]/60">
                  오전 12:49
                </span>
              </span>
            </div>

            <div className={`pt-1 text-center ${cls(4)}`}>
              <span className="text-[11px] tracking-wide text-[#D9B36A]">
                냥도사가 대화의 결을 읽는 중…
              </span>
            </div>

            <div
              className={`border border-[#D9B36A]/30 bg-[#1B1712] p-3 ${cls(5)}`}
            >
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] text-[#B5AB97]">
                  냥도사의 판독
                </span>
                <span className="font-serif text-xl text-[#E2553A]">
                  호감도 73%
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full bg-[#2A241C]">
                <div
                  className="h-full bg-gradient-to-r from-[#D9B36A] to-[#E2553A]"
                  style={{
                    width: step >= 5 ? "73%" : "0%",
                    transition: "width 1.1s ease-out",
                  }}
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5 text-[10px]">
                <span className="border border-[#A8A090]/25 px-1.5 py-0.5 text-[#B5AB97]">
                  새벽 감성 타이밍
                </span>
                <span className="border border-[#A8A090]/25 px-1.5 py-0.5 text-[#B5AB97]">
                  꿈 언급 = 무의식 어필
                </span>
                <span className="border border-[#A8A090]/25 px-1.5 py-0.5 text-[#B5AB97]">
                  “비밀” = 궁금하게 만들기
                </span>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <div
                className={`border border-[#A8A090]/25 px-3 py-2 text-[11px] text-[#B5AB97] ${cls(6)}`}
              >
                <span className="mr-1.5 text-[#D9B36A]">안전형</span>
                에이 뭔데, 말해줘ㅋㅋ
              </div>
              <div
                className={`px-3 py-2 text-[11px] transition-colors ${cls(7)} ${
                  pick
                    ? "border border-[#E2553A] text-[#EDE5D4]"
                    : "border border-[#A8A090]/25 text-[#B5AB97]"
                }`}
              >
                <span className="mr-1.5 text-[#E2553A]">적극형</span>
                궁금하니까 만나서 직접 들을게
              </div>
              <div
                className={`border border-[#A8A090]/25 px-3 py-2 text-[11px] text-[#B5AB97] ${cls(8)}`}
              >
                <span className="mr-1.5 text-[#D9B36A]">위트형</span>
                남의 꿈에 무단침입했네, 벌금 있다?
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[10px] text-[#B5AB97]/50">
        실제 분석 흐름을 재구성한 데모입니다
      </p>
    </div>
  );
}
