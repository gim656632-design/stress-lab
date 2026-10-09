import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, FlaskConical } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Character } from '../components/Character';
import { useSurvey } from '../store';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { resetSurvey } = useSurvey();

  const handleStart = () => {
    resetSurvey();
    navigate('/survey/mbti');
  };

  return (
    <Layout>
      <div className="flex-1 flex flex-col justify-between py-4 sm:py-8 animate-fade-in text-center">
        {/* Main Header / Intro */}
        <div className="flex flex-col items-center pt-2 sm:pt-4">
          {/* Sub slogan pill */}
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-lavender-100/90 text-charcoal text-xs font-medium mb-5 tracking-tight border border-lavender/30">
            나를 지치게 하는 순간부터, 나를 회복시키는 방법까지.
          </div>

          {/* Main Title with '취향' highlight */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal leading-tight tracking-tight mb-3">
            스트레스에도
            <br />
            <span className="relative inline-block mt-1">
              <span className="relative z-10 text-charcoal">취향</span>
              <span className="absolute bottom-1 left-0 right-0 h-2.5 bg-lavender/60 rounded-full -z-0" />
            </span>
            이 있다면?
          </h1>

          {/* Subtext description */}
          <p className="text-sm text-charcoal-muted leading-relaxed max-w-[320px] mx-auto mt-2">
            몇 가지 질문으로 나의 스트레스 습관을 알아보고,
            <br className="hidden sm:inline" />
            {' '}일상에서 실천할 수 있는 회복 방법을 찾아보세요.
          </p>
        </div>

        {/* Character Visual Area with Floating Effect & subtle props */}
        <div className="py-8 sm:py-10 flex flex-col items-center justify-center relative">
          <div className="absolute w-48 h-48 rounded-full bg-lavender/25 blur-2xl pointer-events-none" />

          {/* Decorative note prop */}
          <div
            className="absolute left-6 sm:left-12 top-10 w-9 h-9 rounded-xl bg-white border border-borderLine shadow-soft flex items-center justify-center text-lavender-700 animate-floating motion-reduce:animate-none opacity-90 pointer-events-none"
            aria-hidden="true"
          >
            <BookOpen className="w-4 h-4 stroke-[1.75]" />
          </div>

          {/* Decorative flask prop */}
          <div
            className="absolute right-6 sm:right-12 bottom-8 w-9 h-9 rounded-xl bg-white border border-borderLine shadow-soft flex items-center justify-center text-mutedPurple animate-floating motion-reduce:animate-none opacity-90 pointer-events-none"
            style={{ animationDelay: '2s' }}
            aria-hidden="true"
          >
            <FlaskConical className="w-4 h-4 stroke-[1.75]" />
          </div>

          <Character
            pose="main"
            size="xl"
            floating={true}
            bubble="함께 연구해볼까요?"
            className="z-10"
          />
        </div>

        {/* CTA Button Area */}
        <div className="w-full flex flex-col items-center gap-3 pt-2">
          <Button
            size="lg"
            fullWidth
            onClick={handleStart}
            rightIcon={ArrowRight}
            className="shadow-cta font-bold text-base"
          >
            나의 스트레스 알아보기
          </Button>

          <p className="text-[11px] text-charcoal-light tracking-wider font-medium mt-1">
            소요 시간 약 2~3분 · 부담 없는 객관식 질문
          </p>
        </div>
      </div>
    </Layout>
  );
};
