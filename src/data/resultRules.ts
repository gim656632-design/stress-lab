import type { ObservationPoint, StressTip } from '../types/survey';

export function generateObservations(causes: string[], reliefs: string[]): ObservationPoint[] {
  const points: ObservationPoint[] = [];

  // Rule 1: Special relief pattern - NONE
  if (reliefs.includes('NONE')) {
    points.push({
      id: 'obs-none',
      tag: '해소 습관 관찰',
      title: '나만의 해소 방식을 찾아가는 탐색기예요',
      description: '스트레스 해소법이 명확하지 않을 때는 거창한 취미를 만들기보다, 5분 심호흡이나 가벼운 환기처럼 작고 부담 없는 행동부터 하나씩 시도해보는 것이 도움이 돼요.',
    });
  } else {
    // Rule 2: Static / Resting recharge (Sleep, Media, Music)
    const passiveCount = reliefs.filter((r) => ['SLEEP', 'MEDIA', 'MUSIC'].includes(r)).length;
    if (passiveCount >= 2) {
      points.push({
        id: 'obs-passive',
        tag: '휴식 패턴 관찰',
        title: '에너지를 비축하는 정적인 충전을 주로 활용해요',
        description: '지친 하루 끝에 자극을 줄이고 조용히 혼자 머무는 시간을 잘 챙기고 계시네요. 다만 누워있는 시간이 길어질 땐 5분간 가벼운 기지개나 햇볕 쬐기를 더해주면 몸의 회복 속도가 빨라져요.',
      });
    }

    // Rule 3: Expressive / Active relief (Exercise, Talk, Writing, Cleaning)
    const activeCount = reliefs.filter((r) => ['EXERCISE', 'TALK', 'WRITING', 'CLEANING'].includes(r)).length;
    if (activeCount >= 2) {
      points.push({
        id: 'obs-active',
        tag: '환기 패턴 관찰',
        title: '몸을 움직이거나 감정을 밖으로 표출하며 정리해요',
        description: '말이나 글, 신체 활동을 통해 마음속 찌꺼기를 능동적으로 털어내는 건강한 습관을 갖고 계시네요. 생각의 순환을 돕는 훌륭한 해소 루틴입니다.',
      });
    }

    // Rule 4: Instant dopamine relief (Food, Shopping, Game)
    const impulsiveCount = reliefs.filter((r) => ['FOOD', 'SHOPPING', 'GAME_HOBBY'].includes(r)).length;
    if (impulsiveCount >= 2 && points.length < 2) {
      points.push({
        id: 'obs-reward',
        tag: '기분 전환 관찰',
        title: '즉각적인 즐거움과 보상으로 기분을 환기해요',
        description: '좋아하는 맛과 취미, 소비로 기분을 빠르게 북돋우는 방법을 알고 계시네요. 단기적인 환기 효과가 뛰어나지만, 과부하를 막기 위해 일상의 잔잔한 쉼과 병행하면 더 좋습니다.',
      });
    }
  }

  // Rule 5: Future & Performance burden (Academic, Work, Future, Finance)
  const futureBurdenCount = causes.filter((c) => ['ACADEMIC', 'WORK', 'FUTURE', 'FINANCE'].includes(c)).length;
  if (futureBurdenCount >= 2) {
    points.push({
      id: 'obs-future',
      tag: '원인 분포 관찰',
      title: '미래의 목표와 성취에 대한 책임감이 크게 자리해요',
      description: '앞날을 잘 준비하고 싶은 마음이 큰 만큼, 현재의 긴장감도 높아져 있을 수 있어요. 먼 미래의 불안 대신 오늘 내가 끝낸 작은 일 하나를 인정해 주는 연습이 필요해요.',
    });
  }

  // Rule 6: Interpersonal / Social fatigue (Relationship, Family, SNS)
  const socialBurdenCount = causes.filter((c) => ['RELATIONSHIP', 'FAMILY_LOVE', 'SNS'].includes(c)).length;
  if (socialBurdenCount >= 2 && points.length < 3) {
    points.push({
      id: 'obs-social',
      tag: '관계 피로 관찰',
      title: '주변과의 관계 및 타인의 시선에서 오는 에너지가 커요',
      description: '타인을 배려하고 주변을 살피는 과정에서 심리적 에너지가 소모되었을 가능성이 커요. 타인의 기대와 나의 감정 사이에 적당한 안전 거리를 두어보세요.',
    });
  }

  // Fallback if less than 1 point
  if (points.length === 0) {
    points.push({
      id: 'obs-default',
      tag: '자기이해 관찰',
      title: '나의 마음에 귀 기울이는 소중한 첫걸음이에요',
      description: '내가 겪는 스트레스의 요인과 해소 방식을 명확히 마주하는 것만으로도 막연했던 마음에 여유 공간이 생기기 시작해요.',
    });
  }

  return points.slice(0, 3);
}

export function generateTips(causes: string[], reliefs: string[]): StressTip[] {
  const tips: StressTip[] = [];

  // Tip based on Future / Academic / Work
  if (causes.includes('ACADEMIC') || causes.includes('WORK') || causes.includes('FUTURE')) {
    tips.push({
      id: 'tip-boundary',
      icon: '⏳',
      title: '하루 30분, 온전한 고민 셧다운',
      description: '잠들기 30분 전에는 할 일 목록이나 미래 계획 생각을 잠시 덮어두세요. 오늘 하루 성실히 버텨낸 내 뇌에게 완전한 퇴근 시간을 선물해 주세요.',
    });
  }

  // Tip based on SNS
  if (causes.includes('SNS')) {
    tips.push({
      id: 'tip-sns',
      icon: '📵',
      title: '침대 위 스마트폰 거리두기',
      description: '누워서 무의식적으로 SNS 피드를 넘기는 대신, 손이 닿지 않는 곳에 폰을 두고 5분간 눈을 감아보세요. 타인의 하이라이트와 나의 일상을 비교하지 않는 쉼이 생겨요.',
    });
  }

  // Tip based on Relationship / Family
  if (causes.includes('RELATIONSHIP') || causes.includes('FAMILY_LOVE')) {
    tips.push({
      id: 'tip-space',
      icon: '🌿',
      title: '감정 분리선 긋기',
      description: '상대방의 부정적인 기분이나 날 선 말을 내 탓으로 돌리지 마세요. 상대의 감정은 상대의 몫이고, 내 마음의 평화는 내가 지킬 수 있습니다.',
    });
  }

  // Tip based on Finance
  if (causes.includes('FINANCE')) {
    tips.push({
      id: 'tip-finance',
      icon: '📝',
      title: '막연한 불안을 구체적인 숫자로 적어보기',
      description: '돈에 대한 불안은 머릿속에 머물 때 가장 커집니다. 고정 지출과 통제 가능한 지출을 노트에 객관적으로 적어보면 통제감이 회복돼요.',
    });
  }

  // Tip based on Health
  if (causes.includes('HEALTH')) {
    tips.push({
      id: 'tip-health',
      icon: '💧',
      title: '따뜻한 물 한 잔과 복식 호흡',
      description: '몸이 피로할 때는 아침에 미온수 한 잔을 천천히 마시고 어깨를 으쓱 내려보세요. 신체 감각을 부드럽게 이완하는 것만으로도 긴장이 풀립니다.',
    });
  }

  // Tip based on Relief method - NONE
  if (reliefs.includes('NONE')) {
    tips.push({
      id: 'tip-micro-walk',
      icon: '👟',
      title: '목적지 없는 10분 산책',
      description: '거창한 스트레스 해소법이 없어도 괜찮아요. 이어폰을 빼고 편한 신발을 신은 채 동네 한 바퀴를 천천히 걸어보는 작은 행동부터 시작해 보세요.',
    });
  }

  // Relief method: Writing
  if (reliefs.includes('WRITING')) {
    tips.push({
      id: 'tip-brain-dump',
      icon: '✍️',
      title: '감정 뇌 배출(Brain Dump)',
      description: '문장 완성을 신경 쓰지 말고, 떠오르는 불편한 단어들을 종이에 거침없이 쏟아낸 뒤 가볍게 찢어버려 보세요. 마음의 체기가 쑥 내려갑니다.',
    });
  }

  // Universal fallback tips
  const generalTips: StressTip[] = [
    {
      id: 'tip-478',
      icon: '🌬️',
      title: '4-7-8 이완 호흡법',
      description: '4초간 코로 들이마시고, 7초간 숨을 멈춘 뒤, 8초간 입으로 천천히 내쉬어 보세요. 3번만 반복해도 부교감 신경이 활성화되어 긴장이 누그러집니다.',
    },
    {
      id: 'tip-gratitude',
      icon: '✨',
      title: '오늘의 소소한 발견 3가지',
      description: '맛있었던 커피, 기분 좋은 날씨처럼 오늘 스쳐 지나간 사소하게 좋았던 일 3가지를 떠올려 보세요. 마음의 시선이 안정으로 옮겨갑니다.',
    },
    {
      id: 'tip-pause',
      icon: '☕',
      title: '1분간 감각에만 집중하기',
      description: '따뜻한 찻잔의 온도, 바깥 바람의 소리 등 지금 이 순간 오감으로 느껴지는 감각 하나에만 온전히 주의를 기울여 보세요.',
    },
  ];

  for (const gTip of generalTips) {
    if (tips.length >= 4) break;
    if (!tips.some((t) => t.id === gTip.id)) {
      tips.push(gTip);
    }
  }

  return tips.slice(0, 4);
}
