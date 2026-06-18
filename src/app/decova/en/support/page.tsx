import Link from "next/link";
import DecovaLayout from "@/components/DecovaLayout";
import { DECOVA_NAME, DECOVA_SUPPORT_EMAIL } from "@/lib/decova";

export const metadata = {
  title: "Support - Decova",
  description:
    "Decova (AI texting coach) support: how to use the app, payments and refunds, account deletion, and how to contact us.",
};

export default function DecovaSupportEn() {
  return (
    <DecovaLayout title="Support" updatedAt="June 17, 2026" lang="en">
      <p>
        Thanks for using {DECOVA_NAME}. If you have a question or run into a
        problem, please check the guide below or email us.
      </p>

      <h2>Contact</h2>
      <ul>
        <li>
          <strong>Email</strong>: {DECOVA_SUPPORT_EMAIL}
        </li>
        <li>
          <strong>Response time</strong>: within 1–3 business days (excluding
          weekends and holidays)
        </li>
        <li>
          <strong>To help us help you</strong>: include your device (e.g.,
          iPhone / iOS version), app version, a description of the issue, and a
          screenshot if possible.
        </li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>What is Decova?</h3>
      <p>
        {DECOVA_NAME} is an AI texting coach that analyzes conversations you enter
        to gauge the other person&apos;s interest and the flow of your
        relationship, then coaches what to reply. All results are for
        entertainment and reference only.
      </p>

      <h3>How do I use it?</h3>
      <ol>
        <li>Enter your conversation or import a screenshot.</li>
        <li>Review the analysis of their interest and the relationship flow.</li>
        <li>Use the suggested replies to keep the conversation going.</li>
      </ol>
      <p>
        Only enter conversations you personally took part in. Do not upload other
        people&apos;s conversations without authorization.
      </p>

      <h3>Is my conversation handled safely?</h3>
      <p>
        Original screenshot images are converted to text on your phone and are not
        sent to our servers. Only the text needed for analysis is sent, encrypted.
        See the <Link href="/decova/en/privacy">Privacy Policy</Link> for details.
      </p>

      <h3>How do payments and refunds work?</h3>
      <p>
        All payments are made through Apple App Store in-app purchases. Refunds
        are handled by Apple at{" "}
        <a
          href="https://reportaproblem.apple.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          reportaproblem.apple.com
        </a>
        . If a service issue prevented you from receiving a result after payment,
        email us and we&apos;ll help.
      </p>

      <h3>How do I cancel my subscription?</h3>
      <p>
        Manage or cancel your subscription in your device&apos;s App Store
        settings: Settings → Apple Account → Subscriptions → Decova → Cancel
        Subscription. If you cancel at least 24 hours before the end of the
        current period, you won&apos;t be charged again and keep access until the
        period ends. Deleting the app alone does not cancel a subscription.
      </p>

      <h3>I want to delete my account</h3>
      <p>
        You can delete it directly in the app&apos;s settings or by email. See the{" "}
        <Link href="/decova/en/account-deletion">Delete Account</Link> page for
        details.
      </p>

      <h2>Terms and Policies</h2>
      <ul>
        <li>
          <Link href="/decova/en/terms">Terms of Service</Link>
        </li>
        <li>
          <Link href="/decova/en/privacy">Privacy Policy</Link>
        </li>
      </ul>
    </DecovaLayout>
  );
}
