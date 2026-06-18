import Link from "next/link";
import {
  DECOVA_NAME,
  DECOVA_APPSTORE_URL,
  DECOVA_SUPPORT_EMAIL,
} from "@/lib/decova";

// P289 — Decova landing (EN). No fortune / saju content.
export const metadata = {
  title: "Decova — AI Texting Coach",
  description:
    "Paste your chat and get coached on what they're feeling and what to say next. Decova reads the flow of your conversation and helps you reply better.",
};

export default function DecovaHomeEn() {
  const hasStore = DECOVA_APPSTORE_URL.length > 0;

  return (
    <div className="min-h-screen bg-[#0E0F1A] text-[#ECEDF5]">
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-3xl px-6 pb-20 pt-20 text-center">
          <p className="mb-5 inline-block rounded-full border border-[#6C72FF]/50 px-3 py-1 text-xs tracking-widest text-[#A9ADFF]">
            AI TEXTING COACH
          </p>
          <h1 className="text-4xl font-bold leading-snug tracking-tight sm:text-[3.2rem] sm:leading-[1.2]">
            Not sure how
            <br />
            to reply?
          </h1>
          <p className="mx-auto mt-6 max-w-md leading-relaxed text-[#A6A9C2]">
            Paste your conversation and {DECOVA_NAME} reads what the other person
            feels and the flow of your relationship — then coaches the next
            message to send.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {hasStore ? (
              <a
                href={DECOVA_APPSTORE_URL}
                className="w-full rounded-full bg-[#6C72FF] px-8 py-4 text-center font-semibold text-white transition-colors hover:bg-[#565CEB] sm:w-auto"
              >
                Download on the App Store
              </a>
            ) : (
              <span className="w-full rounded-full border border-[#6C72FF]/40 px-8 py-4 text-center font-semibold text-[#A9ADFF] sm:w-auto">
                Coming soon to the App Store
              </span>
            )}
          </div>
          <p className="mt-5 text-xs text-[#A6A9C2]/70">
            Free to start · Ages 14+ · No sign-up required
          </p>
        </div>
      </header>

      <section className="border-y border-white/10 bg-[#12131F]">
        <div className="mx-auto grid max-w-4xl gap-px overflow-hidden bg-white/10 px-0 sm:grid-cols-3">
          <Feature
            title="Read their mind"
            body="Analyzes patterns, reply speed and tone to gauge how interested they are."
          />
          <Feature
            title="Reply coaching"
            body="Suggests the next message in different tones so you can keep it natural."
          />
          <Feature
            title="Relationship flow"
            body="Shows whether things are warming up or cooling down — and what stage you're at."
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-xl font-semibold leading-relaxed sm:text-2xl">
          Your chats are processed on your device
        </p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#A6A9C2]">
          Screenshots are turned into text on your phone; only the text needed
          for analysis is sent, encrypted. You can delete your history anytime in
          the app.
        </p>
        <Link
          href="/decova/en/privacy"
          className="mt-5 inline-block text-xs text-[#A9ADFF] underline underline-offset-4 hover:text-white"
        >
          Read the Privacy Policy
        </Link>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-4xl px-6 py-10 text-sm text-[#A6A9C2]/80">
          <p className="font-semibold text-[#ECEDF5]">{DECOVA_NAME}</p>
          <p className="mt-1 text-xs">AI texting coach</p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs">
            <Link href="/decova/en/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="/decova/en/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/decova/en/support" className="hover:text-white">
              Support
            </Link>
            <Link href="/decova/en/account-deletion" className="hover:text-white">
              Delete Account
            </Link>
            <Link href="/decova" className="hover:text-white">
              한국어
            </Link>
          </div>
          <p className="mt-6 text-xs text-[#A6A9C2]/50">
            © 2026 {DECOVA_NAME} · {DECOVA_SUPPORT_EMAIL}
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
