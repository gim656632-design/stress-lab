import React from 'react';

export const SafetyNotice: React.FC = () => {
  return (
    <div className="rounded-card p-5 bg-[#FAFCFF] border border-line/90 shadow-sm my-6 text-left">
      <div className="flex items-center gap-2 mb-2 text-ink-900 font-semibold text-sm">
        <span className="text-base">🛡️</span>
        <span>연구소 안전 안내</span>
      </div>
      <p className="text-xs text-ink-600 leading-relaxed mb-3">
        STRESS LAB은 20대의 일상적인 자기이해와 습관 정리를 돕는 참여형 콘텐츠입니다. 우울증, 불안장애 등 전문적인 의학적 진단이나 심리 치료를 대체할 수 없습니다.
      </p>
      <div className="bg-white rounded-xl p-3 border border-line/60 space-y-1.5 text-[11px] text-ink-600">
        <div className="font-medium text-ink-900 text-xs mb-1">
          마음이 벅차고 혼자 감당하기 어려울 땐 전문가의 도움을 받으세요
        </div>
        <div className="flex justify-between items-center py-0.5">
          <span>• 보건복지부 정신건강위기상담전화</span>
          <a href="tel:15770199" className="font-bold text-sky-500 hover:underline">1577-0199 (24시간)</a>
        </div>
        <div className="flex justify-between items-center py-0.5">
          <span>• 24시간 자살예방 상담전화</span>
          <a href="tel:109" className="font-bold text-sky-500 hover:underline">국번없이 109</a>
        </div>
        <div className="flex justify-between items-center py-0.5">
          <span>• 청소년·청년 상담전화</span>
          <a href="tel:1388" className="font-bold text-sky-500 hover:underline">국번없이 1388</a>
        </div>
      </div>
    </div>
  );
};
