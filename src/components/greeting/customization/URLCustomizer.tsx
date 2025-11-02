import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Check, CheckCircle, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface URLCustomizerProps {
  currentSlug: string;
  onCustomize?: (customUrl: string) => void;
  senderName?: string;
  receiverName?: string;
  eventName?: string;
}

const URLCustomizer = ({ 
  currentSlug, 
  onCustomize,
  senderName = "someone",
  receiverName = "You",
  eventName = "greeting",

}: URLCustomizerProps) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
 
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const { toast } = useToast();
 const [isCopied, setIsCopied] = useState(false);


 // Create dynamic placeholder with better fallbacks
const placeholderUrl = `${senderName || 'someone'}-'wishes'-${eventName || 'greeting'}-${receiverName || 'you'}`
  .toLowerCase()
  .replace(/[^a-z0-9-]/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '');
    
    console.log('Props received:', { senderName, receiverName, eventName });
    console.log (placeholderUrl)

    const [customUrl, setCustomUrl] = useState(() => {
      // Persist state in sessionStorage to survive tab switches
      const saved = sessionStorage.getItem('url-customizer-value');
      return saved || placeholderUrl;
    });
  
  useEffect(() => {
    sessionStorage.setItem('url-customizer-value', customUrl);
  }, [customUrl]);

  // Update when currentSlug changes (new greeting)
  useEffect(() => {
    if (placeholderUrl && placeholderUrl !== customUrl) {
      setCustomUrl(placeholderUrl);
    }
  }, [placeholderUrl]);


  const handleCustomize = () => {
    if (!customUrl.trim()) {
      toast({
        title: "URL cannot be empty",
        description: "Please enter a valid URL",
        variant: "destructive"
      });
      return;
    }

    // Validate URL format
    if (!/^[a-z0-9-]+$/.test(customUrl)) {
      toast({
        title: "Invalid URL format",
        description: "Please use only lowercase letters, numbers, and hyphens",
        variant: "destructive"
      });
      return;
    }

    onCustomize?.(customUrl);
    setIsEditing(false);
    
    toast({
      title: "URL Customized!",
      description: "Your custom URL has been set successfully",
    });
  };

  const handleCopy = () => {
    if (!baseUrl) return;
    
    navigator.clipboard.writeText(`${baseUrl}/${customUrl}`);
    setIsCopied(true);
    toast({
      title: "Copied!",
      description: "URL copied to clipboard",
    });

     // Reset after 2 seconds
  setTimeout(() => setIsCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert to lowercase and remove invalid characters
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setCustomUrl(value);
    setIsEditing(value !== currentSlug);
  };

  const handleToggleEnabled = (checked: boolean) => {
    setEnabled(checked);
    // Auto-expand when enabled
    if (checked) {
      setIsExpanded(true);
    }
  };

  // Use placeholder as suggestion when input is empty
  const displayValue = customUrl || '';
  const showPlaceholderSuggestion = !customUrl;

  return (
    <Card className="border border-purple-500 shadow-lg hover:shadow-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-slate-900 dark:to-slate-800 dark:border-slate-700 dark:shadow-slate-900/50 overflow-hidden">
      <CardHeader className="p-4 pb-0"> 
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-purple-200 to-secondary/20 dark:bg-purple-900/50 rounded-lg">
                            <Link2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
            URL Customization            
          </CardTitle>
          
          <div className="flex items-center gap-2">
            {/* Chevron toggle - only show when enabled */}
            {enabled && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 rounded hover:bg-muted transition"
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            )}
            
            <Switch
              id="url-customization-enabled"
              checked={enabled}
              onCheckedChange={handleToggleEnabled}
            />
          </div>
        </div>
      </CardHeader>
    
      <CardContent className="p-4 pt-3">
        <AnimatePresence initial={false}>
          {enabled && isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Description */}
              <p className="text-xs text-muted-foreground mt-2">
                Customize your greeting URL to make it more personal and memorable
              </p>

              {/* URL Input Section */}
              <motion.div
                className="flex flex-col gap-2"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                {/* Combined URL Input with Base URL */}
                <div className="flex-1 relative group">
                  <div className="flex items-stretch rounded-lg border border-border/50 bg-background/50 dark:bg-background/70 hover:border-primary/50 focus-within:border-primary transition-all duration-300 group-hover:shadow-sm group-hover:shadow-primary/10 overflow-hidden">
                    {/* Base URL Display - Fixed */}
                    <div className="flex items-center px-3 py-2 bg-muted/50 dark:bg-muted/30 border-r border-border/50 text-xs text-muted-foreground whitespace-nowrap">
                      {baseUrl}/
                    </div>
                    
                    {/* Custom URL Input */}
                    <div className="flex-1 relative">
                      <Input
                        value={displayValue}
                        onChange={handleInputChange}
                        placeholder={placeholderUrl}
                        className="w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-sm font-medium text-foreground pr-10 placeholder:text-muted-foreground/70"
                      />
                      
                      {/* Copy Button */}
                      {!isEditing && customUrl && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleCopy}
                          className="absolute right-2 top-2 p-1.5 rounded-md
                                   bg-primary/10 hover:bg-primary/20 text-primary
                                   transition-all duration-200"
                        >
                          
                         {isCopied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Customize Button */}
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                      className="ml-auto" // ← Add this

                  >
                    <Button
                      onClick={handleCustomize}
                      size="sm"
                      className="relative flex justify-end overflow-hidden bg-gradient-to-r from-primary to-primary/80 
                               hover:from-primary/90 hover:to-primary/70
                               text-primary-foreground shadow-sm hover:shadow-md
                               transition-all duration-300 group "
                    >
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <Check className="w-4 h-4" />
                      <span className="relative">Apply</span>
                    </Button>
                  </motion.div>
                )}
              </motion.div>

              {/* Full URL Preview */}
              {baseUrl && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="p-3 rounded-lg bg-muted/30 dark:bg-muted/20 border border-border/30
                             backdrop-blur-sm"
                >
                  <p className="text-xs text-muted-foreground mb-1">Preview:</p>
                  <p className="text-sm font-mono text-foreground/80 break-all">
                    {baseUrl}/{customUrl || placeholderUrl}
                  </p>
                </motion.div>
              )}

              {/* Info Note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs text-muted-foreground/70 space-y-1"
              >
                <p>💡 Tip: Use letters, numbers, and hyphens only</p>
                {/* <p>🔒 Your custom URL will be securely mapped to your greeting</p>
                <p>✨ Based on: {senderName} → {receiverName} ({eventName})</p> */}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show disabled state message */}
        {!enabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-2"
          >
            <p className="text-xs text-muted-foreground">
              Enable URL customization to create a personalized web address for your greeting
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default URLCustomizer;