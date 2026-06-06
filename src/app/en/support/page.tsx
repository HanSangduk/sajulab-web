import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Support - Dugeun Saju",
  description:
    "Dugeun Saju support center. How to use the app, payments and refunds, privacy, account deletion, FAQs, and contact information.",
};

export default function SupportPageEn() {
  return (
    <LegalLayout
      title="Support"
      updatedAt="June 3, 2026"
      lang="en"
      altHref="/support"
    >
      <p>
        Thank you for using Dugeun Saju. If you have any questions or run into
        any issues, please check the information below or contact us by email.
        The Service is run by a single independent developer, and every inquiry
        is answered personally and with care.
      </p>

      <h2>Contact</h2>
      <ul>
        <li>
          <strong>Email</strong>: richramsang@gmail.com
        </li>
        <li>
          <strong>Response time</strong>: within 1–3 business days (excluding
          weekends and holidays)
        </li>
        <li>
          <strong>Please include for faster handling</strong>: your device
          (e.g., iPhone 15 / iOS 18), app version, a description of the issue,
          and a screenshot if possible
        </li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>What is Dugeun Saju?</h3>
      <p>
        Dugeun Saju is a love &amp; fortune app that analyzes your
        conversations with your crush to help you reply, and lets you talk
        through your worries with an AI fortune master grounded in saju (Korean
        Four Pillars astrology) and face reading. All analysis results are for
        entertainment and reference purposes only.
      </p>

      <h3>How do I use Dugeun Saju?</h3>
      <ol>
        <li>Enter a conversation you had with your crush.</li>
        <li>
          Review the analysis of how they feel about you and their signs of
          interest.
        </li>
        <li>
          Use the suggested replies that fit the situation to keep the
          conversation going.
        </li>
      </ol>
      <p>
        Please enter only conversations you personally took part in. Uploading
        other people&apos;s conversations without authorization is not
        allowed.
      </p>

      <h3>What is Dosa Chat?</h3>
      <p>
        Dosa Chat lets you talk with an AI fortune master versed in saju and
        face reading, as comfortably as chatting with a friend. Enter your date
        of birth and share what&apos;s on your mind — love, career,
        relationships — and the Dosa will answer based on your saju.
      </p>

      <h3>Are face photos handled safely?</h3>
      <p>
        Yes. Face photos taken or selected for face-reading analysis are{" "}
        <strong>analyzed only on your device</strong>, and{" "}
        <strong>original photos are never uploaded to our servers.</strong>{" "}
        Only the face-reading metrics produced by the analysis are sent to the
        server to generate your results. See the{" "}
        <Link href="/en/privacy">Privacy Policy</Link> for details.
      </p>

      <h3>How do payments work?</h3>
      <p>
        All payments are processed through{" "}
        <strong>Apple App Store in-app purchases</strong>. The developer does
        not directly collect or store your payment information, such as card
        numbers. You can view your payment history in your Apple account
        purchase history.
      </p>

      <h3>I want a refund</h3>
      <p>
        Refunds for App Store in-app purchases are handled by Apple. Please
        request one directly via:
      </p>
      <ul>
        <li>
          Web: go to{" "}
          <a
            href="https://reportaproblem.apple.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            reportaproblem.apple.com
          </a>{" "}
          → sign in with your Apple account → select the purchase → request a
          refund
        </li>
        <li>
          Device: Settings → your name → Media &amp; Purchases → Purchase
          History
        </li>
      </ul>
      <p>
        If you paid but did not properly receive your results due to a failure
        on our side, email us and we will re-process or help with a refund. For
        details, see the <Link href="/en/terms">Terms of Service</Link>.
      </p>

      <h3>My purchase isn&apos;t showing up</h3>
      <ul>
        <li>Check your network connection and restart the app.</li>
        <li>
          If it still doesn&apos;t appear, email us with your payment receipt
          (the email from Apple) and we will resolve it quickly.
        </li>
      </ul>

      <h3>I want to delete my account</h3>
      <p>
        You can delete your account directly in the app settings or request
        deletion by email. For the detailed procedure and the list of data that
        gets deleted, see the{" "}
        <Link href="/en/account-deletion">Account Deletion Guide</Link>.
      </p>

      <h2>Terms and Policies</h2>
      <ul>
        <li>
          <Link href="/en/terms">Terms of Service</Link>
        </li>
        <li>
          <Link href="/en/privacy">Privacy Policy</Link>
        </li>
        <li>
          <Link href="/en/messenger-terms">Dugeun Saju Terms</Link>
        </li>
      </ul>

      <h2>About</h2>
      <p>
        This service is operated by an independent developer (Sangduk Han). We
        do our best to respond quickly, but please understand that replies may
        occasionally be delayed.
      </p>
    </LegalLayout>
  );
}
