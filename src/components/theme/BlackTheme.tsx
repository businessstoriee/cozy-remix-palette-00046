import React from 'react';
import { cn } from '@/lib/utils';

interface BlackThemeProps {
  children: React.ReactNode;
  variant?: 'solid' | 'gradient' | 'glass';
  intensity?: 'light' | 'medium' | 'dark' | 'void';
  className?: string;
  glow?: boolean;
  border?: boolean;
}

/**
 * BlackTheme - Consistent black theme component for various elements
 * 
 * Usage:
 * <BlackTheme variant="glass" intensity="dark" glow>
 *   <YourContent />
 * </BlackTheme>
 */
export const BlackTheme: React.FC<BlackThemeProps> = ({
  children,
  variant = 'solid',
  intensity = 'dark',
  className,
  glow = false,
  border = false
}) => {
  const baseStyles = "transition-all duration-300";
  
  const variantStyles = {
    solid: {
      light: "bg-slate-900/80 dark:bg-black/80",
      medium: "bg-slate-950/90 dark:bg-black/90",
      dark: "bg-slate-950 dark:bg-black",
      void: "bg-black"
    },
    gradient: {
      light: "bg-gradient-to-br from-slate-900/80 via-slate-950/80 to-black/80 dark:from-black/80 dark:via-black/90 dark:to-black",
      medium: "bg-gradient-to-br from-slate-950/90 via-black/90 to-slate-900/90 dark:from-black/90 dark:via-black dark:to-black/90",
      dark: "bg-gradient-to-br from-slate-950 via-black to-slate-900 dark:from-black dark:via-black/95 dark:to-black",
      void: "bg-gradient-to-br from-black via-black/98 to-black"
    },
    glass: {
      light: "bg-black/20 dark:bg-black/30 backdrop-blur-md",
      medium: "bg-black/40 dark:bg-black/50 backdrop-blur-lg",
      dark: "bg-black/60 dark:bg-black/70 backdrop-blur-xl",
      void: "bg-black/80 dark:bg-black/90 backdrop-blur-2xl"
    }
  };

  const borderStyles = border 
    ? "border border-white/10 dark:border-white/5" 
    : "";

  const glowStyles = glow
    ? "shadow-[0_0_40px_rgba(0,0,0,0.8)] dark:shadow-[0_0_60px_rgba(0,0,0,0.9)]"
    : "";

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant][intensity],
        borderStyles,
        glowStyles,
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * BlackThemeCard - Pre-styled card with black theme
 */
export const BlackThemeCard: React.FC<BlackThemeProps & { hover?: boolean }> = ({
  children,
  variant = 'gradient',
  intensity = 'dark',
  className,
  glow = true,
  border = true,
  hover = true
}) => {
  return (
    <BlackTheme
      variant={variant}
      intensity={intensity}
      glow={glow}
      border={border}
      className={cn(
        "rounded-xl p-6",
        hover && "hover:scale-[1.02] hover:shadow-2xl",
        className
      )}
    >
      {children}
    </BlackTheme>
  );
};

/**
 * BlackThemeButton - Pre-styled button with black theme
 */
export const BlackThemeButton: React.FC<
  BlackThemeProps & {
    onClick?: () => void;
    disabled?: boolean;
  }
> = ({
  children,
  variant = 'solid',
  intensity = 'dark',
  className,
  onClick,
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-6 py-3 rounded-lg font-medium text-white",
        "transition-all duration-300",
        "hover:scale-105 active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variant === 'solid' && intensity === 'dark' && "bg-black hover:bg-slate-900",
        variant === 'solid' && intensity === 'medium' && "bg-slate-950 hover:bg-slate-900",
        variant === 'gradient' && "bg-gradient-to-r from-black via-slate-900 to-black hover:from-slate-900 hover:to-slate-900",
        variant === 'glass' && "bg-black/60 backdrop-blur-lg border border-white/10",
        className
      )}
    >
      {children}
    </button>
  );
};

/**
 * BlackThemeText - Pre-styled text with appropriate contrast
 */
export const BlackThemeText: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'muted';
  className?: string;
}> = ({ children, variant = 'primary', className }) => {
  const textStyles = {
    primary: "text-white",
    secondary: "text-gray-200",
    muted: "text-gray-400"
  };

  return (
    <div className={cn(textStyles[variant], className)}>
      {children}
    </div>
  );
};

export default BlackTheme;
