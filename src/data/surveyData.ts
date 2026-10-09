import type { CauseItem, MbtiType, ReliefItem } from '../types/survey';

export const MBTI_LIST: MbtiType[] = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ',
];

export const CAUSES_DATA: CauseItem[] = [
  {
    id: 'ACADEMIC',
    emoji: '📚',
    title: '학업 · 취업 준비',
    example: '시험, 학점 관리, 자격증, 서류 전형 및 면접 준비 등',
  },
  {
    id: 'WORK',
    emoji: '💼',
    title: '직장 · 업무 스트레스',
    example: '과도한 업무량, 야근, 사내 관계, 이직 및 커리어 고민 등',
  },
  {
    id: 'RELATIONSHIP',
    emoji: '👥',
    title: '대인관계 · 인간관계',
    example: '친구·동료와의 갈등, 남들의 시선과 눈치 보기, 소외감 등',
  },
  {
    id: 'FINANCE',
    emoji: '💸',
    title: '경제적 부담 · 돈 문제',
    example: '생활비, 주거비, 학자금 대출, 미래 자산 형성에 대한 불안 등',
  },
  {
    id: 'FAMILY_LOVE',
    emoji: '💔',
    title: '연애 · 가족 관계',
    example: '연인과의 갈등, 이별, 가족의 지나친 기대와 간섭 등',
  },
  {
    id: 'HEALTH',
    emoji: '🏃',
    title: '건강 · 체력 저하',
    example: '만성 피로, 수면 부족, 면역력 저하, 신체적 불편함 등',
  },
  {
    id: 'FUTURE',
    emoji: '🧭',
    title: '불확실한 미래 · 막막함',
    example: '내가 잘하고 있는지 모호함, 삶의 방향성에 대한 방황 등',
  },
  {
    id: 'SNS',
    emoji: '📱',
    title: 'SNS · 비교 심리',
    example: 'SNS 속 타인의 화려한 모습과의 비교, 디지털 과열 피로감 등',
  },
];

export const RELIEF_DATA: ReliefItem[] = [
  {
    id: 'SLEEP',
    emoji: '🛌',
    title: '충분한 수면 · 휴식',
    example: '아무 생각 없이 암막 커튼 치고 푹 잠자기',
  },
  {
    id: 'EXERCISE',
    emoji: '🏃',
    title: '운동 · 산책하기',
    example: '헬스, 러닝, 밤공기 마시며 가볍게 걷기',
  },
  {
    id: 'MEDIA',
    emoji: '🍿',
    title: '영상 · 콘텐츠 몰아보기',
    example: '유튜브, 넷플릭스, 웹툰 등을 보며 뇌 비우기',
  },
  {
    id: 'GAME_HOBBY',
    emoji: '🎮',
    title: '게임 · 개인 취미 몰입',
    example: '온라인 게임, 악기, 드로잉 등 좋아하는 것에 몰입',
  },
  {
    id: 'FOOD',
    emoji: '🍰',
    title: '맛있는 음식 · 디저트',
    example: '좋아하는 배달 음식, 매운 음식, 달콤한 간식 챙겨 먹기',
  },
  {
    id: 'TALK',
    emoji: '🗣️',
    title: '친구 · 지인과 대화',
    example: '친한 친구나 마음 맞는 사람과 수다 떨며 털어놓기',
  },
  {
    id: 'MUSIC',
    emoji: '🎧',
    title: '음악 감상 · 드라이브',
    example: '이어폰 끼고 좋아하는 플레이리스트 반복 재생하기',
  },
  {
    id: 'WRITING',
    emoji: '✍️',
    title: '일기 쓰기 · 생각 정리',
    example: '노트나 메모장에 솔직한 감정을 적어 내려가기',
  },
  {
    id: 'SHOPPING',
    emoji: '🛍️',
    title: '쇼핑 · 소소한 소비',
    example: '나를 위한 작은 선물이나 위시리스트 물건 사기',
  },
  {
    id: 'CLEANING',
    emoji: '🧹',
    title: '청소 · 공간 정리하기',
    example: '책상 정리, 방 청소, 불필요한 물건 비워내기',
  },
  {
    id: 'NONE',
    emoji: '❓',
    title: '특별한 방법이 없어요',
    example: '스트레스를 풀 마땅한 방법을 아직 찾지 못했어요',
    isExclusive: true,
  },
];
