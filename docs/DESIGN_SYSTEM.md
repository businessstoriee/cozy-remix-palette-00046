# Design System Documentation

## Overview
Beautiful Greeting Cards uses a comprehensive, unified design system built on semantic tokens, consistent animations, and reusable components.

## Core Principles

### 1. Semantic Tokens (NOT Direct Colors)
✅ **ALWAYS USE**: `bg-background`, `text-foreground`, `border-border`
❌ **NEVER USE**: `bg-white`, `text-black`, `bg-gray-500`

### 2. Consistent Animations
All animations use CSS variables for timing:
- `--transition-fast`: 150ms (hover states)
- `--transition-base`: 200ms (default)
- `--transition-smooth`: 300ms (complex animations)
- `--transition-slow`: 500ms (page transitions)
- `--transition-spring`: 500ms (bouncy effects)

### 3. Component Reusability
Use pre-built components from `src/components/theme/UnifiedTheme.tsx`

## Color System

### Base Colors (HSL Format)
```css
:root {
  --background: 220 15% 97%;
  --foreground: 220 10% 15%;
  --primary: 262 83% 58%;
  --primary-foreground: 0 0% 100%;
  --secondary: 220 14% 96%;
  --muted: 220 14% 96%;
  --accent: 220 14% 96%;
  --border: 220 13% 91%;
}

.dark {
  --background: 0 0% 3%;
  --foreground: 0 0% 98%;
  --primary: 263 70% 60%;
  /* ... */
}
```

### Event Theme Colors
```css
--birthday: 340 75% 55%;
--anniversary: 0 70% 50%;
--christmas: 120 40% 45%;
--diwali: 45 90% 55%;
--wedding: 340 65% 50%;
/* ... 20+ event colors */
```

### Usage in Components
```tsx
// ✅ CORRECT
<div className="bg-primary text-primary-foreground" />
<div className="bg-background border border-border" />

// ❌ WRONG
<div className="bg-purple-500 text-white" />
<div className="bg-white border border-gray-200" />
```

## Typography Scale

```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
```

## Spacing Scale (8px baseline)

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
```

## Shadow System

```css
--shadow-sm: 0 1px 2px 0 hsl(var(--primary) / 0.05);
--shadow-base: 0 1px 3px 0 hsl(var(--primary) / 0.1);
--shadow-md: 0 4px 6px -1px hsl(var(--primary) / 0.1);
--shadow-lg: 0 10px 15px -3px hsl(var(--primary) / 0.15);
--shadow-xl: 0 20px 25px -5px hsl(var(--primary) / 0.2);
```

## Animation Classes

### Hover Effects
```css
.hover-lift {
  transition: transform var(--transition-smooth), 
              box-shadow var(--transition-smooth);
}
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.hover-scale:hover {
  transform: scale(1.05);
}

.hover-glow:hover {
  box-shadow: 0 0 30px hsl(var(--primary) / 0.5);
}

.hover-rotate:hover {
  transform: rotate(5deg) scale(1.05);
}
```

### Entrance Animations
```css
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-slide-in {
  animation: slideIn 0.8s ease-out forwards;
}

.animate-zoom-in {
  animation: zoomIn 0.5s ease-out forwards;
}

.animate-bounce-in {
  animation: bounceIn 0.6s ease-out forwards;
}
```

## Unified Theme Components

### PageContainer
```tsx
import { PageContainer } from '@/components/theme/UnifiedTheme';

<PageContainer>
  {/* Your page content */}
</PageContainer>
```

### GlassCard
```tsx
import { GlassCard } from '@/components/theme/UnifiedTheme';

<GlassCard hover>
  {/* Card content */}
</GlassCard>
```

### AnimatedButton
```tsx
import { AnimatedButton } from '@/components/theme/UnifiedTheme';

<AnimatedButton 
  variant="primary" 
  size="lg"
  icon={<Sparkles />}
>
  Click Me
</AnimatedButton>
```

### FeatureCard
```tsx
import { FeatureCard } from '@/components/theme/UnifiedTheme';

<FeatureCard
  icon="🎨"
  title="Custom Designs"
  description="Create beautiful greeting cards"
/>
```

### GradientText
```tsx
import { GradientText } from '@/components/theme/UnifiedTheme';

<GradientText 
  from="from-primary" 
  via="via-purple-500" 
  to="to-pink-500"
>
  Amazing Title
</GradientText>
```

## Event Theme Cards

```tsx
// Automatically styled based on event type
<Card className="card-birthday">
  {/* Birthday themed card */}
</Card>

<Card className="card-christmas">
  {/* Christmas themed card */}
</Card>

<Card className="card-diwali">
  {/* Diwali themed card */}
</Card>
```

## Z-Index Scale

```css
--z-dropdown: 1000;
--z-sticky: 1020;
--z-fixed: 1030;
--z-modal-backdrop: 1040;
--z-modal: 1050;
--z-popover: 1060;
--z-tooltip: 1070;
```

## Responsive Design

### Breakpoints
```tsx
// Mobile First Approach
<div className="
  px-4              // Mobile: 16px padding
  sm:px-6           // Small: 24px padding
  md:px-8           // Medium: 32px padding
  lg:px-12          // Large: 48px padding
  xl:px-16          // X-Large: 64px padding
" />
```

### Container
```tsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  {/* Centered content with responsive padding */}
</div>
```

## Best Practices

### ✅ DO:
- Use semantic color tokens
- Follow 8px spacing scale
- Use CSS variable transitions
- Apply consistent hover effects
- Maintain heading hierarchy
- Use event theme classes
- Implement lazy loading
- Add proper alt attributes

### ❌ DON'T:
- Use arbitrary colors (e.g., `bg-[#ff0000]`)
- Hardcode timing values
- Mix light/dark mode colors
- Create custom shadows
- Skip hover states
- Use inline styles for theming
- Forget responsive classes

## Component Examples

### Button Variants
```tsx
// Primary Button
<Button className="bg-primary text-primary-foreground hover-scale">
  Primary Action
</Button>

// Secondary Button
<Button className="bg-secondary text-secondary-foreground hover-lift">
  Secondary Action
</Button>

// Outline Button
<Button className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
  Outline Action
</Button>
```

### Card Variants
```tsx
// Glass Card
<Card className="bg-card/80 backdrop-blur-xl border border-border/50 hover-glow">
  {/* Content */}
</Card>

// Event Card
<Card className="card-birthday hover-lift">
  {/* Birthday content */}
</Card>

// Feature Card
<Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-0 hover-rotate">
  {/* Feature content */}
</Card>
```

## Dark Mode Support

All colors automatically adapt to dark mode using CSS variables:

```tsx
// Automatically works in both modes
<div className="bg-background text-foreground border border-border">
  This text is dark in light mode, light in dark mode
</div>
```

## Accessibility

### Focus States
```css
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-primary 
         focus:ring-offset-2 transition-all duration-200;
}
```

### Reduced Motion
```tsx
import { useReduceMotion } from '@/components/performance/PerformanceOptimizer';

const prefersReducedMotion = useReduceMotion();
const animationClass = prefersReducedMotion ? '' : 'animate-bounce-in';
```

## Summary

✅ **Implemented**:
- Semantic color tokens (HSL)
- Consistent animation timings
- Event theme colors (20+)
- Unified component library
- Responsive design system
- Dark mode support
- Z-index scale
- Typography scale
- Spacing scale (8px baseline)
- Shadow system
- Hover effect library

✅ **Benefits**:
- Maintainable codebase
- Consistent user experience
- Easy theme customization
- Automatic dark mode
- Better performance
- Reduced bundle size
- Faster development

🎨 **Result**: Beautiful, consistent, accessible design system!
