import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sajulab-web.vercel.app"),
  title: "사주랩 - 두근사주, 오늘의 운세·궁합·관상",
  description:
    "그 사람, 나를 좋아하는 걸까? 카톡 캡처 한 장이면 호감도 분석·답장 추천까지. AI 사주·관상·궁합 올인원, 사주랩.",
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  openGraph: {
    title: "사주랩 - 두근사주, 오늘의 운세·궁합·관상",
    description:
      "카톡 한 장이면 냥도사가 답해준다냥 — 호감도 분석·답장 추천·연애 사주. AI 사주·관상·궁합 올인원.",
    url: "https://sajulab-web.vercel.app",
    siteName: "사주랩",
    locale: "ko_KR",
    type: "website",
    images: ["/og-referral-default.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "사주랩 - 두근사주, 오늘의 운세·궁합·관상",
    description:
      "카톡 한 장이면 냥도사가 답해준다냥 — 호감도 분석·답장 추천·연애 사주.",
    images: ["/og-referral-default.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="font-sans">{children}</body>
    </html>
  );
}
