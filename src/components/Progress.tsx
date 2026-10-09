import React from 'react';

export interface ProgressProps {
  currentStep: number;
  totalSteps: number;
  stepName?: string;
  showStepCount?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  currentStep,
  totalSteps,
  stepName,
  showStepCount = true,
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((currentStep / totalSteps) * 100)));

  return (
    <div className="w-full px-1 py-2">
      <div className="flex items-center justify-between text-xs text-charcoal-muted mb-1.5 font-medium">
        <span>{stepName || '진행률'}</span>
        {showStepCount && (
          <span className="font-semibold text-charcoal tracking-wide">
            {currentStep} <span className="text-charcoal-light font-normal">/ {totalSteps}</span>
          </span>
        )}
      </div>
      <div className="w-full h-1.5 bg-borderLine/70 rounded-full overflow-hidden">
        <div
          className="h-full bg-lavender rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
