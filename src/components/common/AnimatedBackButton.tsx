import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface AnimatedBackButtonProps {
  to: string;
  label?: string;
  onClick?: () => void;
}

const AnimatedBackButton: React.FC<AnimatedBackButtonProps> = ({ 
  to, 
  label = 'Back', 
  onClick 
}) => {
  return (
    <Link to={to}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 25px rgba(168, 85, 247, 0.4)",
        }}
        whileTap={{ scale: 0.97 }}
        className="inline-block"
      >
        <Button
          variant="outline"
          onClick={onClick}
          className="
            relative overflow-hidden
            bg-white/70 dark:bg-gray-900/70
            backdrop-blur-md
            text-gray-900 dark:text-gray-100
            border border-gray-200/60 dark:border-gray-700/60
            hover:border-primary hover:text-primary
            transition-all duration-300
            flex items-center gap-2 group
          "
        >
          <motion.span
            initial={{ x: "-120%" }}
            whileHover={{ x: "120%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/10 -skew-x-12"
          />

          <motion.span
            animate={{ x: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex items-center"
          >
            <span className="mr-2 group-hover:animate-bounce">←</span>
          </motion.span>

          <span className="relative z-10">{label}</span>
        </Button>
      </motion.div>
    </Link>
  );
};

export default AnimatedBackButton;
