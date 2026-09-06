import React from 'react';

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  id?: string;
  onClick?: () => void;
}> = ({ children, className = '', hoverEffect = true, id, onClick }) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`bg-white rounded-xl p-6 shadow-xs ${hoverEffect ? 'transition-all duration-300 hover:border-[#0B6B4F]/30 hover:shadow-md hover:-translate-y-0.5' : ''
        } ${className}`}
    >
      {children}
    </div>
  );
};

export const Skeleton: React.FC<{
  className?: string;
  variant?: 'text' | 'rect' | 'circle';
}> = ({ className = '', variant = 'rect' }) => {
  const variantStyles = {
    text: 'h-4 w-full rounded',
    rect: 'h-32 w-full rounded-xl',
    circle: 'w-12 h-12 rounded-full',
  };

  return (
    <div
      className={`animate-pulse bg-[#12332B]/10 ${variantStyles[variant]} ${className}`}
    />
  );
};
