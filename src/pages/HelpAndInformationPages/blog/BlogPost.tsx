import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Tag, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from './BlogData';
import BlogPostSEO from '@/components/seo/BlogPostSEO';
import AnimatedSidebar from '@/components/navigation/AnimatedSidebar';
import AnimatedBackButton from '@/components/common/AnimatedBackButton';
import AnimatedShareButton from '@/components/common/AnimatedShareButton';
import BackToTop from '@/components/common/BackToTop';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
   const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const post = blogPosts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Blog post not found</h2>
          <Button onClick={() => navigate('/blog')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <BlogPostSEO
        title={post.title}
        description={post.excerpt}
        date={post.date}
        readTime={post.readTime}
        category={post.category}
        image={typeof post.image === 'string' ? post.image : undefined}
        postId={post.id}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        {/* Header */}
        <header className="sticky top-0 z-50 shadow-lg bg-background/80 backdrop-blur-xl border-b border-border/50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <AnimatedBackButton to="/blog" label="Back to Blog" />
            <AnimatedShareButton onClick={handleShare} />
          </div>
        </header>
  <AnimatedSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

    
        {/* Content */}
        <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Hero Section */}
            <div className="space-y-6">
              {/* Category Badge */}
              <Badge className="bg-gradient-to-r from-primary to-purple-500 text-white">
                <Tag className="h-3 w-3 mr-1" />
                {post.category}
              </Badge>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Featured Image/Emoji */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full aspect-video bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 dark:from-primary/20 dark:via-purple-500/20 dark:to-pink-500/20 rounded-2xl flex items-center justify-center border border-border/50 shadow-xl"
              >
                <span className="text-9xl">{post.image}</span>
              </motion.div>
            </div>

            {/* Excerpt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-card dark:bg-gray-800/50 border border-border rounded-xl shadow-lg"
            >
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground italic">
                {post.excerpt}
              </p>
            </motion.div>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="prose prose-lg dark:prose-invert max-w-none space-y-6"
            >
              {/* Dynamic content based on blog ID */}
              {post.id === '1' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-foreground dark:text-white">Introduction</h2>
                  <p className="text-muted-foreground dark:text-gray-300">
                    Digital greeting cards have revolutionized how we express our feelings to loved ones. With endless customization options, you can create truly unique and memorable experiences.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground dark:text-white">1. Custom Animations</h2>
                  <p className="text-muted-foreground dark:text-gray-300">
                    Add life to your cards with animated backgrounds, floating emojis, and dynamic text effects. Choose from fireworks, confetti, or subtle particle animations to match the occasion.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground dark:text-white">2. Personal Photos & Videos</h2>
                  <p className="text-muted-foreground dark:text-gray-300">
                    Include cherished memories by uploading personal photos or videos. Create a photo gallery that tells your story and makes the greeting truly one-of-a-kind.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground dark:text-white">3. Custom Background Music</h2>
                  <p className="text-muted-foreground dark:text-gray-300">
                    Set the perfect mood with background music. Upload their favorite song or choose from our curated collection to create an immersive experience.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground dark:text-white">Conclusion</h2>
                  <p className="text-muted-foreground dark:text-gray-300">
                    The possibilities are endless when it comes to personalizing digital greeting cards. Get creative, have fun, and make your next greeting unforgettable!
                  </p>
                </div>
              )}

              {post.id === '2' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-foreground dark:text-white">The Power of Words</h2>
                  <p className="text-muted-foreground dark:text-gray-300">
                    Birthday wishes are more than just words—they're expressions of love, appreciation, and connection. Understanding the psychology behind meaningful messages can help you craft wishes that truly resonate.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground dark:text-white">Be Specific and Personal</h2>
                  <p className="text-muted-foreground dark:text-gray-300">
                    Generic messages are quickly forgotten. Instead, reference shared memories, inside jokes, or specific qualities you admire about the person. This shows thoughtfulness and genuine care.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground dark:text-white">Express Gratitude</h2>
                  <p className="text-muted-foreground dark:text-gray-300">
                    Birthdays are perfect opportunities to express appreciation. Tell them how they've positively impacted your life and why you're grateful for their presence.
                  </p>
                </div>
              )}

              {post.id === '3' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-foreground dark:text-white">Sharing Your Creation</h2>
                  <p className="text-muted-foreground dark:text-gray-300">
                    You've created a beautiful digital greeting card—now it's time to share it with the world. Follow these best practices to ensure your card looks perfect across all platforms.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground dark:text-white">Choose the Right Platform</h2>
                  <p className="text-muted-foreground dark:text-gray-300">
                    Different platforms have different strengths. WhatsApp is great for direct sharing, while social media platforms like Instagram and Facebook are perfect for public celebrations.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground dark:text-white">Test Before Sending</h2>
                  <p className="text-muted-foreground dark:text-gray-300">
                    Always preview your card on different devices before sending. Check that animations work smoothly, images load properly, and text is readable on both mobile and desktop.
                  </p>
                </div>
              )}

              {/* Default content for other posts */}
              {!['1', '2', '3'].includes(post.id) && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-foreground dark:text-white">Coming Soon</h2>
                  <p className="text-muted-foreground dark:text-gray-300">
                    We're currently working on this article. Check back soon for the full content!
                  </p>
                </div>
              )}
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 p-8 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 dark:from-primary/20 dark:via-purple-500/20 dark:to-pink-500/20 border border-border rounded-2xl text-center space-y-4"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Ready to Create Your Own?
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Start creating beautiful, personalized greeting cards that your loved ones will cherish forever.
              </p>
              <Button
                size="lg"
                onClick={() => navigate('/create')}
                className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all"
              >
                Create Your Greeting
              </Button>
            </motion.div>
          </motion.article>
        </main>
      </div>
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default BlogPost;
