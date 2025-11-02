import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Lock } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface PublicPrivateToggleProps {
  isPublic: boolean;
  onToggle: (value: boolean) => void;
  className?: string;
}

export const PublicPrivateToggle: React.FC<PublicPrivateToggleProps> = ({
  isPublic,
  onToggle,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-between p-4 rounded-xl shadow-lg hover:shadow-xl border border-purple-500 bg-card/50 backdrop-blur-sm transition-all duration-300 dark:from-slate-900 dark:to-slate-800 dark:border-slate-700 dark:shadow-slate-900/50 overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: isPublic ? 0 : 180 }}
          transition={{ duration: 0.3 }}
          className="p-2 rounded-lg bg-gradient-to-br from-purple-200 to-secondary/20"
        >
    
          {isPublic ? (
            <Globe className="h-4 w-4 text-purple-600 dark:text-gray-400" />
          ) : (
            <Lock className="h-4 w-4 text-purple-600 dark:text-gray-400" />
          )}
        </motion.div>
        
        <div>
          <Label htmlFor="public-toggle" className="text-sm font-semibold cursor-pointer">
            {isPublic ? 'Public Greeting' : 'Private Greeting'}
          </Label>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isPublic 
              ? 'Will appear in community feed for everyone to see' 
              : 'Only people with the link can view this greeting'}
          </p>
        </div>
      </div>

      <Switch
        id="public-toggle"
        checked={isPublic}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-primary/80"
      />
    </motion.div>
  );
};

export default PublicPrivateToggle;
