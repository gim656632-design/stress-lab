import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'md' | 'lg' | 'sm';
  fullWidth?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-lavender focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'min-h-[48px] px-4 py-2 text-xs gap-1.5',
    md: 'min-h-[48px] px-6 py-3 text-sm gap-2',
    lg: 'min-h-[52px] px-7 py-3.5 text-base gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-lavender text-charcoal hover:bg-lavender-500 active:scale-[0.99] shadow-soft font-semibold',
    secondary:
      'bg-white text-charcoal border border-borderLine hover:bg-cream active:scale-[0.99] shadow-soft',
    outline:
      'bg-transparent text-charcoal border border-borderLine hover:bg-white active:scale-[0.99]',
    ghost:
      'bg-transparent text-charcoal-muted hover:text-charcoal hover:bg-black/5 active:scale-[0.99]',
  };

  return (
    <button
      disabled={disabled}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {LeftIcon && <LeftIcon className="w-4 h-4 stroke-[1.75]" />}
      <span>{children}</span>
      {RightIcon && <RightIcon className="w-4 h-4 stroke-[1.75]" />}
    </button>
  );
};
