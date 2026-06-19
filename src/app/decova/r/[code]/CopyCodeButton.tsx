"use client";

import { useState } from "react";

// P738 — Decova referral 코드 복사 버튼 (decova accent). 사주랩 r/[code] CopyCodeButton 의 Decova 톤판.
export default function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard 미지원 브라우저 — 사용자가 직접 길게 눌러 복사
    }
  };

  return (
    <button
      onClick={onCopy}
      className="w-full rounded-full border border-[#6C72FF]/40 px-8 py-3 font-medium text-[#A9ADFF] transition-colors hover:border-[#6C72FF] hover:text-white"
    >
      {copied ? "Copied! 복사 완료" : "코드 복사하기"}
    </button>
  );
}
