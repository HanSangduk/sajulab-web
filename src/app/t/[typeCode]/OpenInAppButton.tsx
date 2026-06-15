"use client";

// P288 — "앱에서 열기" 딥링크 버튼. raw sajulab:// 는 Android Chrome 이 못 여는 경우가 많음
// (앱 미설치 시 폴백도 없어 무반응) → Android 는 intent:// URL(앱 있으면 열고, 없으면 Play 폴백).
// iOS 는 커스텀 스킴(앱 설치 시 동작 / 출시 전엔 무동작). 매니페스트: scheme=sajulab host=t.
import { useEffect, useState } from "react";
import { PLAY_URL } from "@/lib/constants";

const ANDROID_PKG = "com.han.sajulab";

export default function OpenInAppButton({
  code,
  className,
  children,
}: {
  code: string;
  className?: string;
  children: React.ReactNode;
}) {
  // SSR/하이드레이션 전: 커스텀 스킴(iOS·데스크톱 기본). 마운트 후 Android 면 intent:// 로 교체.
  const [href, setHref] = useState(`sajulab://t/${encodeURIComponent(code)}`);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    if (/android/i.test(ua)) {
      const path = `t/${encodeURIComponent(code)}`;
      const fallback = encodeURIComponent(PLAY_URL);
      setHref(
        `intent://${path}#Intent;scheme=sajulab;package=${ANDROID_PKG};S.browser_fallback_url=${fallback};end`,
      );
    }
  }, [code]);

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
