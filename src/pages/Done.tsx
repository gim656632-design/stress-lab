import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCcw } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Character } from '../components/Character';
import { useSurvey } from '../store';

export const Done: React.FC = () => {
  const navigate = useNavigate();
  const { resetSurvey } = useSurvey();

  const handleRestart = () => {
    resetSurvey();
    navigate('/');
  };

  return (
    <Layout>
      <div className="flex-1 flex flex-col justify-between py-6 sm:py-10 animate-fade-in text-center">
        {/* Title & Description */}
        <div className="pt-4">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-lavender-100 text-charcoal text-xs font-semibold mb-4 border border-lavender/40">
            RESEARCH COMPLETED
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal leading-tight tracking-tight mb-3">
            오늘의 스트레스 연구 완료!
          </h1>
          <p className="text-sm text-charcoal-muted leading-relaxed max-w-[300px] mx-auto">
            나를 조금 더 이해한 오늘,
            <br />
            수고한 나에게 작은 휴식을 선물해 주세요.
          </p>
        </div>

        {/* Floating Flag Researcher Character */}
        <div className="py-8 sm:py-12 flex flex-col items-center justify-center relative">
          <div className="absolute w-44 h-44 rounded-full bg-lavender/25 blur-2xl pointer-events-none" />

          <Character
            pose="done"
            size="xl"
            floating={true}
            bubble="수고 많으셨어요!"
            className="z-10"
          />
        </div>

        {/* Restart Button */}
        <div className="w-full flex flex-col items-center gap-3 pt-4">
          <Button
            size="lg"
            fullWidth
            onClick={handleRestart}
            leftIcon={RotateCcw}
            className="shadow-cta font-bold"
          >
            처음으로 돌아가기
          </Button>

          <p className="text-[11px] text-charcoal-light tracking-wider font-medium">
            언제든 다시 돌아와 나의 스트레스를 점검해볼 수 있어요.
          </p>
        </div>
      </div>
    </Layout>
  );
};
