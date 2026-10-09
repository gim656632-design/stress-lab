import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckSquare, Square, Info } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Chip } from '../components/Chip';
import { Character } from '../components/Character';
import { useSurvey } from '../store';
import { generateRecommendations } from '../lib/recommend';
import { STRESS_CAUSES, RELIEF_METHODS } from '../data/options';

export const Report: React.FC = () => {
  const navigate = useNavigate();
  const { state, getMbtiString } = useSurvey();
  const mbti = getMbtiString() || 'INFP';

  const [checkedActions, setCheckedActions] = useState<Record<string, boolean>>({});

  const recommendation = generateRecommendations({
    mbti,
    causes: state.causes,
    reliefs: state.reliefs,
  });

  const causeTitles = state.causes.map((id) => {
    if (id === 'other' && state.causesOther) {
      return `기타 (${state.causesOther})`;
    }
    const item = STRESS_CAUSES.find((c) => c.id === id);
    return item ? item.title : id;
  });

  const reliefTitles = state.reliefs.map((id) => {
    if (id === 'other' && state.reliefsOther) {
      return `기타 (${state.reliefsOther})`;
    }
    const item = RELIEF_METHODS.find((r) => r.id === id);
    return item ? item.title : id;
  });

  const toggleActionCheck = (actionId: string) => {
    setCheckedActions((prev) => ({
      ...prev,
      [actionId]: !prev[actionId],
    }));
  };

  return (
    <Layout>
      <div className="flex-1 flex flex-col space-y-8 animate-fade-in pb-4">
        {/* Report Top Header: Magazine style */}
        <div className="text-center pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lavender-100 text-charcoal text-xs font-semibold mb-3 border border-lavender/40">
            RESEARCH REPORT
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">
            당신의 스트레스 리포트
          </h1>
          <p className="text-sm text-charcoal-muted mt-1">
            조금 더 나를 이해하는 시간.
          </p>

          <div className="mt-4 flex justify-center">
            <Character pose="report" size="md" bubble="리포트를 준비했어요" />
          </div>
        </div>

        {/* 3 Summary Cards: 01 MY MBTI / 02 MY STRESS / 03 MY RELIEF */}
        <div className="space-y-3.5">
          {/* 01 MY MBTI */}
          <div className="p-4 sm:p-5 bg-white rounded-2xl border border-borderLine shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-lavender-600 tracking-wider">
                01 MY MBTI
              </span>
              <span className="text-sm font-extrabold text-charcoal bg-lavender-100 px-2.5 py-0.5 rounded-lg border border-lavender/30">
                {mbti}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              {recommendation.mbtiSummary}
            </p>
          </div>

          {/* 02 MY STRESS */}
          <div className="p-4 sm:p-5 bg-white rounded-2xl border border-borderLine shadow-soft">
            <div className="text-xs font-bold text-lavender-600 tracking-wider mb-2.5">
              02 MY STRESS
            </div>
            <div className="flex flex-wrap gap-2">
              {causeTitles.length > 0 ? (
                causeTitles.map((title, idx) => (
                  <Chip key={idx} label={title} variant="pink" size="md" />
                ))
              ) : (
                <span className="text-xs text-charcoal-muted">선택 항목 없음</span>
              )}
            </div>
          </div>

          {/* 03 MY RELIEF */}
          <div className="p-4 sm:p-5 bg-white rounded-2xl border border-borderLine shadow-soft">
            <div className="text-xs font-bold text-lavender-600 tracking-wider mb-2.5">
              03 MY RELIEF
            </div>
            <div className="flex flex-wrap gap-2">
              {reliefTitles.length > 0 ? (
                reliefTitles.map((title, idx) => (
                  <Chip key={idx} label={title} variant="blue" size="md" />
                ))
              ) : (
                <span className="text-xs text-charcoal-muted">선택 항목 없음</span>
              )}
            </div>
          </div>
        </div>

        {/* 04 FOR YOU — Prescription Cards */}
        <div className="pt-2">
          <div className="mb-4">
            <div className="text-xs font-bold text-lavender-600 tracking-wider">
              04 FOR YOU
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-charcoal mt-1">
              당신을 위한 스트레스 처방전
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
              지금 당신에게 필요한 작은 쉼표를 찾아봤어요.
            </p>
          </div>

          {/* 3 Action Cards staggered */}
          <div className="space-y-3.5">
            {recommendation.cards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 bg-white rounded-2xl border border-borderLine shadow-soft transition-all duration-200 hover:border-lavender/60 animate-fade-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-lavender-100 flex items-center justify-center shrink-0 text-lavender-700">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-semibold text-lavender-600 tracking-tight block">
                        {card.categoryLabel}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-charcoal mt-0.5 mb-1 leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 05 — Things you can do right now (3 actions) */}
        <div className="p-5 bg-lavender-50/70 rounded-2xl border border-lavender/30">
          <div className="text-xs font-bold text-lavender-600 tracking-wider mb-1">
            05 지금 할 수 있는 행동
          </div>
          <p className="text-xs text-charcoal-muted mb-3.5">
            해보고 싶은 작은 행동이 있다면 체크해 보세요.
          </p>

          <div className="space-y-2.5">
            {recommendation.actions.map((act) => {
              const isChecked = Boolean(checkedActions[act.id]);
              return (
                <button
                  type="button"
                  key={act.id}
                  onClick={() => toggleActionCheck(act.id)}
                  className={`
                    w-full text-left p-3 rounded-xl border transition-all duration-200
                    flex items-center gap-3 select-none text-xs sm:text-sm
                    ${
                      isChecked
                        ? 'bg-white border-lavender text-charcoal font-medium shadow-soft'
                        : 'bg-white/80 border-borderLine text-charcoal-muted hover:bg-white'
                    }
                  `}
                >
                  <div className="shrink-0 text-lavender-600">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 stroke-[2]" />
                    ) : (
                      <Square className="w-4 h-4 stroke-[1.5] text-charcoal-light" />
                    )}
                  </div>
                  <span className={isChecked ? 'text-charcoal' : 'text-charcoal-muted'}>
                    {act.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Medical disclaimer & bottom reassurance */}
        <div className="text-center pt-2 px-2">
          <p className="text-sm font-semibold text-charcoal leading-relaxed mb-3">
            나를 이해하는 것부터,
            <br />
            회복은 시작될 수 있어요.
          </p>

          <div className="flex items-start gap-2 p-3 bg-white/70 rounded-xl border border-borderLine text-left text-[11px] text-charcoal-muted leading-relaxed">
            <Info className="w-4 h-4 text-charcoal-light shrink-0 mt-0.5" />
            <span>
              이 결과는 자기이해를 돕기 위한 일반적인 정보이며, 의학적 진단이나 치료를 대신하지 않습니다. 필요하다면 전문가 상담도 하나의 방법이 될 수 있어요.
            </span>
          </div>
        </div>

        {/* CTA Button to Contact Step */}
        <div className="pt-4">
          <Button
            size="lg"
            fullWidth
            onClick={() => navigate('/survey/contact')}
            rightIcon={ArrowRight}
            className="shadow-cta"
          >
            안내 및 리포트 보관하기
          </Button>
        </div>
      </div>
    </Layout>
  );
};
