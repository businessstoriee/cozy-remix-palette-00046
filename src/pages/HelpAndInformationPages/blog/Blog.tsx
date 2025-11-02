import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, Edit } from 'lucide-react';
import SEOManager from '@/components/seo/SEOManager';
import { useNavigate } from 'react-router-dom';
import AnimatedSidebar from '@/components/navigation/AnimatedSidebar';
import { blogPosts } from "./BlogData";
import Footer from '../Footer';
import ReusableHeader from '@/pages/HelpAndInformationPages/ReusableHeader';


interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string | React.ReactNode;
}

// Extracted BlogCard component
const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.6) }}
      onClick={() => navigate(`/blog/${post.id}`)}
      className="cursor-pointer"
    >
      <Card className="group hover:shadow-2xl hover:border-primary/50 transition-all duration-300 h-full bg-card">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Image/Emoji Container */}
          <div className="relative h-48 bg-gradient-to-br from-primary/20 to-purple-500/20 dark:from-primary/30 dark:to-purple-500/30 overflow-hidden">
            {typeof post.image === 'string' && post.image.startsWith('http') ? (
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <motion.div 
                className="flex items-center justify-center h-full text-6xl"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {post.image}
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3 self-start">
              {post.category}
            </div>

            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-muted-foreground mb-4 flex-grow line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <Button variant="outline" className="border-primary w-full justify-between group hover:text-primary hover:shadow-xl">
              Read More
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-4 w-4 hover:bg-primary" />
              </motion.span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Blog = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <SEOManager
        title="Greeting Card Blog - Tips, Ideas & Inspiration"
        description="Explore our blog for creative greeting card ideas, tips on personalization, and inspiration for every occasion."
      // canonicalUrl="/blog"
     />

      <ReusableHeader title="Blog" onMenuClick={() => setSidebarOpen(true)} />

      <AnimatedSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Greeting Card Inspiration
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tips, ideas, and creative inspiration for making unforgettable greeting cards
          </p>
        </motion.section>

        {/* Blog Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </section>

        {/* Empty State */}
        {blogPosts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-muted-foreground text-lg">No blog posts available yet.</p>
          </motion.div>
        )}

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-2">More Coming Soon!</h3>
              <p className="text-muted-foreground">
                We're constantly adding new articles with tips and creative ideas for your greeting cards.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Use the Footer component */}
      <Footer showSocialLinks={true} simple className="mt-6" />
    </div>
  );
};

export default Blog;