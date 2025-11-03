import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import SEOManager from '@/components/seo/SEOManager';
import AnimatedSidebar from '@/components/navigation/AnimatedSidebar';
import { templates, Template } from './TemplatesData';
import Footer from '../Footer';
import ReusableHeader from '@/pages/HelpAndInformationPages/ReusableHeader';
import TemplateSearchBar, { TemplateFilters } from '@/components/templates/TemplateSearchBar';
import BackToTop from '@/components/common/BackToTop';


const Templates = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<TemplateFilters>({
    searchQuery: '',
    category: 'all',
    sortBy: 'name',
  });

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = templates.map(t => t.eventType);
    return Array.from(new Set(cats));
  }, []);

  // Filter and sort templates
  const filteredTemplates = useMemo(() => {
    let result = [...templates];

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.eventType.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.category !== 'all') {
      result = result.filter((t) => t.eventType === filters.category);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'popular':
        // Mock popularity - in real app this would come from analytics
        result.sort(() => Math.random() - 0.5);
        break;
      case 'newest':
        result.reverse();
        break;
    }

    return result;
  }, [filters]);

  const handleTemplateSelect = (template: Template) => {
    navigate('/create', { state: { templateData: template.defaultData } });
  };

  return (
        <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 ">

      <SEOManager
        title="Greeting Card Templates - Quick Start"
        description="Choose from beautiful pre-designed greeting card templates for birthdays, anniversaries, graduations, and more. Customize and share in minutes!"
      />

      <ReusableHeader title="Templates" onMenuClick={() => setSidebarOpen(true)} />
      <AnimatedSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Quick Start Templates
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Choose from our beautiful pre-designed templates and customize them to make them uniquely yours
            </p>
          </motion.div>

          {/* Search & Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <TemplateSearchBar
              onFiltersChange={setFilters}
              resultsCount={filteredTemplates.length}
              categories={categories}
            />
          </motion.div>
        </section>

        {/* Templates Grid */}
        <section className="container mx-auto px-4 pb-20">
          {filteredTemplates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-muted-foreground mb-4">No templates found</p>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters
              </p>
              <Button
                onClick={() => setFilters({ searchQuery: '', category: 'all', sortBy: 'name' })}
                variant="outline"
              >
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-2xl hover:border-primary/50 transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    {/* Template Preview */}
                    <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden">
                      <motion.div
                        className="text-7xl"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {template.previewImage}
                      </motion.div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          size="lg"
                           variant="outline"
                          onClick={() => handleTemplateSelect(template)}
                          className="gap-2 hover:animate-bounce border-purple-900"
                        >
                         <span className="hover:animate-spin"> <Sparkles className="h-5 w-5" /></span>
                          Use Template
                        </Button>
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/20 ">
                          <template.icon className="h-5 w-5 text-primary hover:animate-bounce" />
                        </div>
                        <h3 className="text-xl font-bold">{template.name}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {template.description}
                      </p>
                      <Button
                        onClick={() => handleTemplateSelect(template)}
                        className="w-full border-primary hover:text-primary hover:shadow-lg"
                        variant="outline"
                      >
                        Customize
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4">
                Need Something Unique?
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Create a completely custom greeting card from scratch with full control over every element
              </p>
              <Button
                size="lg"
                onClick={() => navigate('/create')}
                className="gap-2 hover:shadow-lg"
              >
                 <span className="hover:animate-spin"> <Sparkles className="h-5 w-5" /></span>
                Create Custom Card
              </Button>
            </CardContent>
          </Card>
        </section>

      {/* Use the Footer component */}
      <Footer showSocialLinks={true} simple className="mt-6" />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default Templates;
