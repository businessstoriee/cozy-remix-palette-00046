import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  action: () => void;
  description: string;
}

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();

  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'h',
      ctrlKey: true,
      action: () => navigate('/'),
      description: 'Go to Home'
    },
    {
      key: 'n',
      ctrlKey: true,
      action: () => navigate('/create'),
      description: 'Create New Greeting'
    },
    {
      key: 't',
      ctrlKey: true,
      action: () => navigate('/templates'),
      description: 'View Templates'
    },
    {
      key: 'b',
      ctrlKey: true,
      action: () => navigate('/blog'),
      description: 'View Blog'
    },
    {
      key: '/',
      ctrlKey: true,
      action: () => {
        toast({
          title: 'Keyboard Shortcuts',
          description: 'Ctrl+H: Home | Ctrl+N: New Greeting | Ctrl+T: Templates | Ctrl+B: Blog',
        });
      },
      description: 'Show keyboard shortcuts'
    }
  ];

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Don't trigger shortcuts when typing in inputs
    const target = event.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable
    ) {
      return;
    }

    shortcuts.forEach((shortcut) => {
      const ctrlMatch = !shortcut.ctrlKey || event.ctrlKey;
      const shiftMatch = !shortcut.shiftKey || event.shiftKey;
      const altMatch = !shortcut.altKey || event.altKey;
      const metaMatch = !shortcut.metaKey || event.metaKey;
      const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

      if (ctrlMatch && shiftMatch && altMatch && metaMatch && keyMatch) {
        event.preventDefault();
        shortcut.action();
      }
    });
  }, [shortcuts]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return { shortcuts };
};
