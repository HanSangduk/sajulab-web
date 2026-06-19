"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

// P291 v2 — 결과 진입 계측(서버 컴포넌트 result page 에서 마운트). result_view = 퍼널 마지막 단계.
export default function LoveResultTracker({ archetype }: { archetype: string }) {
  useEffect(() => {
    track("result_view", { archetype });
  }, [archetype]);
  return null;
}
