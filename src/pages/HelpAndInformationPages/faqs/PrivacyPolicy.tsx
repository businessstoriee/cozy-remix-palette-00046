import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SEOManager from '@/components/seo/SEOManager';
import AnimatedSidebar from '@/components/navigation/AnimatedSidebar';
import { useNavigate } from 'react-router-dom';
import { sections } from '../privacypolicy/PrivacyPolicy';
import Footer from '../Footer';
import ReusableHeader from '@/pages/HelpAndInformationPages/ReusableHeader';

const PrivacyPolicy = ({ onClick }: { onClick?: () => void }) => {

   const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <SEOManager
        title="Privacy Policy - Beautiful Greetings"
        description="Learn how we protect your data and respect your privacy. Transparent policies for a secure greeting card creation experience."
      />

      <ReusableHeader title="Privacy Policy" onMenuClick={() => setSidebarOpen(true)} />
      <AnimatedSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />


      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl mb-6 inline-block"
          >
            🔒
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-primary  bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="border-2 border-primary/30 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Beautiful Greetings, we are committed to protecting your privacy and ensuring the security
                of your personal information. This Privacy Policy explains how we collect, use, and safeguard
                your data when you use our greeting card creation platform.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Policy Sections */}
        <div className="space-y-8 mb-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <Card className={`border-2 border-transparent hover:border-primary/50 transition-all duration-300 group bg-gradient-to-br ${section.gradient} ${section.hoverGradient} shadow-lg hover:shadow-2xl`}>
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`w-14 h-14 bg-gradient-to-br ${section.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:shadow-xl transition-shadow`}
                      >
                        <Icon className={`w-7 h-7 ${section.iconColor}`} />
                      </motion.div>
                      <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                        {section.title}
                      </h2>
                    </div>
                    <ul className="space-y-3 ml-18">
                      {section.content.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 + i * 0.05 }}
                          className="flex items-start gap-3 text-muted-foreground"
                        >
                          <span className="text-primary mt-1 flex-shrink-0 text-xl">✓</span>
                          <span className="text-base">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                If you have any questions or concerns about our privacy practices, please don't hesitate to contact us.
              </p>
               <Link to="/support">
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button size="lg" className="group">
                                  <span className="mr-2 group-hover:animate-bounce">💬</span>
                                  Contact Support
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

export default PrivacyPolicy