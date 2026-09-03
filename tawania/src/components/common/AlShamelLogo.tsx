import React from 'react';

interface AlShamelLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: string;
  variant?: 'full' | 'icon-only' | 'horizontal';
}

const sizeHeights: Record<string, string> = {
  xs: 'h-8',
  sm: 'h-10',
  md: 'h-12',
  lg: 'h-16',
  xl: 'h-24',
};

export const AlShamelLogo: React.FC<AlShamelLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'horizontal',
}) => {
  return (
    <div className={`inline-flex items-center shrink-0 group ${className}`}>
      <img
        src="/logo.png"
        alt="شعار تعاونية الشامل - AlShamel Cooperative Logo"
        className={`${sizeHeights[size]} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
        draggable={false}
      />
    </div>
  );
};
