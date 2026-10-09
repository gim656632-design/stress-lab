import { Sparkles, Compass, Footprints } from 'lucide-react';
import {
  CAUSE_SPECIFIC_ITEMS,
} from '../data/recommendations';
import type {
  RecommendationResult,
  RecommendationCard,
  ActionItem,
} from '../data/recommendations';

interface RecommendInput {
  mbti: string;
  causes: string[];
  reliefs: string[];
}

export function generateRecommendations(input: RecommendInput): RecommendationResult {
  const { mbti, causes, reliefs } = input;

  // 1. 주요 원인 선택 (첫 번째 원인 우선, 없으면 기본값 'other')
  const primaryCause = causes.length > 0 ? causes[0] : 'other';
  const causeData = CAUSE_SPECIFIC_ITEMS[primaryCause] || CAUSE_SPECIFIC_ITEMS.other;

  // 2. MBTI 성향 톤 요약 (중립적 자기이해)
  let mbtiSummary = '나만의 방식으로 에너지를 조율하는 연구원';
  if (mbti.length === 4) {
    const isE = mbti[0] === 'E';
    const isJ = mbti[3] === 'J';
    if (isE && isJ) {
      mbtiSummary = '활동적으로 정리하고 단계별로 계획하며 안정감을 찾는 편이에요.';
    } else if (isE && !isJ) {
      mbtiSummary = '상황에 맞춰 유연하게 반응하고 사람·활동을 통해 에너지를 환기하는 편이에요.';
    } else if (!isE && isJ) {
      mbtiSummary = '혼자만의 정돈된 시간과 예측 가능한 환경에서 차분하게 회복하는 편이에요.';
    } else {
      mbtiSummary = '자유롭고 조용한 나만의 여유 공간 속에서 감정을 자연스럽게 흘려보내는 편이에요.';
    }
  }

  // 3. 카드 3장 생성 (①발전 ②새로운방법 ③작은행동)
  // relief 분석: 사용자가 이미 하는 해소 습관 확인
  const isUsingAloneTime = reliefs.includes('alone_time');
  const isUsingExercise = reliefs.includes('exercise_walk');
  const hasProfessionalHelp = reliefs.includes('professional_help');

  const card1: RecommendationCard = {
    category: 'enhance',
    categoryLabel: '01 현재 방법 발전시키기',
    title: causeData.enhanceTitle,
    description: isUsingAloneTime
      ? `${causeData.enhanceDesc} 평소 선호하시는 혼자만의 시간과 함께하면 더욱 온전한 쉼이 될 거예요.`
      : causeData.enhanceDesc,
    icon: Sparkles,
  };

  const card2: RecommendationCard = {
    category: 'new_way',
    categoryLabel: '02 새로운 관리 방법',
    title: causeData.newWayTitle,
    description: !isUsingExercise
      ? `${causeData.newWayDesc} 거창한 계획이 아니더라도 작은 신체 감각을 깨워보는 새로운 시도가 도움이 돼요.`
      : causeData.newWayDesc,
    icon: Compass,
  };

  const card3: RecommendationCard = {
    category: 'action',
    categoryLabel: '03 상황을 개선하는 작은 행동',
    title: causeData.actionTitle,
    description: causeData.actionDesc,
    icon: Footprints,
  };

  // 4. 지금 할 수 있는 행동 3가지
  const baseActions = causeData.actions || [
    '지금 10분간 스마트폰을 내려놓고 멍하니 창밖을 바라볼 수 있어요.',
    '따뜻한 물 한 잔을 천천히 마시며 깊게 호흡해볼 수 있어요.',
    '오늘 나를 지치게 한 일 하나를 종이에 적고 접어둘 수 있어요.',
  ];

  const actions: ActionItem[] = baseActions.map((text, idx) => ({
    id: `act_${idx + 1}`,
    text,
  }));

  // 5. 전문적 도움 안내 멘트
  const professionalNote = hasProfessionalHelp
    ? '평소 전문적인 도움을 적극적으로 활용하고 계시군요. 나를 돌보는 매우 건강한 태도입니다.'
    : undefined;

  return {
    mbtiSummary,
    cards: [card1, card2, card3],
    actions,
    professionalNote,
  };
}
