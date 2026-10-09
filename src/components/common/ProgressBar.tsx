import React from 'react';

interface ProgressBarProps {
  currentStep: number; // 2, 3, 4, 5
  totalSteps?: number; // 4
  stepLabel?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps = 4,
  stepLabel,
}) => {
  // 2 -> 25%, 3 -> 50%, 4 -> 75%, 5(결과) -> 100%
  const percent = Math.min(100, Math.max(0, ((currentStep - 1) / totalSteps) * 100));

  return (
    <div className="w-full px-6 pt-5 pb-2">
      <div className="flex items-center justify-between text-xs font-semibold text-ink-600 mb-2">
        <span className="text-ink-900 font-bold tracking-tight">
          {stepLabel || `단계 ${currentStep - 1}`}
        </span>
        <span className="text-ink-600 font-mono">
          {currentStep - 1} / {totalSteps}
        </span>
      </div>
      <div className="w-full h-2 bg-line rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-500 to-lilac-500 rounded-full transition-all duration-400 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
