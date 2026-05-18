import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "사주랩 - AI 사주 · 관상 · 궁합",
  description:
    "AI가 풀어주는 사주, 관상, 궁합. 냥도사와 함께하는 운명 해석.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "사주랩 - AI 사주 · 관상 · 궁합",
    description: "AI가 풀어주는 사주, 관상, 궁합. 냥도사와 함께하는 운명 해석.",
    url: "https://sajulab.ai",
    siteName: "사주랩",
    locale: "ko_KR",
    type: "website",
  },
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
