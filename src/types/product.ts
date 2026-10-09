export interface Product {
  id: string;
  name: string;
  price: number; // e.g. 18900
  priceFormatted: string; // '18,900원'
  category: 'doll' | 'squishy' | 'fidget' | 'desk' | 'diary' | 'set';
  categoryLabel: string;
  subtitle: string;
  description: string;
  image: string;
  badge?: string;
  colors: { name: string; hex: string }[];
  tactile: string; // 촉감 또는 조작감 (e.g. '폭신폭신 부드러움', '말랑말랑 스퀴시', '딸깍 딸깍 클릭감')
  usage: string; // 사용 방식 (e.g. '손으로 쥐기', '메모 넣기', '클릭/버튼 조작')
  location: string; // 사용 장소 (e.g. '집/침실', '사무실/책상', '이동 중')
  target: string; // 추천 대상 (e.g. '생각이 많아 멍때림이 필요한 사람')
  details: string[]; // 제품 특징 목록
  compatibleKeyboards?: string; // 키캡 전용 호환 정보
  tags: string[]; // 추천 알고리즘 매칭용 태그
  recommendationReason?: string; // 기본 추천 사유
}
