import React, { useState, useEffect } from 'react';
import { GreetingFormData, EventType } from '@/types/greeting';
import { cn } from '@/lib/utils';
import BackgroundWrapper from './BackgroundWrapper';
import BorderContainer from './BorderContainer';
import EmojisLayer from './EmojisLayer';
import EventHeader from './EventHeader';
import GreetingTexts from './GreetingTexts';
import EnhancedMediaGallery from './EnhancedMediaGallery';
import SenderSection from './SenderSection';
import { Lock, DoorOpen } from 'lucide-react';
import BackgroundRenderer from '@/components/greeting/customization/BackgroundCustomizer/BackgroundRenderer';
import { BackgroundSettings } from '@/types/background';

interface InteractiveRevealProps {
  greetingData: GreetingFormData;
  selectedEvent: EventType | null;
  frameStyle?: string;
  mediaAnimation?: string;
  className?: string;
}

const InteractiveReveal: React.FC<InteractiveRevealProps> = ({
  greetingData,
  selectedEvent,
  frameStyle,
  mediaAnimation,
  className,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const revealType = greetingData.interactiveReveal?.revealType || 'flip';
  const coverBg = greetingData.interactiveReveal?.coverBackground;

  if (!greetingData.interactiveReveal?.enabled) {
    return null;
  }

  // Convert coverBackground settings to BackgroundSettings format for BackgroundRenderer
  const getCoverBackgroundSettings = (): BackgroundSettings | undefined => {
    if (!coverBg) return undefined;

    const bgSettings: BackgroundSettings = {
      enabled: true,
      color: coverBg.color || 'hsl(var(--primary))',
      gradient: {
        enabled: coverBg.type === 'gradient' && !!coverBg.gradient?.enabled,
        colors: coverBg.gradient?.colors || ['hsl(var(--primary))', 'hsl(340 75% 55%)'],
        direction: coverBg.gradient?.direction || '135deg'
      },
      image: coverBg.type === 'image' ? coverBg.image : undefined,
      imageOpacity: coverBg.imageOpacity ? coverBg.imageOpacity * 100 : 100,
      animation: {
        enabled: !!coverBg.animation?.enabled,
        type: coverBg.animation?.type || 'bubbles',
        speed: coverBg.animation?.speed || 5,
        intensity: (coverBg.animation?.intensity || 5) * 10,
        options: {} // coverBackground type doesn't support custom animation options
      },
      pattern: {
        enabled: !!coverBg.pattern?.enabled,
        type: coverBg.pattern?.type || 'dots',
        opacity: (coverBg.pattern?.opacity || 0.1) * 100
      }
    };

    return bgSettings;
  };

  const handleReveal = () => {
    if (!isRevealed) {
      setIsRevealed(true);
    }
  };

  const getRevealAnimationClass = () => {
    if (!isRevealed) return '';
    
    switch (revealType) {
      case 'flip':
        return 'rotateY(180deg) scale(0.8)';
      case 'swipe-up':
        return 'translateY(-120%) scale(0.95)';
      case 'swipe-down':
        return 'translateY(120%) scale(0.95)';
      case 'swipe-left':
        return 'translateX(-120%) scale(0.95)';
      case 'swipe-right':
        return 'translateX(120%) scale(0.95)';
      case 'door':
        return 'rotateY(110deg) translateX(-50%)';
      case 'lock':
        return 'scale(0.1) rotate(720deg)';
      case 'vanish':
        return 'scale(0.1) rotate(360deg) translateY(-50%)';
      case 'zoom':
        return 'scale(3) rotate(15deg)';
      case 'curtain':
        return 'scaleY(0) translateY(-100%)';
      default:
        return '';
    }
  };


  return (
    <div className={cn('relative w-full', className)} style={{ perspective: '1000px' }}>
      <div
        className="relative w-full min-h-screen md:min-h-[600px] transition-all duration-700"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front Cover with Messages */}
        <div
          className={cn(
            'absolute inset-0 w-full min-h-screen md:min-h-[600px] cursor-pointer overflow-hidden',
            'transition-all duration-1000 ease-in-out',
            isRevealed && 'pointer-events-none'
          )}
          style={{
            backfaceVisibility: 'hidden',
            transform: getRevealAnimationClass(),
            opacity: isRevealed ? 0 : 1,
          }}
          onClick={handleReveal}
        >
          {/* Use BackgroundRenderer for proper animation support */}
          <BackgroundRenderer 
            settings={getCoverBackgroundSettings()} 
            className="absolute inset-0"
          >
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen md:min-h-[600px] p-8 space-y-6">
            {/* Cover Messages with Enhanced Animations */}
            {greetingData.interactiveReveal.backContent?.texts?.map((text, index) => {
              const getTextAnimation = (animation: string) => {
                switch (animation) {
                  case 'fade':
                    return 'animate-fade-in';
                  case 'slide':
                    return 'animate-slide-up';
                  case 'zoom':
                    return 'animate-scale-in';
                  case 'bounce':
                    return 'animate-bounce';
                  default:
                    return 'animate-fade-in';
                }
              };

              return (
                <div
                  key={text.id}
                  className={cn(
                    'w-full max-w-2xl',
                    getTextAnimation(text.animation),
                    text.continuousAnimation && 'animate-pulse'
                  )}
                  style={{
                    fontSize: text.style.fontSize,
                    fontWeight: text.style.fontWeight,
                    color: text.style.color,
                    textAlign: text.style.textAlign,
                    fontFamily: text.style.fontFamily,
                    fontStyle: text.style.fontStyle,
                    textTransform: text.style.textTransform,
                    letterSpacing: text.style.letterSpacing,
                    lineHeight: text.style.lineHeight,
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  {text.content}
                </div>
              );
            })}
            </div>
          </BackgroundRenderer>

          {/* Reveal indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm text-foreground/70 animate-pulse bg-card/80 dark:bg-card/80 border border-border px-4 py-2 rounded-full backdrop-blur-sm z-20">
            {revealType === 'lock' ? (
              <Lock className="h-4 w-4" />
            ) : revealType === 'door' ? (
              <DoorOpen className="h-4 w-4" />
            ) : null}
            <span>Click to reveal the greeting →</span>
          </div>
        </div>

        {/* Main Greeting Content - Revealed */}
        <div
          className={cn(
            'w-full min-h-screen md:min-h-[600px]',
            'transition-all duration-1000 ease-out',
            !isRevealed && 'hidden',
            isRevealed && 'opacity-100 scale-100 animate-scale-in'
          )}
        >
          <BackgroundWrapper greetingData={greetingData} className="h-full min-h-screen md:min-h-[600px] pb-22 sm:pb-26">
            <BorderContainer greetingData={greetingData} selectedEvent={selectedEvent}>
              <div className="space-y-8 animate-fade-in p-4">
                <EventHeader greetingData={greetingData} selectedEvent={selectedEvent} />
                <GreetingTexts greetingData={greetingData} />
                <EnhancedMediaGallery
                  greetingData={greetingData}
                  frameStyle={frameStyle || greetingData.frameStyle}
                  mediaAnimation={mediaAnimation || greetingData.mediaAnimation}
                />
                <SenderSection greetingData={greetingData} />
              </div>
            </BorderContainer>
            <EmojisLayer emojis={greetingData.emojis} />
          </BackgroundWrapper>
        </div>
      </div>
    </div>
  );
};

export default InteractiveReveal;