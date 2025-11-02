import { Mail, FileQuestion, Book, Phone, MessageCircle } from 'lucide-react';

export const supportOptions = [
  {
    icon: FileQuestion,
    title: 'FAQ',
    description: 'Find quick answers to common questions.',
    action: 'Browse FAQ',
    link: '/faq',
    gradient: 'from-blue-500/20 to-cyan-500/20 dark:from-blue-500/10 dark:to-cyan-500/10',
    hoverGradient: 'group-hover:from-blue-500/30 group-hover:to-cyan-500/30',
    iconColor: 'text-blue-500',
    borderColor:'from-blue-500 to-cyan-500 dark:from-blue-500 dark:to-cyan-500',
  },
  {
    icon: Book,
    title: 'Documentation',
    description: 'Detailed guides to master all features.',
    action: 'View Guides',
    link: '/about',
    gradient: 'from-purple-500/20 to-pink-500/20 dark:from-purple-500/10 dark:to-pink-500/10',
    hoverGradient: 'group-hover:from-purple-500/30 group-hover:to-pink-500/30',
    iconColor: 'text-purple-500',
    borderColor:'from-purple-500/20 to-pink-500 dark:from-purple-500 dark:to-pink-500'
  },
];

export const contactOptions = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'kamleshguptaom4@gmail.com',
    link: 'mailto:kamleshguptaom4@gmail.com',
    gradient: 'from-orange-500/20 to-red-500/20 dark:from-orange-500/10 dark:to-red-500/10',
    hoverGradient: 'group-hover:from-orange-500/30 group-hover:to-red-500/30',
    iconColor: 'text-orange-500',
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: '+91 1234567890',
    link: 'tel:+911234567890',
    gradient: 'from-green-500/20 to-emerald-500/20 dark:from-green-500/10 dark:to-emerald-500/10',
    hoverGradient: 'group-hover:from-green-500/30 group-hover:to-emerald-500/30',
    iconColor: 'text-green-500',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: '+91 1234567890',
    link: 'https://wa.me/911234567890',
    gradient: 'from-teal-500/20 to-cyan-500/20 dark:from-teal-500/10 dark:to-cyan-500/10',
    hoverGradient: 'group-hover:from-teal-500/30 group-hover:to-cyan-500/30',
    iconColor: 'text-teal-500',
  },
];
