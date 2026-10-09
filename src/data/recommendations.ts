import type { LucideIcon } from 'lucide-react';

export interface ActionItem {
  id: string;
  text: string;
}

export interface RecommendationCard {
  category: 'enhance' | 'new_way' | 'action'; // ① 발전, ② 새로운 방법, ③ 작은 행동
  categoryLabel: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface RecommendationResult {
  mbtiSummary: string;
  cards: RecommendationCard[];
  actions: ActionItem[];
  professionalNote?: string;
}

// 원인별 행동 풀
export const CAUSE_SPECIFIC_ITEMS: Record<
  string,
  {
    enhanceTitle: string;
    enhanceDesc: string;
    newWayTitle: string;
    newWayDesc: string;
    actionTitle: string;
    actionDesc: string;
    actions: string[];
  }
> = {
  relationships: {
    enhanceTitle: '내 감정의 이름 먼저 붙여보기',
    enhanceDesc: '관계 속에서 일어난 불편함을 바로 반응하기보다, 펜으로 적어보며 나의 경계를 정돈해 봐요.',
    newWayTitle: '마음의 완충 지대 만들기',
    newWayDesc: '모든 연락에 즉시 답장하지 않아도 괜찮아요. 1시간의 응답 지연 시간을 스스로에게 허락해 보세요.',
    actionTitle: '관계의 에너지를 환기하는 작은 대화',
    actionDesc: '기대치를 조금 낮추고, 가벼운 주제부터 대화를 시작해 볼 수 있어요.',
    actions: [
      '오늘 불편했던 대화의 감정을 짧게 적어볼 수 있어요.',
      '알림을 잠시 끄고 30분 동안 혼자만의 휴식을 취해볼 수 있어요.',
      '무리한 부탁에 "조금 생각해보고 말씀드릴게요"라고 말해볼 수 있어요.',
    ],
  },
  academics: {
    enhanceTitle: '공부 덩어리를 잘게 쪼개기',
    enhanceDesc: '거대한 시험 범위를 마주하기보다, 지금 25분 동안 집중할 1개의 소단원만 책상에 올려두세요.',
    newWayTitle: '온전한 뇌의 쿨다운 시간',
    newWayDesc: '공부가 끝난 후 침대에 누워 영상을 보는 대신, 눈을 감고 5분간 숨을 깊게 내쉬어 보세요.',
    actionTitle: '학습 환경 10분 정돈',
    actionDesc: '시야에서 불필요한 책을 치우는 것만으로도 뇌의 인지 부하가 크게 줄어들어요.',
    actions: [
      '오늘 꼭 끝내야 할 딱 1가지 핵심 과제를 적어볼 수 있어요.',
      '25분 집중 후 5분 스트레칭 타이머를 켜볼 수 있어요.',
      '책상 위에서 지금 당장 안 보는 물건 3개를 치워볼 수 있어요.',
    ],
  },
  work: {
    enhanceTitle: '오늘의 "퇴근 기준" 명확히 하기',
    enhanceDesc: '끝없는 업무 목록 중 오늘 마무리하면 80점인 것 2가지를 먼저 표시해 보세요.',
    newWayTitle: '업무와 일상의 분리 리추얼',
    newWayDesc: '퇴근 후 손을 씻거나 가벼운 산책을 하며 마음에 "오늘 업무 종료" 신호를 보내보세요.',
    actionTitle: '우선순위 재정렬과 가벼운 거절',
    actionDesc: '급한 일과 중요한 일을 구분하고, 가능한 일정으로 조율하는 용기를 내볼 수 있어요.',
    actions: [
      '내일로 넘겨도 되는 일 하나를 과감히 내일 캘린더로 옮겨볼 수 있어요.',
      '퇴근길 좋아하는 음악 3곡을 들으며 업무 생각을 내려놓아 볼 수 있어요.',
      '메모장에 "오늘 해결한 일"을 1가지 적어보며 스스로를 인정해볼 수 있어요.',
    ],
  },
  dating: {
    enhanceTitle: '상대방과 나의 감정 분리하기',
    enhanceDesc: '상대의 표정이나 반응에 일희일비하기보다, 오늘 나의 컨디션을 먼저 돌보아 주세요.',
    newWayTitle: '솔직하고 담백한 한마디 나누기',
    newWayDesc: '서운함이 쌓이기 전에 "나 이런 부분에서 조금 지쳤었어"라고 부드럽게 털어놓아 보세요.',
    actionTitle: '나만을 위한 애정 어린 시간',
    actionDesc: '연인과의 대화에서 잠시 물러나 내가 좋아하는 소소한 음식을 즐겨볼 수 있어요.',
    actions: [
      '내가 상대에게 바라는 것과 나 스스로 채울 수 있는 것을 구분해볼 수 있어요.',
      '메시지 확인 텀을 두고 나만의 취미에 30분 몰입해볼 수 있어요.',
      '오늘 느낀 감정을 솔직하게 한 줄 일기에 적어볼 수 있어요.',
    ],
  },
  family: {
    enhanceTitle: '안전한 심리적 거리 두기',
    enhanceDesc: '가족이라도 모든 감정과 기대를 감당할 필요는 없어요. 부드러운 경계선을 세워보세요.',
    newWayTitle: '짧고 따뜻한 환기의 시간',
    newWayDesc: '갈등이 생길 때 바로 맞서기보다 물 한 잔을 마시며 방이나 바깥으로 10분 피신해 보세요.',
    actionTitle: '나의 독립된 공간 확보하기',
    actionDesc: '내 방 한 켠이나 근처 카페에서 누구의 간섭도 없는 온전한 시간을 만들어볼 수 있어요.',
    actions: [
      '대화 중 감정이 격해질 때 "잠깐 생각 정리하고 얘기할게요"라고 말해볼 수 있어요.',
      '가족과 분리된 나만의 편안한 공간에서 20분 머물러볼 수 있어요.',
      '가족의 말에 대한 나의 반응을 한 박자 천천히 가져볼 수 있어요.',
    ],
  },
  career: {
    enhanceTitle: '10년 뒤 대신 내일의 1보에 집중하기',
    enhanceDesc: '불확실한 미래 전체를 예측할 필요는 없어요. 지금 내 손에 잡히는 경험 하나에 집중해 보세요.',
    newWayTitle: '현실적인 롤모델의 발자취 엿보기',
    newWayDesc: '막연한 불안감 대신, 관심 있는 분야의 아티클이나 인터뷰 1편을 가볍게 읽어보세요.',
    actionTitle: '나의 강점 키워드 3가지 적어보기',
    actionDesc: '부족한 점보다 지금까지 내가 잘 버텨온 역량을 종이에 적어볼 수 있어요.',
    actions: [
      '내가 흥미를 느끼는 관심사 단어 3개를 메모장에 적어볼 수 있어요.',
      '비교되는 타인의 성공 스토리 대신 나의 속도를 인정해줄 수 있어요.',
      '이번 주에 시도해볼 수 있는 작은 도전 1가지를 정해볼 수 있어요.',
    ],
  },
  finance: {
    enhanceTitle: '고정 지출과 변동 지출의 담담한 점검',
    enhanceDesc: '막연한 두려움 대신 최근 일주일 통장을 객관적인 눈으로 숫자로만 확인해 보세요.',
    newWayTitle: '비용 0원의 작은 보상 찾기',
    newWayDesc: '돈을 쓰지 않고도 기분을 전환할 수 있는 산책로나 도서관, 따뜻한 차 한 잔을 즐겨보세요.',
    actionTitle: '청년 금융·지원 프로그램 탐색',
    actionDesc: '국가나 지자체의 주거·청년 금융 지원 제도를 한 번 가볍게 검색해볼 수 있어요.',
    actions: [
      '이번 달 불필요하게 나간 구독 서비스가 없는지 훑어볼 수 있어요.',
      '돈을 쓰지 않고 나를 기분 좋게 해주는 방법 2가지를 적어볼 수 있어요.',
      '지출 내역을 자책 없이 숫자로만 담담하게 기록해볼 수 있어요.',
    ],
  },
  health: {
    enhanceTitle: '몸이 보내는 신호 기록하기',
    enhanceDesc: '두통, 어깨 뭉침, 피로감 등 몸의 신호를 자책 없이 관찰 일기처럼 가볍게 적어보세요.',
    newWayTitle: '밤 11시의 수면 의식 만들기',
    newWayDesc: '자기 전 조명을 은은하게 낮추고 미지근한 물 한 모금으로 몸을 이완시켜 보세요.',
    actionTitle: '가벼운 스트레칭과 수분 섭취',
    actionDesc: '의자에서 일어나 기지개를 켜고, 깊은 호흡을 3회 반복해볼 수 있어요.',
    actions: [
      '물을 한 컵 천천히 마시며 목과 어깨를 가볍게 풀어줄 수 있어요.',
      '잠들기 30분 전 스마트폰 화면을 뒤집어둘 수 있어요.',
      '필요하다면 가까운 병원이나 전문의 상담을 예약해보는 것도 좋은 방법이에요.',
    ],
  },
  social_media: {
    enhanceTitle: '스크린타임과 알림 다이어트',
    enhanceDesc: '모든 피드를 실시간으로 확인할 필요는 없어요. 알림 뱃지만 꺼도 마음이 한결 조용해져요.',
    newWayTitle: '타인의 하이라이트 대신 내 일상 음미하기',
    newWayDesc: 'SNS는 타인의 가장 빛나는 편집본일 뿐이에요. 오늘 내가 먹은 맛있는 밥에 집중해 보세요.',
    actionTitle: '피드 숨김과 팔로우 정돈',
    actionDesc: '보면서 왠지 위축되거나 피로감이 드는 계정은 잠시 숨김 처리해볼 수 있어요.',
    actions: [
      'SNS 앱 알림을 끄거나 홈 화면에서 폴더 안으로 숨겨볼 수 있어요.',
      '오늘 감사했던 아주 소소한 일상 2가지를 노트에 적어볼 수 있어요.',
      '외출할 때 15분 동안 휴대폰을 가방 깊숙이 넣어둘 수 있어요.',
    ],
  },
  myself: {
    enhanceTitle: '내 안의 비판자 목소리 볼륨 낮추기',
    enhanceDesc: '"더 잘했어야 했는데"라는 생각 대신 "오늘도 애썼다"고 마음속 친구처럼 말해주세요.',
    newWayTitle: '나를 돌보는 작은 셀프 케어',
    newWayDesc: '남에게 베풀던 너그러움을 오늘만큼은 나 자신에게 똑같이 베풀어 보세요.',
    actionTitle: '오늘의 작은 성취 1가지 칭찬하기',
    actionDesc: '오늘 무사히 하루를 살아낸 것만으로도 충분히 잘 해낸 거예요.',
    actions: [
      '거울을 보며 "오늘도 고생 많았어"라고 속으로 다정하게 말해볼 수 있어요.',
      '따뜻한 샤워 후 편안한 옷으로 갈아입고 푹 쉴 수 있어요.',
      '스스로에게 지나치게 엄격했던 기준 하나를 오늘은 내려놓아 볼 수 있어요.',
    ],
  },
  other: {
    enhanceTitle: '마음의 상태를 단어로 표현해보기',
    enhanceDesc: '복잡하고 엉킨 생각들을 한 문장의 담담한 글로 적어보며 마음을 환기해 보세요.',
    newWayTitle: '안전한 쉼표 찍기',
    newWayDesc: '잠시 생각을 멈추고 창밖의 풍경이나 시원한 바람을 오롯이 느껴보세요.',
    actionTitle: '지금 필요한 휴식 선물하기',
    actionDesc: '나에게 가장 편안한 자세로 10분간 호흡을 가다듬어볼 수 있어요.',
    actions: [
      '지금 떠오르는 생각을 종이에 여과 없이 적어볼 수 있어요.',
      '바깥 공기를 쐬며 10분간 천천히 걸어볼 수 있어요.',
      '내가 가장 좋아하는 차나 음료 한 잔을 마셔볼 수 있어요.',
    ],
  },
};
