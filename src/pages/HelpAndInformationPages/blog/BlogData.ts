export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Creative Ways to Personalize Your Digital Greeting Cards',
    excerpt: 'Discover unique techniques to make your greeting cards stand out with custom animations, backgrounds, and heartfelt messages.',
    date: 'March 15, 2024',
    readTime: '5 min read',
    category: 'Tips & Tricks',
    image: '🎨'
  },
  {
    id: '2',
    title: 'The Psychology Behind Perfect Birthday Messages',
    excerpt: 'Learn what makes birthday wishes memorable and how to craft messages that truly resonate with your loved ones.',
    date: 'March 10, 2024',
    readTime: '4 min read',
    category: 'Inspiration',
    image: '🎂'
  },
  {
    id: '3',
    title: 'Best Practices for Sharing Digital Greetings',
    excerpt: 'Master the art of sharing your cards across different platforms and ensure they look perfect everywhere.',
    date: 'March 5, 2024',
    readTime: '6 min read',
    category: 'How-To',
    image: '📱'
  },
  {
    id: '4',
    title: 'Anniversary Card Ideas That Celebrate Love',
    excerpt: 'From traditional to modern, explore anniversary card styles that capture the essence of lasting relationships.',
    date: 'February 28, 2024',
    readTime: '5 min read',
    category: 'Inspiration',
    image: '💕'
  },
  {
    id: '5',
    title: 'Making Graduation Cards Extra Special',
    excerpt: 'Tips for creating graduation cards that celebrate achievements and inspire future success.',
    date: 'February 20, 2024',
    readTime: '4 min read',
    category: 'Tips & Tricks',
    image: '🎓'
  },
  {
    id: '6',
    title: 'The Ultimate Guide to Greeting Card Etiquette',
    excerpt: 'Navigate the dos and donts of digital greeting cards with our comprehensive etiquette guide.',
    date: 'February 15, 2024',
    readTime: '7 min read',
    category: 'How-To',
    image: '✉️'
  }
];
