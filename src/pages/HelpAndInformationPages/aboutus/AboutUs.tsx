import React, {useState} from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Users, Target, Zap, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SEOManager from '@/components/seo/SEOManager';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { features } from './AboutUsData';
import AnimatedSidebar from '@/components/navigation/AnimatedSidebar';
import Footer from '../Footer';
import ReusableHeader from '@/pages/HelpAndInformationPages/ReusableHeader';


const AboutUs = ({ onClick }: { onClick?: () => void }) => {
   const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 ">
      <SEOManager
        title="About Us - Beautiful Greetings"
        description="Learn about our mission to spread joy and love through beautiful, personalized greeting cards for every occasion."
      />

      <ReusableHeader title="About Us" onMenuClick={() => setSidebarOpen(true)} />
      <AnimatedSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />


      <div className="container mx-auto px-4 py-12">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="text-6xl mb-6 inline-block"
          >
            🎉
          </motion.div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-primary bg-clip-text text-transparent">
            About Beautiful Greetings
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We believe every celebration deserves to be special. Our mission is to help you create
            memorable moments with stunning, personalized greeting cards.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Card className="overflow-hidden border-2 border-primary/30 shadow-2xl hover:shadow-3xl hover:border-primary/50 transition-all duration-300 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨
                </motion.span>
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Beautiful Greetings was born from a simple idea: making it easy for everyone to
                  express their feelings in the most creative and heartfelt way possible.
                </p>
                <p>
                  In today's fast-paced digital world, we wanted to bring back the joy of sending
                  personalized greetings, but with a modern twist. Our platform combines traditional
                  warmth with cutting-edge technology to create something truly special.
                </p>
                <p>
                  Whether you're celebrating a birthday, wedding, anniversary, or just want to
                  brighten someone's day, we're here to help you create the perfect greeting card
                  that speaks from your heart.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className={`h-full border-2 border-transparent hover:border-primary/50 transition-all duration-300 group bg-gradient-to-br ${feature.gradient} ${feature.hoverGradient} shadow-lg hover:shadow-2xl`}>
                    <CardContent className="p-6">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-xl transition-shadow`}
                      >
                        <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                      </motion.div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already creating beautiful greetings for their loved ones.
              </p>
              <Link to="/create">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="group">
                    <span className="mr-2 group-hover:animate-bounce">🚀</span>
                    Create Your First Greeting
                  </Button>
                </motion.div>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Use the Footer component */}
      <Footer showSocialLinks={true} simple className="mt-6" />
    </div>
  );
};

export default AboutUs;
