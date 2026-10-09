import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Progress } from '../components/Progress';
import { Button } from '../components/Button';
import { Character } from '../components/Character';
import { MBTI_DIMENSIONS } from '../data/options';
import { useSurvey } from '../store';

export const Mbti: React.FC = () => {
  const navigate = useNavigate();
  const { state, setMbtiDimension, getMbtiString, isMbtiComplete } = useSurvey();
  const mbtiResult = getMbtiString();
  const canProceed = isMbtiComplete();

  return (
    <Layout>
      <div className="flex-1 flex flex-col justify-between animate-fade-in">
        {/* Top Progress & Character Section */}
        <div>
          <Progress currentStep={1} totalSteps={3} stepName="기본 성향 알아보기" />

          {/* Question Header with Researcher Assistant */}
          <div className="flex items-start justify-between gap-4 mt-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-charcoal leading-snug">
                당신의 MBTI는
                <br />
                무엇인가요?
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-1.5">
                네 가지 지표를 하나씩 선택해 주세요.
              </p>
            </div>

            {/* Small Researcher Assistant in Top-Right */}
            <div className="shrink-0 pt-1">
              <Character pose="mbti" size="sm" bubble="어떤 성향일까요?" />
            </div>
          </div>

          {/* 4 Rows MBTI Selection Grid */}
          <div className="space-y-3.5 mb-6">
            {MBTI_DIMENSIONS.map((dim) => {
              const currentSelected = state.mbti[dim.key];

              return (
                <div key={dim.key} className="grid grid-cols-2 gap-3">
                  {/* Left Option */}
                  <button
                    type="button"
                    onClick={() => setMbtiDimension(dim.key, dim.left.code)}
                    className={`
                      min-h-[52px] px-4 py-3 rounded-2xl border text-center transition-all duration-200
                      flex items-center justify-center gap-2 select-none
                      ${
                        currentSelected === dim.left.code
                          ? 'bg-lavender text-charcoal font-bold border-lavender shadow-soft ring-2 ring-lavender/40'
                          : 'bg-white text-charcoal border-borderLine hover:border-charcoal-subtle hover:bg-cream/50 shadow-soft'
                      }
                    `}
                  >
                    <span className="text-lg font-extrabold tracking-tight">
                      {dim.left.code}
                    </span>
                    <span className="text-sm font-medium text-charcoal-muted">
                      {dim.left.label}
                    </span>
                  </button>

                  {/* Right Option */}
                  <button
                    type="button"
                    onClick={() => setMbtiDimension(dim.key, dim.right.code)}
                    className={`
                      min-h-[52px] px-4 py-3 rounded-2xl border text-center transition-all duration-200
                      flex items-center justify-center gap-2 select-none
                      ${
                        currentSelected === dim.right.code
                          ? 'bg-lavender text-charcoal font-bold border-lavender shadow-soft ring-2 ring-lavender/40'
                          : 'bg-white text-charcoal border-borderLine hover:border-charcoal-subtle hover:bg-cream/50 shadow-soft'
                      }
                    `}
                  >
                    <span className="text-lg font-extrabold tracking-tight">
                      {dim.right.code}
                    </span>
                    <span className="text-sm font-medium text-charcoal-muted">
                      {dim.right.label}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Real-time MBTI combination indicator */}
          <div className="w-full text-center py-2.5 px-4 rounded-xl bg-white border border-borderLine/80 shadow-soft">
            <span className="text-xs text-charcoal-muted font-medium tracking-wide">
              MY MBTI :{' '}
            </span>
            <span className="text-sm font-bold text-charcoal tracking-widest">
              {mbtiResult ? mbtiResult.padEnd(4, '—') : '————'}
            </span>
          </div>
        </div>

        {/* Navigation Buttons: Previous and Next adequately separated */}
        <div className="pt-8 pb-2 flex items-center justify-between gap-4 mt-auto">
          <Button
            variant="secondary"
            onClick={() => navigate('/')}
            leftIcon={ArrowLeft}
            className="px-5"
          >
            이전
          </Button>

          <Button
            variant="primary"
            onClick={() => navigate('/survey/causes')}
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
