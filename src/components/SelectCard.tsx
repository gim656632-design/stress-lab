import React from 'react';
import { Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SelectCardProps {
  id?: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  selected: boolean;
  onClick: () => void;
  className?: string;
  size?: 'default' | 'compact' | 'mbti';
}

export const SelectCard: React.FC<SelectCardProps> = ({
  title,
  subtitle,
  icon: Icon,
  selected,
  onClick,
  className = '',
  size = 'default',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      role="checkbox"
      aria-checked={selected}
      className={`
        w-full text-left relative flex items-center justify-between
        transition-all duration-200 select-none
        min-h-[52px] rounded-2xl
        border
        focus:outline-none focus:ring-2 focus:ring-lavender focus:ring-offset-1
        ${
          selected
            ? 'bg-lavender-100/80 border-lavender text-charcoal shadow-soft font-medium ring-1 ring-lavender/60'
            : 'bg-white border-borderLine text-charcoal hover:border-charcoal-subtle hover:bg-cream/40 shadow-soft'
        }
        ${size === 'compact' ? 'px-3.5 py-3 text-sm' : 'px-4 py-3.5 text-base'}
        ${className}
      `}
    >
      <div className="flex items-center gap-3 min-w-0 pr-2">
        {Icon && (
          <div
            className={`
              w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors
              ${selected ? 'bg-white/80 text-lavender-700' : 'bg-cream text-charcoal-muted'}
            `}
          >
            <Icon className="w-5 h-5 stroke-[1.5]" />
          </div>
        )}
        <div className="min-w-0">
          <div className="text-sm sm:text-base font-medium truncate">{title}</div>
          {subtitle && (
            <div className="text-xs text-charcoal-muted mt-0.5 leading-snug truncate">
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {/* Check indicator */}
      <div
        className={`
          w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-200
          ${
            selected
              ? 'bg-lavender text-charcoal ring-2 ring-lavender-200'
              : 'border border-borderLine text-transparent'
          }
        `}
      >
        <Check className={`w-3.5 h-3.5 stroke-[2.2] ${selected ? 'block' : 'hidden'}`} />
      </div>
    </button>
  );
};
