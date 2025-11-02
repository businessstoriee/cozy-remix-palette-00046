import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileQuestion, Book, Phone, MessageCircle, Heart, Edit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SEOManager from '@/components/seo/SEOManager';
import { Link, useNavigate } from 'react-router-dom';
import { supportOptions, contactOptions } from './SupportData';
import AnimatedSidebar from '@/components/navigation/AnimatedSidebar';
import Footer from '../Footer';
import ReusableHeader from '@/pages/HelpAndInformationPages/ReusableHeader';

// Extracted Support Card Component
const SupportCard = ({ 
  option, 
  index, 
  isContact = false 
}: { 
  option: any; 
  index: number; 
  isContact?: boolean;
}) => {
  const navigate = useNavigate();
  const Icon = option.icon || FileQuestion;
  
  const CardContentComponent = () => (
    <CardContent className="p-4 sm:p-6 text-center">
      <motion.div
        whileHover={{ rotate: isContact ? [0, -10, 10, -10, 0] : 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
        className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br ${option.gradient} rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4`}
      >
        <Icon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 ${option.iconColor}`} />
      </motion.div>
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
        {option.title}
      </h3>
      <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
        {option.description}
      </p>
      {!isContact && (
        <Button variant="outline" className="hover:shadow-lg group-hover:bg-primary/20 transition-all text-xs sm:text-sm">
          {option.action}
        </Button>
      )}
    </CardContent>
  );

  if (isContact) {
    return (
      <a 
        href={option.link} 
        target={option.link.startsWith('http') ? '_blank' : undefined} 
        rel={option.link.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="block h-full focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
      >
        <Card className={`h-full bg-gradient-to-br ${option.gradient} ${option.hoverGradient} border border-white/20 dark:border-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer`}>
          <CardContentComponent />
        </Card>
      </a>
    );
  }

  return (
    <Card 
      className={`h-full bg-gradient-to-br ${option.gradient} ${option.hoverGradient} border border-white/20 dark:border-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer focus:ring-2 focus:ring-primary focus:outline-none`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(option.link)}
      onClick={() => navigate(option.link)}
    >
      <Link to={option.link} className="focus:outline-none block h-full">
        <CardContentComponent />
      </Link>
    </Card>
  );
};

const Support = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-x-hidden"> {/* Added overflow-x-hidden */}
      <SEOManager
        title="Support - GreetingInvite Help Center"
        description="Need help creating or sharing your greeting? Contact us or explore our guides and FAQs."
      />

      {/* Optimized Background Bubbles */}
      {[...Array(4)].map((_, i) => ( // Reduced from 6 to 4 for better performance
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-lg" // Reduced blur
          style={{
            width: `${30 + i * 12}px`, // Smaller sizes
            height: `${30 + i * 12}px`,
            left: `${5 + i * 20}%`, // Better positioning
            top: `${5 + i * 15}%`,
          }}
          animate={{
            y: [0, -15, 0], // Reduced movement
          }}
          transition={{
            duration: 12 + i * 2, // Faster animation
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <ReusableHeader title="Support" onMenuClick={() => setSidebarOpen(true)} />

      <AnimatedSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content - Fixed container padding */}
      <div className="w-full max-w-full px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 mx-auto"> {/* Removed container class, using manual padding */}
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8 md:mb-12 px-2" // Added horizontal padding
        >
          <motion.div
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 md:mb-6 inline-block"
          >
            💬
          </motion.div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent px-2">
            Get In Touch
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            We're here to support you every step of the way. Choose a way to connect with us below.
          </p>
        </motion.div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12 px-2 sm:px-0"> {/* Added horizontal padding on mobile */}
          {supportOptions.map((option, index) => (
            <SupportCard key={index} option={option} index={index} />
          ))}
        </div>

        {/* Contact Options */}
        <div className="mb-6 sm:mb-8 md:mb-12 px-2 sm:px-0"> {/* Added horizontal padding on mobile */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 md:mb-8 text-primary">
            Contact Us Directly
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {contactOptions.map((option, index) => (
              <SupportCard key={index} option={option} index={index} isContact={true} />
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center px-2" // Added horizontal padding
        >
          <p className="text-muted-foreground mb-3 text-sm sm:text-base md:text-lg">
            Still need help? We're always happy to assist.
          </p>
          <motion.a
            href="mailto:kamleshguptaom4@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            Contact Support
          </motion.a>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer showSocialLinks={true} simple className="mt-4 sm:mt-6" />
    </div>
  );
};

export default Support;