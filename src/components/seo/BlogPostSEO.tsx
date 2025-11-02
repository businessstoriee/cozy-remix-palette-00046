import { useEffect } from 'react';
import { updateAdvancedPageSEO, AdvancedSEOData } from '@/utils/seoEnhanced';

interface BlogPostSEOProps {
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
  author?: string;
  postId: string;
}

/**
 * BlogPostSEO - Enhanced SEO for blog posts with rich snippets
 */
const BlogPostSEO: React.FC<BlogPostSEOProps> = ({
  title,
  description,
  date,
  readTime,
  category,
  image,
  author = "Beautiful Greetings Team",
  postId
}) => {
  useEffect(() => {
    const currentUrl = window.location.href;
    const baseUrl = window.location.origin;

    const seoData: AdvancedSEOData = {
      title: `${title} | Beautiful Greetings Blog`,
      description: description,
      keywords: [
        title.toLowerCase(),
        'greeting cards',
        'blog',
        category.toLowerCase(),
        'card design',
        'personalized greetings',
        'celebration ideas'
      ],
      ogTitle: title,
      ogDescription: description,
      ogImage: image || `${baseUrl}/blog-default.png`,
      ogImageAlt: title,
      ogType: 'article',
      twitterCard: 'summary_large_image',
      twitterImage: image || `${baseUrl}/blog-default.png`,
      canonical: currentUrl,
      lang: 'en',
      robots: 'index, follow, max-image-preview:large',
      
      // Enhanced structured data for blog posts
      structuredData: {
        "@context": "https://schema.org",
        "@graph": [
          // Article schema
          {
            "@type": "BlogPosting",
            "@id": `${currentUrl}#article`,
            "headline": title,
            "description": description,
            "image": image ? [image] : undefined,
            "datePublished": new Date(date).toISOString(),
            "dateModified": new Date(date).toISOString(),
            "author": {
              "@type": "Person",
              "name": author,
              "@id": `${baseUrl}/author/${author.toLowerCase().replace(/\s+/g, '-')}`
            },
            "publisher": {
              "@type": "Organization",
              "name": "Beautiful Greetings",
              "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/logo.png`
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": currentUrl
            },
            "articleSection": category,
            "keywords": [title, category, "greeting cards", "celebration ideas"].join(", "),
            "inLanguage": "en",
            "isAccessibleForFree": true,
            "wordCount": description.split(' ').length * 10, // Estimate
            "timeRequired": readTime
          },
          // BreadcrumbList schema
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": baseUrl
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": `${baseUrl}/blog`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": title,
                "item": currentUrl
              }
            ]
          },
          // WebPage schema
          {
            "@type": "WebPage",
            "@id": currentUrl,
            "url": currentUrl,
            "name": title,
            "description": description,
            "publisher": {
              "@type": "Organization",
              "name": "Beautiful Greetings"
            },
            "inLanguage": "en",
            "potentialAction": {
              "@type": "ReadAction",
              "target": [currentUrl]
            }
          }
        ]
      }
    };

    updateAdvancedPageSEO(seoData);
  }, [title, description, date, readTime, category, image, author, postId]);

  return null;
};

export default BlogPostSEO;
