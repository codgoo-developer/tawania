import React from 'react';
import { Link } from 'react-router-dom';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external,
  leftIcon,
  rightIcon,
  isLoading,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2";
  
  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 rounded-lg gap-1.5 min-h-[34px]",
    md: "text-sm px-5 py-2.5 rounded-lg gap-2 min-h-[42px]",
    lg: "text-base px-7 py-3.5 rounded-xl gap-2.5 min-h-[48px]",
  };

  const variantStyles = {
    primary: "bg-gradient-to-br from-[#0B4F26] to-[#10B981] text-white hover:brightness-110 shadow-sm hover:shadow active:scale-[0.99] focus-visible:outline-[#0B4F26]",
    secondary: "bg-[#E8F7F0] text-[#0B4F26] hover:bg-[#DCEDE7] active:scale-[0.99] focus-visible:outline-[#0B4F26]",
    accent: "bg-[#F59E0B] text-[#0B4F26] hover:bg-[#BE994E] shadow-sm active:scale-[0.99] font-semibold focus-visible:outline-[#F59E0B]",
    outline: "border border-[#0B4F26]/20 text-[#17211E] bg-white hover:bg-[#F7F8F6] hover:border-[#0B4F26]/40 active:scale-[0.99] focus-visible:outline-[#0B4F26]",
    ghost: "text-[#17211E] hover:bg-[#0B4F26]/5 active:scale-[0.99] focus-visible:outline-[#0B4F26]",
    dark: "bg-gradient-to-br from-[#0B4F26] to-[#0B211C] text-white hover:brightness-110 shadow-sm hover:shadow active:scale-[0.99] focus-visible:outline-[#0B4F26]"
  };

  const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {leftIcon}
          <span>{children}</span>
          {rightIcon}
        </a>
      );
    }
    return (
      <Link to={href} className={classes}>
        {leftIcon}
        <span>{children}</span>
        {rightIcon}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : leftIcon}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};

export const Badge: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'neutral' | 'outline' | 'success';
  className?: string;
  size?: 'sm' | 'md';
}> = ({ children, variant = 'primary', size = 'md', className = '' }) => {
  const styles = {
    primary: "bg-[#0B4F26]/10 text-[#0B4F26] border border-[#0B4F26]/20",
    accent: "bg-[#F59E0B]/15 text-[#8E7032] border border-[#F59E0B]/30",
    neutral: "bg-[#0B4F26]/5 text-[#68736F] border border-[#0B4F26]/10",
    outline: "bg-white text-[#17211E] border border-[#0B4F26]/15",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200"
  };

  const sizeClasses = size === 'sm' ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-xs font-medium";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full ${sizeClasses} ${styles[variant]} whitespace-nowrap ${className}`}>
      {children}
    </span>
  );
};
