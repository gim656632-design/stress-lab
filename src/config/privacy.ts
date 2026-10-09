/**
 * 개인정보 수집 및 처리 관련 설정
 * 기획서 명세: 보유 기간 값이 TODO이면 제출 기능을 비활성화
 */
export interface PrivacyConfig {
  operatorName: string; // 수집 주체
  purpose: string; // 수집 목적
  itemsCollected: string[]; // 수집 항목
  retentionPeriodText: string; // 사용자 안내용 보유 기간 문구
  retentionDays: number | null; // DB 보관일수 (만료 계산용, null이면 TODO 상태)
  consentVersion: string; // 동의서 버전
  privacyPolicyUrl: string; // 개인정보 처리방침 링크
}

export const PRIVACY_CONFIG: PrivacyConfig = {
  operatorName: 'STRESS LAB (운영자 준비 중)',
  purpose: '설문 결과 관련 안내 발송 및 맞춤 회복 가이드 제공',
  itemsCollected: ['휴대전화 번호', '설문 응답(MBTI, 스트레스 원인, 해소 방법)'],
  retentionPeriodText: '수집일로부터 30일 (설정 파일에서 조정 가능)',
  retentionDays: 30, // 30일 보관 (TODO 상태일 경우 null 처리)
  consentVersion: 'v1.0.0',
  privacyPolicyUrl: '/privacy',
};

/**
 * 보유 기간 또는 수집 주체가 확정되지 않은 TODO 상태인지 확인
 */
export const isPrivacyConfigReady = (): boolean => {
  return (
    PRIVACY_CONFIG.retentionDays !== null &&
    PRIVACY_CONFIG.retentionDays > 0 &&
    !PRIVACY_CONFIG.operatorName.includes('TODO')
  );
};
