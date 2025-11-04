import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  generateStructuredData,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generateMetaTags,
  generateCanonicalURL,
} from '@/utils/seoEnhanced';

interface AdvancedSEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  breadcrumbs?: { name: string; url: string }[];
  structuredData?: any;
  noindex?: boolean;
}

/**
 * Advanced SEO component with comprehensive meta tags and structured data
 */
export const AdvancedSEO = ({
  title,
  description,
  image,
  url,
  type = 'website',
  keywords = [],
  breadcrumbs,
  structuredData,
  noindex = false,
}: AdvancedSEOProps) => {
  const metaTags = generateMetaTags({
    title,
    description,
    image,
    url,
    type,
    keywords,
  });

  const canonicalUrl = url || generateCanonicalURL(typeof window !== 'undefined' ? window.location.pathname : '');

  useEffect(() => {
    // Set theme color
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', '#9b87f5');
    }
  }, []);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={metaTags['og:title']} />
      <meta property="og:description" content={metaTags['og:description']} />
      <meta property="og:image" content={metaTags['og:image']} />
      <meta property="og:url" content={metaTags['og:url']} />
      <meta property="og:type" content={metaTags['og:type']} />
      <meta property="og:site_name" content={metaTags['og:site_name']} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={metaTags['twitter:card']} />
      <meta name="twitter:title" content={metaTags['twitter:title']} />
      <meta name="twitter:description" content={metaTags['twitter:description']} />
      <meta name="twitter:image" content={metaTags['twitter:image']} />
      
      {/* Theme Color */}
      <meta name="theme-color" content={metaTags['theme-color']} />
      
      {/* Organization Schema */}
      <script type="application/ld+json">
        {generateOrganizationSchema()}
      </script>
      
      {/* Breadcrumb Schema */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script type="application/ld+json">
          {generateBreadcrumbSchema(breadcrumbs)}
        </script>
      )}
      
      {/* Custom Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default AdvancedSEO;
