import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SEOManager from '@/components/seo/SEOManager';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { faqs } from './FAQData';
import AnimatedSidebar from '@/components/navigation/AnimatedSidebar';
import Footer from '../Footer';
import ReusableHeader from '@/pages/HelpAndInformationPages/ReusableHeader';
import LoadingSpinner from '@/components/common/LoadingSpinner';


const FAQ = ({ onClick }: { onClick?: () => void }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
     const [sidebarOpen, setSidebarOpen] = useState(false);
      const navigate = useNavigate();

  return (
    <Suspense fallback={<LoadingSpinner message="Loading FAQs..." />}>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 ">
        <SEOManager
          title="FAQ - Frequently Asked Questions"
          description="Find answers to common questions about creating and sharing beautiful greeting cards. Learn how to use all features effectively."
        />

      <ReusableHeader title="FAQs" onMenuClick={() => setSidebarOpen(true)} />
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
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl mb-6 inline-block"
          >
            ❓
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-primary bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about creating and sharing beautiful greeting cards
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
              >
                <Card
                  className={cn(
                    'border-2 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl',
                    `bg-gradient-to-br ${faq.gradient}`,
                    isOpen
                      ? 'border-primary/50 shadow-primary/20'
                      : 'border-transparent hover:border-primary/30'
                  )}
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full text-left p-6 flex items-start gap-4 group"
                    >
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 mt-1"
                      >
                        <ChevronDown
                          className={cn(
                            'w-5 h-5 transition-colors',
                            isOpen ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                          )}
                        />
                      </motion.div>
                      <div className="flex-1">
                        <h3
                          className={cn(
                            'text-lg font-semibold transition-colors',
                            isOpen ? 'text-primary' : 'group-hover:text-primary'
                          )}
                        >
                          {faq.question}
                        </h3>
                      </div>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <HelpCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pl-16">
                            <motion.p
                              initial={{ y: -10 }}
                              animate={{ y: 0 }}
                              className="text-muted-foreground leading-relaxed"
                            >
                              {faq.answer}
                            </motion.p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Still Have Questions Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Can't find what you're looking for? Our support team is here to help!
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
    </Suspense>
  );
};

export default FAQ;
