import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Account Deletion Guide - Sajulab",
  description:
    "How to delete your Sajulab account and data. Official guide under the Play Store data safety policy.",
};

export default function AccountDeletionPageEn() {
  return (
    <LegalLayout
      title="Account Deletion Guide"
      updatedAt="May 18, 2026"
      lang="en"
      altHref="/account-deletion"
    >
      <p>
        <em>
          This English translation is provided for convenience. In the event of
          any discrepancy, the Korean version prevails.
        </em>
      </p>

      <h2>1. Delete your account in the app (recommended)</h2>
      <p>The fastest way is to delete your account directly in the Sajulab app.</p>
      <ol>
        <li>
          Open the Sajulab app → bottom tab <strong>&quot;My Info&quot;</strong>
        </li>
        <li>
          Gear icon (⚙️) at the top right → <strong>&quot;Settings&quot;</strong>
        </li>
        <li>
          Tap <strong>&quot;Delete Account&quot;</strong> in the{" "}
          <strong>&quot;Data&quot;</strong> section
        </li>
        <li>
          Confirm <strong>&quot;Delete&quot;</strong> in the dialog
        </li>
      </ol>
      <p>
        Your device session (authentication) and FCM token are invalidated
        immediately, and all data is permanently deleted after 30 days.
      </p>

      <h2>2. Request by email (alternative)</h2>
      <p>
        If you have already deleted the app or cannot follow the in-app steps,
        you can request deletion by email.
      </p>
      <ul>
        <li>
          <strong>To</strong>: richramsang@gmail.com
        </li>
        <li>
          <strong>Subject</strong>: [Sajulab] Account Deletion Request
        </li>
        <li>
          <strong>Required in the body</strong>:
          <ul>
            <li>
              The Google account email used to sign up (or device
              identification info)
            </li>
            <li>Device the app is installed on (e.g., Galaxy S23 / Android 14)</li>
            <li>Reason for deletion (optional)</li>
          </ul>
        </li>
      </ul>
      <p>
        We will verify your identity and confirm completion within{" "}
        <strong>7 business days</strong> of receiving your request.
      </p>

      <h2>3. Data that is deleted</h2>
      <p>The following items are deleted when you delete your account.</p>

      <h3>Deleted immediately (unrecoverable)</h3>
      <ul>
        <li>Device authentication session (JWT, jti)</li>
        <li>FCM (push) token</li>
        <li>Firebase anonymous user account</li>
      </ul>

      <h3>Permanently deleted after 30 days (recoverable until then)</h3>
      <ul>
        <li>Your saju profile (date/time of birth, gender, etc.)</li>
        <li>Dugeun Saju analysis history</li>
        <li>Face-reading / compatibility analysis results</li>
        <li>Fortune-energy wallet balance and streak</li>
        <li>Marketing consent audit log</li>
      </ul>

      <h2>4. Recovery — 30-day grace period</h2>
      <p>
        If you open the Sajulab app again on the same device within{" "}
        <strong>30 days</strong> of deletion, your data is restored
        automatically. After 30 days, it is permanently deleted.
      </p>

      <h2>5. Subscriptions must be canceled separately</h2>
      <p>
        Deleting your account and canceling a Google Play subscription are
        separate. If you have an active subscription, cancel it via:
      </p>
      <ul>
        <li>
          Play Store app → Menu → <strong>Subscriptions</strong> → Sajulab →
          Cancel subscription
        </li>
        <li>
          Or on the web:{" "}
          <a
            href="https://play.google.com/store/account/subscriptions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-saju-primary underline"
          >
            play.google.com/store/account/subscriptions
          </a>
        </li>
      </ul>
      <p>
        Regardless of account deletion, subscriptions remain active until the
        end of the billing cycle (per Google Play policy).
      </p>

      <h2>6. Legal basis</h2>
      <ul>
        <li>
          <strong>Personal Information Protection Act of Korea, Article 40</strong>{" "}
          — deletion/destruction of personal information at the data
          subject&apos;s request
        </li>
        <li>
          <strong>
            Act on Promotion of Information and Communications Network
            Utilization and Information Protection, Article 29
          </strong>{" "}
          — destruction of personal information
        </li>
        <li>
          <strong>
            Google Play Developer Program Policies — Account Deletion
            Requirements
          </strong>{" "}
          (in effect since May 2024)
        </li>
      </ul>

      <h2>7. Retention exceptions</h2>
      <p>
        The following items are retained for a statutory period even after
        account deletion, as required by law:
      </p>
      <ul>
        <li>
          <strong>Payment and refund records</strong>: E-Commerce Act of Korea
          — 5 years
        </li>
        <li>
          <strong>
            Records on contracts or withdrawal of offers (terms and service
            usage records)
          </strong>
          : E-Commerce Act of Korea — 5 years
        </li>
      </ul>
      <p>
        These items are retained in a de-identified form with personally
        identifiable information removed.
      </p>

      <h2>8. Contact</h2>
      <p>
        For questions about the deletion process, contact{" "}
        <a
          href="mailto:richramsang@gmail.com?subject=%5BSajulab%5D%20Account%20Deletion%20Inquiry"
          className="text-saju-primary underline"
        >
          richramsang@gmail.com
        </a>
        .
      </p>
    </LegalLayout>
  );
}
