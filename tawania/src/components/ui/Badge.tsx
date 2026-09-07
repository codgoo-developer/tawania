import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'accent' | 'outline' | 'neutral' | 'success' | 'warning';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center gap-1.5 font-semibold transition-colors';

  const sizeClasses = {
    sm: 'text-[11px] px-2.5 py-0.5 rounded-full',
    md: 'text-xs px-3 py-1 rounded-full',
  };

  const variantClasses = {
    primary: 'bg-[#0B4F26]/10 text-[#0B4F26] border border-[#0B4F26]/20',
    accent: 'bg-[#F59E0B]/15 text-[#8E7033] border border-[#F59E0B]/30',
    outline: 'bg-transparent text-[#0F172A] border border-[#0F172A]/15',
    neutral: 'bg-[#F7F8F6] text-[#68736F] border border-[#0F172A]/10',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
  };

  return (
    <span
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
