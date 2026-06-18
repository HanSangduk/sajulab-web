import Link from "next/link";
import DecovaLayout from "@/components/DecovaLayout";
import { DECOVA_NAME, DECOVA_SUPPORT_EMAIL } from "@/lib/decova";

export const metadata = {
  title: "계정 삭제 안내 - Decova",
  description:
    "Decova(AI 텍스팅 코치) 계정 및 데이터 삭제 방법과 삭제되는 항목 안내.",
};

export default function DecovaAccountDeletion() {
  return (
    <DecovaLayout title="계정 삭제 안내" updatedAt="2026년 6월 17일" lang="ko">
      <p>
        {DECOVA_NAME}는 이용자가 언제든지 자신의 데이터를 삭제할 수 있도록 합니다.
        아래 두 가지 방법 중 하나로 요청할 수 있습니다.
      </p>

      <h2>1. 앱에서 직접 삭제</h2>
      <ol>
        <li>앱을 실행한 뒤 설정 화면으로 이동합니다.</li>
        <li>‘계정 삭제’ 또는 ‘데이터 삭제’를 선택합니다.</li>
        <li>안내에 따라 삭제를 확인하면 즉시 처리됩니다.</li>
      </ol>
      <p>
        개별 관계·분석 기록은 목록에서 항목을 삭제해 개별적으로도 지울 수
        있습니다.
      </p>

      <h2>2. 이메일로 요청</h2>
      <p>
        앱에 접근하기 어려운 경우 <strong>{DECOVA_SUPPORT_EMAIL}</strong>로 삭제를
        요청해 주세요. 본인 확인을 위해 가입(이용) 시 사용한 기기 정보 또는 연동
        계정 정보를 함께 알려주시면 빠르게 처리해 드립니다.
      </p>

      <h2>삭제되는 데이터</h2>
      <ul>
        <li>분석 이력 및 결과</li>
        <li>관계 기록(상대 별명, 성별 등 입력 정보)</li>
        <li>입력한 대화 텍스트 및 메모</li>
        <li>추천(초대) 관련 기록</li>
        <li>(연동한 경우) 연동 계정 식별자</li>
      </ul>

      <h2>유의 사항</h2>
      <ul>
        <li>삭제된 데이터는 복구할 수 없습니다.</li>
        <li>
          결제 관련 기록은 관련 법령상 보존 의무가 있는 경우 해당 기간 동안 보관될
          수 있습니다.
        </li>
        <li>
          이미 결제한 인앱 상품의 환불은 Apple 정책에 따르며, 계정 삭제와는 별개로
          진행됩니다.
        </li>
      </ul>

      <p>
        관련 문의는 <Link href="/decova/support">고객지원</Link> 페이지를 참고해
        주세요.
      </p>
    </DecovaLayout>
  );
}
