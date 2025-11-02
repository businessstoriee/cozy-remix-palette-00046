import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Info, Shield, HelpCircle, Headphones, ChevronRight, Mail, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import AnimatedSidebar from '@/components/navigation/AnimatedSidebar';
import SEOManager from '@/components/seo/SEOManager';
import Footer from '../Footer';
import ReusableHeader from '@/pages/HelpAndInformationPages/ReusableHeader'; // Check if this path is correct

const Help = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const helpSections = [
    {
      id: 'about',
      title: 'About Us',
      icon: Info,
      description: 'Learn about our mission and values',
      path: '/about',
      content: 'Discover who we are and what drives us to create beautiful greetings.',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      hoverGradient: 'hover:from-blue-500/30 hover:to-cyan-500/30',
      iconColor: 'text-blue-600'
    },
    {
      id: 'faq',
      title: 'FAQ',
      icon: HelpCircle,
      description: 'Frequently asked questions',
      path: '/faq',
      content: 'Find quick answers to common questions about our platform.',
      gradient: 'from-purple-500/20 to-pink-500/20',
      hoverGradient: 'hover:from-purple-500/30 hover:to-pink-500/30',
      iconColor: 'text-purple-600'
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: Shield,
      description: 'How we protect your data',
      path: '/privacy',
      content: 'Learn how we collect, use, and protect your personal information.',
      gradient: 'from-green-500/20 to-emerald-500/20',
      hoverGradient: 'hover:from-green-500/30 hover:to-emerald-500/30',
      iconColor: 'text-green-600'
    },
    {
      id: 'support',
      title: 'Support',
      icon: Headphones,
      description: 'Get help when you need it',
      path: '/support',
      content: 'Contact our support team for assistance with any issues.',
      gradient: 'from-orange-500/20 to-red-500/20',
      hoverGradient: 'hover:from-orange-500/30 hover:to-red-500/30',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <SEOManager
        title="Help Center - Beautiful Greetings Support"
        description="Get help, browse FAQs, learn about our features, and contact support. Everything you need for Beautiful Greetings."
        // canonicalUrl="/help"
      />

      <ReusableHeader 
        title="Help Center" 
        onMenuClick={() => setSidebarOpen(true)} 
      />

      <AnimatedSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="container mx-auto px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl sm:text-6xl mb-4 sm:mb-6 inline-block"
            >
              💬
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              How Can We Help?
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about Beautiful Greetings in one place
            </p>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {helpSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <Link to={section.path} className="block h-full">
                    <Card className={`h-full bg-gradient-to-br ${section.gradient} ${section.hoverGradient} border border-white/20 dark:border-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer`}>
                      <CardContent className="p-6 text-center flex flex-col h-full">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${section.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 flex-shrink-0`}
                        >
                          <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${section.iconColor}`} />
                        </motion.div>
                        <div className="flex-1 flex flex-col">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {section.title}
                          </h3>
                          <p className="text-muted-foreground mb-3 text-sm sm:text-base line-clamp-2 flex-1">
                            {section.description}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground/80 mb-4 line-clamp-2">
                            {section.content}
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          className="group-hover:bg-primary/20 group-hover:border-primary transition-all w-full justify-between mt-auto"
                        >
                          Explore
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Options Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 sm:mb-12"
          >
            <Card className="border-primary/20 bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl sm:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Quick Contact Options
                </CardTitle>
                <CardDescription className="text-base sm:text-lg">
                  Get in touch with us through these quick channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-200">
                    <CardContent className="p-6 text-center">
                      <Mail className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold mb-2">Email Support</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Send us an email and we'll get back to you within 24 hours
                      </p>
                      <a href="mailto:support@beautifulgreetings.com">
                        <Button variant="outline" className="w-full">
                          Send Email
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-200">
                    <CardContent className="p-6 text-center">
                      <MessageSquare className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Chat with our support team in real-time during business hours
                      </p>
                      <Button variant="outline" className="w-full" onClick={() => navigate('/support')}>
                        Start Chat
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <Card className="border-primary/20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Still Need Help?
                </CardTitle>
                <CardDescription className="text-base sm:text-lg">
                  Can't find what you're looking for? Our support team is always ready to assist you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/support">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl"
                  >
                    <Headphones className="mr-2 w-5 h-5" />
                    Contact Support Team
                  </Button>
                </Link>
                <div className="text-sm text-muted-foreground">
                  <p>Typically replies within 2 hours • Available 9AM-6PM EST</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <Footer showSocialLinks={true} simple={true} className="mt-12" />
    </div>
  );
};

export default Help;