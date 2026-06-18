import Link from "next/link";
import {
  DECOVA_NAME,
  DECOVA_APPSTORE_URL,
  DECOVA_SUPPORT_EMAIL,
} from "@/lib/decova";

// P289 — Decova 랜딩(KR). 운세·사주·관상 0. "AI 텍스팅 코치" 포지셔닝.
export const metadata = {
  title: "Decova — AI 텍스팅 코치",
  description:
    "대화를 붙여넣으면 상대의 마음과 다음 한 마디를 코칭받는 AI 텍스팅 코치, Decova. 관계의 흐름을 읽고 더 나은 답장을 찾으세요.",
};

export default function DecovaHome() {
  const hasStore = DECOVA_APPSTORE_URL.length > 0;

  return (
    <div className="min-h-screen bg-[#0E0F1A] text-[#ECEDF5]">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-3xl px-6 pb-20 pt-20 text-center">
          <p className="mb-5 inline-block rounded-full border border-[#6C72FF]/50 px-3 py-1 text-xs tracking-widest text-[#A9ADFF]">
            AI TEXTING COACH
          </p>
          <h1 className="text-4xl font-bold leading-snug tracking-tight sm:text-[3.2rem] sm:leading-[1.2]">
            그 대화, 어떻게
            <br />
            답해야 할까?
          </h1>
          <p className="mx-auto mt-6 max-w-md leading-relaxed text-[#A6A9C2]">
            나눈 대화를 붙여넣으면 {DECOVA_NAME}가 상대의 마음과 관계의 흐름을
            읽고, 지금 보낼 다음 한 마디를 코칭해 드려요.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {hasStore ? (
              <a
                href={DECOVA_APPSTORE_URL}
                className="w-full rounded-full bg-[#6C72FF] px-8 py-4 text-center font-semibold text-white transition-colors hover:bg-[#565CEB] sm:w-auto"
              >
                App Store에서 다운로드
              </a>
            ) : (
              <span className="w-full rounded-full border border-[#6C72FF]/40 px-8 py-4 text-center font-semibold text-[#A9ADFF] sm:w-auto">
                App Store 출시 준비 중
              </span>
            )}
          </div>
          <p className="mt-5 text-xs text-[#A6A9C2]/70">
            무료로 시작 · 만 14세 이상 · 회원가입 없이 바로
          </p>
        </div>
      </header>

      {/* Features */}
      <section className="border-y border-white/10 bg-[#12131F]">
        <div className="mx-auto grid max-w-4xl gap-px overflow-hidden bg-white/10 px-0 sm:grid-cols-3">
          <Feature
            title="마음 읽기"
            body="대화 패턴·답장 속도·말투를 분석해 상대의 관심도를 알려드려요."
          />
          <Feature
            title="답장 코칭"
            body="상황에 맞는 다음 한 마디를 톤별로 제안해 자연스럽게 이어가세요."
          />
          <Feature
            title="관계 흐름"
            body="대화가 가까워지는지 멀어지는지, 지금 단계를 한눈에 보여드려요."
          />
        </div>
      </section>

      {/* Privacy line */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-xl font-semibold leading-relaxed sm:text-2xl">
          대화 원본은 기기 안에서 처리됩니다
        </p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#A6A9C2]">
          스크린샷은 휴대폰 안에서 텍스트로 변환되고, 분석에 필요한 텍스트만
          암호화해 전송합니다. 분석 이력은 앱에서 언제든 삭제할 수 있어요.
        </p>
        <Link
          href="/decova/privacy"
          className="mt-5 inline-block text-xs text-[#A9ADFF] underline underline-offset-4 hover:text-white"
        >
          개인정보처리방침 보기
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-4xl px-6 py-10 text-sm text-[#A6A9C2]/80">
          <p className="font-semibold text-[#ECEDF5]">{DECOVA_NAME}</p>
          <p className="mt-1 text-xs">AI texting coach</p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs">
            <Link href="/decova/terms" className="hover:text-white">
              이용약관
            </Link>
            <Link href="/decova/privacy" className="hover:text-white">
              개인정보처리방침
            </Link>
            <Link href="/decova/support" className="hover:text-white">
              고객지원
            </Link>
            <Link href="/decova/account-deletion" className="hover:text-white">
              계정 삭제
            </Link>
            <Link href="/decova/en" className="hover:text-white">
              English
            </Link>
          </div>
          <p className="mt-6 text-xs text-[#A6A9C2]/50">
            © 2026 {DECOVA_NAME} · 문의: {DECOVA_SUPPORT_EMAIL}
          </p>
        </div>
      </footer>
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-[#12131F] p-8">
      <h3 className="font-semibold text-[#ECEDF5]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#A6A9C2]">{body}</p>
    </div>
  );
}
