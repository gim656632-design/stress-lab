import { describe, it } from 'node:test';
import assert from 'node:assert';
import { generateRecommendations } from '../src/lib/recommend.js';

describe('STRESS LAB 추천 로직 검증 (최소 5개 조합 테스트)', () => {
  it('조합 1: INFP + 인간관계 + 혼자만의 시간', () => {
    const res = generateRecommendations({
      mbti: 'INFP',
      causes: ['relationships'],
      reliefs: ['alone_time'],
    });

    assert.ok(res.mbtiSummary.includes('자유롭고 조용한'), 'INFP 성향 요약이 반영되어야 함');
    assert.strictEqual(res.cards[0].title, '내 감정의 이름 먼저 붙여보기');
    assert.ok(res.cards[0].description.includes('혼자만의 시간'), '현재 해소법 발전 멘트 포함');
    assert.strictEqual(res.cards.length, 3, '카드 3장 제공');
    assert.strictEqual(res.actions.length, 3, '행동 3가지 제공');
    assert.strictEqual(res.professionalNote, undefined, '전문적 도움 미선택');
  });

  it('조합 2: ESTJ + 직장 및 업무 + 운동 및 산책', () => {
    const res = generateRecommendations({
      mbti: 'ESTJ',
      causes: ['work'],
      reliefs: ['exercise_walk'],
    });

    assert.ok(res.mbtiSummary.includes('단계별로 계획'), 'ESTJ 성향 요약이 반영되어야 함');
    assert.strictEqual(res.cards[0].title, '오늘의 "퇴근 기준" 명확히 하기');
    assert.strictEqual(res.cards[1].title, '업무와 일상의 분리 리추얼');
    assert.strictEqual(res.cards.length, 3);
    assert.strictEqual(res.actions.length, 3);
  });

  it('조합 3: ISTP + 학업 및 시험 + 게임 및 취미', () => {
    const res = generateRecommendations({
      mbti: 'ISTP',
      causes: ['academics'],
      reliefs: ['game_hobby'],
    });

    assert.ok(res.mbtiSummary.includes('자유롭고 조용한'), 'ISTP 성향 반영');
    assert.strictEqual(res.cards[0].title, '공부 덩어리를 잘게 쪼개기');
    assert.ok(res.cards[1].description.includes('신체 감각을 깨워보는'), '운동 미선택 시 새로운 방법 제안');
    assert.strictEqual(res.cards.length, 3);
  });

  it('조합 4: ENFJ + 건강 + 전문적인 도움 받기', () => {
    const res = generateRecommendations({
      mbti: 'ENFJ',
      causes: ['health'],
      reliefs: ['professional_help'],
    });

    assert.ok(res.mbtiSummary.includes('활동적으로 정리'), 'ENFJ 성향 반영');
    assert.strictEqual(res.cards[0].title, '몸이 보내는 신호 기록하기');
    assert.ok(res.professionalNote, '전문적 도움 선택 시 긍정 지지 멘트 제공');
    assert.ok(res.professionalNote.includes('전문적인 도움'), '전문 도움 문구 확인');
    assert.strictEqual(res.cards.length, 3);
  });

  it('조합 5: ENTP + SNS·비교심리 + 맛있는 음식', () => {
    const res = generateRecommendations({
      mbti: 'ENTP',
      causes: ['social_media'],
      reliefs: ['delicious_food'],
    });

    assert.ok(res.mbtiSummary.includes('유연하게 반응'), 'ENTP 성향 반영');
    assert.strictEqual(res.cards[0].title, '스크린타임과 알림 다이어트');
    assert.strictEqual(res.cards[1].title, '타인의 하이라이트 대신 내 일상 음미하기');
    assert.strictEqual(res.cards.length, 3);
  });
});
