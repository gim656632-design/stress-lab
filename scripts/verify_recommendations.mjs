import assert from 'node:assert';
import createJiti from 'jiti';

const jiti = createJiti(import.meta.url);
const { generateRecommendations } = jiti('../src/lib/recommend.ts');

console.log('🧪 STRESS LAB 추천 로직 검증 시작 (5개 조합)...\n');

const testCases = [
  {
    name: '조합 1: INFP + 인간관계 + 혼자만의 시간',
    input: {
      mbti: 'INFP',
      causes: ['relationships'],
      reliefs: ['alone_time'],
    },
    asserts: (res) => {
      assert.ok(res.mbtiSummary.includes('자유롭고 조용한'), 'INFP 성향 요약 불일치');
      assert.strictEqual(res.cards[0].title, '내 감정의 이름 먼저 붙여보기');
      assert.ok(res.cards[0].description.includes('혼자만의 시간'), '현재 해소법(혼자만의 시간) 발전 설명 미포함');
      assert.strictEqual(res.cards.length, 3, '카드 개수 3장이어야 함');
      assert.strictEqual(res.actions.length, 3, '행동 개수 3가지여야 함');
      assert.strictEqual(res.professionalNote, undefined, '전문적 도움 미선택');
    },
  },
  {
    name: '조합 2: ESTJ + 직장 및 업무 + 운동 및 산책',
    input: {
      mbti: 'ESTJ',
      causes: ['work'],
      reliefs: ['exercise_walk'],
    },
    asserts: (res) => {
      assert.ok(res.mbtiSummary.includes('단계별로 계획'), 'ESTJ 성향 요약 불일치');
      assert.strictEqual(res.cards[0].title, '오늘의 "퇴근 기준" 명확히 하기');
      assert.strictEqual(res.cards[1].title, '업무와 일상의 분리 리추얼');
      assert.strictEqual(res.cards.length, 3);
      assert.strictEqual(res.actions.length, 3);
    },
  },
  {
    name: '조합 3: ISTP + 학업 및 시험 + 게임 및 취미 (운동 미선택)',
    input: {
      mbti: 'ISTP',
      causes: ['academics'],
      reliefs: ['game_hobby'],
    },
    asserts: (res) => {
      assert.ok(res.mbtiSummary.includes('자유롭고 조용한'), 'ISTP 성향 요약 불일치');
      assert.strictEqual(res.cards[0].title, '공부 덩어리를 잘게 쪼개기');
      assert.ok(res.cards[1].description.includes('신체 감각을 깨워보는'), '운동 미선택 시 신체 감각 새로운 방법 제안 미포함');
      assert.strictEqual(res.cards.length, 3);
      assert.strictEqual(res.actions.length, 3);
    },
  },
  {
    name: '조합 4: ENFJ + 건강 + 전문적인 도움 받기',
    input: {
      mbti: 'ENFJ',
      causes: ['health'],
      reliefs: ['professional_help'],
    },
    asserts: (res) => {
      assert.ok(res.mbtiSummary.includes('활동적으로 정리'), 'ENFJ 성향 요약 불일치');
      assert.strictEqual(res.cards[0].title, '몸이 보내는 신호 기록하기');
      assert.ok(res.professionalNote, '전문적 도움 선택 시 지지 문구 누락');
      assert.ok(res.professionalNote.includes('전문적인 도움'), '전문적 도움 문구 불일치');
      assert.strictEqual(res.cards.length, 3);
    },
  },
  {
    name: '조합 5: ENTP + SNS·비교심리 + 맛있는 음식',
    input: {
      mbti: 'ENTP',
      causes: ['social_media'],
      reliefs: ['delicious_food'],
    },
    asserts: (res) => {
      assert.ok(res.mbtiSummary.includes('유연하게 반응'), 'ENTP 성향 요약 불일치');
      assert.strictEqual(res.cards[0].title, '스크린타임과 알림 다이어트');
      assert.strictEqual(res.cards[1].title, '타인의 하이라이트 대신 내 일상 음미하기');
      assert.strictEqual(res.cards.length, 3);
      assert.strictEqual(res.actions.length, 3);
    },
  },
];

let passed = 0;
for (const tc of testCases) {
  try {
    const res = generateRecommendations(tc.input);
    tc.asserts(res);
    console.log(`✅ [PASS] ${tc.name}`);
    console.log(`   - MBTI 톤: "${res.mbtiSummary.slice(0, 30)}..."`);
    console.log(`   - 카드 1: [${res.cards[0].categoryLabel}] ${res.cards[0].title}`);
    console.log(`   - 카드 2: [${res.cards[1].categoryLabel}] ${res.cards[1].title}`);
    console.log(`   - 행동 1: ${res.actions[0].text}`);
    passed++;
  } catch (err) {
    console.error(`❌ [FAIL] ${tc.name}:`, err.message);
  }
}

console.log(`\n🎉 테스트 완료: ${passed}/${testCases.length} 통과!`);
if (passed !== testCases.length) {
  process.exit(1);
}
