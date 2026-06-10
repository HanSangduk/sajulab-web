"use client";

import { useState } from "react";

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
      className="w-full border border-white/20 hover:border-white/40 text-white font-medium px-8 py-3 rounded-2xl transition-colors"
    >
      {copied ? "복사 완료!" : "코드 복사하기"}
    </button>
  );
}
