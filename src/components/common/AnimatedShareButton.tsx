import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

interface AnimatedShareButtonProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}

const AnimatedShareButton: React.FC<AnimatedShareButtonProps> = ({ 
  onClick, 
  label = 'Share',
  disabled = false 
}) => {
  return (
    <Button  
      onClick={onClick}
      disabled={disabled}
      className={`relative flex items-center justify-center gap-1.5 sm:gap-2 
        px-3 min-w-[3rem]
        bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white 
        shadow-md hover:shadow-lg rounded-md 
        overflow-hidden transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed group`}
    >
      {/* Shine Animation */}
      <span className="absolute inset-0 bg-white/20 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
  
      <motion.span
        animate={{ x: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="flex items-center"
      >
        <div className="relative z-10 flex gap-2 items-center">
          <Share2 className="h-4 w-4 animate-pulse" /> 
          {label}
        </div>
      </motion.span>
    </Button>
  );
};

export default AnimatedShareButton;
