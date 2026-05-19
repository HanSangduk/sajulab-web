import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "회원 탈퇴 안내 - 사주랩",
  description:
    "사주랩 계정·데이터 삭제 절차 안내. Play Store 데이터 안전 정책에 따른 공식 안내 페이지.",
};

export default function AccountDeletionPage() {
  return (
    <LegalLayout title="회원 탈퇴 안내" updatedAt="2026년 5월 18일">
      <h2>1. 앱 내 회원 탈퇴 (권장)</h2>
      <p>
        가장 빠른 방법은 사주랩 앱 안에서 직접 탈퇴하는 것입니다.
      </p>
      <ol>
        <li>사주랩 앱 실행 → 하단 탭 <strong>&quot;내 정보&quot;</strong></li>
        <li>우측 상단 톱니바퀴(⚙️) → <strong>&quot;설정&quot;</strong></li>
        <li><strong>&quot;데이터&quot;</strong> 섹션의{" "}
          <strong>&quot;회원 탈퇴&quot;</strong> 항목 탭
        </li>
        <li>안내 다이얼로그에서 <strong>&quot;탈퇴&quot;</strong> 확인</li>
      </ol>
      <p>
        탭한 즉시 디바이스 세션(인증) · FCM 토큰이 무효화되고, 30일 후 모든 데이터가
        영구 삭제됩니다.
      </p>

      <h2>2. 이메일로 요청 (대체 경로)</h2>
      <p>
        앱을 삭제했거나 앱 내 동선이 불가한 경우 이메일로 요청하실 수 있습니다.
      </p>
      <ul>
        <li>
          <strong>받는 사람</strong>: richramsang@gmail.com
        </li>
        <li>
          <strong>제목</strong>: [사주랩] 회원 탈퇴 요청
        </li>
        <li>
          <strong>본문 필수 항목</strong>:
          <ul>
            <li>가입에 사용한 Google 계정 이메일 (또는 기기 식별 정보)</li>
            <li>앱 설치 기기 (예: 갤럭시 S23 / Android 14)</li>
            <li>탈퇴 사유 (선택)</li>
          </ul>
        </li>
      </ul>
      <p>
        요청 접수 후 영업일 기준 <strong>7일 이내</strong>로 본인 확인 및 처리
        완료 안내드립니다.
      </p>

      <h2>3. 삭제되는 데이터</h2>
      <p>탈퇴 시 다음 항목이 삭제됩니다.</p>

      <h3>즉시 삭제 (복구 불가)</h3>
      <ul>
        <li>디바이스 인증 세션 (JWT, jti)</li>
        <li>FCM(푸시) 토큰</li>
        <li>Firebase 익명 사용자 계정</li>
      </ul>

      <h3>30일 후 영구 삭제 (그 전 복구 가능)</h3>
      <ul>
        <li>본인 사주 프로필 (생년월일시·성별 등)</li>
        <li>두근 사주 분석 이력</li>
        <li>관상 / 궁합 분석 결과</li>
        <li>운기 wallet 잔액 · streak</li>
        <li>마케팅 동의 audit log</li>
      </ul>

      <h2>4. 복구 — 30일 grace</h2>
      <p>
        탈퇴 후 <strong>30일 이내</strong>에 같은 기기에서 사주랩 앱을 다시 열면
        자동으로 데이터가 복구됩니다. 30일이 지나면 완전 영구 삭제됩니다.
      </p>

      <h2>5. 구독은 별도 해지</h2>
      <p>
        회원 탈퇴와 Google Play 구독 해지는 별개입니다. 활성 구독이 있는 경우 다음
        경로에서 별도 해지해주세요.
      </p>
      <ul>
        <li>
          Play 스토어 앱 → 메뉴 → <strong>구독</strong> → 사주랩 → 정기 결제 해지
        </li>
        <li>
          또는 웹:{" "}
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
        탈퇴와 별도로 구독은 결제 사이클이 끝날 때까지 유지됩니다 (Play 정책).
      </p>

      <h2>6. 법적 근거</h2>
      <ul>
        <li>
          <strong>개인정보 보호법 제40조</strong> — 정보주체의 요구에 따라 개인정보
          삭제·파기
        </li>
        <li>
          <strong>정보통신망 이용촉진 및 정보보호 등에 관한 법률 제29조</strong> —
          개인정보 파기
        </li>
        <li>
          <strong>Google Play Developer Program Policies — Account Deletion
          Requirements</strong> (2024년 5월 부터 시행)
        </li>
      </ul>

      <h2>7. 보존 기간 예외</h2>
      <p>
        다음 항목은 관련 법령에 따라 일정 기간 보존됩니다 (탈퇴 후에도).
      </p>
      <ul>
        <li>
          <strong>결제·환불 기록</strong>: 「전자상거래법」 — 5년
        </li>
        <li>
          <strong>이용약관·서비스 이용 기록 (계약 또는 청약철회 등에 관한 기록)</strong>:
          「전자상거래법」 — 5년
        </li>
      </ul>
      <p>
        이 항목들은 식별 가능한 개인정보를 제거한 형태(비식별화)로 보존됩니다.
      </p>

      <h2>8. 문의</h2>
      <p>
        탈퇴 절차에 대한 문의는{" "}
        <a
          href="mailto:richramsang@gmail.com?subject=%5B%EC%82%AC%EC%A3%BC%EB%9E%A9%5D%20%ED%9A%8C%EC%9B%90%20%ED%83%88%ED%87%B4%20%EB%AC%B8%EC%9D%98"
          className="text-saju-primary underline"
        >
          richramsang@gmail.com
        </a>{" "}
        으로 문의해주세요.
      </p>
    </LegalLayout>
  );
}
