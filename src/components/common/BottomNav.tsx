import React from 'react';

interface BottomNavProps {
  onPrev?: () => void;
  onNext?: () => void;
  prevLabel?: string;
  nextLabel?: string;
  isNextDisabled?: boolean;
  disabledReason?: string;
  showPrev?: boolean;
  isLoading?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  onPrev,
  onNext,
  prevLabel = '이전',
  nextLabel = '다음',
  isNextDisabled = false,
  disabledReason,
  showPrev = true,
  isLoading = false,
}) => {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-line/60 px-5 pt-3 pb-5 safe-bottom z-30 shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
      {/* Reason hint if disabled */}
      {isNextDisabled && disabledReason && (
        <p className="text-center text-xs text-ink-600 mb-2 transition-opacity duration-200">
          {disabledReason}
        </p>
      )}

      <div className="flex items-center gap-3">
        {showPrev && onPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="min-h-[48px] px-5 rounded-full border border-line bg-white hover:bg-slate-50 text-ink-600 font-medium text-sm transition-all active:scale-95 flex items-center justify-center shrink-0"
          >
            {prevLabel}
          </button>
        )}

        {onNext && (
          <button
            type="button"
            onClick={onNext}
            disabled={isNextDisabled || isLoading}
            className={`min-h-[48px] flex-1 rounded-full font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-soft active:scale-[0.98] ${
              isNextDisabled || isLoading
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none border border-slate-200'
                : 'bg-gradient-to-r from-sky-300 via-[#CBE7FA] to-lilac-300 text-ink-900 hover:shadow-soft-hover hover:brightness-[1.02]'
            }`}
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-ink-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                응답을 정리하고 있어요...
              </span>
            ) : (
              nextLabel
            )}
          </button>
        )}
      </div>
    </div>
  );
};
