"use client";

// P281/P287 — 공유 액션. 인스타·스토리는 URL 공유 불가(이미지만) → 이미지 공유/저장이 1차.
// 이미지로 공유: 서버 생성 PNG(/t/[code]/share-image) → File → Web Share files(navigator.share)
//   → 모바일 네이티브 시트(인스타 스토리/피드·카톡 등). 미지원(데스크톱)이면 다운로드로 degrade.
// 이미지 저장: 항상 다운로드. 링크 공유: 기존 URL 공유/복사(카톡 링크 등 보조).
import { useState } from "react";

interface Props {
  url: string; // 공유할 /t/{code} 링크
  caption: string;
  imageUrl: string; // 서버 생성 세로 카드 PNG 경로
  code: string; // 파일명용
  primaryClass: string; // 테마 채움 버튼
  outlineClass: string; // 테마 외곽 버튼
}

export default function ShareBar({
  url,
  caption,
  imageUrl,
  code,
  primaryClass,
  outlineClass,
}: Props) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const flash = (m: string) => {
    setMsg(m);
    window.setTimeout(() => setMsg(null), 2600);
  };

  async function getImageFile(): Promise<File | null> {
    try {
      const res = await fetch(imageUrl);
      if (!res.ok) return null;
      const blob = await res.blob();
      return new File([blob], `sajulab-${code}.png`, { type: "image/png" });
    } catch {
      return null;
    }
  }

  function download(file: File) {
    const objUrl = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = objUrl;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(objUrl), 4000);
  }

  async function onShareImage() {
    if (busy) return;
    setBusy(true);
    const file = await getImageFile();
    setBusy(false);
    if (!file) {
      flash("이미지를 만들지 못했어요. 잠시 후 다시 시도해 주세요.");
      return;
    }
    const nav = typeof navigator !== "undefined" ? navigator : undefined;
    if (nav?.canShare?.({ files: [file] })) {
      try {
        await nav.share({ files: [file], text: caption, url });
      } catch {
        // 사용자가 취소 → 무시
      }
      return;
    }
    // 데스크톱 등 파일 공유 미지원 → 다운로드 후 안내
    download(file);
    flash("이미지를 저장했어요. 인스타 스토리에 올려보세요!");
  }

  async function onSaveImage() {
    if (busy) return;
    setBusy(true);
    const file = await getImageFile();
    setBusy(false);
    if (!file) {
      flash("이미지를 만들지 못했어요. 잠시 후 다시 시도해 주세요.");
      return;
    }
    download(file);
    flash("이미지를 저장했어요.");
  }

  async function onShareLink() {
    const nav = typeof navigator !== "undefined" ? navigator : undefined;
    if (nav?.share) {
      try {
        await nav.share({ title: "사주랩 — 내 사주 타입", text: caption, url });
      } catch {
        // 취소 → 무시
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      flash("링크가 복사됐어요");
    } catch {
      flash("링크를 복사하지 못했어요");
    }
  }

  return (
    <div className="flex flex-col gap-2.5">
      <button
        onClick={onShareImage}
        disabled={busy}
        className={`w-full rounded-2xl px-8 py-4 text-lg font-semibold transition-colors disabled:opacity-60 ${primaryClass}`}
      >
        {busy ? "이미지 만드는 중…" : "이미지로 공유 · 인스타 스토리"}
      </button>
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={onSaveImage}
          disabled={busy}
          className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-colors disabled:opacity-60 ${outlineClass}`}
        >
          이미지 저장
        </button>
        <button
          onClick={onShareLink}
          className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-colors ${outlineClass}`}
        >
          링크 공유
        </button>
      </div>
      {msg && <p className="text-center text-xs text-[#B5AB97]">{msg}</p>}
    </div>
  );
}
