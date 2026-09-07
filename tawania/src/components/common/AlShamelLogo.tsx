import React from 'react';
import { useGovernanceData } from '../../context/GovernanceDataContext';

interface AlShamelLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: string;
  variant?: 'full' | 'icon-only' | 'horizontal' | 'light';
  useLight?: boolean;
  src?: string;
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
  useLight = false,
  src,
}) => {
  let contextLogo: string | undefined;
  try {
    const { contactSettings } = useGovernanceData();
    if (useLight || variant === 'light') {
      contextLogo = contactSettings?.logoLightUrl || '/logoLight.png';
    } else {
      contextLogo = contactSettings?.logoDarkUrl || '/logo.png';
    }
  } catch {
    // Fallback if rendered outside GovernanceDataProvider
  }

  const defaultFallback = useLight || variant === 'light' ? '/logoLight.png' : '/logo.png';
  const logoSrc = src || contextLogo || defaultFallback;

  return (
    <div className={`inline-flex items-center shrink-0 group ${className}`}>
      <img
        src={logoSrc}
        alt="شعار تعاونية الشامل - AlShamel Cooperative Logo"
        className={`${sizeHeights[size]} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
        draggable={false}
      />
    </div>
  );
};
