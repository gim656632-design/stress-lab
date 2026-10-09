import React from 'react';
import mainImg from '../assets/character/main.png';
import mainImg2x from '../assets/character/main@2x.png';
import mbtiImg from '../assets/character/mbti.png';
import mbtiImg2x from '../assets/character/mbti@2x.png';
import causeImg from '../assets/character/cause.png';
import causeImg2x from '../assets/character/cause@2x.png';
import reliefImg from '../assets/character/relief.png';
import reliefImg2x from '../assets/character/relief@2x.png';
import reportImg from '../assets/character/report.png';
import reportImg2x from '../assets/character/report@2x.png';
import contactImg from '../assets/character/contact.png';
import contactImg2x from '../assets/character/contact@2x.png';
import doneImg from '../assets/character/done.png';
import doneImg2x from '../assets/character/done@2x.png';

export type CharacterPose =
  | 'main' // 클립보드를 든 모습
  | 'mbti' // 고민하는 표정
  | 'cause' // 돋보기
  | 'relief' // 플라스크
  | 'report' // 하트 또는 노트
  | 'contact' // 하트
  | 'done'; // STRESS LAB 깃발

export interface CharacterProps {
  pose: CharacterPose;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  floating?: boolean; // 메인·완료 페이지에만 적용
  bubble?: string; // 말풍선 텍스트 (설문 우측 상단 보조용)
  className?: string;
  alt?: string;
}

const poseLabels: Record<CharacterPose, string> = {
  main: '클립보드를 든 구름 연구원',
  mbti: '고민하는 표정의 구름 연구원',
  cause: '돋보기를 든 구름 연구원',
  relief: '플라스크를 든 구름 연구원',
  report: '연구 노트를 든 구름 연구원',
  contact: '하트를 든 구름 연구원',
  done: 'STRESS LAB 깃발을 든 구름 연구원',
};

const poseAssets: Record<CharacterPose, { src: string; src2x: string }> = {
  main: { src: mainImg, src2x: mainImg2x },
  mbti: { src: mbtiImg, src2x: mbtiImg2x },
  cause: { src: causeImg, src2x: causeImg2x },
  relief: { src: reliefImg, src2x: reliefImg2x },
  report: { src: reportImg, src2x: reportImg2x },
  contact: { src: contactImg, src2x: contactImg2x },
  done: { src: doneImg, src2x: doneImg2x },
};

const sizeClasses = {
  sm: 'w-16 h-16 sm:w-20 sm:h-20',
  md: 'w-24 h-24 sm:w-28 sm:h-28',
  lg: 'w-36 h-36 sm:w-44 sm:h-44',
  xl: 'w-48 h-48 sm:w-56 sm:h-56',
};

export const Character: React.FC<CharacterProps> = ({
  pose,
  size = 'md',
  floating = false,
  bubble,
  className = '',
  alt,
}) => {
  const asset = poseAssets[pose] || poseAssets.main;

  return (
    <div
      className={`
        relative inline-flex flex-col items-center select-none
        ${floating ? 'animate-floating motion-reduce:animate-none' : ''}
        ${className}
      `}
    >
      {/* Optional Speech Bubble */}
      {bubble && (
        <div className="mb-1.5 px-3 py-1 bg-white border border-borderLine rounded-full shadow-soft text-[11px] font-medium text-charcoal tracking-tight whitespace-nowrap animate-fade-in">
          {bubble}
        </div>
      )}

      {/* High Quality Character Asset with @2x Retina support */}
      <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
        <img
          src={asset.src}
          srcSet={`${asset.src} 1x, ${asset.src2x} 2x`}
          alt={alt || poseLabels[pose]}
          className="w-full h-full object-contain pointer-events-none drop-shadow-sm transition-transform duration-200"
          loading="eager"
          draggable={false}
        />
      </div>
    </div>
  );
};

