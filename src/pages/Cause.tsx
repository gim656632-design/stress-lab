import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Progress } from '../components/Progress';
import { Button } from '../components/Button';
import { SelectCard } from '../components/SelectCard';
import { Character } from '../components/Character';
import { STRESS_CAUSES } from '../data/options';
import { useSurvey } from '../store';

export const Cause: React.FC = () => {
  const navigate = useNavigate();
  const { state, toggleCause, setCausesOther } = useSurvey();
  const isOtherSelected = state.causes.includes('other');
  const canProceed = state.causes.length > 0;

  return (
    <Layout>
      <div className="flex-1 flex flex-col justify-between animate-fade-in">
        <div>
          <Progress currentStep={2} totalSteps={3} stepName="스트레스 원인 파악" />

          {/* Question Header */}
          <div className="flex items-start justify-between gap-4 mt-4 mb-5">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-charcoal leading-snug">
                요즘, 무엇이
                <br />
                당신을 지치게 하나요?
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-1.5">
                해당하는 항목을 모두 선택해 주세요.
              </p>
            </div>

            <div className="shrink-0 pt-1">
              <Character pose="cause" size="sm" bubble="원인을 관찰해요" />
            </div>
          </div>

          {/* Causes Cards Grid: 12px+ spacing for mobile, 16px for desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            {STRESS_CAUSES.map((item) => (
              <SelectCard
                key={item.id}
                title={item.title}
                icon={item.icon}
                selected={state.causes.includes(item.id)}
                onClick={() => toggleCause(item.id)}
              />
            ))}
          </div>

          {/* Custom text field if '기타' is selected */}
          {isOtherSelected && (
            <div className="mt-2 mb-4 p-3.5 bg-white rounded-2xl border border-lavender/60 shadow-soft animate-fade-in">
              <label
                htmlFor="causes-other-input"
                className="block text-xs font-medium text-charcoal-muted mb-1.5"
              >
                직접 입력 (100자 이내)
              </label>
              <input
                id="causes-other-input"
                type="text"
                maxLength={100}
                value={state.causesOther}
                onChange={(e) => setCausesOther(e.target.value)}
                placeholder="나를 지치게 하는 다른 원인을 적어주세요."
                className="w-full px-3.5 py-2.5 text-sm bg-cream/50 rounded-xl border border-borderLine focus:border-lavender focus:ring-2 focus:ring-lavender/30 focus:outline-none transition-all"
              />
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="pt-6 pb-2 flex items-center justify-between gap-4 mt-auto">
          <Button
            variant="secondary"
            onClick={() => navigate('/survey/mbti')}
            leftIcon={ArrowLeft}
            className="px-5"
          >
            이전
          </Button>

          <Button
            variant="primary"
            onClick={() => navigate('/survey/relief')}
            rightIcon={ArrowRight}
            disabled={!canProceed}
            className="flex-1 max-w-[240px] shadow-cta"
          >
            다음 단계
          </Button>
        </div>
      </div>
    </Layout>
  );
};
