import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Dugeun Saju Terms of Service - Sajulab",
};

export default function MessengerTermsPageEn() {
  return (
    <LegalLayout
      title="Dugeun Saju Terms of Service"
      updatedAt="May 18, 2026"
      lang="en"
      altHref="/messenger-terms"
    >
      <p>
        <em>
          This English translation is provided for convenience. In the event of
          any discrepancy, the Korean version prevails.
        </em>
      </p>

      <p>
        These Terms set forth the special conditions for using the &quot;Dugeun
        Saju&quot; service (the &quot;Service&quot;) provided by Sangduk Han,
        the developer of Sajulab (the &quot;Developer&quot;). Matters not
        specified in these Terms are governed by the Sajulab Terms of Service
        and Privacy Policy.
      </p>

      <h2>Article 1 (Service Description)</h2>
      <p>
        Dugeun Saju is a service in which AI analyzes KakaoTalk conversation
        screenshots uploaded by the user, interprets the conversation from the
        perspective of the user&apos;s saju (Four Pillars) and face reading,
        and suggests communication strategies.
      </p>

      <h2>Article 2 (Data Processing Principles)</h2>
      <h3>1. Image processing</h3>
      <ul>
        <li>
          Uploaded KakaoTalk screenshots are used only for AI OCR parsing (text
          extraction) and are deleted from the server immediately after parsing
          is complete.
        </li>
        <li>
          Original images are not retained in any form, including server disks
          or cloud storage.
        </li>
      </ul>

      <h3>2. Text data</h3>
      <ul>
        <li>
          Parsed conversation text is processed once for analysis, after which
          only a 1–2 line analysis summary is stored in the relationship
          profile history.
        </li>
        <li>The original conversation text is not stored.</li>
      </ul>

      <h3>3. De-identification</h3>
      <ul>
        <li>
          Identifying information such as the other party&apos;s KakaoTalk
          nickname or profile photo is not stored.
        </li>
        <li>
          Only the nickname designated by the user (e.g., &quot;Crush A&quot;)
          is stored in the relationship profile.
        </li>
        <li>
          Sensitive information in conversations, such as phone numbers,
          addresses, and bank account numbers, is automatically masked during
          parsing.
        </li>
      </ul>

      <h3>4. No AI training</h3>
      <p>
        Uploaded conversation data is not used for AI model training
        (fine-tuning), dataset construction, or similar purposes. It is
        processed once for analysis only.
      </p>

      <h2>Article 3 (User Obligations)</h2>
      <ol>
        <li>
          Users may upload only screenshots containing{" "}
          <strong>messages they themselves have received</strong>.
        </li>
        <li>
          Capturing and uploading conversations between other people without
          authorization may violate the Protection of Communications Secrets
          Act of Korea, and the user bears all legal responsibility for such
          acts.
        </li>
        <li>Conversations of minors must not be uploaded.</li>
        <li>
          Analysis results must not be used to defame, insult, or stalk others.
        </li>
      </ol>

      <h2>Article 4 (Service Restrictions and Blocking)</h2>
      <p>The Service may be restricted in the following cases:</p>
      <ol>
        <li>
          When OCR parsing confidence is low (e.g., speakers cannot be reliably
          distinguished)
        </li>
        <li>Group chat screenshots (only 1:1 conversations are supported)</li>
        <li>Conversations that are too short to analyze</li>
        <li>When inappropriate content is detected</li>
        <li>
          If a user violates the obligations in Article 3, the Developer may
          restrict or block use of the Service without prior notice.
        </li>
        <li>
          Uploading large volumes of screenshots by abnormal means (automated
          tools, bots, etc.) will result in restrictions.
        </li>
      </ol>
      <p>
        The Developer is not liable for damages arising from such restrictions.
      </p>

      <h2>Article 5 (Nature of Analysis Results and Disclaimer)</h2>
      <p>
        The analysis results of this Service are{" "}
        <strong>interpretations for entertainment and reference purposes</strong>{" "}
        based on saju (Four Pillars studies) and physiognomy, and the following
        are not guaranteed:
      </p>
      <ul>
        <li>Accurate judgment of the other person&apos;s intentions or feelings</li>
        <li>Effectiveness of suggested communication strategies</li>
        <li>Predictions about the future of a relationship</li>
      </ul>
      <p>
        The Developer assumes no responsibility for outcomes arising from
        judgments or actions made by users based on analysis results (timing of
        contact, reply content, continuing or ending a relationship, etc.).
        Analysis results are not scientifically validated predictions and do
        not replace professional psychological or relationship counseling.
      </p>

      <h2>Article 6 (Relationship Profiles)</h2>
      <ol>
        <li>
          Users may create and manage relationship profiles for the people they
          analyze. Profiles and analysis history are stored linked to the
          user&apos;s device (Device ID).
        </li>
        <li>
          Upon a request to delete a relationship profile, the profile and all
          associated analysis history are permanently deleted.
        </li>
      </ol>

      <h2>Article 7 (Pricing and Refunds)</h2>
      <table>
        <thead>
          <tr>
            <th>Tier</th>
            <th>Price (KRW)</th>
            <th>Includes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Free</td>
            <td>₩0</td>
            <td>
              Conversation observation + saju context interpretation (beginning
              of the streamed result)
            </td>
          </tr>
          <tr>
            <td>Single analysis</td>
            <td>₩2,900</td>
            <td>Full analysis including strategy and face reading</td>
          </tr>
          <tr>
            <td>Relationship follow</td>
            <td>₩9,900/month</td>
            <td>Unlimited analyses for one person + weekly report</td>
          </tr>
          <tr>
            <td>Premium subscription</td>
            <td>₩19,900/month</td>
            <td>Unlimited analyses for all relationships</td>
          </tr>
        </tbody>
      </table>

      <p>
        Refunds are governed by Article 10 (Refund Policy) of the Sajulab Terms
        of Service. Refunds are not provided on the grounds that the analysis
        result differs from the user&apos;s expectations.
      </p>

      <h2>Article 8 (Limitation of Liability)</h2>
      <ol>
        <li>
          The Developer is not liable for damages incurred by users in
          connection with the free portion of the Service (conversation
          observation + the beginning of the streamed saju context
          interpretation).
        </li>
        <li>
          For paid services, where damages are caused to a user by the
          Developer&apos;s willful misconduct or gross negligence, the
          Developer&apos;s liability is limited to{" "}
          <strong>the amount actually paid by that user</strong>.
        </li>
        <li>
          The Developer is not liable for damages arising in the user&apos;s
          relationships with others as a result of using analysis results,
          damages caused by the user&apos;s own fault, or damages caused by
          third parties.
        </li>
      </ol>

      <h2>Addendum</h2>
      <p>These Terms take effect on May 18, 2026.</p>
    </LegalLayout>
  );
}
