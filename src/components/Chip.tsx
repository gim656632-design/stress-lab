import React from 'react';

export interface ChipProps {
  label: string;
  variant?: 'lavender' | 'pink' | 'blue' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'lavender',
  size = 'md',
  className = '',
}) => {
  const variantStyles = {
    lavender: 'bg-lavender-100 text-charcoal border-lavender/50',
    pink: 'bg-[#F9EEF2] text-charcoal border-[#E8C5D0]/60',
    blue: 'bg-[#EEF5F9] text-charcoal border-[#DCE9F2]',
    neutral: 'bg-white text-charcoal-muted border-borderLine',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1',
    md: 'text-xs sm:text-sm px-3.5 py-1.5',
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full border
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {label}
    </span>
  );
};
