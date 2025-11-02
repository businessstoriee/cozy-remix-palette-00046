import { Shield, Lock, Eye, Database, Share2, FileText } from 'lucide-react';


export   const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Basic account information (name, email) when you create greetings',
        'Content you create including text, images, and customization preferences',
        'Usage data to improve our service and user experience',
        'Device and browser information for optimization purposes',
      ],
      gradient: 'from-blue-500/20 to-cyan-500/20',
      hoverGradient: 'group-hover:from-blue-500/30 group-hover:to-cyan-500/30',
      iconColor: 'text-blue-500',
    },
    {
      icon: Lock,
      title: 'How We Protect Your Data',
      content: [
        
        'Industry-standard encryption for all data transmission',
        'Secure cloud storage with regular backups',
        'Strict access controls and authentication measures',
        'Regular security audits and updates',
      ],
      gradient: 'from-emerald-500/20 to-teal-500/20',
      hoverGradient: 'group-hover:from-emerald-500/30 group-hover:to-teal-500/30',
      iconColor: 'text-emerald-500',
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'To provide and maintain our greeting card service',
        'To personalize your experience and improve our features',
        'To send important service updates and notifications',
        'To analyze usage patterns and enhance performance',
      ],
      gradient: 'from-purple-500/20 to-pink-500/20',
      hoverGradient: 'group-hover:from-purple-500/30 group-hover:to-pink-500/30',
      iconColor: 'text-purple-500',
    },
    {
      icon: Share2,
      title: 'Sharing Your Greetings',
      content: [
        'You have full control over Access, and update your account information anytime',
        'You have full control over greeting visibility (public/private)',
        'Public greetings may appear in our community feed',
        'We never share your personal information with third parties',
        'Shared links are unique and can be managed by you',
      ],
      gradient: 'from-orange-500/20 to-red-500/20',
      hoverGradient: 'group-hover:from-orange-500/30 group-hover:to-red-500/30',
      iconColor: 'text-orange-500',
    },
    // {
    //   icon: FileText,
    //   title: 'Your Rights',
    //   content: [
    //     'Access, update, or delete your account information anytime',
    //     'Download all your created content',
    //     'Opt-out of non-essential communications',
    //     'Request a complete copy of your data',
    //   ],
    //   gradient: 'from-amber-500/20 to-yellow-500/20',
    //   hoverGradient: 'group-hover:from-amber-500/30 group-hover:to-yellow-500/30',
    //   iconColor: 'text-amber-500',
    // },
  ];