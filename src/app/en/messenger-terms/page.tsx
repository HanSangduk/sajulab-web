import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Dugeun Saju Terms of Service - Sajulab",
};

export default function MessengerTermsPageEn() {
  return (
    <LegalLayout
      title="Dugeun Saju Terms of Service"
      updatedAt="June 10, 2026"
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
        Dugeun Saju is a service that extracts text from KakaoTalk
        conversation screenshots on the user&apos;s device (on-device OCR),
        then has AI interpret the extracted conversation text from the
        perspective of the user&apos;s saju (Four Pillars) and face reading
        and suggest communication strategies.
      </p>

      <h2>Article 2 (Data Processing Principles)</h2>
      <h3>1. Image processing — on-device only</h3>
      <ul>
        <li>
          KakaoTalk screenshots are OCR-processed only on the user&apos;s
          device (on-device), and the original images are never transmitted to
          the server.
        </li>
        <li>
          Only the conversation text extracted on the device is sent to the
          server for analysis. Original images are never collected or retained
          in any form, including server disks or cloud storage.
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
          We recommend covering sensitive information such as phone numbers,
          addresses, and bank account numbers before capturing screenshots.
          Sensitive information contained in transmitted conversation text is
          not used for any purpose other than analysis and is not stored with
          the original text after analysis.
        </li>
      </ul>

      <h3>4. Photos of the other person (optional feature)</h3>
      <ul>
        <li>
          If a user attaches a photo of the person being analyzed, the photo
          is processed only on the device via MediaPipe; only face-reading
          metrics are sent to the server, and the original photo is never
          transmitted or stored.
        </li>
        <li>
          Users must attach only photos they may lawfully possess and use, and
          bear responsibility for doing so.
        </li>
      </ul>

      <h3>5. No AI training</h3>
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
        <li>
          Conversations of children under the age of 14 must not be uploaded.
        </li>
        <li>
          Romantic-relationship (LOVER) analysis is available only when the
          user and the other person are both adults, or both minors aged 14
          or older (peers). Analysis of a romantic relationship between an
          adult and a minor is not provided, and if such a combination is
          identified, the analysis may be refused or use of the Service may
          be restricted.
        </li>
        <li>
          When attaching a photo of the other person, users must use only
          photos they may lawfully possess and use.
        </li>
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
      <p>
        The fees, product offerings (single analyses, subscriptions, etc.),
        and prices for the Service are displayed on the relevant service and
        checkout screens in the app, and users can confirm the final price
        before payment. The scope of any free portion (such as previews) is
        described on the service screen.
      </p>

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
      <p>
        These Terms took effect on May 18, 2026 and were amended on June 10,
        2026 (clarified on-device OCR processing, updated the sensitive
        information guidance, added the article on photos of the other person,
        specified age requirements, and changed how pricing is displayed).
      </p>
    </LegalLayout>
  );
}
