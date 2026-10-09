import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Progress } from '../components/Progress';
import { Button } from '../components/Button';
import { SelectCard } from '../components/SelectCard';
import { Character } from '../components/Character';
import { RELIEF_METHODS } from '../data/options';
import { useSurvey } from '../store';
import { scrollToTopInstant } from '../utils/scroll';

export const Relief: React.FC = () => {
  const navigate = useNavigate();
  const { state, toggleRelief, setReliefsOther } = useSurvey();
  const isOtherSelected = state.reliefs.includes('other');
  const canProceed = state.reliefs.length > 0;

  return (
    <Layout>
      <div className="flex-1 flex flex-col justify-between animate-fade-in">
        <div>
          <Progress currentStep={3} totalSteps={3} stepName="해소 습관 확인" />

          {/* Question Header */}
          <div className="flex items-start justify-between gap-4 mt-4 mb-5">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-charcoal leading-snug">
                스트레스가 쌓이면,
                <br />
                어떻게 풀고 있나요?
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-1.5">
                평소 나만의 해소 방법을 선택해 주세요.
              </p>
            </div>

            <div className="shrink-0 pt-1">
              <Character pose="relief" size="sm" bubble="나만의 쉼표는?" />
            </div>
          </div>

          {/* Relief Methods Grid: 10 items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            {RELIEF_METHODS.map((item) => (
              <SelectCard
                key={item.id}
                title={item.title}
                icon={item.icon}
                selected={state.reliefs.includes(item.id)}
                onClick={() => toggleRelief(item.id)}
              />
            ))}
          </div>

          {/* Custom text field if '기타' is selected */}
          {isOtherSelected && (
            <div className="mt-2 mb-4 p-3.5 bg-white rounded-2xl border border-lavender/60 shadow-soft animate-fade-in">
              <label
                htmlFor="reliefs-other-input"
                className="block text-xs font-medium text-charcoal-muted mb-1.5"
              >
                직접 입력 (100자 이내)
              </label>
              <input
                id="reliefs-other-input"
                type="text"
                maxLength={100}
                value={state.reliefsOther}
                onChange={(e) => setReliefsOther(e.target.value)}
                placeholder="평소 활용하는 나만의 해소 방법을 적어주세요."
                className="w-full px-3.5 py-2.5 text-sm bg-cream/50 rounded-xl border border-borderLine focus:border-lavender focus:ring-2 focus:ring-lavender/30 focus:outline-none transition-all"
              />
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="pt-6 pb-2 flex items-center justify-between gap-4 mt-auto">
          <Button
            variant="secondary"
            onClick={() => {
              scrollToTopInstant();
              navigate('/survey/causes');
            }}
            leftIcon={ArrowLeft}
            className="px-5"
          >
            이전
          </Button>

          <Button
            variant="primary"
            onClick={() => {
              scrollToTopInstant();
              navigate('/survey/report');
            }}
            rightIcon={ArrowRight}
            disabled={!canProceed}
            className="flex-1 max-w-[240px] shadow-cta"
          >
            결과 확인하기
          </Button>
        </div>
      </div>
    </Layout>
  );
};
