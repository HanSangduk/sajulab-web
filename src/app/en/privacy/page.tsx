import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Privacy Policy - Sajulab",
};

export default function PrivacyPageEn() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updatedAt="June 10, 2026"
      lang="en"
      altHref="/privacy"
    >
      <p>
        <em>
          This English translation is provided for convenience. In the event of
          any discrepancy, the Korean version prevails.
        </em>
      </p>

      <h2>Article 1 (Purpose)</h2>
      <p>
        Sangduk Han, the developer of Sajulab (the &quot;Developer&quot;),
        establishes and discloses this Privacy Policy pursuant to Article 30 of
        the Personal Information Protection Act of the Republic of Korea in
        order to protect the personal information of data subjects and to
        handle related grievances promptly and smoothly.
      </p>

      <h2>Article 2 (Personal Information of Children Under 14)</h2>
      <p>
        In accordance with Article 22-2 of the Personal Information Protection
        Act, the Developer does not collect personal information from children
        under the age of 14, and children under 14 may not use the Service. If
        it is found that personal information of a child under 14 has been
        collected, such information will be destroyed without delay.
      </p>

      <h2>Article 3 (Items Collected and Collection Methods)</h2>
      <h3>1. Items collected</h3>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Items</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Required</td>
            <td>Device identifier (Device ID)</td>
            <td>User identification, analysis history management</td>
          </tr>
          <tr>
            <td>Required</td>
            <td>Date of birth, time of birth, gender</td>
            <td>Providing saju (Four Pillars) analysis</td>
          </tr>
          <tr>
            <td>Optional</td>
            <td>Face-reading measurement points (facial metrics)</td>
            <td>
              Providing face-reading analysis (original photos are not
              collected or stored; only metrics extracted on-device are sent to
              the server)
            </td>
          </tr>
          <tr>
            <td>Optional</td>
            <td>KakaoTalk conversation text (extracted via on-device OCR)</td>
            <td>
              Providing the Dugeun Saju service (conversation analysis).
              Original screenshot images are processed only on the device and
              are never sent to the server
            </td>
          </tr>
          <tr>
            <td>Optional</td>
            <td>
              Dugeun Saju counterpart info (nickname, birth year, gender,
              face-reading metrics)
            </td>
            <td>
              Providing Dugeun Saju relationship analysis. Face-reading
              metrics are extracted on-device; original photos are never
              transmitted
            </td>
          </tr>
          <tr>
            <td>Optional</td>
            <td>Nyang Dosa chat messages</td>
            <td>Providing AI saju counseling and storing conversation history</td>
          </tr>
          <tr>
            <td>Optional</td>
            <td>Google account information (email, account identifier)</td>
            <td>
              Data backup and recovery via account linking, continuity across
              device changes
            </td>
          </tr>
          <tr>
            <td>Optional</td>
            <td>Push notification token (FCM)</td>
            <td>Sending notifications such as analysis-completion alerts</td>
          </tr>
          <tr>
            <td>Optional</td>
            <td>Purchase receipts and subscription status</td>
            <td>
              Providing paid services, payment verification, and purchase
              restoration. Payments are processed through Google Play in-app
              billing, and payment method details such as card numbers are
              not collected
            </td>
          </tr>
        </tbody>
      </table>

      <h3>2. Collection methods</h3>
      <p>
        Information is collected only when users directly enter or upload it
        within the app. The Developer does not collect personal information
        from third parties without the user&apos;s separate consent. Where a
        user enters another person&apos;s information (e.g., in Dugeun Saju or
        compatibility analysis), such information is collected solely through
        the user&apos;s input, and users must enter it only when they may
        lawfully do so.
      </p>

      <h2>Article 4 (Purposes of Processing)</h2>
      <p>The Developer processes personal information for the following purposes:</p>
      <ol>
        <li>
          Providing AI-based services such as saju analysis, face reading,
          compatibility analysis, and Dugeun Saju
        </li>
        <li>Storing analysis history and providing cumulative analysis</li>
        <li>Processing payments for paid services</li>
        <li>
          Account linking (Google) and restoring analysis history across
          device changes
        </li>
        <li>
          Sending push notifications (e.g., analysis-completion alerts) and,
          with separate consent, marketing communications
        </li>
        <li>Service improvement and statistical analysis (de-identified data)</li>
      </ol>

      <h2>Article 5 (Processing and Retention Period)</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Retention period</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Device ID, saju information</td>
            <td>Duration of service use</td>
            <td>Local data on the device is removed when the app is deleted</td>
          </tr>
          <tr>
            <td>Face-reading measurement points (metrics)</td>
            <td>Duration of service use</td>
            <td>
              Only metrics extracted on-device via MediaPipe are sent to the
              server. Original photos are never transmitted to or stored on the
              server
            </td>
          </tr>
          <tr>
            <td>KakaoTalk conversation text</td>
            <td>Only summaries retained after analysis</td>
            <td>
              Original screenshot images are OCR-processed on-device and never
              transmitted to the server; transmitted conversation text is not
              stored after analysis, and only a structured summary is retained
              as analysis history
            </td>
          </tr>
          <tr>
            <td>Analysis history (text summaries)</td>
            <td>Duration of service use</td>
            <td>
              Deleted immediately upon user request; permanently deleted 30
              days after account deletion
            </td>
          </tr>
          <tr>
            <td>Google account information</td>
            <td>Duration of service use</td>
            <td>
              Deleted upon unlinking or account deletion (30-day grace period
              after account deletion)
            </td>
          </tr>
          <tr>
            <td>Push notification token (FCM)</td>
            <td>Duration of service use</td>
            <td>
              Invalidated immediately when notifications are disabled or the
              account is deleted
            </td>
          </tr>
          <tr>
            <td>Payment records (purchase receipts, transaction identifiers)</td>
            <td>5 years under the E-Commerce Act of Korea</td>
            <td>
              Payments are processed through Google Play in-app billing; the
              Developer retains only purchase receipts and transaction
              identifiers
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Article 6 (Provision to Third Parties)</h2>
      <p>
        The Developer does not provide users&apos; personal information to
        third parties, except in the following cases:
      </p>
      <ol>
        <li>When the user has given prior consent</li>
        <li>When required by applicable laws and regulations</li>
      </ol>

      <h2>Article 7 (Outsourcing of Processing)</h2>
      <table>
        <thead>
          <tr>
            <th>Processor</th>
            <th>Entrusted tasks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Google Cloud Platform (Google LLC)</td>
            <td>Cloud server operation, AI model processing (Gemini)</td>
          </tr>
          <tr>
            <td>Firebase (Google LLC)</td>
            <td>
              User authentication (anonymous auth, Google account linking),
              push notification delivery (FCM)
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        In-app payments are processed through Google Play (Google LLC).
        Payment method details such as card numbers are handled by Google
        Play under its own terms, and the Developer does not collect or store
        them.
      </p>

      <h2>Article 7-2 (Overseas Transfer of Personal Information)</h2>
      <p>
        To provide the Service, the Developer entrusts the processing and
        storage of personal information overseas as described below, pursuant
        to Article 28-8(1)3 of the Personal Information Protection Act
        (outsourcing/storage necessary for the performance of a contract).
      </p>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Google LLC (GCP &amp; Firebase)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Country</td>
            <td>United States</td>
          </tr>
          <tr>
            <td>Data transferred</td>
            <td>
              Device identifier, saju information (birth date/time, gender),
              face-reading metrics, conversation text, chat messages,
              authentication data, push notification token, purchase receipts
              and subscription status
            </td>
          </tr>
          <tr>
            <td>Timing and method</td>
            <td>Transmitted over the network as the Service is used</td>
          </tr>
          <tr>
            <td>Purpose</td>
            <td>
              Cloud server operation, AI analysis processing, authentication,
              notification delivery, payment verification
            </td>
          </tr>
          <tr>
            <td>Retention</td>
            <td>
              Duration of service use (payment records: 5 years under the
              E-Commerce Act of Korea)
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Users may refuse the overseas transfer of their personal information
        by contacting richramsang@gmail.com. However, because the overseas
        transfer is essential to providing the Service, refusal may limit use
        of the Service.
      </p>

      <h2>Article 8 (AI-Based Automated Decision-Making)</h2>
      <p>
        The Developer uses the Google Gemini AI model to automatically generate
        saju, face-reading, and conversation analysis results. These results
        are for entertainment and reference purposes only and do not replace
        professional counseling or medical, legal, or financial advice.
      </p>
      <p>
        User data is not used to train AI models. For face-reading analysis,
        original photos are processed only on the device and are never sent to
        the server; only the extracted measurement values are used for
        analysis. KakaoTalk screenshots are likewise OCR-processed only
        on-device, and the original images are never transmitted to the
        server.
      </p>

      <h2>Article 9 (User Rights and How to Exercise Them)</h2>
      <p>Users may exercise the following rights:</p>
      <ol>
        <li>Request access to their personal information</li>
        <li>Request correction or deletion of their personal information</li>
        <li>Request suspension of processing</li>
        <li>Request deletion of their entire analysis history</li>
      </ol>
      <p>
        These rights may be exercised via the in-app settings menu or by
        emailing richramsang@gmail.com, and the Developer will take action
        without delay.
      </p>

      <h2>Article 10 (Security Measures)</h2>
      <p>The Developer takes the following measures to keep data secure:</p>
      <ol>
        <li>Encryption of data in transit (TLS 1.3)</li>
        <li>Server access control (GCP IAM, Secret Manager)</li>
        <li>
          No-upload policy for original photos (processed on-device only)
        </li>
        <li>De-identification of personal information</li>
      </ol>

      <h2>Article 11 (Privacy Officer)</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>Sangduk Han</td>
          </tr>
          <tr>
            <td>Position</td>
            <td>Developer</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>richramsang@gmail.com</td>
          </tr>
        </tbody>
      </table>

      <h2>Article 12 (Changes to This Privacy Policy)</h2>
      <p>
        This Privacy Policy was enacted on May 18, 2026 and amended on June
        10, 2026; the amended version applies from the amendment date. Any
        changes will be announced in the app and on this page.
      </p>
      <ul>
        <li>May 18, 2026 — Enacted</li>
        <li>
          June 10, 2026 — Amended (itemized collected data: Google account,
          push notification token, chat messages, Dugeun Saju counterpart
          info; clarified on-device OCR processing of KakaoTalk conversations;
          added the overseas transfer article; added Firebase to the
          outsourcing list; corrected the payment processing description —
          Google Play in-app billing; updated statutory references)
        </li>
      </ul>
    </LegalLayout>
  );
}
