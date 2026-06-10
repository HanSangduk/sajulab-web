"use client";

// P707 — 함께만들기(ideas) 어드민 대시보드.
// 전체 / 신고 큐 / 차단 기기 탭 + 운영 생성 + 수정/숨김/삭제 + 기기 차단.
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = ["UI", "ANALYSIS", "BILLING", "CHAT", "BUG", "OTHER"] as const;
const STATUSES = ["proposed", "in_progress", "done"] as const;
type Category = (typeof CATEGORIES)[number];
type Status = (typeof STATUSES)[number];

type AdminIdea = {
  idea_id: string;
  title: string;
  description: string;
  category: Category;
  status: Status;
  vote_count: number;
  created_at: string;
  author_display: string;
  is_admin_created: boolean;
  released_in_version: string | null;
  done_at: string | null;
  created_by_device_id: string;
  report_count: number;
  is_hidden: boolean;
};

type BlockedDevice = { device_id: string; reason: string | null; created_at: string };

type Tab = "all" | "reported" | "blocked";

const STATUS_LABEL: Record<Status, string> = {
  proposed: "제안됨",
  in_progress: "진행중",
  done: "완료",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("all");
  const [ideas, setIdeas] = useState<AdminIdea[]>([]);
  const [reported, setReported] = useState<AdminIdea[]>([]);
  const [blocked, setBlocked] = useState<BlockedDevice[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [editing, setEditing] = useState<AdminIdea | null>(null);
  const [creating, setCreating] = useState(false);

  const api = useCallback(
    async (path: string, init?: RequestInit) => {
      const res = await fetch(path, init);
      if (res.status === 401) {
        router.replace("/admin/login");
        throw new Error("UNAUTHORIZED");
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const d = data?.detail;
        throw new Error(
          typeof d === "string" ? d : d?.detail || data?.error || `HTTP ${res.status}`,
        );
      }
      return data;
    },
    [router],
  );

  const reload = useCallback(async () => {
    setLoading(true);
    setErr("");
    try {
      if (tab === "all") {
        const d = await api("/api/admin/ideas?limit=100");
        setIdeas(d.items || []);
      } else if (tab === "reported") {
        const d = await api("/api/admin/ideas/reported?limit=100");
        setReported(d.items || []);
      } else {
        const d = await api("/api/admin/blocked-devices");
        setBlocked(d.items || []);
      }
    } catch (e) {
      if ((e as Error).message !== "UNAUTHORIZED") setErr((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [tab, api]);

  useEffect(() => {
    reload();
  }, [reload]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  async function patch(id: string, body: Record<string, unknown>) {
    try {
      await api(`/api/admin/ideas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await reload();
    } catch (e) {
      alert((e as Error).message);
    }
  }

  async function remove(id: string) {
    if (!confirm("이 글을 영구 삭제할까요? (복구 불가)")) return;
    try {
      await api(`/api/admin/ideas/${id}`, { method: "DELETE" });
      await reload();
    } catch (e) {
      alert((e as Error).message);
    }
  }

  async function blockDevice(deviceId: string) {
    if (!deviceId) return;
    const reason = prompt("차단 사유 (선택)", "반복 스팸/욕설");
    if (reason === null) return;
    try {
      await api("/api/admin/blocked-devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device_id: deviceId, reason }),
      });
      alert("기기를 차단했습니다.");
    } catch (e) {
      alert((e as Error).message);
    }
  }

  async function unblockDevice(deviceId: string) {
    if (!confirm("차단을 해제할까요?")) return;
    try {
      await api(`/api/admin/blocked-devices/${encodeURIComponent(deviceId)}`, {
        method: "DELETE",
      });
      await reload();
    } catch (e) {
      alert((e as Error).message);
    }
  }

  const rows = tab === "reported" ? reported : ideas;

  return (
    <div className="min-h-screen bg-saju-bg">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="font-bold text-saju-dark">사주랩 어드민 · 함께 만들기</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setCreating(true)}
              className="bg-saju-primary text-white text-sm rounded-lg px-3 py-1.5 font-medium"
            >
              + 운영 글 작성
            </button>
            <button
              onClick={logout}
              className="text-sm text-gray-500 rounded-lg px-3 py-1.5 border"
            >
              로그아웃
            </button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 flex gap-1">
          {([
            ["all", "전체"],
            ["reported", "신고 큐"],
            ["blocked", "차단 기기"],
          ] as [Tab, string][]).map(([t, label]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                tab === t
                  ? "border-saju-primary text-saju-primary"
                  : "border-transparent text-gray-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {err && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">
            {err}
            {err.includes("403") && " — 백엔드 SAJULAB_ENABLE_ADMIN_IDEA=true 필요"}
          </div>
        )}
        {loading && <p className="text-sm text-gray-400">불러오는 중…</p>}

        {tab === "blocked" ? (
          <BlockedTable items={blocked} onUnblock={unblockDevice} />
        ) : (
          <IdeaTable
            rows={rows}
            onEdit={setEditing}
            onToggleHide={(i) => patch(i.idea_id, { is_hidden: !i.is_hidden })}
            onDelete={remove}
            onBlockDevice={blockDevice}
          />
        )}
      </main>

      {editing && (
        <EditModal
          idea={editing}
          onClose={() => setEditing(null)}
          onSave={async (body) => {
            await patch(editing.idea_id, body);
            setEditing(null);
          }}
        />
      )}
      {creating && (
        <CreateModal
          onClose={() => setCreating(false)}
          onCreate={async (body) => {
            try {
              await api("/api/admin/ideas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
              });
              setCreating(false);
              setTab("all");
              await reload();
            } catch (e) {
              alert((e as Error).message);
            }
          }}
        />
      )}
    </div>
  );
}

function IdeaTable({
  rows,
  onEdit,
  onToggleHide,
  onDelete,
  onBlockDevice,
}: {
  rows: AdminIdea[];
  onEdit: (i: AdminIdea) => void;
  onToggleHide: (i: AdminIdea) => void;
  onDelete: (id: string) => void;
  onBlockDevice: (deviceId: string) => void;
}) {
  if (!rows.length) return <p className="text-sm text-gray-400">항목이 없습니다.</p>;
  return (
    <div className="overflow-x-auto bg-white rounded-xl border">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 text-left">
          <tr>
            <th className="px-3 py-2">제목</th>
            <th className="px-3 py-2">분류</th>
            <th className="px-3 py-2">상태</th>
            <th className="px-3 py-2 text-right">👍</th>
            <th className="px-3 py-2 text-right">🚩</th>
            <th className="px-3 py-2">작성자</th>
            <th className="px-3 py-2">관리</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((i) => (
            <tr key={i.idea_id} className={`border-t ${i.is_hidden ? "bg-red-50/50" : ""}`}>
              <td className="px-3 py-2 max-w-xs">
                <div className="font-medium text-saju-dark truncate">
                  {i.is_hidden && <span className="text-red-500">[숨김] </span>}
                  {i.title}
                </div>
                {i.description && (
                  <div className="text-gray-400 text-xs truncate">{i.description}</div>
                )}
              </td>
              <td className="px-3 py-2 text-gray-500">{i.category}</td>
              <td className="px-3 py-2">{STATUS_LABEL[i.status]}</td>
              <td className="px-3 py-2 text-right">{i.vote_count}</td>
              <td className="px-3 py-2 text-right">
                {i.report_count > 0 ? (
                  <span className="text-red-500 font-semibold">{i.report_count}</span>
                ) : (
                  <span className="text-gray-300">0</span>
                )}
              </td>
              <td className="px-3 py-2 text-gray-400 text-xs">
                {i.is_admin_created ? (
                  <span className="text-saju-primary">{i.author_display}</span>
                ) : (
                  <span title={i.created_by_device_id}>
                    {i.created_by_device_id ? i.created_by_device_id.slice(0, 8) + "…" : "—"}
                  </span>
                )}
              </td>
              <td className="px-3 py-2">
                <div className="flex flex-wrap gap-1">
                  <button className="text-xs px-2 py-1 border rounded" onClick={() => onEdit(i)}>
                    수정
                  </button>
                  <button
                    className="text-xs px-2 py-1 border rounded"
                    onClick={() => onToggleHide(i)}
                  >
                    {i.is_hidden ? "복구" : "숨김"}
                  </button>
                  <button
                    className="text-xs px-2 py-1 border rounded text-red-500"
                    onClick={() => onDelete(i.idea_id)}
                  >
                    삭제
                  </button>
                  {!i.is_admin_created && i.created_by_device_id && (
                    <button
                      className="text-xs px-2 py-1 border rounded text-red-500"
                      onClick={() => onBlockDevice(i.created_by_device_id)}
                    >
                      기기차단
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BlockedTable({
  items,
  onUnblock,
}: {
  items: BlockedDevice[];
  onUnblock: (deviceId: string) => void;
}) {
  if (!items.length) return <p className="text-sm text-gray-400">차단된 기기가 없습니다.</p>;
  return (
    <div className="overflow-x-auto bg-white rounded-xl border">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 text-left">
          <tr>
            <th className="px-3 py-2">기기 ID</th>
            <th className="px-3 py-2">사유</th>
            <th className="px-3 py-2">차단일</th>
            <th className="px-3 py-2">관리</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.device_id} className="border-t">
              <td className="px-3 py-2 font-mono text-xs">{d.device_id}</td>
              <td className="px-3 py-2 text-gray-500">{d.reason || "—"}</td>
              <td className="px-3 py-2 text-gray-400 text-xs">{d.created_at?.slice(0, 19)}</td>
              <td className="px-3 py-2">
                <button
                  className="text-xs px-2 py-1 border rounded"
                  onClick={() => onUnblock(d.device_id)}
                >
                  차단 해제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs text-gray-500">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-saju-primary";

function EditModal({
  idea,
  onClose,
  onSave,
}: {
  idea: AdminIdea;
  onClose: () => void;
  onSave: (body: Record<string, unknown>) => void;
}) {
  const [title, setTitle] = useState(idea.title);
  const [description, setDescription] = useState(idea.description);
  const [category, setCategory] = useState<Category>(idea.category);
  const [status, setStatus] = useState<Status>(idea.status);
  const [version, setVersion] = useState(idea.released_in_version || "");
  const [authorDisplay, setAuthorDisplay] = useState(idea.author_display);

  return (
    <Modal title="글 수정" onClose={onClose}>
      <Field label="제목">
        <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={60} />
      </Field>
      <Field label="설명">
        <textarea
          className={inputCls}
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={400}
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="분류">
          <select className={inputCls} value={category} onChange={(e) => setCategory(e.target.value as Category)}>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="상태">
          <select className={inputCls} value={status} onChange={(e) => setStatus(e.target.value as Status)}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="릴리스 버전 (완료 시)">
          <input className={inputCls} value={version} onChange={(e) => setVersion(e.target.value)} maxLength={20} />
        </Field>
        <Field label="작성자 표시">
          <input
            className={inputCls}
            value={authorDisplay}
            onChange={(e) => setAuthorDisplay(e.target.value)}
            maxLength={40}
          />
        </Field>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button className="px-4 py-2 text-sm border rounded-lg" onClick={onClose}>
          취소
        </button>
        <button
          className="px-4 py-2 text-sm bg-saju-primary text-white rounded-lg"
          onClick={() =>
            onSave({
              title,
              description,
              category,
              status,
              released_in_version: version || null,
              author_display: authorDisplay,
            })
          }
        >
          저장
        </button>
      </div>
    </Modal>
  );
}

function CreateModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (body: Record<string, unknown>) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("OTHER");
  const [status, setStatus] = useState<Status>("proposed");
  const [authorDisplay, setAuthorDisplay] = useState("운영팀");
  const [initialVotes, setInitialVotes] = useState(0);

  return (
    <Modal title="운영 글 작성" onClose={onClose}>
      <Field label="제목">
        <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={60} autoFocus />
      </Field>
      <Field label="설명">
        <textarea
          className={inputCls}
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={400}
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="분류">
          <select className={inputCls} value={category} onChange={(e) => setCategory(e.target.value as Category)}>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="상태">
          <select className={inputCls} value={status} onChange={(e) => setStatus(e.target.value as Status)}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="작성자 표시">
          <input
            className={inputCls}
            value={authorDisplay}
            onChange={(e) => setAuthorDisplay(e.target.value)}
            maxLength={40}
          />
        </Field>
        <Field label="초기 투표수">
          <input
            type="number"
            className={inputCls}
            value={initialVotes}
            min={0}
            onChange={(e) => setInitialVotes(Number(e.target.value) || 0)}
          />
        </Field>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button className="px-4 py-2 text-sm border rounded-lg" onClick={onClose}>
          취소
        </button>
        <button
          className="px-4 py-2 text-sm bg-saju-primary text-white rounded-lg disabled:opacity-50"
          disabled={!title.trim()}
          onClick={() =>
            onCreate({
              title: title.trim(),
              description,
              category,
              status,
              author_display: authorDisplay,
              initial_vote_count: initialVotes,
            })
          }
        >
          생성
        </button>
      </div>
    </Modal>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-20 px-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-3 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-bold text-saju-dark">{title}</h2>
        {children}
      </div>
    </div>
  );
}
