import React from 'react';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Type } from 'lucide-react';
import { TextContent } from '@/types/greeting';
import TextStyleControls from '@/components/greeting/TextStyleControls';
import { createTextSettings, TextSettings } from '@/types/textSettings';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderTextCustomizerProps {
  headerText: TextContent;
  onChange: (headerText: TextContent) => void;
}

const HeaderTextCustomizer: React.FC<HeaderTextCustomizerProps> = ({ headerText, onChange }) => {

  const updateHeaderText = (updates: Partial<TextContent>) => {
    onChange({ ...headerText, ...updates });
  };

  return (
        <Card className="border border-purple-500 shadow-lg hover:shadow-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-slate-900 dark:to-slate-800 dark:border-slate-700 dark:shadow-slate-900/50 overflow-hidden">
            
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
           <div className="p-2 bg-gradient-to-br from-purple-200 to-secondary/20 dark:bg-purple-900/50 rounded-lg">
                          <Type className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
          Header Text 

        </CardTitle>
      </CardHeader>

      <CardContent>
        <AnimatePresence initial={false}>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TextStyleControls
              textSettings={headerText as any as TextSettings}
              onChange={(updates) => updateHeaderText(updates as Partial<TextContent>)}
              showContent={true} // Always show input field
              contentPlaceholder="Enter header text (optional)"
              showAnimation={true}
              compact={false}
              label="Header Text"
            />
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default HeaderTextCustomizer;
