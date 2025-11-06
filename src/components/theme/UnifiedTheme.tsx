import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Unified Theme System - Consistent animations, transitions, and styling
 */

interface UnifiedThemeProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PageContainer - Consistent page wrapper with animations
 */
export const PageContainer: React.FC<UnifiedThemeProps> = ({ children, className }) => {
  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/20",
      "animate-fade-in",
      className
    )}>
      {children}
    </div>
  );
};

/**
 * ContentSection - Consistent content section with spacing
 */
export const ContentSection: React.FC<UnifiedThemeProps> = ({ children, className }) => {
  return (
    <section className={cn(
      "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16",
      className
    )}>
      {children}
    </section>
  );
};

/**
 * GlassCard - Glassmorphism card with consistent styling
 */
export const GlassCard: React.FC<UnifiedThemeProps & { hover?: boolean }> = ({ 
  children, 
  className,
  hover = true 
}) => {
  return (
    <div className={cn(
      "bg-card/80 backdrop-blur-xl border border-border/50",
      "rounded-xl shadow-lg",
      "transition-all duration-[var(--transition-smooth)]",
      hover && "hover-lift hover-glow",
      className
    )}>
      {children}
    </div>
  );
};

/**
 * AnimatedButton - Consistent button with animations
 */
interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className,
  ...props
}) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      className={cn(
        "relative overflow-hidden rounded-lg font-semibold",
        "transition-all duration-[var(--transition-smooth)]",
        "hover-scale shadow-md hover:shadow-xl hover:shadow-primary/30",
        "group",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon && <span className="group-hover:rotate-12 transition-transform duration-[var(--transition-smooth)]">{icon}</span>}
        {children}
      </span>
      
      {/* Shine effect */}
      <span className="absolute top-0 left-1/2 w-20 h-full bg-white/30 -skew-x-12 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-700" />
    </button>
  );
};

/**
 * FeatureCard - Consistent feature display card
 */
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className
}) => {
  return (
    <GlassCard className={cn("p-6 group", className)}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-[var(--transition-smooth)]">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-[var(--transition-base)]">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </GlassCard>
  );
};

/**
 * FloatingParticles - Consistent animated background particles
 */
export const FloatingParticles: React.FC<{ count?: number }> = ({ count = 20 }) => {
  return (
    <div className="fixed inset-0 -z-40 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 20 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
};

/**
 * GradientText - Consistent gradient text effect
 */
interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className,
  from = "from-primary",
  via = "via-purple-500",
  to = "to-pink-500"
}) => {
  return (
    <span className={cn(
      "bg-gradient-to-r bg-clip-text text-transparent",
      from,
      via,
      to,
      className
    )}>
      {children}
    </span>
  );
};

export default {
  PageContainer,
  ContentSection,
  GlassCard,
  AnimatedButton,
  FeatureCard,
  FloatingParticles,
  GradientText
};
