import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import HamburgerButton from '@/components/navigation/HamburgerButton';

interface ReusableHeaderProps {
  title: string;
  onMenuClick: () => void;
}

const ReusableHeader: React.FC<ReusableHeaderProps> = ({ title, onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 shadow-lg bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <HamburgerButton onClick={onMenuClick} />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {title}
          </h1>
        </div>

        <Button 
          onClick={() => navigate('/create')}
          className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg rounded-md group"
        >
          <span className="absolute inset-0 bg-white/20 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Create Greetings
          </motion.span>
        </Button>
      </div>
    </header>
  );
};

export default ReusableHeader;
