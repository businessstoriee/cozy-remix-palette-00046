import React, { useState } from 'react';
import { GreetingFormData, EventType } from '@/types/greeting';
import { cn } from '@/lib/utils';
import BackgroundWrapper from './BackgroundWrapper';
import BorderContainer from './BorderContainer';
import EmojisLayer from './EmojisLayer';
import EventHeader from './EventHeader';
import GreetingTexts from './GreetingTexts';
import EnhancedMediaGallery from './EnhancedMediaGallery';
import SenderSection from './SenderSection';

interface FlipCardProps {
  greetingData: GreetingFormData;
  selectedEvent: EventType | null;
  frameStyle?: string;
  mediaAnimation?: string;
  className?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({
  greetingData,
  selectedEvent,
  frameStyle,
  mediaAnimation,
  className,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!greetingData.flipCard?.enabled) {
    return null;
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={cn('relative w-full h-full', className)} style={{ perspective: '1000px' }}>
      <div
        className={cn(
          'relative w-full h-full transition-transform duration-700 cursor-pointer',
          'transform-style-3d'
        )}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
        onClick={handleFlip}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <BackgroundWrapper greetingData={greetingData} className="h-full pb-22 sm:pb-26">
            <BorderContainer greetingData={greetingData} selectedEvent={selectedEvent}>
              <div className="space-y-8">
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
          
          {/* Click to flip indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/60 animate-pulse">
            Click to flip →
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <BackgroundWrapper greetingData={greetingData} className="h-full pb-22 sm:pb-26">
            <BorderContainer greetingData={greetingData} selectedEvent={selectedEvent}>
              <div className="space-y-8 flex flex-col items-center justify-center min-h-[400px] p-8">
                {/* Back Header */}
                {greetingData.flipCard.backContent?.headerText && (
                  <h2 className="text-3xl font-bold text-center text-foreground mb-6">
                    {greetingData.flipCard.backContent.headerText}
                  </h2>
                )}

                {/* Back Texts */}
                {greetingData.flipCard.backContent?.texts?.map((text) => (
                  <div
                    key={text.id}
                    className={cn('w-full max-w-2xl animate-fade-in')}
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
                    }}
                  >
                    {text.content}
                  </div>
                ))}
              </div>
            </BorderContainer>
          </BackgroundWrapper>

          {/* Click to flip back indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/60 animate-pulse">
            ← Click to flip back
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
