"use client";

// P291 — 연애 본능 결과 "앱에서 열기". /t OpenInAppButton 의 love 변형(host=love).
// Android = intent://(앱 있으면 열고 없으면 Play 폴백), iOS = 커스텀 스킴. 앱이 resultCode 로 풀결과 딥링크.
import { useEffect, useState } from "react";
import { PLAY_URL } from "@/lib/constants";

const ANDROID_PKG = "com.han.sajulab";

export default function OpenInAppButton({
  resultCode,
  className,
  children,
}: {
  resultCode: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [href, setHref] = useState(`sajulab://love/${encodeURIComponent(resultCode)}`);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    if (/android/i.test(ua)) {
      const path = `love/${encodeURIComponent(resultCode)}`;
      const fallback = encodeURIComponent(PLAY_URL);
      setHref(
        `intent://${path}#Intent;scheme=sajulab;package=${ANDROID_PKG};S.browser_fallback_url=${fallback};end`,
      );
    }
  }, [resultCode]);

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
