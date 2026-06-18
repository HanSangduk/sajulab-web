import Link from "next/link";
import DecovaLayout from "@/components/DecovaLayout";
import { DECOVA_NAME, DECOVA_SUPPORT_EMAIL } from "@/lib/decova";

export const metadata = {
  title: "고객지원 - Decova",
  description:
    "Decova(AI 텍스팅 코치) 고객지원. 사용 방법, 결제·환불, 계정 삭제 등 자주 묻는 질문과 문의 안내.",
};

export default function DecovaSupport() {
  return (
    <DecovaLayout title="고객지원" updatedAt="2026년 6월 17일" lang="ko">
      <p>
        {DECOVA_NAME}를 이용해 주셔서 감사합니다. 궁금하거나 불편한 점이 있으면
        아래 안내를 확인하거나 이메일로 문의해 주세요.
      </p>

      <h2>문의하기</h2>
      <ul>
        <li>
          <strong>이메일</strong>: {DECOVA_SUPPORT_EMAIL}
        </li>
        <li>
          <strong>응답 시간</strong>: 영업일 기준 1~3일 이내 (주말·공휴일 제외)
        </li>
        <li>
          <strong>원활한 처리를 위해</strong>: 사용 기기(예: iPhone / iOS 버전),
          앱 버전, 문제 상황 설명, 화면 캡처(가능한 경우)를 함께 보내주세요.
        </li>
      </ul>

      <h2>자주 묻는 질문</h2>

      <h3>Decova는 어떤 앱인가요?</h3>
      <p>
        {DECOVA_NAME}는 이용자가 입력한 대화를 분석해 상대의 관심도와 관계의
        흐름을 읽고, 상황에 맞는 답장을 코칭해 주는 AI 텍스팅 코치입니다. 모든
        결과는 오락 및 참고 목적입니다.
      </p>

      <h3>어떻게 사용하나요?</h3>
      <ol>
        <li>상대와 나눈 대화 내용을 입력하거나 스크린샷을 불러옵니다.</li>
        <li>상대의 마음과 관계 흐름 분석 결과를 확인합니다.</li>
        <li>상황에 맞는 추천 답장을 참고해 대화를 이어가세요.</li>
      </ol>
      <p>
        본인이 직접 주고받은 대화만 입력해 주세요. 타인의 대화를 무단으로
        업로드해서는 안 됩니다.
      </p>

      <h3>내 대화는 안전하게 처리되나요?</h3>
      <p>
        스크린샷 원본 이미지는 휴대폰 안에서 텍스트로 변환되며 서버로 전송되지
        않습니다. 분석에 필요한 텍스트만 암호화해 전송합니다. 자세한 내용은{" "}
        <Link href="/decova/privacy">개인정보처리방침</Link>을 참고해 주세요.
      </p>

      <h3>결제와 환불은 어떻게 하나요?</h3>
      <p>
        모든 결제는 Apple App Store 인앱 결제로 이루어집니다. 환불은 Apple이
        처리하며{" "}
        <a
          href="https://reportaproblem.apple.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          reportaproblem.apple.com
        </a>
        에서 직접 요청할 수 있습니다. 서비스 장애로 결제 후 결과를 받지 못하신
        경우 위 이메일로 문의해 주시면 도와드립니다.
      </p>

      <h3>구독은 어떻게 해지하나요?</h3>
      <p>
        구독 해지와 관리는 기기의 App Store 설정에서 합니다: 설정 → 상단 Apple
        계정 → 구독 → Decova → 구독 취소. 현재 기간이 끝나기 24시간 전까지
        해지하면 다음 결제가 청구되지 않으며, 남은 기간 동안은 계속 이용할 수
        있습니다. 앱을 삭제하는 것만으로는 구독이 해지되지 않습니다.
      </p>

      <h3>계정을 삭제하고 싶어요</h3>
      <p>
        앱 내 설정에서 직접 삭제하거나 이메일로 요청할 수 있습니다. 자세한 절차는{" "}
        <Link href="/decova/account-deletion">계정 삭제 안내</Link> 페이지를
        참고해 주세요.
      </p>

      <h2>약관 및 정책</h2>
      <ul>
        <li>
          <Link href="/decova/terms">이용약관</Link>
        </li>
        <li>
          <Link href="/decova/privacy">개인정보처리방침</Link>
        </li>
      </ul>
    </DecovaLayout>
  );
}
