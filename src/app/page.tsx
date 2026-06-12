import Image from "next/image";
import Link from "next/link";
import DugeunDemo from "./DugeunDemo";
import { readdirSync } from "node:fs";
import { join } from "node:path";

function getScreenshots(): string[] {
  try {
    return readdirSync(join(process.cwd(), "public", "screenshots"))
      .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
      .sort()
      .slice(0, 8);
  } catch {
    return [];
  }
}

const PLAY_URL = "https://play.google.com/store/apps/details?id=com.han.sajulab";
const IOS_WAITLIST_URL = "https://forms.gle/xq5mhYyrNcer75DK8";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "사주랩 - 두근사주, 오늘의 운세·궁합·관상",
  operatingSystem: "ANDROID",
  applicationCategory: "EntertainmentApplication",
  description:
    "카톡 대화로 보는 호감도 분석·답장 추천(두근사주)과 AI 사주·관상·궁합 분석 앱",
  installUrl: PLAY_URL,
  url: "https://sajulab-web.vercel.app",
  offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
};

/* 한자 도장 — 사주랩 시그니처 모티프 */
function Stamp({ char, tone = "gold" }: { char: string; tone?: "gold" | "red" }) {
  const color =
    tone === "red"
      ? "border-[#E2553A]/70 text-[#E2553A]"
      : "border-[#D9B36A]/50 text-[#D9B36A]";
  return (
    <span
      className={`inline-flex h-11 w-11 items-center justify-center border ${color} font-serif text-2xl select-none`}
      aria-hidden
    >
      {char}
    </span>
  );
}

export default function Home() {
  const screenshots = getScreenshots();
  return (
    <div className="min-h-screen bg-[#161310] text-[#EDE5D4]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ───────── Hero ───────── */}
      <header className="relative overflow-hidden">
        {/* 한자 워터마크 */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-16 font-serif text-[22rem] leading-none text-[#EDE5D4]/[0.04] select-none"
        >
          緣
        </span>

        {/* 금박 별 악센트 */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-[12%] top-32 font-serif text-xl text-[#D9B36A]/30 select-none"
        >
          ✦
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute right-[18%] top-64 font-serif text-sm text-[#D9B36A]/25 select-none"
        >
          ✦
        </span>

        <div className="relative mx-auto max-w-3xl px-6 pb-20 pt-16 text-center">
          {/* 보름달 메달리온 */}
          <div className="relative mx-auto mb-8 h-36 w-36">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-full bg-[#E2553A]/15 blur-2xl"
            />
            <Image
              src="/kakao-share.png"
              alt="도사 고양이 냥도사"
              width={144}
              height={144}
              priority
              className="relative rounded-full border border-[#D9B36A]/40 object-cover"
            />
          </div>

          <p className="mb-5 inline-block border border-[#E2553A]/60 px-3 py-1 text-xs tracking-widest text-[#E2553A]">
            GOOGLE PLAY 정식 출시
          </p>

          <h1 className="font-serif text-4xl leading-snug tracking-tight sm:text-[3.4rem] sm:leading-[1.25]">
            그 사람, 나를
            <br />
            좋아하는 걸까?
          </h1>

          <p className="mx-auto mt-6 max-w-md leading-relaxed text-[#B5AB97]">
            카톡 캡처 한 장이면 냥도사가 답해준다냥.
            <br />
            호감도 분석부터 답장 추천, 연애 사주까지 — 두근사주.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={PLAY_URL}
              className="w-full rounded-full bg-[#E2553A] px-8 py-4 text-center font-semibold text-[#161310] transition-colors hover:bg-[#C8442B] hover:text-[#EDE5D4] sm:w-auto"
            >
              Google Play에서 무료 다운로드
            </a>
            <a
              href={IOS_WAITLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full border border-[#EDE5D4]/25 px-8 py-4 text-center text-[#B5AB97] transition-colors hover:border-[#EDE5D4]/60 hover:text-[#EDE5D4] sm:w-auto"
            >
              iOS 출시 알림 받기
            </a>
          </div>

          <p className="mt-5 text-xs text-[#B5AB97]/70">
            무료 시작 · 만 14세 이상 · 회원가입 없이 바로
          </p>
        </div>
      </header>

      {/* ───────── 두근사주 데모 ───────── */}
      <section className="border-y border-[#A8A090]/15 bg-[#1B1712]">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="mb-10 flex items-center gap-4">
            <Stamp char="心" tone="red" />
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl">두근사주</h2>
              <p className="mt-1 text-sm text-[#B5AB97]">
                카톡 대화를 사주의 눈으로 읽어드립니다
              </p>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <DugeunDemo />

            {/* 설명 */}
            <div>
              <ul className="space-y-5 leading-relaxed text-[#B5AB97]">
                <li>
                  <strong className="text-[#EDE5D4]">호감도 분석</strong> — 대화
                  패턴, 답장 속도, 말투의 결을 종합해 숫자로 알려드려요.
                </li>
                <li>
                  <strong className="text-[#EDE5D4]">답장 추천</strong> — 안전형
                  · 적극형 · 위트형, 상황에 맞는 다음 한 마디를 골라드려요.
                </li>
                <li>
                  <strong className="text-[#EDE5D4]">연애 사주 해석</strong> —
                  두 사람의 사주 흐름 위에서 지금 이 대화가 어떤 장면인지
                  읽어드려요.
                </li>
              </ul>
              <p className="mt-6 border-l-2 border-[#E2553A]/60 pl-4 text-sm text-[#B5AB97]/80">
                스크린샷 원본은 휴대폰 안에서만 처리되고, 서버로 전송되지
                않습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 기능 4종 ───────── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="mb-2 text-center font-serif text-2xl sm:text-3xl">
          사주 · 관상 · 궁합, 한 곳에서
        </h2>
        <p className="mb-12 text-center text-sm text-[#B5AB97]">
          어려운 한자 풀이 없이, 쉽고 자연스러운 해석으로
        </p>

        <div className="grid gap-px border border-[#A8A090]/15 bg-[#A8A090]/15 sm:grid-cols-2">
          <div className="bg-[#161310] p-8">
            <Stamp char="命" />
            <h3 className="mt-4 font-semibold text-[#EDE5D4]">AI 사주</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#B5AB97]">
              생년월일시로 읽는 타고난 기질과 올해의 흐름. 오행 밸런스와
              용신까지, 매일 아침 오늘의 운세로.
            </p>
          </div>
          <div className="bg-[#161310] p-8">
            <Stamp char="相" />
            <h3 className="mt-4 flex items-center gap-2 font-semibold text-[#EDE5D4]">
              AI 관상
              <span className="border border-[#D9B36A]/40 px-1.5 py-0.5 text-[10px] tracking-wider text-[#D9B36A]">
                기기 내 분석
              </span>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#B5AB97]">
              셀카 한 장으로 삼정·오관을 정밀하게. 사진은 휴대폰 안에서만
              분석되고 서버로 전송되지 않아요.
            </p>
          </div>
          <div className="bg-[#161310] p-8">
            <Stamp char="緣" />
            <h3 className="mt-4 font-semibold text-[#EDE5D4]">AI 궁합</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#B5AB97]">
              두 사람의 사주를 겹쳐 보는 인연 점수. 성격·가치관·소통 궁합과
              관계를 좋게 만드는 조언까지.
            </p>
          </div>
          <div className="bg-[#161310] p-8">
            <Stamp char="心" tone="red" />
            <h3 className="mt-4 font-semibold text-[#EDE5D4]">두근사주</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#B5AB97]">
              카톡 캡처 한 장으로 호감도·관계 단계·다음 답장까지. 연애 고민의
              마지막 상담소.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── 앱 스크린샷 (public/screenshots/ 에 파일 추가 시 자동 표시) ───────── */}
      {screenshots.length > 0 && (
        <section className="border-t border-[#A8A090]/15 bg-[#1B1712]">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <h2 className="mb-2 text-center font-serif text-2xl">
              앱 미리보기
            </h2>
            <p className="mb-8 text-center text-sm text-[#B5AB97]">
              실제 화면 그대로
            </p>
            <div className="flex gap-4 overflow-x-auto pb-3">
              {screenshots.map((f) => (
                <Image
                  key={f}
                  src={`/screenshots/${f}`}
                  alt="사주랩 앱 화면"
                  width={230}
                  height={500}
                  className="h-auto w-[210px] shrink-0 border border-[#A8A090]/20"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────── 프라이버시 ───────── */}
      <section className="border-y border-[#A8A090]/15 bg-[#1B1712]">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center">
          <p className="font-serif text-xl leading-relaxed sm:text-2xl">
            사진도, 대화 원본도
            <br className="sm:hidden" /> 서버로 가지 않습니다
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#B5AB97]">
            관상 사진과 카톡 스크린샷은 기기 안에서 분석하고, 추출된 수치와
            텍스트만 암호화해 전송합니다. 분석 이력은 앱에서 언제든 삭제할 수
            있어요.
          </p>
          <Link
            href="/privacy"
            className="mt-5 inline-block text-xs text-[#D9B36A] underline underline-offset-4 hover:text-[#EDE5D4]"
          >
            개인정보 처리방침 보기
          </Link>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="mb-8 text-center font-serif text-2xl">자주 묻는 질문</h2>
        <div className="divide-y divide-[#A8A090]/15 border-y border-[#A8A090]/15">
          <details className="group px-2 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-[#EDE5D4] marker:content-none">
              <span>
                <span className="mr-2 text-[#E2553A]">問</span> 무료인가요?
              </span>
              <span className="text-[#B5AB97] group-open:hidden">+</span>
              <span className="hidden text-[#B5AB97] group-open:inline">−</span>
            </summary>
            <p className="mt-3 pl-7 text-sm leading-relaxed text-[#B5AB97]">
              네, 오늘의 운세와 기본 분석은 무료입니다. 더 깊은 풀이가 필요할
              때만 선택적으로 결제하시면 돼요. 모든 결제는 Google Play를 통해
              안전하게 처리됩니다.
            </p>
          </details>
          <details className="group px-2 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-[#EDE5D4] marker:content-none">
              <span>
                <span className="mr-2 text-[#E2553A]">問</span> 내 사진과 카톡
                대화는 어디로 가나요?
              </span>
              <span className="text-[#B5AB97] group-open:hidden">+</span>
              <span className="hidden text-[#B5AB97] group-open:inline">−</span>
            </summary>
            <p className="mt-3 pl-7 text-sm leading-relaxed text-[#B5AB97]">
              어디로도 가지 않습니다. 얼굴 사진과 스크린샷 원본은 휴대폰
              안에서만 처리되고, 분석에 필요한 수치·텍스트만 암호화되어
              전송돼요. 자세한 내용은 개인정보 처리방침에 있습니다.
            </p>
          </details>
          <details className="group px-2 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-[#EDE5D4] marker:content-none">
              <span>
                <span className="mr-2 text-[#E2553A]">問</span> 분석 결과를
                진지하게 믿어도 되나요?
              </span>
              <span className="text-[#B5AB97] group-open:hidden">+</span>
              <span className="hidden text-[#B5AB97] group-open:inline">−</span>
            </summary>
            <p className="mt-3 pl-7 text-sm leading-relaxed text-[#B5AB97]">
              사주랩의 모든 분석은 전통 명리학·관상학을 AI로 해석한 오락 및
              참고 목적의 콘텐츠입니다. 인생의 중요한 결정은 냥도사보다 당신의
              마음을 믿으세요. 만 14세 이상부터 이용할 수 있습니다.
            </p>
          </details>
        </div>
      </section>

      {/* ───────── 최종 CTA ───────── */}
      <section className="bg-[#E2553A]">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-16 text-center">
          <Image
            src="/kakao-share.png"
            alt="냥도사"
            width={72}
            height={72}
            className="rounded-full border-2 border-[#161310]/30 object-cover"
          />
          <p className="font-serif text-2xl leading-snug text-[#161310] sm:text-3xl">
            오늘 만날 사람 중에,
            <br />
            인연이 있을지도 모릅니다
          </p>
          <a
            href={PLAY_URL}
            className="rounded-full bg-[#161310] px-10 py-4 font-semibold text-[#EDE5D4] transition-colors hover:bg-[#2A241C]"
          >
            무료로 시작하기
          </a>
        </div>
      </section>

      {/* ───────── Footer ───────── */}
      <footer className="border-t border-[#A8A090]/15">
        <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-[#B5AB97]/80">
          <p className="font-serif text-[#EDE5D4]">사주랩</p>
          <p className="mt-1 text-xs">
            도사 고양이 냥도사가 당신의 하루를 함께합니다
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs">
            <Link href="/terms" className="hover:text-[#EDE5D4]">
              이용약관
            </Link>
            <Link href="/privacy" className="hover:text-[#EDE5D4]">
              개인정보 처리방침
            </Link>
            <Link href="/messenger-terms" className="hover:text-[#EDE5D4]">
              두근사주 약관
            </Link>
            <Link href="/account-deletion" className="hover:text-[#EDE5D4]">
              회원 탈퇴 안내
            </Link>
            <Link href="/support" className="hover:text-[#EDE5D4]">
              고객 지원
            </Link>
            <Link href="/en" className="hover:text-[#EDE5D4]">
              English
            </Link>
          </div>
          <p className="mt-6 text-xs text-[#B5AB97]/50">
            © 2026 사주랩 · 개인 개발자 한상덕 · 문의: richramsang@gmail.com
          </p>
        </div>
      </footer>
    </div>
  );
}
