import DecovaLayout from "@/components/DecovaLayout";
import {
  DECOVA_NAME,
  DECOVA_OPERATOR,
  DECOVA_SUPPORT_EMAIL,
  DECOVA_MIN_AGE,
} from "@/lib/decova";

export const metadata = {
  title: "Terms of Service - Decova",
  description:
    "Decova (AI texting coach) Terms of Service: service description, eligibility, payments and refunds, user obligations, and disclaimers.",
};

export default function DecovaTermsEn() {
  return (
    <DecovaLayout title="Terms of Service" updatedAt="June 17, 2026" lang="en">
      <p>
        These Terms govern your use of {DECOVA_NAME} (the &quot;Service&quot;)
        provided by {DECOVA_OPERATOR} (&quot;we&quot;). By using the Service you
        agree to these Terms.
      </p>

      <h2>1. The Service</h2>
      <p>
        {DECOVA_NAME} is an &quot;AI texting coach&quot; that analyzes
        conversation content you enter and provides communication coaching, such
        as the other person&apos;s level of interest, the flow of the
        relationship, and suggested replies.
      </p>
      <p>
        <strong>
          All analysis and suggestions are provided for entertainment and
          informational purposes only and do not replace professional advice
          (psychological, medical, legal, etc.).
        </strong>
      </p>

      <h2>2. Eligibility</h2>
      <p>
        The Service is available to users aged {DECOVA_MIN_AGE} and over. It can
        be used anonymously on a device basis, with optional account linking.
      </p>

      <h2>3. Payments, Subscriptions and Refunds</h2>
      <p>
        Some features are paid. All payments are processed through{" "}
        <strong>Apple App Store in-app purchases</strong>; we do not collect or
        store card or payment-method details. Prices and contents are shown on the
        purchase screen before you buy and may vary by region and currency.
      </p>

      <h3>One-time purchases</h3>
      <p>
        Consumable (one-time) products such as a single-analysis pass are charged
        once and do not auto-renew.
      </p>

      <h3>Auto-renewable subscriptions (Decova Pro)</h3>
      <ul>
        <li>
          Subscriptions are offered on a monthly or yearly basis; the included
          features and price are shown on the purchase screen. Payment is charged
          to your Apple account upon confirmation of purchase.
        </li>
        <li>
          A subscription{" "}
          <strong>
            automatically renews unless it is canceled at least 24 hours before
            the end of the current period
          </strong>
          , and your account is charged for renewal within 24 hours before the end
          of the period.
        </li>
        <li>
          You can manage subscriptions and turn off auto-renewal in your
          device&apos;s App Store account settings (Settings → Apple Account →
          Subscriptions).{" "}
          <strong>Deleting the app does not cancel a subscription.</strong>
        </li>
        <li>
          If a free trial is offered, any unused portion is forfeited when you
          purchase a subscription.
        </li>
      </ul>

      <h3>Refunds</h3>
      <p>
        Refunds are handled by Apple and can be requested at{" "}
        <a
          href="https://reportaproblem.apple.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          reportaproblem.apple.com
        </a>
        . If a service issue on our side prevented you from receiving a result
        after payment, contact us and we will help with reprocessing or a refund.
      </p>

      <h2>4. Your Obligations</h2>
      <ul>
        <li>Only enter conversations you personally took part in.</li>
        <li>
          Do not upload another person&apos;s conversations or personal data
          without authorization, or infringe others&apos; rights. You are
          responsible for the content you enter.
        </li>
        <li>Do not use the Service for unlawful purposes or to harass others.</li>
      </ul>

      <h2>5. Intellectual Property</h2>
      <p>
        Intellectual property in the Service belongs to us. You retain rights to
        the conversation content you enter; we process it only as needed to
        provide the Service.
      </p>

      <h2>6. Disclaimers and Limitation of Liability</h2>
      <p>
        Information provided by the Service is for reference only; decisions made
        based on it and their outcomes are your responsibility. We are not liable
        for damages caused by events beyond our reasonable control (e.g., force
        majeure, third-party outages), and our liability is limited to the extent
        permitted by law.
      </p>

      <h2>7. App Store Terms</h2>
      <p>
        These Terms are between you and us, not Apple. Apple has no responsibility
        for the Service or its content. However, Apple and its subsidiaries are
        third-party beneficiaries of these Terms and may enforce them against you.
        The App Store Terms of Service also apply to your use of the Service.
      </p>

      <h2>8. Changes</h2>
      <p>
        We may revise these Terms in line with legal or service changes and will
        post any changes on this page.
      </p>

      <h2>9. Governing Law and Contact</h2>
      <p>
        These Terms are governed by the laws of the Republic of Korea. Contact:{" "}
        {DECOVA_SUPPORT_EMAIL}
      </p>
    </DecovaLayout>
  );
}
