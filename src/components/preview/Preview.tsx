import React, { useRef, useState } from 'react';
import { GreetingFormData, EventType } from '@/types/greeting';
import { useLanguageTranslation } from '@/components/language/useLanguageTranslation';
import BackgroundWrapper from './BackgroundWrapper';
import BorderContainer from './BorderContainer';
import EmojisLayer from './EmojisLayer';
import EventHeader from './EventHeader';
import GreetingTexts from './GreetingTexts';
import EnhancedMediaGallery from './EnhancedMediaGallery';
import SenderSection from './SenderSection';
import AudioAutoPlay from './AudioAutoPlay';
import ShareNameInput from './ShareNameInput';
import FlipCard from './FlipCard';
import InteractiveReveal from './InteractiveReveal';
import ConfettiBurst from './ConfettiBurst';
import { cn } from '@/lib/utils';

interface PreviewProps {
  greetingData: GreetingFormData;
  selectedEvent: EventType | null;
  frameStyle?: string;
  mediaAnimation?: string;
  className?: string;
  showShareInput?: boolean;
  greetingSlug?: string;
}

const Preview = ({
  greetingData,
  selectedEvent,
  frameStyle,
  mediaAnimation,
  className,
  showShareInput = false,
  greetingSlug,
}: PreviewProps) => {
  const { translate } = useLanguageTranslation();

  // If interactive reveal is enabled, use InteractiveReveal component
  if (greetingData.interactiveReveal?.enabled) {
    return (
      <>
        <InteractiveReveal
          greetingData={greetingData}
          selectedEvent={selectedEvent}
          frameStyle={frameStyle}
          mediaAnimation={mediaAnimation}
          className={className}
        />
        
        {/* Confetti Burst Effect */}
        <ConfettiBurst
          enabled={greetingData.confetti?.enabled}
          colors={greetingData.confetti?.colors}
          density={greetingData.confetti?.density}
          duration={greetingData.confetti?.duration}
          mode={greetingData.confetti?.mode}
        />

        {/* Auto-playing audio for shared greetings */}
        <AudioAutoPlay 
          audioUrl={greetingData.audioUrl} 
          autoPlay={true}
        />

        {/* Share Name Input - only show in shared view */}
        {showShareInput && (
          <ShareNameInput 
            greetingData={greetingData} 
            greetingSlug={greetingSlug}
          />
        )}
      </>
    );
  }

  // If flip card is enabled, use the FlipCard component
  if (greetingData.flipCard?.enabled) {
    return (
      <>
        <FlipCard
          greetingData={greetingData}
          selectedEvent={selectedEvent}
          frameStyle={frameStyle}
          mediaAnimation={mediaAnimation}
          className={className}
        />
        
        {/* Confetti Burst Effect */}
        <ConfettiBurst
          enabled={greetingData.confetti?.enabled}
          colors={greetingData.confetti?.colors}
          density={greetingData.confetti?.density}
          duration={greetingData.confetti?.duration}
          mode={greetingData.confetti?.mode}
        />

        {/* Auto-playing audio for shared greetings */}
        <AudioAutoPlay 
          audioUrl={greetingData.audioUrl} 
          autoPlay={true}
        />

        {/* Share Name Input - only show in shared view */}
        {showShareInput && (
          <ShareNameInput 
            greetingData={greetingData} 
            greetingSlug={greetingSlug}
          />
        )}
      </>
    );
  }


  // Default view mode
  return (
    <>
     <BackgroundWrapper greetingData={greetingData} className={cn('preview-theme-static pb-22 sm:pb-26', className)}>
          <BorderContainer
            greetingData={greetingData}
            selectedEvent={selectedEvent}
          >
            <div className="space-y-8">
              <EventHeader
                greetingData={greetingData}
                selectedEvent={selectedEvent}
              />
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

          {/* Confetti Burst Effect */}
          <ConfettiBurst
            enabled={greetingData.confetti?.enabled}
            colors={greetingData.confetti?.colors}
            density={greetingData.confetti?.density}
            duration={greetingData.confetti?.duration}
            mode={greetingData.confetti?.mode}
          />

          {/* Auto-playing audio for shared greetings */}
          <AudioAutoPlay 
            audioUrl={greetingData.audioUrl} 
            autoPlay={true}
          />
      </BackgroundWrapper>

      {/* Share Name Input - only show in shared view */}
      {showShareInput && (
        <ShareNameInput 
          greetingData={greetingData} 
          greetingSlug={greetingSlug}
        />
      )}
    </>
  );
};

export default React.memo(Preview);