import { useState, useEffect } from 'react';

interface UseCustomURLReturn {
  customURL: string;
  setCustomURL: (url: string) => void;
  isCustomized: boolean;
  generateDefaultURL: (senderName: string, receiverName: string, eventName: string) => string;
}

/**
 * Hook to manage custom URLs for greetings
 * Persists state in sessionStorage
 */
export const useCustomURL = (
  initialSender?: string,
  initialReceiver?: string,
  initialEvent?: string
): UseCustomURLReturn => {
  const [customURL, setCustomURLState] = useState<string>('');
  const [isCustomized, setIsCustomized] = useState(false);

  // Generate default URL from form data
  const generateDefaultURL = (
    senderName: string,
    receiverName: string,
    eventName: string
  ): string => {
    const sanitize = (str: string) =>
      str
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

    return `${sanitize(senderName || 'someone')}-wishes-${sanitize(
      eventName || 'greeting'
    )}-${sanitize(receiverName || 'you')}`;
  };

  // Initialize from sessionStorage or generate default
  useEffect(() => {
    const stored = sessionStorage.getItem('custom-greeting-url');
    const isCustomizedStored = sessionStorage.getItem('url-is-customized') === 'true';

    if (stored && isCustomizedStored) {
      setCustomURLState(stored);
      setIsCustomized(true);
    } else {
      // Generate default URL
      const defaultURL = generateDefaultURL(
        initialSender || '',
        initialReceiver || '',
        initialEvent || ''
      );
      setCustomURLState(defaultURL);
      setIsCustomized(false);
    }
  }, [initialSender, initialReceiver, initialEvent]);

  // Update when form data changes (but only if not customized)
  useEffect(() => {
    if (!isCustomized) {
      const defaultURL = generateDefaultURL(
        initialSender || '',
        initialReceiver || '',
        initialEvent || ''
      );
      setCustomURLState(defaultURL);
      sessionStorage.setItem('custom-greeting-url', defaultURL);
    }
  }, [initialSender, initialReceiver, initialEvent, isCustomized]);

  // Setter that marks URL as customized
  const setCustomURL = (url: string) => {
    setCustomURLState(url);
    setIsCustomized(true);
    sessionStorage.setItem('custom-greeting-url', url);
    sessionStorage.setItem('url-is-customized', 'true');
  };

  return {
    customURL,
    setCustomURL,
    isCustomized,
    generateDefaultURL,
  };
};
