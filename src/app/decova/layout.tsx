import type { Metadata } from "next";
import { DECOVA_NAME } from "@/lib/decova";

// P289 — Decova 세그먼트 메타데이터. 루트 layout 의 사주랩 OG/Twitter("두근사주·운세·관상"·냥도사)가
// /decova/* 의 <head> 로 상속되는 것을 차단(override). 운세 어휘가 메타태그/링크프리뷰에 노출되면
// App Review 리스크 → 여기서 Decova 브랜드로 완전 교체. openGraph/twitter 는 child 가 통째로 대체됨.
export const metadata: Metadata = {
  title: {
    default: "Decova — AI Texting Coach",
    template: "%s",
  },
  description:
    "Decova is an AI texting coach that reads your conversations and coaches what to reply.",
  applicationName: DECOVA_NAME,
  openGraph: {
    title: "Decova — AI Texting Coach",
    description:
      "Decova is an AI texting coach that reads your conversations and coaches what to reply.",
    siteName: DECOVA_NAME,
    type: "website",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Decova — AI Texting Coach",
    description:
      "Decova is an AI texting coach that reads your conversations and coaches what to reply.",
    images: [],
  },
  robots: { index: true, follow: true },
};

export default function DecovaSegmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
