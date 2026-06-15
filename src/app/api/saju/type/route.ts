// P281 — 사주 타입 계산 (mode A: 생일 → 타입). 클라 폼(/t)이 호출.
// 백엔드 BACKEND_BASE_URL 은 서버 env (브라우저 비노출). CORS 무관(서버-서버).
import { computeByBirth, type BirthInput } from "@/lib/sajuTypeApi";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // 유효 생일 페이로드는 수백 바이트 — 큰 본문은 파싱 전 차단(저렴한 어뷰징 가드).
  if (Number(req.headers.get("content-length") ?? 0) > 2048) {
    return Response.json({ error: "PAYLOAD_TOO_LARGE" }, { status: 413 });
  }

  let body: Partial<BirthInput>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "INVALID_JSON" }, { status: 400 });
  }

  const year = Number(body.year);
  const month = Number(body.month);
  const day = Number(body.day);
  const calendar_type = body.calendar_type === "음력" ? "음력" : "양력";
  const hour =
    body.hour === null || body.hour === undefined ? null : Number(body.hour);

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    year < 1900 ||
    year > 2100 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31 ||
    (hour !== null && (hour < 0 || hour > 23))
  ) {
    return Response.json({ error: "INVALID_BIRTH" }, { status: 400 });
  }

  const result = await computeByBirth({
    year,
    month,
    day,
    hour,
    calendar_type,
    is_intercalation: Boolean(body.is_intercalation),
  });

  if (!result) {
    return Response.json({ error: "BACKEND_UNAVAILABLE" }, { status: 503 });
  }
  return Response.json(result, { status: 200 });
}
