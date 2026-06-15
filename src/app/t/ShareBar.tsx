"use client";

// P281 — 공유 바. Web Share API(모바일 네이티브 시트) + 링크 복사 fallback(데스크톱).
// 인스타는 web→feed API 가 없어 Web Share/이미지 저장으로만 — 링크 공유가 1차.
import { useState } from "react";

interface Props {
  url: string; // 공유할 /t/{code} 링크
  caption: string;
}

export default function ShareBar({ url, caption }: Props) {
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    const nav = typeof navigator !== "undefined" ? navigator : undefined;
    if (nav?.share) {
      try {
        await nav.share({ title: "사주랩 — 내 사주 타입", text: caption, url });
        return;
      } catch {
        // 사용자가 취소 → 무시
        return;
      }
    }
    // fallback: 링크 복사
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      onClick={onShare}
      className="w-full rounded-2xl bg-saju-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-purple-600"
    >
      {copied ? "링크가 복사됐어요" : "친구에게 공유하기"}
    </button>
  );
}
