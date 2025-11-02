// src/pages/create/Create.tsx
import React, { useEffect, useState, Suspense } from "react";
import { cn } from "@/lib/utils";
import { useCreate } from "./create/useCreate";
import BackButton from "@/components/ui/back-button";
import LanguageSelector from "@/components/language/LanguageSelector";
import CompactFormColumn from "@/components/greeting/form/CompactFormColumn";
import LivePreviewCard from "./create/LivePreviewCard";
import PreviewModal from "./create/PreviewModal";
import { useLocation, useSearchParams } from "react-router-dom";
import { useFirebaseGreetings } from "@/hooks/useFirebaseGreetings";
import { useLanguageTranslation } from '@/components/language/useLanguageTranslation';
import BeautifulGreetingsText from '../components/landingPage/BeautifulGreetingsText'
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FirebaseShareButton from '@/components/share/GenerateShareLink';
import HamburgerButton from '@/components/navigation/HamburgerButton';
import AnimatedSidebar from '@/components/navigation/AnimatedSidebar';
import LoadingSpinner from '@/components/common/LoadingSpinner';


const CreatePage: React.FC = ({ onClick }: { onClick?: () => void }) => {
  const {
    formData,
    selectedEvent,
    customEvent,
    isPreviewOpen,
    setIsPreviewOpen,
    handleInputChange,
    handleMediaChange,
    handleTextChange,
    handlePreviewClick,
    generateShareableURL,
    previewGreeting,
    onCustomEventCreate,
    setFormData,
    setCustomEvent,
    clearAutoSave,
  } = useCreate();

  const { translate } = useLanguageTranslation();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { loadGreeting } = useFirebaseGreetings();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoadingGreeting, setIsLoadingGreeting] = useState(false);

  // Handle editing existing greeting or loading template
  useEffect(() => {
    setIsLoadingGreeting(true);
    const editSlug = searchParams.get('edit');
    if (editSlug) {
      // Load existing greeting data
      loadGreeting(editSlug).then(data => {
        if (data) {
          console.log('Loading existing greeting for editing:', data);
          setFormData(data);
        }
      }).catch(err => {
        console.error('Failed to load greeting for editing:', err);
      });
    } else if (location.state?.templateData) {
      // Load template data
      console.log('Loading template data:', location.state.templateData);
      setFormData(location.state.templateData);
    } else if (location.state?.greetingData) {
      // Load from navigation state
      console.log('Loading greeting from navigation state:', location.state.greetingData);
      setFormData(location.state.greetingData);
    }
    setIsLoadingGreeting(false);
  }, [searchParams, location.state, loadGreeting, setFormData]);

  if (isLoadingGreeting) {
    return <LoadingSpinner message="Loading greeting..." />;
  }

  return (
    <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 ">
<header className=" mx-auto px-2 sm: px-4 py-4 flex items-center justify-between shadow-lg bg-background/80 border-b border-border/50">
 <div className="flex items-center gap-3">
              <HamburgerButton onClick={() => setSidebarOpen(true)} />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Create 
              </h1>
            </div>
            <AnimatedSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <LanguageSelector />
      </header>

      <div className="max-w-6xl mx-auto pt-16">
        <div className="text-center mb-8 animate-fade-in">
           <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className="text-center mb-4 animate-fade-in animate-bounce"
>
      
          <BeautifulGreetingsText text= {translate('Create Your Greeting')} />
           </motion.div>

      {/* Greeting Text */}
      <motion.p
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-muted-foreground text-lg md:text-xl font-semibold hover:text-primary transition-colors duration-300"
      >
       ✨ Design a beautiful, personalized greeting to share with someone special ✨
      </motion.p>
         
        </div>
 
        <div className="grid lg:grid-cols-2 gap-8">
          <CompactFormColumn
            formData={formData}
            selectedEvent={selectedEvent}
            customEvent={customEvent}
            onEventChange={(v) => handleInputChange("eventType", v)}
            onInputChange={(f, v) => handleInputChange(f, v)}
            onTextChange={handleTextChange}
            onMediaChange={handleMediaChange}
            onEmojiChange={(emojis) => setFormData((p: any) => ({ ...p, emojis }))}
            onBackgroundChange={(s) => setFormData((p: any) => ({ ...p, backgroundSettings: s }))}
            onBorderChange={(s) => setFormData((p: any) => ({ ...p, borderSettings: s }))}
            onLayoutChange={(layout) => handleInputChange("layout", layout)}
            onAnimationChange={(anim) => handleInputChange("animationStyle", anim)}
            onFrameStyleChange={(frame) => handleInputChange("frameStyle", frame)}
            onCustomEventCreate={onCustomEventCreate}
            onHeaderTextChange={(headerText) => setFormData((p: any) => ({ ...p, headerText }))}
            onEventNameStyleChange={(eventNameStyle) => setFormData((p: any) => ({ ...p, eventNameStyle }))}
            onEventEmojiSettingsChange={(eventEmojiSettings) => setFormData((p: any) => ({ ...p, eventEmojiSettings }))}
            onPublicToggle={(isPublic) => setFormData((p: any) => ({ ...p, isPublic }))}
            onSenderNameStyleChange={(senderNameStyle) => setFormData((p: any) => ({ ...p, senderNameStyle }))}
            onReceiverNameStyleChange={(receiverNameStyle) => setFormData((p: any) => ({ ...p, receiverNameStyle }))}
            onFlipCardChange={(flipCard) => setFormData((p: any) => ({ ...p, flipCard }))}
            onInteractiveRevealChange={(interactiveReveal) => setFormData((p: any) => ({ ...p, interactiveReveal }))}
            onConfettiChange={(confetti) => setFormData((p: any) => ({ ...p, confetti }))}
          />

          <div className={cn("space-y-6")}>
            <LivePreviewCard 
              formData={formData} 
              selectedEvent={selectedEvent} 
              onOpenPreview={handlePreviewClick} 
              onDataChange={setFormData}
              onClearAutoSave={clearAutoSave}
            />

            {/* Enhanced preview modal with editing capabilities */}
            <PreviewModal 
              isOpen={isPreviewOpen} 
              onClose={() => setIsPreviewOpen(false)} 
              greetingData={formData} 
              selectedEvent={selectedEvent}
              onDataChange={setFormData}
            />
          </div>
        </div>

         {/* Fixed Share Button - Only show when event is selected */}
           {selectedEvent && (
             <div className="flex justify-center mb-36">
                <FirebaseShareButton
                  greetingData={formData}
                  selectedEvent={selectedEvent}
                />
              </div>
           )}

      </div>
    </div>
  );
};

export default CreatePage;