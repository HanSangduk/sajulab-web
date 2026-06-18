import DecovaLayout from "@/components/DecovaLayout";
import {
  DECOVA_NAME,
  DECOVA_OPERATOR,
  DECOVA_SUPPORT_EMAIL,
  DECOVA_MIN_AGE,
} from "@/lib/decova";

export const metadata = {
  title: "Privacy Policy - Decova",
  description:
    "Decova (AI texting coach) Privacy Policy: what we collect, how we use it, retention, international transfer, and your rights.",
};

export default function DecovaPrivacyEn() {
  return (
    <DecovaLayout title="Privacy Policy" updatedAt="June 17, 2026" lang="en">
      <p>
        {DECOVA_OPERATOR} (&quot;we&quot;) operates {DECOVA_NAME} (an AI texting
        coach, the &quot;Service&quot;). We respect your privacy and comply with
        applicable data protection laws. This policy explains what information the
        Service processes and how.
      </p>
      <p>
        The Service processes only the minimum information needed for
        conversation analysis and does not collect date of birth or facial
        (biometric) data.
      </p>

      <h2>1. Information We Collect and Why</h2>
      <p>
        The Service can be used without creating an account and operates on an
        anonymous device-identifier basis by default.
      </p>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Anonymous device identifier</td>
            <td>Provide the Service, manage usage/purchases, prevent abuse</td>
          </tr>
          <tr>
            <td>
              Conversation text you enter
              <br />
              (screenshots are converted to text on your device; original images
              are not sent to or stored on our servers)
            </td>
            <td>Provide AI texting coaching (analysis and reply suggestions)</td>
          </tr>
          <tr>
            <td>Situation notes you enter</td>
            <td>Improve analysis accuracy</td>
          </tr>
          <tr>
            <td>Other person&apos;s nickname, gender (optional)</td>
            <td>Manage relationship records, adjust reply tone</td>
          </tr>
          <tr>
            <td>Analysis results and history</td>
            <td>Let you revisit results and see relationship flow</td>
          </tr>
          <tr>
            <td>(Optional) linked account identifier</td>
            <td>Sync history across devices, only if you choose to link</td>
          </tr>
          <tr>
            <td>Purchase receipt token (Apple)</td>
            <td>
              Verify and manage in-app purchases and subscription status (we do
              not collect card or payment-method details)
            </td>
          </tr>
          <tr>
            <td>Push notification token (FCM)</td>
            <td>Send analysis-complete and revisit notifications</td>
          </tr>
          <tr>
            <td>Referral (invite) code</td>
            <td>Process invite rewards</td>
          </tr>
        </tbody>
      </table>
      <p>
        Device information (OS version, app version), access logs and error logs
        may be generated and collected automatically during use.
      </p>

      <h3>What we do not collect</h3>
      <ul>
        <li>Date or time of birth</li>
        <li>Photos of your face or biometric data</li>
        <li>Original screenshot images (converted to text on-device only)</li>
        <li>Name or phone number (unless you link an account)</li>
      </ul>

      <h2>2. Handling of Conversation Content</h2>
      <p>
        Conversation text you enter is used only to generate coaching results and
        provide history. Original screenshots are converted to text on your phone
        and are not transmitted to our servers. You should only enter
        conversations you personally took part in; if you enter another
        person&apos;s conversation, obtaining any necessary consent is your
        responsibility.
      </p>

      <h2>3. Retention</h2>
      <ul>
        <li>
          Analysis history and relationship records: kept until you delete them
          in the app or delete your account/relationships, and erased without
          undue delay upon request.
        </li>
        <li>
          Purchase records: may be retained for the period required by applicable
          law.
        </li>
      </ul>

      <h2>4. Sharing With Third Parties</h2>
      <p>
        We do not sell or share your personal data with third parties, except as
        required by law or with your consent.
      </p>

      <h2>5. Processors and International Transfer</h2>
      <p>
        To operate the Service reliably we use the processors below, which may
        involve processing your data outside your country.
      </p>
      <table>
        <thead>
          <tr>
            <th>Processor</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Apple Inc.</td>
            <td>In-app purchase processing and receipt verification</td>
          </tr>
          <tr>
            <td>Google Cloud Platform / Firebase</td>
            <td>Server and database hosting, push notifications</td>
          </tr>
          <tr>
            <td>Google (generative AI)</td>
            <td>AI analysis of the conversation text you enter</td>
          </tr>
        </tbody>
      </table>

      <h2>6. Your Rights</h2>
      <p>
        You may request access to, correction of, deletion of, or restriction of
        processing of your personal data at any time. You can delete your data
        directly in the app&apos;s settings or by emailing us. We act on requests
        without undue delay.
      </p>

      <h2>7. Children Under {DECOVA_MIN_AGE}</h2>
      <p>
        The Service is intended for users aged {DECOVA_MIN_AGE} and over and does
        not knowingly collect personal data from children under {DECOVA_MIN_AGE}.
      </p>

      <h2>8. Security</h2>
      <p>
        We apply reasonable safeguards such as in-transit encryption and access
        controls. If signs of self-harm, crisis, or involvement of a minor are
        detected during analysis, a safety notice may be shown.
      </p>

      <h2>9. Contact</h2>
      <ul>
        <li>Privacy contact: {DECOVA_OPERATOR}</li>
        <li>Email: {DECOVA_SUPPORT_EMAIL}</li>
      </ul>

      <h2>10. Changes</h2>
      <p>
        We may update this policy in line with legal or service changes and will
        post any changes on this page.
      </p>
    </DecovaLayout>
  );
}
