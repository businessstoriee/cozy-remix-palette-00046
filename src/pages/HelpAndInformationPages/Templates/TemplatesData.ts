import { Cake, Heart, GraduationCap, PartyPopper, Gift, Umbrella, Baby, Star, BellRing } from 'lucide-react';

import { GreetingFormData } from '@/types/greeting';

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: any;
  eventType: string;
  previewImage: string;
  defaultData: Partial<GreetingFormData>;
}

export const templates: Template[] = [
  {
    id: 'birthday-classic',
    name: 'Birthday Celebration',
    description: 'Colorful birthday card with balloons and cake',
    icon: Cake,
    eventType: 'birthday',
    previewImage: '🎂🎈🎉',
    defaultData: {
      eventType: 'birthday',
      customEventName: 'Happy Birthday',
      customEventEmoji: '🎂',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: 'Wishing you a day filled with happiness and joy!',
          style: {
            fontSize: '24px',
            fontWeight: '600',
            color: 'hsl(var(--primary))',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '🎂', size: 80, position: { x: 20, y: 20 }, animation: 'bounce' },
        { id: 'emoji-2', emoji: '🎈', size: 60, position: { x: 80, y: 25 }, animation: 'float' },
        { id: 'emoji-3', emoji: '🎉', size: 70, position: { x: 50, y: 80 }, animation: 'pulse' }
      ],
      backgroundSettings: {
        color: '#fef3c7',
        gradient: {
          enabled: true,
          colors: ['#fef3c7', '#fde68a'],
          direction: 'to bottom right'
        },
        animation: { enabled: true, type: 'confetti', speed: 3, intensity: 50 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'grid',
      frameStyle: 'classic',
      animationStyle: 'bounce'
    }
  },
  {
    id: 'anniversary-love',
    name: 'Anniversary Romance',
    description: 'Romantic anniversary card with hearts',
    icon: Heart,
    eventType: 'anniversary',
    previewImage: '❤️💕🌹',
    defaultData: {
      eventType: 'anniversary',
      customEventName: 'Happy Anniversary',
      customEventEmoji: '❤️',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: 'Celebrating your beautiful journey together!',
          style: {
            fontSize: '26px',
            fontWeight: '700',
            color: '#dc2626',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '❤️', size: 90, position: { x: 50, y: 30 }, animation: 'pulse' },
        { id: 'emoji-2', emoji: '💕', size: 60, position: { x: 25, y: 60 }, animation: 'bounce' },
        { id: 'emoji-3', emoji: '🌹', size: 70, position: { x: 75, y: 65 }, animation: 'float' }
      ],
      backgroundSettings: {
        color: '#ffe4e6',
        gradient: {
          enabled: true,
          colors: ['#ffe4e6', '#fecdd3'],
          direction: 'to bottom'
        },
        animation: { enabled: true, type: 'hearts', speed: 2, intensity: 40 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'circular',
      frameStyle: 'elegant',
      animationStyle: 'fade'
    }
  },
   {
    id: 'graduation-success',
    name: 'Graduation Achievement',
    description: 'Congratulations card for graduates',
    icon: GraduationCap,
    eventType: 'graduation',
    previewImage: '🎓📚✨',
    defaultData: {
      eventType: 'graduation',
      customEventName: 'Congratulations Graduate',
      customEventEmoji: '🎓',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: 'Your hard work has paid off! Congratulations on your achievement!',
          style: {
            fontSize: '22px',
            fontWeight: '600',
            color: '#1e40af',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '🎓', size: 85, position: { x: 50, y: 35 }, animation: 'bounce' },
        { id: 'emoji-2', emoji: '📚', size: 60, position: { x: 20, y: 70 }, animation: 'float' },
        { id: 'emoji-3', emoji: '✨', size: 50, position: { x: 80, y: 70 }, animation: 'pulse' }
      ],
      backgroundSettings: {
        color: '#dbeafe',
        gradient: {
          enabled: true,
          colors: ['#dbeafe', '#bfdbfe'],
          direction: 'to bottom right'
        },
        animation: { enabled: true, type: 'stars', speed: 3, intensity: 45 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'grid',
      frameStyle: 'modern',
      animationStyle: 'slide'
    }
  },
  {
    id: 'celebration-party',
    name: 'General Celebration',
    description: 'Fun party card for any occasion',
    icon: PartyPopper,
    eventType: 'custom',
    previewImage: '🎊🎉🥳',
    defaultData: {
      eventType: 'custom',
      customEventName: 'Lets Celebrate',
      customEventEmoji: '🎊',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: 'Time to celebrate and make amazing memories!',
          style: {
            fontSize: '24px',
            fontWeight: '700',
            color: '#7c3aed',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '🎊', size: 75, position: { x: 30, y: 25 }, animation: 'bounce' },
        { id: 'emoji-2', emoji: '🎉', size: 75, position: { x: 70, y: 30 }, animation: 'pulse' },
        { id: 'emoji-3', emoji: '🥳', size: 85, position: { x: 50, y: 70 }, animation: 'float' }
      ],
      backgroundSettings: {
        color: '#f3e8ff',
        gradient: {
          enabled: true,
          colors: ['#f3e8ff', '#e9d5ff'],
          direction: 'to right'
        },
        animation: { enabled: true, type: 'confetti', speed: 4, intensity: 60 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'masonry',
      frameStyle: 'modern',
      animationStyle: 'bounce'
    }
  },
  {
    id: 'thank-you-gift',
    name: 'Thank You Card',
    description: 'Grateful thank you message with gifts',
    icon: Gift,
    eventType: 'custom',
    previewImage: '🎁💝🙏',
    defaultData: {
      eventType: 'custom',
      customEventName: 'Thank You',
      customEventEmoji: '🙏',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: 'Thank you for everything! Your kindness means the world!',
          style: {
            fontSize: '23px',
            fontWeight: '600',
            color: '#059669',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '🎁', size: 80, position: { x: 35, y: 30 }, animation: 'bounce' },
        { id: 'emoji-2', emoji: '💝', size: 70, position: { x: 65, y: 35 }, animation: 'pulse' },
        { id: 'emoji-3', emoji: '🙏', size: 75, position: { x: 50, y: 75 }, animation: 'float' }
      ],
      backgroundSettings: {
        color: '#d1fae5',
        gradient: {
          enabled: true,
          colors: ['#d1fae5', '#a7f3d0'],
          direction: 'to bottom'
        },
        animation: { enabled: true, type: 'sparkles', speed: 2, intensity: 40 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'circular',
      frameStyle: 'minimal',
      animationStyle: 'fade'
    }
  },
  // ✅ Include other 3 items here (Graduation, Celebration, Thank You)
  // 1. Baby Shower
  {
    id: 'baby-shower',
    name: 'Baby Shower',
    description: 'Sweet card for welcoming a new baby',
    icon: Baby,
    eventType: 'baby-shower',
    previewImage: '👶🍼🎀',
    defaultData: {
      eventType: 'baby-shower',
      customEventName: 'Welcome Baby!',
      customEventEmoji: '👶',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: 'Wishing your little one a lifetime full of love and joy!',
          style: {
            fontSize: '24px',
            fontWeight: '600',
            color: '#fbbf24',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '👶', size: 80, position: { x: 40, y: 20 }, animation: 'bounce' },
        { id: 'emoji-2', emoji: '🍼', size: 60, position: { x: 70, y: 50 }, animation: 'float' },
        { id: 'emoji-3', emoji: '🎀', size: 50, position: { x: 20, y: 70 }, animation: 'pulse' }
      ],
      backgroundSettings: {
        color: '#fff7ed',
        gradient: { enabled: true, colors: ['#fff7ed', '#fde68a'], direction: 'to bottom' },
        animation: { enabled: true, type: 'confetti', speed: 3, intensity: 50 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'circular',
      frameStyle: 'elegant',
      animationStyle: 'bounce'
    }
  },

  // 2. Wedding
  {
    id: 'wedding',
    name: 'Wedding Wishes',
    description: 'Elegant wedding card for couples',
    icon: BellRing,
    eventType: 'wedding',
    previewImage: '💍❤️💐',
    defaultData: {
      eventType: 'wedding',
      customEventName: 'Congratulations!',
      customEventEmoji: '💍',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: 'Wishing you a lifetime of love, joy, and happiness!',
          style: {
            fontSize: '24px',
            fontWeight: '600',
            color: '#db2777',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '💍', size: 80, position: { x: 50, y: 30 }, animation: 'bounce' },
        { id: 'emoji-2', emoji: '❤️', size: 60, position: { x: 20, y: 50 }, animation: 'pulse' },
        { id: 'emoji-3', emoji: '💐', size: 70, position: { x: 70, y: 60 }, animation: 'float' }
      ],
      backgroundSettings: {
        color: '#fff1f2',
        gradient: { enabled: true, colors: ['#fff1f2', '#fecdd3'], direction: 'to bottom right' },
        animation: { enabled: true, type: 'hearts', speed: 2, intensity: 50 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'grid',
      frameStyle: 'elegant',
      animationStyle: 'fade'
    }
  },

  // 3. New Year
  {
    id: 'new-year',
    name: 'New Year Celebration',
    description: 'Festive card to welcome the new year',
    icon: Star,
    eventType: 'new-year',
    previewImage: '🎆🎇🥳',
    defaultData: {
      eventType: 'new-year',
      customEventName: 'Happy New Year!',
      customEventEmoji: '🎆',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: 'Wishing you a year full of success and happiness!',
          style: {
            fontSize: '24px',
            fontWeight: '600',
            color: '#fcd34d',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '🎆', size: 80, position: { x: 30, y: 30 }, animation: 'bounce' },
        { id: 'emoji-2', emoji: '🎇', size: 70, position: { x: 60, y: 40 }, animation: 'pulse' },
        { id: 'emoji-3', emoji: '🥳', size: 80, position: { x: 50, y: 70 }, animation: 'float' }
      ],
      backgroundSettings: {
        color: '#1e1b4b',
        gradient: { enabled: true, colors: ['#1e1b4b', '#4338ca'], direction: 'to bottom right' },
        animation: { enabled: true, type: 'confetti', speed: 4, intensity: 60 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'masonry',
      frameStyle: 'modern',
      animationStyle: 'bounce'
    }
  },

  // 4. Congratulations
  {
    id: 'congratulations',
    name: 'Congratulations',
    description: 'Card to celebrate achievements or milestones',
    icon: Star,
    eventType: 'achievement',
    previewImage: '🏆🎉👏',
    defaultData: {
      eventType: 'achievement',
      customEventName: 'Congratulations!',
      customEventEmoji: '🏆',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: 'Your hard work and dedication truly paid off!',
          style: {
            fontSize: '24px',
            fontWeight: '600',
            color: '#f97316',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '🏆', size: 80, position: { x: 50, y: 30 }, animation: 'bounce' },
        { id: 'emoji-2', emoji: '🎉', size: 70, position: { x: 20, y: 50 }, animation: 'pulse' },
        { id: 'emoji-3', emoji: '👏', size: 60, position: { x: 70, y: 60 }, animation: 'float' }
      ],
      backgroundSettings: {
        color: '#fff7ed',
        gradient: { enabled: true, colors: ['#fff7ed', '#fde68a'], direction: 'to bottom' },
        animation: { enabled: true, type: 'confetti', speed: 3, intensity: 50 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'grid',
      frameStyle: 'modern',
      animationStyle: 'slide'
    }
  },

  // 5. Get Well Soon
  {
    id: 'get-well-soon',
    name: 'Get Well Soon',
    description: 'Cheerful card for someone recovering',
    icon: Umbrella,
    eventType: 'get-well',
    previewImage: '🌞🌸💊',
    defaultData: {
      eventType: 'get-well',
      customEventName: 'Get Well Soon',
      customEventEmoji: '🌞',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: 'Wishing you a speedy recovery and brighter days ahead!',
          style: {
            fontSize: '23px',
            fontWeight: '600',
            color: '#10b981',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '🌞', size: 80, position: { x: 50, y: 30 }, animation: 'bounce' },
        { id: 'emoji-2', emoji: '🌸', size: 70, position: { x: 25, y: 50 }, animation: 'pulse' },
        { id: 'emoji-3', emoji: '💊', size: 60, position: { x: 75, y: 60 }, animation: 'float' }
      ],
      backgroundSettings: {
        color: '#d1fae5',
        gradient: { enabled: true, colors: ['#d1fae5', '#a7f3d0'], direction: 'to bottom' },
        animation: { enabled: true, type: 'sparkles', speed: 2, intensity: 40 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'circular',
      frameStyle: 'minimal',
      animationStyle: 'fade'
    }
  },

  // 6. Birthday Countdown
  {
    id: 'birthday-countdown',
    name: 'Birthday Countdown',
    description: 'Birthday card with live countdown timer',
    icon: Cake,
    eventType: 'birthday',
    previewImage: '🎂⏰🎉',
    defaultData: {
      eventType: 'birthday',
      customEventName: 'Countdown to Birthday!',
      customEventEmoji: '⏰',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: 'The big day is almost here! Get ready for an amazing celebration!',
          style: {
            fontSize: '26px',
            fontWeight: '700',
            color: '#ea580c',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '⏰', size: 90, position: { x: 50, y: 25 }, animation: 'pulse' },
        { id: 'emoji-2', emoji: '🎂', size: 70, position: { x: 20, y: 60 }, animation: 'bounce' },
        { id: 'emoji-3', emoji: '🎉', size: 70, position: { x: 80, y: 60 }, animation: 'float' }
      ],
      backgroundSettings: {
        color: '#fff7ed',
        gradient: { enabled: true, colors: ['#fff7ed', '#fed7aa'], direction: 'to bottom right' },
        animation: { enabled: true, type: 'confetti', speed: 3, intensity: 50 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'grid',
      frameStyle: 'modern',
      animationStyle: 'bounce'
    }
  },

  // 7. Wedding Invitation
  {
    id: 'wedding-invitation',
    name: 'Wedding Invitation',
    description: 'Elegant wedding invitation card',
    icon: Heart,
    eventType: 'wedding',
    previewImage: '💍💐✨',
    defaultData: {
      eventType: 'wedding',
      customEventName: 'You Are Invited',
      customEventEmoji: '💍',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: 'Join us as we celebrate our special day!',
          style: {
            fontSize: '24px',
            fontWeight: '600',
            color: '#be185d',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '💍', size: 85, position: { x: 50, y: 30 }, animation: 'pulse' },
        { id: 'emoji-2', emoji: '💐', size: 65, position: { x: 25, y: 65 }, animation: 'float' },
        { id: 'emoji-3', emoji: '✨', size: 55, position: { x: 75, y: 65 }, animation: 'pulse' }
      ],
      backgroundSettings: {
        color: '#fdf2f8',
        gradient: { enabled: true, colors: ['#fdf2f8', '#fce7f3'], direction: 'to bottom' },
        animation: { enabled: true, type: 'sparkles', speed: 2, intensity: 30 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'circular',
      frameStyle: 'elegant',
      animationStyle: 'fade'
    }
  },

  // 8. Wedding RSVP
  {
    id: 'wedding-rsvp',
    name: 'Wedding RSVP',
    description: 'RSVP card for wedding guests',
    icon: Heart,
    eventType: 'wedding',
    previewImage: '✉️💌📝',
    defaultData: {
      eventType: 'wedding',
      customEventName: 'Please RSVP',
      customEventEmoji: '✉️',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: 'Kindly confirm your attendance by responding to this invitation!',
          style: {
            fontSize: '22px',
            fontWeight: '600',
            color: '#9333ea',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '✉️', size: 80, position: { x: 50, y: 30 }, animation: 'bounce' },
        { id: 'emoji-2', emoji: '💌', size: 65, position: { x: 25, y: 70 }, animation: 'float' },
        { id: 'emoji-3', emoji: '📝', size: 60, position: { x: 75, y: 70 }, animation: 'pulse' }
      ],
      backgroundSettings: {
        color: '#faf5ff',
        gradient: { enabled: true, colors: ['#faf5ff', '#f3e8ff'], direction: 'to bottom right' },
        animation: { enabled: true, type: 'hearts', speed: 2, intensity: 35 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'grid',
      frameStyle: 'elegant',
      animationStyle: 'fade'
    }
  },

  // 9. Wedding Thank You
  {
    id: 'wedding-thankyou',
    name: 'Wedding Thank You',
    description: 'Thank you card for wedding guests',
    icon: Heart,
    eventType: 'wedding',
    previewImage: '🙏💝💐',
    defaultData: {
      eventType: 'wedding',
      customEventName: 'Thank You',
      customEventEmoji: '💝',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: 'Thank you for being part of our special day! Your presence made it perfect!',
          style: {
            fontSize: '23px',
            fontWeight: '600',
            color: '#db2777',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '💝', size: 85, position: { x: 50, y: 30 }, animation: 'pulse' },
        { id: 'emoji-2', emoji: '🙏', size: 70, position: { x: 25, y: 65 }, animation: 'bounce' },
        { id: 'emoji-3', emoji: '💐', size: 70, position: { x: 75, y: 65 }, animation: 'float' }
      ],
      backgroundSettings: {
        color: '#fff1f2',
        gradient: { enabled: true, colors: ['#fff1f2', '#ffe4e6'], direction: 'to bottom' },
        animation: { enabled: true, type: 'hearts', speed: 2, intensity: 40 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'circular',
      frameStyle: 'romantic',
      animationStyle: 'fade'
    }
  },

  // 10. Baby Gender Reveal
  {
    id: 'gender-reveal',
    name: 'Gender Reveal',
    description: 'Exciting gender reveal announcement',
    icon: Baby,
    eventType: 'baby-shower',
    previewImage: '🎀💙👶',
    defaultData: {
      eventType: 'baby-shower',
      customEventName: "It's a...",
      customEventEmoji: '🎀',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: "We're thrilled to share the news about our little bundle of joy!",
          style: {
            fontSize: '24px',
            fontWeight: '600',
            color: '#ec4899',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '👶', size: 85, position: { x: 50, y: 30 }, animation: 'bounce' },
        { id: 'emoji-2', emoji: '🎀', size: 65, position: { x: 25, y: 65 }, animation: 'pulse' },
        { id: 'emoji-3', emoji: '💙', size: 65, position: { x: 75, y: 65 }, animation: 'pulse' }
      ],
      backgroundSettings: {
        color: '#fdf4ff',
        gradient: { enabled: true, colors: ['#fdf4ff', '#fae8ff'], direction: 'to bottom right' },
        animation: { enabled: true, type: 'confetti', speed: 3, intensity: 55 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'circular',
      frameStyle: 'modern',
      animationStyle: 'bounce'
    }
  },

  // 11. Baby Birth Announcement
  {
    id: 'birth-announcement',
    name: 'Birth Announcement',
    description: 'Announce the arrival of your newborn',
    icon: Baby,
    eventType: 'baby-shower',
    previewImage: '👶🍼✨',
    defaultData: {
      eventType: 'baby-shower',
      customEventName: 'Welcome Baby!',
      customEventEmoji: '👶',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: 'Our hearts are full! Welcome to the world, little one!',
          style: {
            fontSize: '24px',
            fontWeight: '600',
            color: '#f59e0b',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '👶', size: 90, position: { x: 50, y: 25 }, animation: 'bounce' },
        { id: 'emoji-2', emoji: '🍼', size: 65, position: { x: 25, y: 65 }, animation: 'float' },
        { id: 'emoji-3', emoji: '✨', size: 60, position: { x: 75, y: 65 }, animation: 'pulse' }
      ],
      backgroundSettings: {
        color: '#fffbeb',
        gradient: { enabled: true, colors: ['#fffbeb', '#fef3c7'], direction: 'to bottom' },
        animation: { enabled: true, type: 'sparkles', speed: 2, intensity: 40 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'grid',
      frameStyle: 'elegant',
      animationStyle: 'fade'
    }
  },

  // 12. Christmas Card
  {
    id: 'christmas',
    name: 'Christmas Greetings',
    description: 'Festive Christmas card',
    icon: Star,
    eventType: 'christmas',
    previewImage: '🎄🎅❄️',
    defaultData: {
      eventType: 'christmas',
      customEventName: 'Merry Christmas!',
      customEventEmoji: '🎄',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: 'Wishing you joy, peace, and love this Christmas season!',
          style: {
            fontSize: '24px',
            fontWeight: '700',
            color: '#dc2626',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '🎄', size: 90, position: { x: 50, y: 30 }, animation: 'pulse' },
        { id: 'emoji-2', emoji: '🎅', size: 75, position: { x: 25, y: 65 }, animation: 'bounce' },
        { id: 'emoji-3', emoji: '❄️', size: 60, position: { x: 75, y: 65 }, animation: 'float' }
      ],
      backgroundSettings: {
        color: '#1e3a8a',
        gradient: { enabled: true, colors: ['#1e3a8a', '#3b82f6'], direction: 'to bottom right' },
        animation: { enabled: true, type: 'snow', speed: 2, intensity: 50 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'circular',
      frameStyle: 'starry',
      animationStyle: 'fade'
    }
  },

  // 13. Easter Card
  {
    id: 'easter',
    name: 'Easter Celebration',
    description: 'Cheerful Easter greeting card',
    icon: Star,
    eventType: 'easter',
    previewImage: '🐰🥚🌸',
    defaultData: {
      eventType: 'easter',
      customEventName: 'Happy Easter!',
      customEventEmoji: '🐰',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: 'Wishing you a joyful Easter filled with love and happiness!',
          style: {
            fontSize: '24px',
            fontWeight: '600',
            color: '#c026d3',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '🐰', size: 85, position: { x: 50, y: 30 }, animation: 'bounce' },
        { id: 'emoji-2', emoji: '🥚', size: 70, position: { x: 25, y: 65 }, animation: 'pulse' },
        { id: 'emoji-3', emoji: '🌸', size: 70, position: { x: 75, y: 65 }, animation: 'float' }
      ],
      backgroundSettings: {
        color: '#fdf4ff',
        gradient: { enabled: true, colors: ['#fdf4ff', '#f5d0fe'], direction: 'to bottom' },
        animation: { enabled: true, type: 'sparkles', speed: 3, intensity: 45 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'grid',
      frameStyle: 'nature',
      animationStyle: 'bounce'
    }
  },

  // 14. Corporate Event
  {
    id: 'corporate-event',
    name: 'Corporate Event',
    description: 'Professional corporate event invitation',
    icon: Star,
    eventType: 'custom',
    previewImage: '💼🎯📊',
    defaultData: {
      eventType: 'custom',
      customEventName: 'You Are Invited',
      customEventEmoji: '💼',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: 'Join us for an exclusive corporate event. Your presence is highly valued.',
          style: {
            fontSize: '22px',
            fontWeight: '600',
            color: '#1e40af',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '💼', size: 80, position: { x: 50, y: 30 }, animation: 'fade' },
        { id: 'emoji-2', emoji: '🎯', size: 65, position: { x: 25, y: 65 }, animation: 'fade' },
        { id: 'emoji-3', emoji: '📊', size: 65, position: { x: 75, y: 65 }, animation: 'fade' }
      ],
      backgroundSettings: {
        color: '#eff6ff',
        gradient: { enabled: true, colors: ['#eff6ff', '#dbeafe'], direction: 'to bottom right' },
        animation: { enabled: false, type: 'none', speed: 0, intensity: 0 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'grid',
      frameStyle: 'minimal',
      animationStyle: 'fade'
    }
  },

  // 15. Retirement Party
  {
    id: 'retirement',
    name: 'Retirement Celebration',
    description: 'Celebrate a well-deserved retirement',
    icon: PartyPopper,
    eventType: 'retirement',
    previewImage: '🎊👔🌴',
    defaultData: {
      eventType: 'retirement',
      customEventName: 'Happy Retirement!',
      customEventEmoji: '🎊',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: 'Congratulations on your retirement! Enjoy your well-earned rest!',
          style: {
            fontSize: '24px',
            fontWeight: '600',
            color: '#0891b2',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '🎊', size: 85, position: { x: 50, y: 30 }, animation: 'bounce' },
        { id: 'emoji-2', emoji: '👔', size: 70, position: { x: 25, y: 65 }, animation: 'float' },
        { id: 'emoji-3', emoji: '🌴', size: 75, position: { x: 75, y: 65 }, animation: 'pulse' }
      ],
      backgroundSettings: {
        color: '#ecfeff',
        gradient: { enabled: true, colors: ['#ecfeff', '#cffafe'], direction: 'to bottom' },
        animation: { enabled: true, type: 'confetti', speed: 3, intensity: 50 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'grid',
      frameStyle: 'elegant',
      animationStyle: 'fade'
    }
  },

  // 16. Housewarming
  {
    id: 'housewarming',
    name: 'Housewarming Party',
    description: 'Welcome to your new home',
    icon: Gift,
    eventType: 'custom',
    previewImage: '🏡🔑🎉',
    defaultData: {
      eventType: 'custom',
      customEventName: 'Housewarming!',
      customEventEmoji: '🏡',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: 'Join us to celebrate our new home! Your presence will make it special!',
          style: {
            fontSize: '23px',
            fontWeight: '600',
            color: '#ea580c',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '🏡', size: 85, position: { x: 50, y: 30 }, animation: 'pulse' },
        { id: 'emoji-2', emoji: '🔑', size: 65, position: { x: 25, y: 65 }, animation: 'bounce' },
        { id: 'emoji-3', emoji: '🎉', size: 70, position: { x: 75, y: 65 }, animation: 'float' }
      ],
      backgroundSettings: {
        color: '#fff7ed',
        gradient: { enabled: true, colors: ['#fff7ed', '#ffedd5'], direction: 'to bottom right' },
        animation: { enabled: true, type: 'sparkles', speed: 2, intensity: 40 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'circular',
      frameStyle: 'modern',
      animationStyle: 'bounce'
    }
  },

  // 17. Promotion Celebration
  {
    id: 'promotion',
    name: 'Job Promotion',
    description: 'Celebrate a career milestone',
    icon: Star,
    eventType: 'achievement',
    previewImage: '🎯📈🏆',
    defaultData: {
      eventType: 'achievement',
      customEventName: 'Congratulations!',
      customEventEmoji: '🎯',
      senderName: '',
      receiverName: '',
      texts: [
        {
          id: 'text-1',
          content: 'Congratulations on your promotion! Your hard work truly paid off!',
          style: {
            fontSize: '24px',
            fontWeight: '600',
            color: '#7c3aed',
            textAlign: 'center',
            fontFamily: 'inherit'
          },
          animation: 'fade'
        }
      ],
      media: [],
      emojis: [
        { id: 'emoji-1', emoji: '🎯', size: 80, position: { x: 50, y: 30 }, animation: 'pulse' },
        { id: 'emoji-2', emoji: '📈', size: 70, position: { x: 25, y: 65 }, animation: 'bounce' },
        { id: 'emoji-3', emoji: '🏆', size: 75, position: { x: 75, y: 65 }, animation: 'float' }
      ],
      backgroundSettings: {
        color: '#f5f3ff',
        gradient: { enabled: true, colors: ['#f5f3ff', '#ede9fe'], direction: 'to bottom' },
        animation: { enabled: true, type: 'stars', speed: 3, intensity: 45 },
        pattern: { enabled: false, type: 'dots', opacity: 20 }
      },
      layout: 'grid',
      frameStyle: 'modern',
      animationStyle: 'slide'
    }
  },
]