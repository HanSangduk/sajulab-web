import Link from "next/link";
import DecovaLayout from "@/components/DecovaLayout";
import { DECOVA_NAME, DECOVA_SUPPORT_EMAIL } from "@/lib/decova";

export const metadata = {
  title: "Delete Account - Decova",
  description:
    "How to delete your Decova (AI texting coach) account and data, and what gets removed.",
};

export default function DecovaAccountDeletionEn() {
  return (
    <DecovaLayout title="Delete Account" updatedAt="June 17, 2026" lang="en">
      <p>
        {DECOVA_NAME} lets you delete your data at any time. You can request
        deletion in either of the two ways below.
      </p>

      <h2>1. Delete in the app</h2>
      <ol>
        <li>Open the app and go to Settings.</li>
        <li>Select &quot;Delete account&quot; or &quot;Delete data.&quot;</li>
        <li>Confirm, and deletion is processed immediately.</li>
      </ol>
      <p>
        You can also delete individual relationships or analyses from the list to
        remove them one by one.
      </p>

      <h2>2. Request by email</h2>
      <p>
        If you can&apos;t access the app, email{" "}
        <strong>{DECOVA_SUPPORT_EMAIL}</strong> to request deletion. To verify
        ownership, include the device information or linked-account information you
        used, and we&apos;ll process it quickly.
      </p>

      <h2>What gets deleted</h2>
      <ul>
        <li>Analysis history and results</li>
        <li>Relationship records (nickname, gender and other entered details)</li>
        <li>Conversation text and notes you entered</li>
        <li>Referral (invite) records</li>
        <li>(If linked) the linked account identifier</li>
      </ul>

      <h2>Please note</h2>
      <ul>
        <li>Deleted data cannot be recovered.</li>
        <li>
          Purchase records may be retained for the period required by applicable
          law.
        </li>
        <li>
          Refunds for in-app purchases follow Apple&apos;s policy and are handled
          separately from account deletion.
        </li>
      </ul>

      <p>
        For related questions, see the{" "}
        <Link href="/decova/en/support">Support</Link> page.
      </p>
    </DecovaLayout>
  );
}
